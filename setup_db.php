<?php
// ===== DATABASE CONFIGURATION =====
$host = 'localhost';
$dbname = 'u138607075_Blog';
$username = 'u138607075_Rishi866';
$password = 'Siri@7394';

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
        dateFormatted VARCHAR(100) NOT NULL
    )";

    $pdo->exec($sql);
    echo "Table 'posts' created successfully. You can now delete this file (setup_db.php) for security.";

} catch (PDOException $e) {
    die("Error creating table: " . $e->getMessage());
}
?>