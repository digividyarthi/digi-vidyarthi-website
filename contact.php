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
$allowedCourses = ['Foundation', 'Advanced', 'Mastery', 'Demo', 'Other'];
if (!in_array($course, $allowedCourses, true)) {
    http_response_code(400);
    echo "Please select a valid course.";
    exit;
}

// Limit message length
$message = mb_substr($message, 0, 2000);
$safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// --- Rate limiting by IP (simple file-based) ---
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = sys_get_temp_dir() . '/dv_contact_' . md5($ip);
$rlCount = file_exists($rlFile) ? (int)file_get_contents($rlFile) : 0;
if ($rlCount >= 5) {
    http_response_code(429);
    echo "Too many submissions. Please try again later.";
    exit;
}
file_put_contents($rlFile, $rlCount + 1);

// --- Send email ---
$recipient = "Info@digividyarthi.com";
$subject = "New Course Inquiry from: $name";

$email_content  = "You have received a new inquiry from the Digi Vidyarthi website.\n\n";
$email_content .= "Name: $name\n";
$email_content .= "Phone: $phoneDigits\n";
$email_content .= "Interested In: $course\n\n";
$email_content .= "Message:\n$message\n";

// Headers — use a verified sender, set proper From and Reply-To
$email_headers  = "From: Digi Vidyarthi Website <noreply@digividyarthi.com>\r\n";
$email_headers .= "Reply-To: $name <info@digividyarthi.com>\r\n";
$email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$email_headers .= "X-Mailer: PHP/" . phpversion();

if (mail($recipient, $subject, $email_content, $email_headers)) {
    http_response_code(200);
    echo "Thank You! Your message has been sent.";
} else {
    error_log('[DigiVidyarthi Contact] Mail send failed from IP: ' . $ip);
    http_response_code(500);
    echo "Oops! Something went wrong and we couldn't send your message.";
}