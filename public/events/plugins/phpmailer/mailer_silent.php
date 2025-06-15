<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
$base_dir = dirname(__FILE__);
//Load Composer's autoloader
require $base_dir.'/../vendor/autoload.php';
include($base_dir.'/../../../Connections/sporteqa_nologin.php');  

mysqli_select_db( $sporteqa, $database_sporteqa);
$query_mailserver = "SELECT * FROM xs_mailserver WHERE isactive = 1";
$mailserver = mysqli_query( $sporteqa, $query_mailserver) or die(mysqli_error($sporteqa));
$row_mailserver = mysqli_fetch_assoc($mailserver);
$totalRows_mailserver = mysqli_num_rows($mailserver);

mysqli_select_db( $sporteqa, $database_sporteqa);  //email settings
$sqlet = "SELECT * FROM  email_templates_details";
$resultet = mysqli_query( $sporteqa, $sqlet) or trigger_error(mysqli_error($sporteqa));
$row_emailMsget = mysqli_fetch_assoc($resultet);

$host=$row_mailserver['mailserver_name'];
$smtpauth=$row_mailserver['mailserver_auth'];
$port=$row_mailserver['mailserver_port'];
$username = $row_mailserver['mailserver_username'];
$password = $row_mailserver['mailserver_password'];
$setfrom = $row_mailserver['mailserver_username'];
$setfromname = $row_mailserver['mailserver_fullname']; 

$site_owner =  $row_emailMsget['site_owner'];
$site_name =  $row_emailMsget['site_name'];
$site_url =  $row_emailMsget['site_url'];


$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = $host;  // Specify main and backup SMTP servers
	if ($smtpauth==true){
		$mail->SMTPAuth = true;     // turn on SMTP authentication
	} else {
		$mail->SMTPAuth = false;     // turn on SMTP authentication
	}                             // Enable SMTP authentication
    $mail->Username = $username;                 // SMTP username
    $mail->Password = $password;                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = $port;                                    // TCP port to connect to

    //Recipients
    $mail->SetFrom($setfrom,$setfromname);
    $mail->addAddress($sendto,$sendto_name);     // Add a recipient
	$mail->addBCC('nikfariz@gmail.com');
/*    $mail->addAddress('ellen@example.com');               // Name is optional
    $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC('cc@example.com');
    $mail->addBCC('bcc@example.com');*/

    //Attachments
	if (isset($attachment) && ($attachment!="")){
		$mail->AddAttachment($attachment);  
	}

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body    = $mess;
    $mail->AltBody = $mess;

    $mail->send();
    //echo 1;
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
?>