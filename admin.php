<?php
/*
 * Digi Vidyarthi — Blog Admin API
 * Handles: login, create post, delete post, image upload
 */

session_start();
header('Content-Type: application/json; charset=utf-8');

// ===== CONFIGURATION =====
// Change this password to your own secure password
define('ADMIN_PASSWORD', 'DigiVidyarthi@2026');

$blogsFile = __DIR__ . '/blogs.json';
$uploadDir = __DIR__ . '/images/blog/';

// Ensure upload directory exists
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// ===== HELPER FUNCTIONS =====

function loadBlogs($file) {
    if (!file_exists($file)) {
        file_put_contents($file, '[]');
        return [];
    }
    $data = file_get_contents($file);
    $blogs = json_decode($data, true);
    return is_array($blogs) ? $blogs : [];
}

function saveBlogs($file, $blogs) {
    file_put_contents($file, json_encode($blogs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function isLoggedIn() {
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

function sendResponse($success, $message, $data = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data'    => $data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function sanitizeText($text) {
    return htmlspecialchars(trim($text), ENT_QUOTES, 'UTF-8');
}

function sanitizeContent($html) {
    // Allow safe HTML tags for blog content
    $allowed = '<h1><h2><h3><h4><h5><h6><p><br><strong><b><em><i><u><ul><ol><li><a><img><blockquote><code><pre><hr><span><div>';
    return strip_tags(trim($html), $allowed);
}

function generateSlug($title) {
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
        $password = isset($_POST['password']) ? $_POST['password'] : '';
        if ($password === ADMIN_PASSWORD) {
            $_SESSION['admin_logged_in'] = true;
            sendResponse(true, 'Login successful');
        } else {
            sendResponse(false, 'Galat password! Please try again.');
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
        $blogs = loadBlogs($blogsFile);
        // Sort by date descending
        usort($blogs, function($a, $b) {
            return strtotime($b['date']) - strtotime($a['date']);
        });
        sendResponse(true, 'Posts loaded', $blogs);
        break;

    // ----- CREATE POST -----
    case 'create_post':
        if (!isLoggedIn()) {
            sendResponse(false, 'Unauthorized. Please login first.');
        }

        $title   = isset($_POST['title']) ? sanitizeText($_POST['title']) : '';
        $category = isset($_POST['category']) ? sanitizeText($_POST['category']) : '';
        $excerpt = isset($_POST['excerpt']) ? sanitizeText($_POST['excerpt']) : '';
        $content = isset($_POST['content']) ? sanitizeContent($_POST['content']) : '';
        $author  = isset($_POST['author']) ? sanitizeText($_POST['author']) : 'Digi Vidyarthi';
        $tagsRaw = isset($_POST['tags']) ? $_POST['tags'] : '';

        if (empty($title) || empty($category) || empty($content)) {
            sendResponse(false, 'Title, category aur content zaroori hai.');
        }

        // Handle image upload
        $imagePath = '';
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $file = $_FILES['image'];

            // Validate file type
            $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->file($file['tmp_name']);

            if (!in_array($mimeType, $allowedTypes)) {
                sendResponse(false, 'Sirf JPG, PNG, WebP ya GIF image upload karein.');
            }

            // Validate file size (max 5MB)
            if ($file['size'] > 5 * 1024 * 1024) {
                sendResponse(false, 'Image size 5MB se kam honi chahiye.');
            }

            // Generate safe filename
            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
            $ext = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $ext));
            if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif'])) {
                $ext = 'jpg';
            }
            $safeName = 'blog-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
            $destination = $uploadDir . $safeName;

            if (move_uploaded_file($file['tmp_name'], $destination)) {
                $imagePath = 'images/blog/' . $safeName;
            }
        }

        // Auto-generate excerpt if not provided
        if (empty($excerpt)) {
            $excerpt = mb_substr(strip_tags($content), 0, 150) . '...';
        }

        // Category label mapping
        $categoryLabels = [
            'seo'          => 'SEO',
            'social-media' => 'Social Media',
            'google-ads'   => 'Google Ads',
            'ai-tools'     => 'AI Tools',
            'tips'         => 'Tips & Tricks'
        ];

        // Parse tags
        $tags = [];
        if (!empty($tagsRaw)) {
            $tags = array_values(array_unique(array_filter(array_map('trim', explode(',', $tagsRaw)))));
        }

        $newPost = [
            'id'            => 'post-' . time() . '-' . bin2hex(random_bytes(3)),
            'title'         => $title,
            'slug'          => generateSlug($title),
            'category'      => $category,
            'categoryLabel' => isset($categoryLabels[$category]) ? $categoryLabels[$category] : ucfirst($category),
            'excerpt'       => $excerpt,
            'content'       => $content,
            'author'        => $author,
            'image'         => $imagePath,
            'tags'          => $tags,
            'date'          => date('Y-m-d'),
            'dateFormatted' => date('F j, Y')
        ];

        $blogs = loadBlogs($blogsFile);
        array_unshift($blogs, $newPost); // Add to beginning
        saveBlogs($blogsFile, $blogs);

        sendResponse(true, 'Blog post published successfully! 🎉', $newPost);
        break;

    // ----- UPDATE POST -----
    case 'update_post':
        if (!isLoggedIn()) {
            sendResponse(false, 'Unauthorized. Please login first.');
        }

        $postId  = isset($_POST['id']) ? sanitizeText($_POST['id']) : '';
        $title   = isset($_POST['title']) ? sanitizeText($_POST['title']) : '';
        $category = isset($_POST['category']) ? sanitizeText($_POST['category']) : '';
        $excerpt = isset($_POST['excerpt']) ? sanitizeText($_POST['excerpt']) : '';
        $content = isset($_POST['content']) ? sanitizeContent($_POST['content']) : '';
        $tagsRaw = isset($_POST['tags']) ? $_POST['tags'] : '';

        if (empty($postId) || empty($title) || empty($category) || empty($content)) {
            sendResponse(false, 'ID, title, category aur content zaroori hai.');
        }

        $categoryLabels = [
            'seo'          => 'SEO',
            'social-media' => 'Social Media',
            'google-ads'   => 'Google Ads',
            'ai-tools'     => 'AI Tools',
            'tips'         => 'Tips & Tricks'
        ];

        $blogs = loadBlogs($blogsFile);
        $found = false;

        foreach ($blogs as &$blog) {
            if ($blog['id'] === $postId) {
                $blog['title']         = $title;
                $blog['slug']          = generateSlug($title);
                $blog['category']      = $category;
                $blog['categoryLabel'] = isset($categoryLabels[$category]) ? $categoryLabels[$category] : ucfirst($category);
                $blog['excerpt']       = $excerpt;
                $blog['content']       = $content;

                // Handle tags
                $tags = [];
                if (!empty($tagsRaw)) {
                    $tags = array_values(array_unique(array_filter(array_map('trim', explode(',', $tagsRaw)))));
                }
                $blog['tags'] = $tags;

                // Handle image update
                if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                    $file = $_FILES['image'];
                    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
                    $finfo = new finfo(FILEINFO_MIME_TYPE);
                    $mimeType = $finfo->file($file['tmp_name']);

                    if (in_array($mimeType, $allowedTypes) && $file['size'] <= 5 * 1024 * 1024) {
                        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
                        if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif'])) $ext = 'jpg';
                        $safeName = 'blog-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
                        $destination = $uploadDir . $safeName;

                        if (move_uploaded_file($file['tmp_name'], $destination)) {
                            // Delete old image
                            if (!empty($blog['image']) && file_exists(__DIR__ . '/' . $blog['image'])) {
                                unlink(__DIR__ . '/' . $blog['image']);
                            }
                            $blog['image'] = 'images/blog/' . $safeName;
                        }
                    }
                }

                $found = true;
                break;
            }
        }
        unset($blog);

        if (!$found) {
            sendResponse(false, 'Post not found.');
        }

        saveBlogs($blogsFile, $blogs);
        sendResponse(true, 'Post updated successfully!');
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

        $blogs = loadBlogs($blogsFile);
        $filtered = [];
        $deleted = false;

        foreach ($blogs as $blog) {
            if ($blog['id'] === $postId) {
                // Delete associated image
                if (!empty($blog['image']) && file_exists(__DIR__ . '/' . $blog['image'])) {
                    unlink(__DIR__ . '/' . $blog['image']);
                }
                $deleted = true;
            } else {
                $filtered[] = $blog;
            }
        }

        if (!$deleted) {
            sendResponse(false, 'Post not found.');
        }

        saveBlogs($blogsFile, $filtered);
        sendResponse(true, 'Post deleted successfully.');
        break;

    default:
        sendResponse(false, 'Invalid action.');
}
?>
