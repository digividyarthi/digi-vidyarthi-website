<?php
// ===== DATABASE CONFIGURATION (from environment) =====
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    $envLines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($envLines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($k, $v) = explode('=', $line, 2);
            putenv(trim($k) . '=' . trim($v));
        }
    }
}

$host     = getenv('DB_HOST') ?: 'localhost';
$dbname   = getenv('DB_NAME') ?: '';
$username = getenv('DB_USER') ?: '';
$password = getenv('DB_PASS') ?: '';

if (empty($dbname) || empty($username)) {
    die("Error: Database credentials not configured in .env");
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "CREATE TABLE IF NOT EXISTS posts (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        category VARCHAR(100) NOT NULL,
        categoryLabel VARCHAR(100) NOT NULL,
        excerpt TEXT,
        content LONGTEXT NOT NULL,
        author VARCHAR(100) NOT NULL,
        image VARCHAR(255),
        tags TEXT,
        date DATE NOT NULL,
        dateFormatted VARCHAR(100) NOT NULL,
        INDEX idx_slug (slug),
        INDEX idx_date (date),
        INDEX idx_category (category)
    )";

    $pdo->exec($sql);
    echo "Table 'posts' created successfully. DELETE THIS FILE (setup_db.php) NOW FOR SECURITY.";

} catch (PDOException $e) {
    error_log('[DigiVidyarthi setup_db] ' . $e->getMessage());
    die("Error creating table. Check logs.");
}
?>