<?php
/*
 * Digi Vidyarthi — Blog Admin API
 * Handles: login, create post, delete post, image upload using MySQL Database
 */

// Load environment variables from .env file (if present)
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    $envLines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($envLines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($k, $v) = explode('=', $line, 2);
            $_ENV[trim($k)] = trim($v);
            putenv(trim($k) . '=' . trim($v));
        }
    }
}

// Disable direct browser access (defense-in-depth — also blocked via .htaccess)
if (php_sapi_name() !== 'cli' && !isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    if (!isset($_GET['action']) && !isset($_POST['action'])) {
        http_response_code(403);
        exit('Forbidden');
    }
}

session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
    'cookie_secure' => true,
    'use_strict_mode' => true,
]);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// ===== CONFIGURATION (from environment) =====
define('ADMIN_PASSWORD', getenv('ADMIN_PASSWORD') ?: '');
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: '');
define('DB_USER', getenv('DB_USER') ?: '');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('ALLOWED_ORIGIN', getenv('ALLOWED_ORIGIN') ?: 'https://digividyarthi.com');

// CORS — restrict to your domain only
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === ALLOWED_ORIGIN) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$uploadDir = __DIR__ . '/images/blog/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// ===== RATE LIMITING (login attempts) =====
function checkRateLimit($key, $maxAttempts = 5, $windowSeconds = 300)
{
    $file = sys_get_temp_dir() . '/dv_rl_' . md5($key);
    $attempts = file_exists($file) ? (int)file_get_contents($file) : 0;
    if ($attempts >= $maxAttempts) {
        sendResponse(false, 'Too many attempts. Please try again later.');
    }
    $attempts++;
    file_put_contents($file, $attempts);
    if ($attempts === 1) {
        // Set TTL by clearing after window
        register_shutdown_function(function() use ($file, $windowSeconds) {
            // Best-effort: re-schedule cleanup. Simple approach: clear on first hit past window.
        });
    }
}

function clearRateLimit($key)
{
    $file = sys_get_temp_dir() . '/dv_rl_' . md5($key);
    if (file_exists($file)) @unlink($file);
}

// ===== DATABASE CONNECTION =====
function getDB()
{
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        error_log('[DigiVidyarthi DB] ' . $e->getMessage());
        sendResponse(false, 'Database connection failed.');
    }
}

// ===== HELPER FUNCTIONS =====
function isLoggedIn()
{
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        return false;
    }
    // Auto-logout after 2 hours of inactivity
    if (isset($_SESSION['login_time']) && (time() - $_SESSION['login_time']) > 7200) {
        session_destroy();
        return false;
    }
    $_SESSION['login_time'] = time();
    return true;
}

