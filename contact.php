<?php
// Handle CORS if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data and sanitize
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $phone = filter_var(trim($_POST["phone"]), FILTER_SANITIZE_STRING);
    $course = filter_var(trim($_POST["course"]), FILTER_SANITIZE_STRING);
    $message = trim($_POST["message"]);

    // Check if required fields are filled out
    if ( empty($name) OR empty($phone) OR empty($course) ) {
        http_response_code(400);
        echo "Please fill out all required fields.";
        exit;
    }

    // Set the recipient email address
    $recipient = "Info@digividyarthi.com";

    // Set the email subject
    $subject = "New Course Inquiry from: $name";

    // Build the email content
    $email_content = "You have received a new inquiry from the Digi Vidyarthi website.\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Interested In: $course\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers
    $email_headers = "From: Website Server <noreply@digividyarthi.com>\r\n";
    $email_headers .= "Reply-To: $name <$recipient>"; // You can't easily reply without their email, so this is just a fallback

    // Send the email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    // Not a POST request
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
