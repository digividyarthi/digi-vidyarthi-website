<?php
// Handle CORS — restrict to your own domain
$allowed_origin = 'https://digividyarthi.com';
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === $allowed_origin) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
}
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("X-Content-Type-Options: nosniff");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
    exit;
}

// --- Anti-spam: honeypot field ---
$honeypot = isset($_POST["website"]) ? trim($_POST["website"]) : '';
if ($honeypot !== '') {
    http_response_code(200);
    echo "Thank You! Your message has been sent.";
    exit;
}

// --- Sanitize and validate inputs ---
$name    = strip_tags(trim($_POST["name"] ?? ''));
$phone   = trim($_POST["phone"] ?? '');
$course  = trim($_POST["course"] ?? '');
$message = trim($_POST["message"] ?? '');

// Remove line breaks from name to prevent header injection
$name = str_replace(["\r", "\n"], [" ", " "], $name);

// Validate required fields
if (empty($name) || empty($phone) || empty($course)) {
    http_response_code(400);
    echo "Please fill out all required fields.";
    exit;
}

// Validate name (only letters, spaces, common punctuation)
if (mb_strlen($name) > 100 || !preg_match("/^[\p{L}\p{M}\s.\-'&]{2,100}$/u", $name)) {
    http_response_code(400);
    echo "Please enter a valid name.";
    exit;
}

// Validate phone (10 digits, optional +91 prefix)
$phoneDigits = preg_replace('/[^0-9]/', '', $phone);
if (strlen($phoneDigits) < 10 || strlen($phoneDigits) > 13 || !preg_match('/^[6-9][0-9]{9}$/', $phoneDigits)) {
    http_response_code(400);
    echo "Please enter a valid 10-digit phone number.";
    exit;
}

// Validate course selection
$course = strip_tags(trim($_POST["course"] ?? ''));
if (empty($course) || mb_strlen($course) < 2 || mb_strlen($course) > 200) {
    http_response_code(400);
    echo "Please select a valid course or inquiry option.";
    exit;
}

// Limit message length
$message = mb_substr($message, 0, 2000);
$safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// --- Rate limiting by IP (sliding 15 minutes window) ---
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = sys_get_temp_dir() . '/dv_contact_' . md5($ip) . '.json';
$now = time();
$rlData = ['count' => 0, 'time' => $now];
if (file_exists($rlFile)) {
    $parsed = json_decode(@file_get_contents($rlFile), true);
    if (is_array($parsed) && isset($parsed['time']) && ($now - $parsed['time'] < 900)) {
        $rlData = $parsed;
    }
}
if ($rlData['count'] >= 25) {
    http_response_code(429);
    echo "Too many submissions. Please wait a few minutes or call us directly.";
    exit;
}
$rlData['count']++;
@file_put_contents($rlFile, json_encode($rlData));

// --- Save Lead Backup (leads.json) ---
$leadRecord = [
    'name' => $name,
    'phone' => $phoneDigits,
    'email' => strip_tags(trim($_POST["email"] ?? '')),
    'course' => $course,
    'message' => $safeMessage,
    'time' => date("Y-m-d H:i:s"),
    'ip' => $ip
];
$leadsFile = __DIR__ . '/leads.json';
$currentLeads = file_exists($leadsFile) ? json_decode(@file_get_contents($leadsFile), true) : [];
if (!is_array($currentLeads)) $currentLeads = [];
$currentLeads[] = $leadRecord;
@file_put_contents($leadsFile, json_encode($currentLeads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// --- Send email ---
$recipient = "Info@digividyarthi.com";
$isScholarship = ($course === 'Scholarship-25');
$subject = $isScholarship
    ? "🔥 [25% OFF Scholarship Lead] $name ($phoneDigits)"
    : "New Course Inquiry: $course from $name";

$email_content  = "=== NEW LEAD FROM DIGI VIDYARTHI WEBSITE ===\n\n";
if ($isScholarship) {
    $email_content .= "🔥 SPECIAL OFFER: Flat 25% OFF Scholarship Code Claimed!\n";
}
$email_content .= "Student Name    : $name\n";
$email_content .= "Phone / WhatsApp: $phoneDigits\n";
if (!empty($_POST["email"])) {
    $email_content .= "Email Address   : " . strip_tags(trim($_POST["email"])) . "\n";
}
$email_content .= "Course / Program: $course\n";
if (!empty($message)) {
    $email_content .= "Student Message : $message\n";
}
$email_content .= "Submission Time : " . date("d M Y, h:i A") . " IST\n";
$email_content .= "IP Address      : $ip\n";

// Headers — use a verified sender, set proper From and Reply-To
$email_headers  = "From: Digi Vidyarthi Website <noreply@digividyarthi.com>\r\n";
$email_headers .= "Reply-To: $name <info@digividyarthi.com>\r\n";
$email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$email_headers .= "X-Mailer: PHP/" . phpversion();

@mail($recipient, $subject, $email_content, $email_headers);

http_response_code(200);
echo "Thank You! Your message has been sent.";