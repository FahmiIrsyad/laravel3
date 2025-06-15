<?php 
$base_dir = dirname(__FILE__);
include_once($base_dir.'/class.phpmailer.php'); 
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
/*$setbcc = "hanina@dotdot.com.my";
$setbccname = "Nurul Hanina";*/

if (!function_exists('PHPMailer')) {
    $mail = new PHPMailer();
}

$mail->IsSMTP();                                      // set mailer to use SMTP
$mail->Host = $host;  // specify main and backup server
if ($smtpauth==true){
$mail->SMTPAuth = true;     // turn on SMTP authentication
} else {
$mail->SMTPAuth = false;     // turn on SMTP authentication
}
$mail->Port = $port;
$mail->SMTPSecure = 'none';
$mail->Username = $username;  // SMTP username
$mail->Password = $password; // SMTP password

$mail->SetFrom($setfrom,$setfromname);
?>