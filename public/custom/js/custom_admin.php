<?php //if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start(); ?>
<?php include_once(__DIR__."/../../../Connections/exsite_admin_login.php");?>
<?php
error_reporting(E_ALL);

// Do not display errors to the user
ini_set('display_errors', '1');

// Enable error logging
ini_set('log_errors', '1');

// Set the path to the error log file in the same directory as this script
$logFilePath = __DIR__ . '/php_error_log.txt';
ini_set('error_log', $logFilePath);

header('Content-type: application/javascript');
ob_start();
include('custom_admin.js');
?>