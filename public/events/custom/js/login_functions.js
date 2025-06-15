var loading = "<i class='fa fa-spinner fa-spin'></i>";
function login_admin_submit(){
	var query = $("#login_admin_form").serializeArray(), json = {};
	
	$("#msg").load("login_validate.php", query, function(data) {
		$(".btn-login").attr("disabled","disabled");
		$("#login-admin").html(loading+" Sila tunggu");
		$("#msg").hide();															
		if (data==1) {
			location.href="index.php";
		} else if (data==2) {
			//$("#msg").html("<div class=alert>Gagal! Sila log masuk di halaman peserta</div>").show();
			$(".btn-login").attr("disabled",false);
			$("#login-admin").html("Log Masuk");
			grecaptcha.reset();
			swal({
			  title: 'Captcha Perlu Ditekan',
			  type: 'error',
			  text: 'Anda perlu menekan Captcha'
			 
			})
		} else {
			//$("#msg").html("<div class=alert>Tidak Berjaya. Sila cuba sekali lagi!</div>").show();
			$(".btn-login").attr("disabled",false);
			$("#login-admin").html("Log Masuk");
			grecaptcha.reset();
			swal({
			  title: 'Log Masuk Gagal',
			  type: 'error',
			  text: 'Sila cuba sekali lagi'
			 
			})
		}
	});
}
function forgot_password() {
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Forgot Password','Lupa Katalaluan');?>",
		size: BootstrapDialog.SIZE_NORMAL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-drctry',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Send Info','Dapatkan Maklumat');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					forgot_password_submit();
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: "<?php admin_write('Close','Tutup');?>",
				cssClass: 'btn-danger float-left',
				autospin: false,
				action: function(dialog){
					dialog.close();				
			}
		}],
		draggable: true,
		onshown: function(){
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			$('.modal-body').css('max-height','70vh');
		},
		onhide: function(){
			$('.qtip').remove();
		},
		data: {
			'pageToLoad': 'forgotpassword.php'
		}
	});
}
function validate_form(where) {
	$(where).validate({// any other options & rules,
        errorElement: "i",
    	errorPlacement: function(error, element){ // Set positioning based on the elements position in the form
		  var elem = $(element),
		  corners = ['left center', 'right center'],
		  flipIt = elem.parents('span.right').length > 0;
	 
		  // Check we have a valid error message
		  if(!error.is(':empty')) {
	 		elem.addClass('alert-input alert-danger');
		  // Apply the tooltip only if it isn't valid
			elem.filter(':not(.valid)').qtip({
			  overwrite: false,
			  content: error,
			  position: {
				my: corners[ flipIt ? 1 : 0 ],
				at: corners[ flipIt ? 0: 1 ],
				viewport: $(window),
				adjust: { method: 'shift none' }
			  },
			  show: {
				event: false,
				ready: true
			  },
			  hide: false,
			  style: {
				classes: 'qtip-dark qtip-shadow qtip-rounded',
				tip: {
				  height: 14
				}
			  }
			})
	 
			// If we have a tooltip on this element already, just update its content
			.qtip('option', 'content.text', error);
		  } else { elem.qtip('destroy'); }
		},
		success: $.noop,
		highlight: function(element) {
		  $(element).removeClass("valid");
		  
		},
		unhighlight: function(element) {
		  if (element.id == "user_email" && $(this.pending).attr("user[email]")){
			$(element).removeClass("invalid").addClass("valid");
			$(element).removeClass("alert-danger alert-input");
			qtip();
		  }else if (!$(this.pending).attr("user[email]")){
			$(element).removeClass("invalid").addClass("valid");
			$(element).removeClass("alert-danger alert-input");
			qtip();
		  }
		}
	});
}
function forgot_password_submit(){
	
	if ($("#forgot_password_form").valid()){
		var query = $("#forgot_password_form").serializeArray(), json={};
		var return_value = $.ajax({
		  url: 'forgot_password_submit.php',
		  data: query, 
		  method: "post",
		  async: false
		  }).responseText;
		if (return_value == 1){
			Swal({
				title: "<?php admin_write('Information Sent','Maklumat Telah Dihantar');?>",
				text: "<?php admin_write('Please check your email to get details on how to change your password. Do check your spam box as well.','Emel untuk menukar katalaluan telah dihantar. Sila semak emel anda termasuk \'spam box\'');?>",
				type: 'success',
				
				confirmButtonColor: "#ff0000",
				closeOnConfirm: true,
			}).then((result) => {
			  if (result.value) {
					
			  } else if (result.dismiss === Swal.DismissReason.cancel) {

			  }
			});
		} else if (return_value == 2){
			Swal("<?php admin_write('Email Not Registered','Emel Tidak Didaftarkan');?>","<?php admin_write('Your email address is not registered. Please contact the administrator to get your registered email address.','Emel anda tidak didaftarkan. Sila hubungi pentadbir untuk mendapatkan emel yang didaftarkan dalam sistem.');?>","error");
		} else {
			Swal("<?php admin_write('Email Sending Problem','Penghantaran Emel Bermasalah');?>",return_value,"error");
		}

	}
}