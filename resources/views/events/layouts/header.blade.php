<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sporteqa :: Sports Management System</title>
    <link href="//fonts.googleapis.com/css?family=Fjalla+One|Montserrat|Yanone+Kaffeesatz" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Orbitron|Passion+One|Russo+One" rel="stylesheet">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/events/assets/fonts/simple-line-icons.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/css/swiper.min.css">
    <link rel="stylesheet" href="/events/assets/css/Simple-Slider.css">
    <link rel="stylesheet" href="/events/assets/css/smoothproducts.css">
    <link rel="stylesheet" href="/events/custom/css/style.css">
    <link rel="stylesheet" href="/events/custom/css/custom.css">
    <!-- Iman add datatables stylesheet - 19062024 -->
    <link rel="stylesheet" type="text/css" href="/events/plugins/datatables/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="/events/plugins/datatables/dataTables.searchHighlight.css"/>
    <link href="{{ asset('events/plugins/animate/animate.css') }}" rel="stylesheet">
    <link href="{{ asset('events/plugins/qtip2/jquery.qtip.min.css') }}" rel="stylesheet">
    <link href="/events/custom/css/jquery.validate.password.css" rel="stylesheet">
    <link href="/events/plugins/noty/lib/noty.css" rel="stylesheet">
    <link href="/events/plugins/uploadifive/uploadifive.css" rel="stylesheet">
    <link href="/events/plugins/blueimp/css/blueimp-gallery.css" rel="stylesheet">
    <link href="{{ asset('events/plugins/slick-1.8.1/slick/slick.css') }}" rel="stylesheet">
    <link href="{{ asset('events/plugins/slick-1.8.1/slick/slick-theme.css') }}" rel="stylesheet">

    <link href="/events/plugins/fontawesome-free-5.3.1-web/css/all.css" rel="stylesheet" >
    <link href="/events/plugins/gijgo/css/gijgo.min.css" rel="stylesheet" >
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.11.1/dist/sweetalert2.min.css">
    
    <script src="/events/custom/js/jquery-3.3.1.min.js" ></script>
    <script src="/events/custom/js/jquery-migrate-3.0.0.min.js" ></script>
    <script src="/events/plugins/jquery-ui-1.12.1/jquery-ui.min.js" ></script>
    <script type="text/javascript">
		jQuery.browser = {};
		(function () {
			jQuery.browser.msie = false;
			jQuery.browser.version = 0;
			if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
				jQuery.browser.msie = true;
				jQuery.browser.version = RegExp.$1;
			}
		})();
	</script>
   <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.11.1/dist/sweetalert2.all.min.js"></script>
	
   <script src="/events/plugins/qtip2/jquery.qtip.min.js"></script>
   <script src="/events/plugins/noty/lib/noty.min.js"></script>
   
     
    <script src="/events/plugins/pace-progress/pace.min.js"></script>
    <script src="/events/plugins/perfect-scrollbar/dist/perfect-scrollbar.min.js"></script>
    <script src="/events/plugins/@coreui/coreui/dist/js/coreui.min.js"></script>
	<?php /*?><link href="plugins/bootstrap-4.0/css/bootstrap.naf.css" rel="stylesheet" type="text/css" /><?php */?>
	<link href="/events/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <script src="/events/plugins/bootstrap-4.0/js/bootstrap.bundle.min.js"></script>
    <!-- Plugins and scripts required by this view-->
    <link href="/events/plugins/bootstrap-dialog/bootstrap-dialog.min.css" rel="stylesheet" type="text/css" />
	<script src="/events/plugins/bootstrap-dialog/bootstrap-dialog.js"></script>
  	<script src="/events/plugins/jquery-validation/jquery.validate.min.js"></script>
    <script src="/events/plugins/jquery-validation/jquery.validate.password.js"></script>
    <script src="/events/plugins/uploadifive/jquery.uploadifive.min.js"></script>
    <script src="/events/plugins/imagesloaded/imagesloaded.pkgd.min.js"></script>  
    <script src="/events/plugins/blueimp/js/jquery.blueimp-gallery.min.js"></script>
    <!-- iman add plugin datatables - 19062024 -->
    <script src="/events/plugins/datatables/datatables.min.js"></script>
    <script src="/events/plugins/datatables/dataTables.searchHighlight.min.js"></script>
    <script src="/events/custom/js/md5.min.js"></script>
    <script src="/events/plugins/slick-1.8.1/slick/slick.min.js"></script>
    <script src="/events/plugins/gijgo/js/gijgo.min.js"></script>
    <script src="/events/custom/js/functions.js?t=<?php echo time();?>"></script>

    <!-- 20200610 - izzat added for google -->
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
    <script src="https://apis.google.com/js/api:client.js"></script>
	<script src="/events/plugins/zxcvbn/dist/zxcvbn.js"></script>
<?php /*?>
    <meta property="og:title" content="<?php echo $row_get_event['spq_event_text'];?>">
	<meta property="og:description" content="<?php echo $row_get_event['spq_event_desc'];?>">
	<meta property="og:image" content="<?php 
						$pos = strpos($row_get_event['spq_event_image'], "http");
						if ($pos === false) {
							$image_url = "//sporteqa.com/userfiles/images/".$row_get_event['spq_event_image'];
							echo $image_url;
						} else {
							$image_url = $row_get_event['spq_event_image'];
							echo $image_url;
						}							 
						?>">
	<?php 
	$image = new FastImage($image_url);
	list($width, $height) = $image->getSize();
	?>					
	<meta property="og:image:width" content="<?php echo $width;?>" />
	<meta property="og:image:height" content="<?php echo $height;?>" />					
	<meta property="og:url" content="//<?php echo $_SERVER['HTTP_HOST'];?><?php echo $_SERVER['REQUEST_URI'];?>">
	<meta property="og:type" content="website">
	<meta property="fb:app_id" content="372273330196435"/>
	
	<meta name="twitter:title" content="<?php echo $row_get_event['spq_event_text'];?>">
	<meta name="twitter:description" content="<?php echo $row_get_event['spq_event_desc'];?>">
	<meta name="twitter:image" content="//sporteqa.com/userfiles/images/<?php echo $row_get_event['spq_event_image'];?>">
	<meta name="twitter:card" content="<?php echo $row_get_event['spq_event_text'];?>">
	
	<script src="//platform-api.sharethis.com/js/sharethis.js#property=5bfca3b11d4aa90011439167&product=inline-share-buttons"></script><?php */?>
	
	<link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon.png?v=ngJML7jdNR">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png?v=ngJML7jdNR">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png?v=ngJML7jdNR">
	<link rel="manifest" href="/favicons/site.webmanifest?v=ngJML7jdNR">
	<link rel="mask-icon" href="/favicons/safari-pinned-tab.svg?v=ngJML7jdNR" color="#5bbad5">
	<link rel="shortcut icon" href="/favicons/favicon.ico?v=ngJML7jdNR">
	<meta name="msapplication-TileColor" content="#00aba9">
	<meta name="msapplication-config" content="/favicons/browserconfig.xml?v=ngJML7jdNR">
	<meta name="theme-color" content="#ffffff">
</head>
<body>
   
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '372273330196435',
      cookie     : true,
      xfbml      : true,
      version    : 'v4.0'
    });
      
    FB.AppEvents.logPageView();   
      
  };
	
	
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
</script>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0&appId=372273330196435&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
    <div class="container"></div>