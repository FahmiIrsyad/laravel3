var loading = "<i class='fa fa-spinner fa-spin'></i>";
var timestamp = Math.floor(Date.now() / 1000);
function spinner(stats){
	if (stats==1){
		$("#spinner").show();
	} else {
		$("#spinner").hide();
	}
}
function login(url){
	var dialog = BootstrapDialog.show({
		title: "Login or Create Account",
		size: BootstrapDialog.SIZE_NORMAL ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [{
			id: 'view-popup-fb-1',   
			icon: 'fab fa-facebook',       
			label: 'Use Facebook',
			cssClass: 'btn btn-primary float-left animated flash infinite', 
			autospin: false,
			action: function(dialog){    
				login_fb(dialog,url);
			}
		},{
			id: 'login-google',   
			icon: 'fab fa-google',       
			label: 'Google',
			cssClass: 'btn btn-success float-left animated flash infinite', 
			autospin: false,
			action: function(dialog){    
				//login_google(dialog,url);
			}
		}/*,{
			id: 'view-forgot-password',   
			icon: 'fas fa-key',       
			label: 'Forgot Password',
			cssClass: 'btn btn-info float-left', 
			autospin: false,
			action: function(dialog){    
				forgot_password(dialog);
			}
		}*/,{
			id: 'view-popup-close-1',   
			icon: 'fas fa-sign-in-alt',       
			label: 'Login',
			cssClass: 'btn btn-success float-right', 
			autospin: false,
			action: function(dialog){    
				 login_submit(dialog,url);
			}
		}],
		draggable: true,
		closable: true,
		closeByBackdrop: false,
		closeByKeyboard: false,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
			login_by_enter_key(dialog,url);

			// 20200610 - izzat added google function
			var googleUser = {};
			var startApp = function() {
				gapi.load('auth2', function(){
					// Retrieve the singleton for the GoogleAuth library and set up the client.
					auth2 = gapi.auth2.init({
					client_id: '622979235744-0h49if8uqp5feu6ngck9vuaoggb7dar5.apps.googleusercontent.com',
					cookiepolicy: 'single_host_origin',
					// Request scopes in addition to 'profile' and 'email'
					//scope: 'additional_scope'
					});
					sign_in_google(document.getElementById('login-google'),url);
				});
			};
			startApp();
		},
		data: {
			'pageToLoad': '/events/login.php?url='+url+'&t='+timestamp
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function login_by_enter_key(dialog,url){
	$('.modal-content').keypress(function(e){
    if(e.which == 13) {
      //dosomething
      login_submit(dialog,url);
    }
  })
}
function sign_up(url){
	var dialog = BootstrapDialog.show({
		title: "Sign Up",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		
		buttons: [{
			id: 'view-popup-close-1',   
			icon: 'fas fa-times-circle',       
			label: 'Close',
			cssClass: 'btn btn-danger float-left', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fas fa-sign-in-alt',       
			label: 'Register',
			cssClass: 'btn btn-success float-right', 
			autospin: false,
			action: function(dialog){    
				 register(dialog,url);
			}
		}],
		draggable: true,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '/events/sign_up.php'
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function register(dialog,url){
	var query = $("#register_form").serializeArray(), json={};
	var email = $("#register_form #email").val();
	if (validate_email(email)==1){ // email is valid
		if (validate_email_duplicate(email)==0){ // never registered before
			$("#action").load("/events/register.php", query, function(data){
				if (data>0){
					Swal("Registration Successful","Please check your email for registration confirmation. Be sure to check your spambox too!","success");
					dialog.close();
				}
			});
		} else {
			Swal("You Have Registered Before lah!","We know that you're kinda excited to join our events, but looking at the credentials you've put in, we found that you've registered with us before. So, either use a different email address or just login with the email address that you've registered with us","info");
		}
	} else {
		Swal("Email Not Valid","Please enter a valid email address. You must enter a valid and active email address so that we can communicate with you.","error");
	}
	
}
function login_submit(dialog,url){
	var query = $("#login_form").serializeArray(), json={};
	$("#action").load("/events/login_submit.php", query, function(data){
		var resp = JSON.parse(data);
		if (resp.data==1){
			$("#login_span").html('<span class="badge badge-primary pt-1"><a class="nav-link" href="/events/profile.php">'+resp.fullname+'</a></span>');
			$("#signup_span").html('<span class="badge badge-danger ml-1"> <a class="nav-link" href="javascript:logout();"><i class="fas fa-sign-in-alt"></i> LOGOUT</a></span>');
			
			dialog.close();
			
			if (url!=""){
				var timestamp = Math.floor(Date.now() / 1000);
				location.href=url;//+"&_timestamp="+timestamp;
			}
		} else if (resp.data==0){
			Swal("Login Failed","Please enter the correct username and password","error");
		}
	})
}
function logout(){

	$("#action").load("/events/logout.php",  function(data){
			$("#login_span").html('<a class="nav-link text-dark" href="javascript:login();">LOGIN</a></span>');
			$("#signup_span").html('<a class="nav-link" href="javascript:sign_up();">SIGN UP</a>');
			location.href='/events/index.php';

	})
}
function join_event(id){
	var timestamp = Math.floor(Date.now() / 1000);
	location.href='/events/join_event.php?id='+id+"&timestamp="+timestamp;
	/*// check if user has logged in.. if not, must login first or sign up
	
	if (check_login()==1){
		location.href='/events/join_event.php?id='+id+"&timestamp="+timestamp;
	} else {
		login('/events/join_event.php?id='+id+"&timestamp="+timestamp);
	}*/
}
function join_event_ext(ext_url){
	location.href=ext_url;
}
function check_login(){

	var return_value = $.ajax({
	url: '/events/check_login.php',
	async: false
	}).responseText;
	var resp = JSON.parse(return_value);
	return resp.data;
}
function check_email(email){
var return_value = $.ajax({
	url: '/events/check_email.php',
	data: {"email":email},
	async: false
	}).responseText;
	var resp = JSON.parse(return_value);
	return resp;
}
function send_email(query){
	var return_value = $.ajax({
	url: '/events/send_email.php',
	data: query,
	async: false,
	method: 'post',
	success: function(){
		Swal.close();
	}
	}).responseText;

}
function validate_email_duplicate(email){
	var return_value = $.ajax({
	url: '/events/validate_email_duplicate.php',
	data: {"email":email},
	async: false
	}).responseText;
	return return_value;
}
function validate_email(email){
	var return_value = $.ajax({
		url: '/events/mailgunner_validate.php',
		data: {"email":email},
		async: false
		}).responseText;
	return return_value;
}
function validate_email_alert(email){
	if (validate_email(email)=="1"){
	} else {
		Swal("Email Not Valid","It seems that you've entered an invalid email. Please check and try again","error");
	}
}
function hash_pd(order_id, amount, detail){
	var return_value = $.ajax({
	url: '/events/hash_pd.php',
	data: {"order_id":order_id,"amount":amount,"detail":detail},
	async: false
	}).responseText;
	return return_value;
}
function hash_senangpay(order_id, amount, detail){
	var return_value = $.ajax({
	url: '/events/hash_senangpay.php',
	data: {"order_id":order_id,"amount":amount,"detail":detail},
	async: false
	}).responseText;
	return return_value;
}
function join_event_submit_check(t){
	// this function checks for file_selected value. .if its 1, then upload first, then submit
	var file_selected = $("#file_selected").val();
	if (file_selected == 1){
		$('#file_upload').uploadifive("upload");
	} else {
		join_event_submit(t)
	}
	
}
function join_event_submit(t){
	if (check_login()==1){
		
		spinner(1);$("#register_button").attr("disabled","true");
		//must make sure user is logged in or create new account
		Swal.fire({
		  title: 'Please Wait For A While',
		  html: 'We are registering your particulars and sending out a nice email for you. Please check your mailbox. (Do check your spambox too!)',
		  icon: 'success'
		});
		
		var query = $("#join_event_form").serializeArray(), json={};
		query.push({"name":"timestamp","value":t});
		var event_id = $("#join_event_form #spq_event_id").val();
		$("#action").load("join_event_submit_pd.php", query, function(data){
			
			
		
			
			var resp = JSON.parse(data);
			var regid = resp.registration_id;
			var complete_url = resp.complete_url;
			query.push({name:"registration_id", value: regid});
			send_email(query);
			if (regid>0){
				location.href=complete_url+"?id="+resp.event_id+"&registration_id="+regid+"&user_id="+resp.event_user_id;
			} else if (regid==0){
				Swal("Registration Not Successful","Your registration is not successful","error");
			}
		})
	} else {
		//login('join_event.php?id='+id+"&timestamp="+timestamp);
		//login_register_event();
		
		// allow registration without logging in. System will create an account for user
		spinner(1);$("#register_button").attr("disabled","true");
		//must make sure user is logged in or create new account
		Swal.fire({
		  title: 'Processing Your Registration',
		  html: 'We are registering your particulars and sending out a nice email for you. Please check your mailbox. <div><strong>(Do check your spambox too!)</strong></div>',
		  icon: 'success'
		});
		
		var query = $("#join_event_form").serializeArray(), json={};
		var event_id = $("#join_event_form #spq_event_id").val();
		$("#action").load("sign_up_submit.php", query, function(data){
			$("#spq_event_user_id").val(data);
			var newid = data;
			query.push({name:"spq_event_user_id", value: newid});
			$("#action2").load("join_event_submit_pd.php", query, function(data){
				var resp = JSON.parse(data);
				var regid = resp.registration_id;
				var complete_url = resp.complete_url;
				query.push({name:"registration_id", value: regid});
				
				send_email(query);
				if (regid>0){
					location.href=complete_url+"?id="+resp.event_id+"&registration_id="+regid+"&user_id="+resp.event_user_id;
				} else if (regid==0){
					Swal("Registration Not Successful","Your registration is not successful","error");
				}
			})
		})
	}
	
	
}
function login_register_event(){
	var dialog = BootstrapDialog.show({
		title: "Login",
		size: BootstrapDialog.SIZE_NORMAL ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [{
			id: 'view-popup-close-1',   
			icon: 'fas fa-times-circle',       
			label: 'Close',
			cssClass: 'btn btn-danger float-left', 
			autospin: false,
			action: function(dialog){    
				login_fb_nourl(dialog);
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fas fa-sign-in-alt',       
			label: 'Login',
			cssClass: 'btn btn-success float-right', 
			autospin: false,
			action: function(dialog){    
				 login_submit_register_event(dialog);
			}
		}],
		draggable: true,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		onhidden: function(){
			
			spinner(0);$("#register_button").removeAttr("disabled");
		},
		data: {
			'pageToLoad': '/events/login.php'
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}

function login_submit_register_event(dialog){
	var query = $("#login_form").serializeArray(), json={};
	$("#action").load("/events/login_submit.php", query, function(data){
		var resp = JSON.parse(data);
		if (resp.data==1){
			$("#spq_event_user_id").val(resp.user_id);//alert(resp.user_id);
			$("#login_span").html('<span class="badge badge-primary pt-1"><a class="nav-link" href="javascript:profile('+resp.user_id+');">'+resp.fullname+'</a></span>');
			$("#signup_span").html('<span class="badge badge-danger ml-1"> <a class="nav-link" href="javascript:logout();"><i class="fas fa-sign-in-alt"></i> LOGOUT</a></span>');
			
			dialog.close();
			join_event_submit();
			
		} else if (resp.data==0){
			Swal("Login Failed","Please enter the correct username and password","error");
		}
	})
}
function confirm_payment(){
	var query = $("#event_payment_form").serializeArray(), json={};
	var event_id = $("#event_payment_form #spq_event_id").val();
	var s = $("#event_payment_form #s").val();
	var d = $("#event_payment_form #detail").val(); 
	var a = $("#event_payment_form #amount").val();
	//alert($("#event_payment_form #order_id").val());
	
	$("#action").load("/events/event_payment.php", query, function(data){
		// if data == 1, then proceed to payment gateway. otherwise, update orderid with value given and then baru proceed to payment gateway
		if (data==1){
			$("#event_payment_form").attr("action","https://www.Qlicknpay.com/merchant/api/v1/receiver");
			$("#event_payment_form").submit();
		} else {
			//alert(data);
			$.when(reorder_id(data,d,a)).done(function(){
				$("#event_payment_form").attr("action","https://www.Qlicknpay.com/merchant/api/v1/receiver");
				$("#event_payment_form").submit();
				//alert(data);
			});
		}
		
		 
	})
}


function urldecode(url) {
  return decodeURIComponent(url.replace(/\+/g, ' '));
}
function reorder_id(data,d,a){
	var hash = hash_pd(data, a, d);

	$("#event_payment_form #order_id").val(data);
	$("#event_payment_form #invoice").val(data);
	$("#event_payment_form #hash").val(hash);
	//$("#hash").val(hash);

	
}
function reorder_id_senangpay(data,d,a){
	var hash = hash_senangpay(data, a, d);

	$("#event_payment_form #order_id").val(data);
	$("#event_payment_form #invoice").val(data);
	$("#event_payment_form #hash").val(hash);
	//$("#hash").val(hash);

	
}
function check_all_fields(form_name){
	
	var isFormValid = true;

	$(form_name+" .required").each(function(){

		if ($.trim($(this).val()).length == 0){
			$(this).addClass("btn-warning");
			isFormValid = false;
			$(this).focus();
		} else {
        	$(this).removeClass("btn-warning");
    	}
	});

	if (!isFormValid) { 
		Swal("Please Enter All Fields","You need to enter details of all members","error");
	}

  return isFormValid;
}
function team_member_add_submit_check(t){
	
	var file_selected = $("#file_selected").val();
	if (file_selected == 1) {
		$('#file_upload').uploadifive("upload")
	} else {
		team_member_add_submit(t)
	}
	
	
	
	
}
function team_member_add_submit(t){
// check if any data is entered. if no, Swal it!
	if (check_all_fields("#team_member_add_form")){
		var query = $("#team_member_add_form").serializeArray(), json={};
		var event_id = $("#team_member_add_form #spq_event_id").val();
		var registration_id = $("#team_member_add_form #spq_event_registration_id").val();
		query.push({"name":"t","value":t});
		$("#action").load("team_member_add_submit.php", query, function(data){
			var resp = JSON.parse(data);
			if (resp.new_team_member_id>0){
				$("#form_event_step2_div").load("/events/form_event_step2.php", {"spq_event_id":event_id,"spq_event_registration_id":registration_id}, function(){
					$('#team_member_add_form')[0].reset();
				});
			} else if (resp.new_team_member_id==-1){
				Swal("Maximum Members Reached","You have reached the maximum allowable number of members in your team. Please delete other team members if you need to another team member","error");
			} else if (resp.new_team_member_id==-2){
				Swal("This Registration Is Restricted","Please contact organizer for more info","error");
			}
		})
	}
}
function team_member_edit_submit_check(team_member_id){
	
	var file_selected = $("#file_selected").val();
	if (file_selected == 1) {
		$('#file_upload').uploadifive("upload")
	} else {
		team_member_edit_submit(team_member_id)
	}
	
	
	
	
}
function team_member_edit_submit(team_member_id){
// check if any data is entered. if no, Swal it!
	if (check_all_fields("#team_member_edit_form")){
		var query = $("#team_member_edit_form").serializeArray(), json={};
		var event_id = $("#team_member_edit_form #spq_event_id").val();
		var registration_id = $("#team_member_edit_form #spq_event_registration_id").val();
		query.push({"name":"team_member_id","value":team_member_id});
		$("#action").load("team_member_edit_submit.php", query, function(data){
			var resp = JSON.parse(data);
			//console.log(resp);
			if (resp.team_member_id>0){
				$("#form_event_step2_div").load("/events/form_event_step2.php", {"spq_event_id":event_id,"spq_event_registration_id":registration_id}, function(){
					
				});
			} else if (resp.team_member_id==-1){
				Swal("Maximum Members Reached","You have reached the maximum allowable number of members in your team. Please delete other team members if you need to another team member","error");
			} else if (resp.team_member_id==-2){
				Swal("This Registration Is Restricted","Please contact organizer for more info","error");
			}
		})
	}
}
function cancel_team_member_edit(spq_event_registration_id, spq_event_id){
	$("#form_event_step2_div").load("form_event_step2.php", {"spq_event_registration_id":spq_event_registration_id, "spq_event_id":spq_event_id}, function(){});
}
function delete_team_member(team_member_id,spq_event_id,registration_id){
	
	Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.value) {
					$("#form_event_step2_div").load("/events/form_event_step2.php", 	{"delete_action":1,"team_member_id":team_member_id,"spq_event_id":spq_event_id,"spq_event_registration_id":registration_id}, function(data){

					Swal.fire("Data Deleted","You have successfully deleted the data. You can add them again anyway","success");
					$("#part_2_div").fadeIn();
				$('#team_member_add_form')[0].reset();

			})
		  }
		})


	
}
function update_team_member(team_member_id,spq_event_id,registration_id){
	
	$("#form_event_step2_div").load("form_event_step2.php", {"team_member_id":team_member_id,"spq_event_id":spq_event_id,"registration_id":registration_id,"spq_event_registration_id":registration_id,"MM_edit":1}, function(){});


	
}
function popup_detail(url){
	var dialog = BootstrapDialog.show({
		title: "Detail",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [{
			id: 'view-popup-close-1',   
			icon: 'fas fa-times-circle',       
			label: 'Close',
			cssClass: 'btn btn-danger float-left', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '/events/popup_detail.php?url='+escape(url)
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function update_fee(form_id,fee){
	var total_fee = number_format(fee,2,'.', '');
	var total_fee_comma = number_format(fee,2,'.', ',');
	$("#fee").html("<h1>RM"+total_fee_comma+"</h1>");
	$("#amount").val(total_fee);
	$("#select_category").html("Category Selected");
}
function print_form(reg_id){
	window.open("/events/form_a_new.php?reg_id="+reg_id,"Registration Form");
}
function print_custom_form(url,reg_id){
	var full_url = url.replace('#reg_id#',reg_id);
	window.open(full_url,"Custom Form");
}
function number_format(number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
function credit_card(){
	// this is for senangpay. must rehash
	var hash = senangpay_hash();
		$("#event_payment_form #hash").val(hash)
		confirm_payment_senangpay();
	
}
function senangpay_hash(){
	var query = $("#event_payment_form").serializeArray(), json={};
	var return_value = $.ajax({
		url: '/events/senangpay_hash.php',
		data: query,
		async: false
		}).responseText;
	return return_value;
}
function confirm_payment_senangpay(){
	var query = $("#event_payment_form").serializeArray(), json={};
	var event_id = $("#event_payment_form #spq_event_id").val();
	var s = $("#event_payment_form #s").val();
	var d = $("#event_payment_form #detail").val(); 
	var a = $("#event_payment_form #amount").val();
	//alert($("#event_payment_form #order_id").val());
	
	$("#action").load("/events/event_payment.php", query, function(data){
		// if data == 1, then proceed to payment gateway. otherwise, update orderid with value given and then baru proceed to payment gateway
		if (data==1){
			$("#event_payment_form").attr("action","https://app.senangpay.my/payment/397151598973087");
			$("#event_payment_form").submit();
		} else {
			//alert(data);
			$.when(reorder_id_senangpay(data,d,a)).done(function(){
				$("#event_payment_form").attr("action","https://app.senangpay.my/payment/397151598973087");
				$("#event_payment_form").submit();
				//alert(data);
			});
		}
		
		 
	})
}
function profile(user_id){
	location.href="/events/profile.php";
}
function popup(url){
	var dialog = BootstrapDialog.show({
		title: "View Detail",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [{
			id: 'view-popup-close-2',   
			icon: 'fas fa-times-circle',       
			label: 'Close',
			cssClass: 'btn btn-danger float-left', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': url
		}
	});
}

function view_submission(reg_data_id){
	var dialog = BootstrapDialog.show({
		title: "View Submission",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [{
			id: 'view-popup-close-1',   
			icon: 'fas fa-times-circle',       
			label: 'Close',
			cssClass: 'btn btn-danger float-left', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '/events/registration_data.php?reg_data_id='+reg_data_id
		}
	});
}
function reload_data(reg_id,max_km){
		$("#running_data").load("/events/running_data.php?reg_id="+reg_id+"&max_km="+max_km);
}
	
function datepicker_once(where){
	$(where).datepicker({
	uiLibrary: 'bootstrap4',
	iconsLibrary: 'fontawesome',
	format: 'yyyy-mm-dd'
  });
}
function delete_submission(reg_id,reg_data_id){
	Swal({
	  title: 'Are you sure?',
	  text: "You won't be able to revert this!",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
	  if (result.value) {
		  $("#running_data").load("/events/running_data.php?reg_id="+reg_data_id,{"delete":1,"reg_data_id":reg_data_id}, function(){
			  reload_data(reg_id);
			  /*Swal(
				  'Deleted!',
				  'Your data has been deleted.',
				  'success'
				)*/
		  });
		
	  }
	})
}
	
function update_profile(){
	var dialog = BootstrapDialog.show({
		title: "Update My Profile",
		size: BootstrapDialog.SIZE_WIDE,
		spinicon: 'fa fa-spinner',
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [{
			id: 'view-popup-close-update-profile',   
			icon: 'fas fa-times-circle',       
			label: 'Close',
			cssClass: 'btn btn-danger float-left', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		},{
			id: 'view-popup-submit-update-profile',   
			icon: 'fas fa-check-square',       
			label: 'Update My Profile',
			cssClass: 'btn btn-primary float-right', 
			autospin: true,
			action: function(dialog){    
				 update_profile_submit(dialog);
			}
		},{
			id: 'view-change-password',   
			icon: 'fas fa-lock',       
			label: 'Change My Password',
			cssClass: 'btn btn-info float-left', 
			autospin: false,
			action: function(dialog){    
				 change_password();
			}
		}],
		draggable: true,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '/events/update_profile.php'
		}
	});
}
function change_password(){
	var dialog = BootstrapDialog.show({
		title: "Change Password",
		size: BootstrapDialog.SIZE_NORMAL,
		spinicon: 'fa fa-spinner',
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [{
			id: 'view-close-change-password',   
			icon: 'fas fa-times-circle',       
			label: 'Close',
			cssClass: 'btn btn-danger float-left', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		},{
			id: 'view-popup-change-password',   
			icon: 'fas fa-check-square',       
			label: 'Change Password',
			cssClass: 'btn btn-primary float-right', 
			autospin: true,
			action: function(dialog){    
				 update_password_submit(dialog);
			}
		}],
		draggable: true,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
			
			 $('#spq_password_1').strengthMeter('progressBar', {
            	container: $('#password-strength-meter-1')
			});
			$('#spq_password_2').strengthMeter('progressBar', {
				container: $('#password-strength-meter-2')
			});
		},
		data: {
			'pageToLoad': '/events/change_password.php'
		}
	});
}
function forgot_password(){
	var dialog = BootstrapDialog.show({
		title: "Forgot Password",
		size: BootstrapDialog.SIZE_NORMAL,
		spinicon: 'fa fa-spinner',
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [{
			id: 'view-close-change-password',   
			icon: 'fas fa-times-circle',       
			label: 'Close',
			cssClass: 'btn btn-danger float-left', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		},{
			id: 'view-popup-change-password',   
			icon: 'fas fa-check-square',       
			label: 'Retrieve Password',
			cssClass: 'btn btn-primary float-right', 
			autospin: true,
			action: function(dialog){    
				 forgot_password_submit(dialog);
			}
		}],
		draggable: true,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
			
			$('#spq_password_1').strengthMeter('progressBar', {
            	container: $('#password-strength-meter-1')
			});
			$('#spq_password_2').strengthMeter('progressBar', {
				container: $('#password-strength-meter-2')
			});
		},
		data: {
			'pageToLoad': '/events/forgot_password.php'
		}
	});
}
function forgot_password_submit(dialog){
	// check email validity (exists, correct format)
	var query = $("#forgot_password_form").serializeArray(), json={};
	var pwd_email = $("#forgot_password_email").val();
	var result = check_email(pwd_email);
	if (result.data==1){
		forgot_password_retrieve(pwd_email,dialog);
	} else if (result.data==0){
		Swal("Oh Shoot!","We tried to search high and low but couldn't find this email address. Are you sure?","error");
	}
	
}
function forgot_password_retrieve(pwd_email,dialog){
	$.ajax({
		url: '/events/forgot_password_retrieve.php',
		data: {"pwd_email":pwd_email},
		method: "POST",
		async: false,
		success: function(){
			
			Swal({
				  title: 'Password Retrieval Instruction Sent',
				  html: 'Please check your email for the instruction to change your password',
				  timer: 10000,
				  onBeforeOpen: () => {
					Swal.showLoading()
					timerInterval = setInterval(() => {
					  Swal.getContent().querySelector('strong')
						.textContent = Swal.getTimerLeft()
					}, 100)
				  },
				  onClose: () => {
					clearInterval(timerInterval)
				  }
				}).then((result) => {
				  if (
					// Read more about handling dismissals
					(result.dismiss === Swal.DismissReason.timer) || (result.dismiss === Swal.DismissReason.close)
				  ) {
					dialog.close();
				  }
				})
			


		}
	});
}
function update_profile_submit(dialog){
	var query = $("#update_profile_form").serializeArray(), json={};
	$.ajax({
		url: '/events/update_profile_submit.php',
		data: query,
		method: "POST",
		async: false,
		success: function(){
			Swal("Profile Info Changed","Yes. It was changed. No doubt about it..","success");
			dialog.close();
			location.href='/events/profile.php';
		}
	});
}
function update_password_submit(dialog){
	var progress_val = ($("#password-strength-meter-1 .progress-bar").attr("area-valuenow"));//alert(progress_val);
	var spq_password_1 = $("#spq_password_1").val();
	var spq_password_2 = $("#spq_password_2").val();
	var spq_user_id = $("#spq_user_id").val();

		if (spq_password_1 == spq_password_2){
			if (progress_val>50) {
				$.ajax({
					url: '/events/update_password_submit.php',
					data: {"spq_password":spq_password_1, "spq_user_id":spq_user_id},
					async: false,
					method: "POST",
					success: function(){
						Swal("Password Changed","Please use this new password at your next login","success");
						dialog.close();
					}
					});
			}  else {
				Swal("Password Not Strong Enough","Please change your password to a strong one.","error");
			}
		} else {
			Swal("Password Not The Same","Really. If you want to change things around, you've got to make it sync!","error");
		}
	
}


function register(dialog,url){
	var query = $("#register_form").serializeArray(), json={};
	var email = $("#register_form #email").val();
	if (validate_email(email)==1){ // email is valid
		if (validate_email_duplicate(email)==0){ // never registered before
			$("#action").load("/events/register.php", query, function(data){
				if (data>0){
					Swal("Registration Successful","Please check your email for registration confirmation. Be sure to check your spambox too!","success");
					dialog.close();
				}
			});
		} else {
			Swal("You Have Registered Before lah!","We know that you're kinda excited to join our events, but looking at the credentials you've put in, we found that you've registered with us before. So, either use a different email address or just login with the email address that you've registered with us","info");
		}
	} else {
		Swal("Email Not Valid","Please enter a valid email address. You must enter a valid and active email address so that we can communicate with you.","error");
	}
	
}

function reset_password_submit(){
	var progress_val = ($("#password-strength-meter-1 .progress-bar").attr("area-valuenow"));//alert(progress_val);
	var spq_password_1 = $("#spq_password_1").val();
	var spq_password_2 = $("#spq_password_2").val();
	var spq_user_id = $("#spq_user_id").val();

		if (spq_password_1 == spq_password_2){
			if (progress_val>50) {
				$.ajax({
					url: '/events/reset_password_submit.php',
					data: {"spq_password":spq_password_1, "spq_user_id":spq_user_id},
					async: false,
					method: "POST",
					success: function(){
						Swal({
						  title: 'Password Changed',
						  text: "Please login using your new password. Try not to forget your password ok?",
						  icon: 'success',
						  showCancelButton: false,
						  confirmButtonColor: '#3085d6',
						 
						  confirmButtonText: 'OK lah!'
						}).then((result) => {
						  if (result.value) {
							login('/events/profile.php?');
						  }
						})
					}
					});
			}  else {
				Swal("Password Not Strong Enough","Please change your password to a strong one.","error");
			}
		} else {
			Swal("Password Not The Same","Really. If you want to change things around, you've got to make it sync!","error");
		}
	
}
function remove_dash(val){
	return val.replace(/-/g, "");

}
function remove_space(val){
	return val.replace(/\s/g, "");

}

/* *************************  */
function create_your_event_submit(){
	// check for user id session. if not exist, popup login()
	var user_id = $("#spq_event_user_id").val();
	if (user_id==""){
		login_create();
	} else {
		var query = $("#create_your_event_form").serializeArray(), json={};
		$("#action").load("create_your_event_submit.php", query, function(data){
			location.href='create_event_step_2.php?event_id='+data;
		})
	}
	
}

function login_create(){
	var dialog = BootstrapDialog.show({
		title: "Login",
		size: BootstrapDialog.SIZE_NORMAL ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [/*{
			id: 'view-popup-close-1',   
			icon: 'fas fa-times-circle',       
			label: 'Close',
			cssClass: 'btn btn-danger float-left', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		},*/{
			id: 'view-forgot-password',   
			icon: 'fas fa-key',       
			label: 'Forgot Password',
			cssClass: 'btn btn-info float-left', 
			autospin: false,
			action: function(dialog){    
				forgot_password_create(dialog);
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fas fa-sign-in-alt',       
			label: 'Login',
			cssClass: 'btn btn-success float-right', 
			autospin: false,
			action: function(dialog){    
				 login_submit_create(dialog);
			}
		}],
		draggable: true,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
			login_by_enter_key_create(dialog);
		},
		data: {
			'pageToLoad': '/events/login.php'
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}

function login_by_enter_key_create(dialog){
	$('.modal-content').keypress(function(e){
    if(e.which == 13) {
      login_submit_create(dialog);
    }
  })
}

function login_submit_create(dialog){
	var query = $("#login_form").serializeArray(), json={};
	$("#action").load("/events/login_submit.php", query, function(data){
		var resp = JSON.parse(data);
		if (resp.data==1){
			$("#login_span").html('<span class="badge badge-primary pt-1"><a class="nav-link text-white" href="/events/profile.php">'+resp.fullname+'</a></span>');
			$("#signup_span").html('<span class="badge badge-danger ml-1"> <a class="nav-link text-white" href="javascript:logout();"><i class="fas fa-sign-in-alt"></i> LOGOUT</a></span>');
			$("#spq_event_user_id").val(resp.user_id);
			dialog.close();
			
			
		} else if (resp.data==0){
			Swal("Login Failed","Please enter the correct username and password","error");
		}
	})
}
/* *************************  */
function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

function login_fb(dialog,url){
		FB.login(function(response) {
		  if (response.status === 'connected') {
			// Logged into your app and Facebook.
			  FB.api('/me?fields=id,name,email,picture', function(response) {
				  var name = response.name;
				  var email = response.email;
				  var fb_id	= response.id;
				  var picture	= response.picture.data.url;
				  
				  // register in spq_user and refresh header
				  // also populate spq_id with newly created user_id
				  $("#action").load("check_user.php", {"name":name,"email":email,"fb_id":fb_id,"picture":picture}, function(data){
					var resp = JSON.parse(data);
					if (resp.data==1){ // user already exist
						$("#login_span").html('<img src="'+picture+'"> <span class="badge badge-primary pt-1"><a class="nav-link" href="profile.php">'+resp.fullname+'</a></span>');
						$("#signup_span").html('<span class="badge badge-danger ml-1"> <a class="nav-link" href="javascript:logout();"><i class="fas fa-sign-in-alt"></i> LOGOUT</a></span>');
						$("#spq_event_user_id").val(resp.user_id);
						
						if (resp.newuser==1){
							$("#action_email").load("send_email_new.php",{"email":email,"name":name}, function(){
								dialog.close();
							})
						} else {
							if (url!=""){
								dialog.close();
								var timestamp = Math.floor(Date.now() / 1000)
								location.href=url;//+"?&_timestamp="+timestamp;
							}
						}
						

						
					} else if (resp.data==0){
						Swal("Login Failed","Please enter the correct username and password","error");
					}
				})
				  
		
			  });
		  } else {
			// Not logged to FB and need to sign up
			Swal("Not Connected","You are not connected to facebook. Please sign up using the normal way","error");
		  }
		},{scope:'email'});
	}

function login_fb_nourl(dialog){
		FB.login(function(response) {
		  if (response.status === 'connected') {
			// Logged into your app and Facebook.
			  FB.api('/me?fields=id,name,email,birthday', function(response) {
				  var name = response.name;
				  var email = response.email;
				  var fb_id	= response.id;
				  
				  var picture	= response.picture.data.url;
				  
				  // register in spq_user and refresh header
				  // also populate spq_id with newly created user_id
				  $("#action").load("check_user.php", {"name":name,"email":email,"fb_id":fb_id,"picture":picture}, function(data){
					var resp = JSON.parse(data);
					if (resp.data==1){ // user already exist
						$("#login_span").html('<img src="'+picture+'"> <span class="badge badge-primary pt-1"><a class="nav-link" href="profile.php">'+resp.fullname+'</a></span>');
						$("#signup_span").html('<span class="badge badge-danger ml-1"> <a class="nav-link" href="javascript:logout();"><i class="fas fa-sign-in-alt"></i> LOGOUT</a></span>');
						$("#spq_event_user_id").val(resp.user_id);
						dialog.close();
						join_event_submit();
						
					} else if (resp.data==0){
						Swal("Login Failed","Please enter the correct username and password","error");
					}
				})
				  
		
			  });
		  } else {
			// Not logged to FB and need to sign up
			Swal("Not Connected","You are not connected to facebook. Please sign up using the normal way","error");
		  }
		},{scope:'email'});
	}

	// 20200610 - izzat added google function
	function sign_in_google(element,url) {
		console.log(element.id);
		auth2.attachClickHandler(element, {},
			function(googleUser) {
	
				var profile = googleUser.getBasicProfile();
	
				var name = profile.getName();
				var email = profile.getEmail();
				var username = profile.getEmail();
				var google_id = profile.getId();
				var picture = profile.getImageUrl();
			
				$("#action").load("check_user_google.php", {"name":name,"email":email,"google_id":google_id,"picture":picture}, function(data){
					var resp = JSON.parse(data);
					if (resp.data==1){ // user already exist
						if (url!=""){
							var timestamp = Math.floor(Date.now() / 1000);
							
							location.href=url;
						} else {
							$("#login_span").html('<img src="'+picture+'"> <span class="badge badge-primary pt-1"><a class="nav-link" href="profile.php">'+resp.fullname+'</a></span>');
							$("#signup_span").html('<span class="badge badge-danger ml-1"> <a class="nav-link" href="javascript:logout();"><i class="fas fa-sign-in-alt"></i> LOGOUT</a></span>');
							$("#spq_event_user_id").val(resp.user_id);
							dialog.close();

							if (resp.newuser==1){
								$("#action_email").load("send_email_new.php",{"email":email,"name":name}, function(){
									dialog.close();
								})
							}
						}
					} else if (resp.data==0){
						Swal.fire("Login Failed","Please enter the correct username and password","error");
					}
				})
			}, function(error) {
			  	//alert(JSON.stringify(error, undefined, 2));
				// Not logged to Google and need to sign up
				Swal("Not Connected","You are not connected to Google. Please sign up using the normal way","error");
			});
		
	}

function lihat_dokumen(file_id){
	var dialog = BootstrapDialog.show({
		title: "View Document",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [{
			id: 'view-popup-close-1',   
			icon: 'fas fa-times-circle',       
			label: 'Close',
			cssClass: 'btn btn-danger float-left', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '/events/iframe.php?file_id='+file_id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function lihat_image(file_id){
	var dialog = BootstrapDialog.show({
		title: "View Image",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [{
			id: 'view-popup-close-1',   
			icon: 'fas fa-times-circle',       
			label: 'Close',
			cssClass: 'btn btn-danger float-left', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '/events/image.php?file_id='+file_id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}


function login_user(url) {
  var dialog = BootstrapDialog.show({
    title: "User Login",
    size: BootstrapDialog.SIZE_WIDE,
    closable: false,
    spinicon: 'far fa-snowflake',
    message: function (dialog) {
      var $message = $('<div></div>');
      var pageToLoad = dialog.getData('pageToLoad');
      $message.load(pageToLoad);
      return $message;
    },
    buttons: [{
      id: 'view-popup-close',
      icon: 'fa fa-times-circle',
      label: 'Close',
      cssClass: 'btn-danger btn-sm float-left',
      autospin: true,
      action: function (dialog) {
        dialog.close();
      }
    }, {
      id: 'view-popup-login',
      icon: 'fa fa-check-square',
      label: 'Login',
      cssClass: 'btn-primary btn-sm float-right',
      autospin: true,
      action: function (dialog) {
        login_user_submit(url);
      }
    }],
    draggable: true,
    onshow: function (dialog) {
  
    },
    onshown: function () {
      $("#btn-popup-fullscreen").show();
      $("#btn-popup-widescreen").hide();
      $('.modal-content').css('margin', '5px 0');
    },
    data: {
      'pageToLoad': 'login_user.php'
    }
  });
  //dialog.getModalHeader().css('background-color', bgcolor);
}
function login_user_submit(u){
    var q = $("#login_form").serializeArray(), json={};
    $.ajax({
        url: 'login_user_submit.php',
        data: q,
        type: 'post',
        async: false,
        success: function(response) {
            // Handle the response from the server
           console.log(response);
            if (response == 1) {               
				if (u!=''){
					window.location.href = u;
				} else {
					window.location.href = "profile.php";
				}
            } else {
                // Handle any other response, e.g., display error message
                Swal.fire({
                      title: 'Failed',
                      text: 'Your login is unsuccessful. Please  try again',
                      icon: 'error',
                      confirmButtonText: 'OK'
                    }).then(function (result) {
                        
                    })
            }
        },
        error: function(xhr, status, error) {
            // Handle AJAX errors
            console.error("AJAX Error:", error);
        }
	})
    
}


function checkPasswordStrength(password,w,p1,p2,pwd_verification,btn_register) {
    var result = zxcvbn(password);
    var meter = $('#'+w);
    meter.attr("value",result.score);
    //console.log(result.score);
    
    checkPasswordVerification(p1,p2,pwd_verification,btn_register,result.score)
    
}
function checkPasswordVerification(p1,p2,pwd_verification,btn_register,score) {
    var p1 = $("#"+p1).val();
    var p2 = $("#"+p2).val();
    if (p1!=p2){
        $("#"+pwd_verification).html("<span class='badge badge-danger'>Passwords are not the same!</span>");
        $("#"+btn_register).attr("disabled",true);
        return false;
    } else {
        if (score>2) {
            $("#"+pwd_verification).html("<span class='badge badge-success'>OK</span>");
            $("#"+btn_register).attr("disabled",false);
            return true;
        } else {
             $("#"+pwd_verification).html("<span class='badge badge-danger'>Weak Password!</span>");
            $("#"+btn_register).attr("disabled",true);
            return false;
        }
        
        
    }
}



function forgot_password_user() {
  var dialog2 = BootstrapDialog.show({
    title: "Forgot Password",
    size: BootstrapDialog.SIZE_WIDE,
    closable: false,
    spinicon: 'far fa-snowflake',
    message: function (dialog2) {
      var $message = $('<div></div>');
      var pageToLoad = dialog2.getData('pageToLoad');
      $message.load(pageToLoad);
      return $message;
    },
    buttons: [{
      id: 'view-popup-close',
      icon: 'fa fa-times-circle',
      label: 'Close',
      cssClass: 'btn-danger btn-sm float-left',
      autospin: true,
      action: function (dialog2) {
        dialog2.close();
      }
    }, {
      id: 'view-popup-login',
      icon: 'fa fa-check-square',
      label: 'Retrieve Password',
      cssClass: 'btn-primary btn-sm float-right',
      autospin: true,
      action: function (dialog2) {
        forgot_password_user_submit(dialog2);
      }
    }],
    draggable: true,
    onshow: function (dialog) {
  
    },
    onshown: function () {
      $("#btn-popup-fullscreen").show();
      $("#btn-popup-widescreen").hide();
      $('.modal-content').css('margin', '5px 0');
    },
    data: {
      'pageToLoad': 'forgot_password_user.php'
    }
  });
  //dialog.getModalHeader().css('background-color', bgcolor);
}

function forgot_password_user_submit(dialog2){
    var q = $("#forgot_password_form").serializeArray(), json={};
    $.ajax({
        url: 'forgot_password_user_submit.php',
        data: q,
        type: 'post',
        async: false,
        success: function(response) {
            var r = JSON.parse(response);
            if (r.status_val == 1) {
                const textToCopy = r.new_password;

                Swal.fire({
                    title: 'Password Reset',
                    html: 'Your New Password Is <b>' + r.new_password + '</b> <div><button id="copyButton" class="swal2-confirm swal2-styled">Copy Password</button></div>',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    didRender: () => {
                        document.getElementById('copyButton').addEventListener('click', async () => {
                            try {
                                await navigator.clipboard.writeText(textToCopy);
                                Swal.fire('Copied!', 'Text has been copied to clipboard.', 'success');
                            } catch (err) {
                                Swal.fire('Error', 'Failed to copy text: ' + err, 'error');
                            }
                        });
                    }
                }).then(function (result) {
                    // Handle additional actions if needed
                });
            } else {
                Swal.fire({
                    title: 'No Record Found',
                    text: 'Unfortunately, we could not find your registration record. Please try again',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(function (result) {
                    // Handle additional actions if needed
                });
            }
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error:", error);
        }
    });
}

function sign_up_new(){
	
	spinner(1);$("#create_account").attr("disabled","true");
		//must make sure user is logged in or create new account
		Swal.fire({
		  title: 'Please Wait For A While',
		  html: 'We are registering your particulars and sending out a nice email for you. Please check your mailbox. (Do check your spambox too!)',
		  icon: 'success'
		});
		
		var query = $("#join_event_form").serializeArray(), json={};
		var event_id = $("#join_event_form #spq_event_id").val();
		$("#action").load("sign_up_submit.php", query, function(d){
			location.reload();
		});
			
			
}

function get_dob() {
    // Get the MyKad number from the input field
    const mykad = $('#team_member_nric').val();
	console.log(mykad);
    // Validate the MyKad number length and format
    const mykadPattern = /^\d{6}\d{2}\d{4}$/;
    if (!mykadPattern.test(mykad)) {
        //alert('Invalid MyKad number format. Please use YYMMDD-XX-XXXX format.');
        return;
    }

    // Extract the YYMMDD part
    const dobPart = mykad.substring(0, 6);

    // Extract the year, month, and day from the MyKad number
    const year = parseInt(dobPart.substring(0, 2), 10);
    const month = dobPart.substring(2, 4);
    const day = dobPart.substring(4, 6);

    // Determine the full year based on the century
    const currentYear = new Date().getFullYear();
    const century = (year <= currentYear % 100) ? 2000 : 1900;
    const fullYear = century + year;

    // Format the date of birth as YYYY-MM-DD
    const dob = `${fullYear}-${month}-${day}`;
	console.log(dob);
    // Display the date of birth in the element with ID w2
    $('#team_member_dob').val(dob);
}


function delete_registration(registration_id){
	
	Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.value) {
			  delete_registration_submit(registration_id)
			//location.href='profile.php'
		  }
		})


	
}

function delete_registration_submit(registration_id){
var return_value = $.ajax({
	url: '/events/delete_registration_submit.php',
	data: {"registration_id":registration_id},
	async: false,
	success: function(){
		location.href='profile.php'
	}
	});
}