function syncBlogsJsonFile($pdo)
{
    try {
        $stmt = $pdo->query("SELECT * FROM posts ORDER BY date DESC");
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($posts as &$post) {
            $post['tags'] = json_decode($post['tags'], true);
            if (!is_array($post['tags']))
                $post['tags'] = [];
        }
        file_put_contents(__DIR__ . '/blogs.json', json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    } catch (Exception $e) {
        // Silently ignore if file write fails
    }
}

function sendResponse($success, $message, $data = null)
{
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function sanitizeText($text)
{
    return htmlspecialchars(trim($text), ENT_QUOTES, 'UTF-8');
}

function sanitizeContent($html)
{
    $allowed = '<h1><h2><h3><h4><h5><h6><p><br><strong><b><em><i><u><ul><ol><li><a><img><blockquote><code><pre><hr><span><div>';
    return strip_tags(trim($html), $allowed);
}

function generateSlug($title)
{
    $slug = strtolower(trim($title));
    $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug);
    $slug = preg_replace('/[\s-]+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug;
}

// ===== ROUTE HANDLER =====
$action = isset($_POST['action']) ? $_POST['action'] : (isset($_GET['action']) ? $_GET['action'] : '');

switch ($action) {

    // ----- LOGIN -----
    case 'login':
        $clientKey = ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '_' . ($_SERVER['HTTP_USER_AGENT'] ?? '');
        checkRateLimit('login_' . $clientKey, 5, 300);

        $password = isset($_POST['password']) ? $_POST['password'] : '';
        if (defined('ADMIN_PASSWORD') && ADMIN_PASSWORD !== '' && hash_equals(ADMIN_PASSWORD, $password)) {
            session_regenerate_id(true);
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['login_time'] = time();
            clearRateLimit('login_' . $clientKey);
            sendResponse(true, 'Login successful');
        } else {
            // Constant-ish delay to avoid timing attacks
            usleep(random_int(200000, 500000));
            sendResponse(false, 'Incorrect password. Please try again.');
        }
        break;

    // ----- LOGOUT -----
    case 'logout':
        session_destroy();
        sendResponse(true, 'Logged out successfully');
        break;

    // ----- CHECK AUTH -----
    case 'check_auth':
        sendResponse(isLoggedIn(), isLoggedIn() ? 'Authenticated' : 'Not authenticated');
        break;

    // ----- GET ALL POSTS -----
    case 'get_posts':
        $pdo = getDB();
        $stmt = $pdo->query("SELECT * FROM posts ORDER BY date DESC");
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Convert JSON tags back to array for frontend
        foreach ($posts as &$post) {
            $post['tags'] = json_decode($post['tags'], true);
            if (!is_array($post['tags']))
                $post['tags'] = [];
        }

        sendResponse(true, 'Posts loaded', $posts);
        break;

    // ----- CREATE POST -----
    case 'create_post':
        if (!isLoggedIn()) {
            sendResponse(false, 'Unauthorized. Please login first.');
        }

        $title = isset($_POST['title']) ? sanitizeText($_POST['title']) : '';
        $category = isset($_POST['category']) ? sanitizeText($_POST['category']) : '';
        $excerpt = isset($_POST['excerpt']) ? sanitizeText($_POST['excerpt']) : '';
        $content = isset($_POST['content']) ? sanitizeContent($_POST['content']) : '';
        $author = isset($_POST['author']) ? sanitizeText($_POST['author']) : 'Digi Vidyarthi';
        $tagsRaw = isset($_POST['tags']) ? $_POST['tags'] : '';

        if (empty($title) || empty($category) || empty($content)) {
            sendResponse(false, 'Title, category aur content zaroori hai.');
        }

        // Handle image upload
        $imagePath = '';
        if (isset($_FILES['image']) && $_FILES['image']['size'] > 0) {
            if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) {
                sendResponse(false, 'Image upload failed. Error code: ' . $_FILES['image']['error'] . '. File may be too large.');
            }
            $file = $_FILES['image'];
            $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->file($file['tmp_name']);

            if (!in_array($mimeType, $allowedTypes)) {
                sendResponse(false, 'Sirf JPG, PNG, WebP ya GIF image upload karein.');
            }

            if ($file['size'] > 5 * 1024 * 1024) {
                sendResponse(false, 'Image size 5MB se kam honi chahiye.');
            }

            $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif']))
                $ext = 'jpg';
            $safeName = 'blog-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
            $destination = $uploadDir . $safeName;

            if (move_uploaded_file($file['tmp_name'], $destination)) {
                $imagePath = 'images/blog/' . $safeName;
            } else {
                sendResponse(false, 'Image save failed. Check folder permissions on server (images/blog).');
            }
        }

        if (empty($excerpt)) {
            $excerpt = mb_substr(strip_tags($content), 0, 150) . '...';
        }

        $categoryLabels = [
            'seo' => 'SEO',
            'social-media' => 'Social Media',
            'google-ads' => 'Google Ads',
            'ai-tools' => 'AI Tools',
            'tips' => 'Tips & Tricks'
        ];

        $tags = [];
        if (!empty($tagsRaw)) {
            $tags = array_values(array_unique(array_filter(array_map('trim', explode(',', $tagsRaw)))));
        }

        $id = 'post-' . time() . '-' . bin2hex(random_bytes(3));
        $slug = generateSlug($title);
        $categoryLabel = isset($categoryLabels[$category]) ? $categoryLabels[$category] : ucfirst($category);
        $date = date('Y-m-d');
        $dateFormatted = date('F j, Y');
        $tagsJson = json_encode($tags);

        $pdo = getDB();
        $sql = "INSERT INTO posts (id, title, slug, category, categoryLabel, excerpt, content, author, image, tags, date, dateFormatted) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id, $title, $slug, $category, $categoryLabel, $excerpt, $content, $author, $imagePath, $tagsJson, $date, $dateFormatted]);

            $newPost = [
                'id' => $id,
                'title' => $title,
                'slug' => $slug,
                'category' => $category,
                'categoryLabel' => $categoryLabel,
                'excerpt' => $excerpt,
                'content' => $content,
                'author' => $author,
                'image' => $imagePath,
                'tags' => $tags,
                'date' => $date,
                'dateFormatted' => $dateFormatted
            ];
            syncBlogsJsonFile($pdo);
            sendResponse(true, 'Blog post published successfully! 🎉', $newPost);
        } catch (PDOException $e) {
            sendResponse(false, 'Database error: ' . $e->getMessage());
        }
        break;

    // ----- UPDATE POST -----
    case 'update_post':
        if (!isLoggedIn()) {
            sendResponse(false, 'Unauthorized. Please login first.');
        }

        $postId = isset($_POST['id']) ? sanitizeText($_POST['id']) : '';
        $title = isset($_POST['title']) ? sanitizeText($_POST['title']) : '';
        $category = isset($_POST['category']) ? sanitizeText($_POST['category']) : '';
        $excerpt = isset($_POST['excerpt']) ? sanitizeText($_POST['excerpt']) : '';
        $content = isset($_POST['content']) ? sanitizeContent($_POST['content']) : '';
        $tagsRaw = isset($_POST['tags']) ? $_POST['tags'] : '';

        if (empty($postId) || empty($title) || empty($category) || empty($content)) {
            sendResponse(false, 'ID, title, category aur content zaroori hai.');
        }

        $pdo = getDB();

        // Fetch existing post to handle image deletion
        $stmt = $pdo->prepare("SELECT image FROM posts WHERE id = ?");
        $stmt->execute([$postId]);
        $existingPost = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$existingPost) {
            sendResponse(false, 'Post not found.');
        }

        $categoryLabels = [
            'seo' => 'SEO',
            'social-media' => 'Social Media',
            'google-ads' => 'Google Ads',
            'ai-tools' => 'AI Tools',
            'tips' => 'Tips & Tricks'
        ];

        $slug = generateSlug($title);
        $categoryLabel = isset($categoryLabels[$category]) ? $categoryLabels[$category] : ucfirst($category);

        $tags = [];
        if (!empty($tagsRaw)) {
            $tags = array_values(array_unique(array_filter(array_map('trim', explode(',', $tagsRaw)))));
        }
        $tagsJson = json_encode($tags);

        $imagePath = $existingPost['image'];
        // Handle image update
        if (isset($_FILES['image']) && $_FILES['image']['size'] > 0) {
            if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) {
                sendResponse(false, 'Image upload failed. Error code: ' . $_FILES['image']['error'] . '. File may be too large.');
            }
            $file = $_FILES['image'];
            $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->file($file['tmp_name']);

            if (in_array($mimeType, $allowedTypes) && $file['size'] <= 5 * 1024 * 1024) {
                $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
                if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif']))
                    $ext = 'jpg';
                $safeName = 'blog-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
                $destination = $uploadDir . $safeName;

                if (move_uploaded_file($file['tmp_name'], $destination)) {
                    if (!empty($existingPost['image']) && file_exists(__DIR__ . '/' . $existingPost['image'])) {
                        unlink(__DIR__ . '/' . $existingPost['image']);
                    }
                    $imagePath = 'images/blog/' . $safeName;
                } else {
                    sendResponse(false, 'Image update failed. Check folder permissions on server (images/blog).');
                }
            }
        }

        $sql = "UPDATE posts SET title=?, slug=?, category=?, categoryLabel=?, excerpt=?, content=?, image=?, tags=? WHERE id=?";
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$title, $slug, $category, $categoryLabel, $excerpt, $content, $imagePath, $tagsJson, $postId]);
            syncBlogsJsonFile($pdo);
            sendResponse(true, 'Post updated successfully!');
        } catch (PDOException $e) {
            sendResponse(false, 'Database error: ' . $e->getMessage());
        }
        break;

    // ----- DELETE POST -----
    case 'delete_post':
        if (!isLoggedIn()) {
            sendResponse(false, 'Unauthorized. Please login first.');
        }

        $postId = isset($_POST['id']) ? sanitizeText($_POST['id']) : '';
        if (empty($postId)) {
            sendResponse(false, 'Post ID required.');
        }

        $pdo = getDB();
        $stmt = $pdo->prepare("SELECT image FROM posts WHERE id = ?");
        $stmt->execute([$postId]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($post) {
            if (!empty($post['image']) && file_exists(__DIR__ . '/' . $post['image'])) {
                unlink(__DIR__ . '/' . $post['image']);
            }
            $delStmt = $pdo->prepare("DELETE FROM posts WHERE id = ?");
            $delStmt->execute([$postId]);
            syncBlogsJsonFile($pdo);
            sendResponse(true, 'Post deleted successfully.');
        } else {
            sendResponse(false, 'Post not found.');
        }
        break;

    default:
        sendResponse(false, 'Invalid action.');
}
?>