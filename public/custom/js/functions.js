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
		  if (element.id === "user_email" && $(this.pending).attr("user[email]")){
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
function qtip() {
	$('[title!=""],[class!="cke*"]').qtip({
    		style: {classes: 'qtip-dark qtip-shadow qtip-rounded high-zindex' },
			position: { 
				target: 'mouse', 
					adjust: { 
						x:10, y:10 
					}
				}
		});		
}
/** Vehicles Available **/

function select_current_season(){
	// determine the current season based on current date
		var current_season_val = current_season();
		//alert(current_season_val);
		$("#vehicle_rate_season").val(current_season_val);
		populate_season_dates();	
}
function current_season(){
var return_value = $.ajax({
	url: 'current_season.php',
	async: false
	}).responseText;
	return return_value;
}

function admin_login_submit(){
	var u = $("#admin_login_form #ekehadiran_admin_u").val();
	var p = $("#admin_login_form #ekehadiran_admin_p").val();
	var login_result = admin_login_check(u,p);
	if (login_result == 3) { // success
		location.href='../main/index.php';
	} else if (login_result == 2)  {
		swal("Log Masuk Gagal","No Kad Pengenalan dan Kata laluan yang dimasukkan tidak tepat","error");
	} else if (login_result == 1){
		swal("Log Masuk Gagal","Anda tidak memasukkan sebarang kata laluan. Sila cuba lagi.","error");
	} else if (login_result == 0){
		swal("Log Masuk Gagal","Anda tidak memasukkan nombor kad pengenalan. Sila cuba lagi.","error");
	} else if (login_result == 4){
		swal("Log Masuk Gagal","Rekod anda tidak wujud atau tidak aktif. Sila hubungi pentadbir sistem","error");
	}
	

	
}
function admin_login_check(u,p) {
var return_value = $.ajax({
	url: 'admin_login_submit.php',
	data: {"ekehadiran_admin_u":u,"ekehadiran_admin_p":p}, 
	async: false
	}).responseText;
	return return_value;
}
function add_admin_user(){
	BootstrapDialog.show({
			title: 'Add Admin User',
            message: $('<div></div>').load('add-admin-user.php'),
			closable: false,
			buttons: [{
				id: 'action-result',
				cssClass: 'btn-success pull-left'
					  },{
				id: 'add_new_brand_button',
                label: 'Add Administrator',
                cssClass: 'btn-primary',
                action: function(dialog){
                   add_admin_user_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Close',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                $("#vehicle_brand_text").focus();
				$("#action-result").hide();
            }
		});

}

function add_admin_user_submit(){
	var query = $("#admin_user_form").serializeArray(), json={};
	//alert($("#admin_user_form").valid());	
	if ($("#admin_user_form").valid()) {
		// check if passwords are the same
		var pwd1 = $("#admin_user_form #admin_user_p").val();
		var pwd2 = $("#admin_user_form #admin_user_p2").val();
		
		if (pwd1 == pwd2) {
		//alert($("#admin_user_form").valid());	
		$("#action").load("add-admin-user-submit.php", query, function(data){
			if (data==1){
				$("#action-result").html("<i class='fa fa-check-square'></i> New Administrator Added").show().delay(2000).addClass("animated infinite flash btn-success").delay(4000).slideUp(500);
				$("#list-availability-div").load("list-admin-users.php", function(){
					$(".password-meter-message,.password-meter-bar").html("");	
					$(".required").val("").qtip('destroy');															  
				});
				
			}															   
		})
		} else {
			$("#action-result").html("<i class='fa fa-times'></i> Both Passwords Must Be The Same").show().delay(2000).addClass("animated infinite flash btn-danger");
		}
	}
}
function logout(){
	$("#action").load("admin_logout.php", function(data){
		if (data==1) {
			location.href='../login/index.php';	
		}											   
	})
}

function edit_admin_user(id) {
	BootstrapDialog.show({
			title: 'Edit Admin User',
            message: $('<div></div>').load('edit-admin-user.php?id='+id),
			closable: false,
			buttons: [{
				id: 'action-result',
				cssClass: 'btn-success pull-left'
					  },{
				id: 'add_new_brand_button',
                label: 'Update Administrator',
                cssClass: 'btn-primary',
                action: function(dialog){
                   edit_admin_user_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Close',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                $("#vehicle_brand_text").focus();
				$("#action-result").hide();
            }
		});
}
function edit_admin_user_submit(){
	var query = $("#admin_user_form").serializeArray(), json={};
	var activation = $("#activate:checked").val();
		if (activation==undefined){activation=0;}
	var send_email = $("#send_email:checked").val();
	//alert("Activate? "+activation+" Send Email? "+send_email);

		if($('#send_email:checked').val()==2) { // notify for deactivation
		  //alert($('#send_email:checked').val());
		} else if($('#send_email:checked').val()==undefined){ // 
			send_email = 0; // no need to notify as checkbox not checked
		}
	var admin_id = $("#id_vehicle_admin").val();
	
	//alert($("#admin_user_form").valid());	
	if ($("#admin_user_form").valid()) {
		// check if passwords are the same
		var pwd1 = $("#admin_user_form #admin_user_p").val();
		var pwd2 = $("#admin_user_form #admin_user_p2").val();
		
		if (pwd1 == pwd2) {
			
		//alert($("#admin_user_form").valid());	
		$("#list-availability-div").load("list-admin-users.php", query, function(data){
				$("#action-result").html("<i class='fa fa-check-square'></i> Administrator Updated").addClass("btn-success animated flash infinite").show().delay(5000).fadeOut();

					$(".password-meter-message,.password-meter-bar").html("");	
					//$(".required").val("").qtip('destroy');	
					
					// check status and sendmail
					if(activation==2 && send_email==0){  //user deactivate but dont send email
						$("#action-result").html("<i class='fa fa-check-square'></i> User Deactivated").addClass("btn-danger animated flash infinite").show().delay(5000).fadeOut();
						$("#admin_status_div").load("admin_status.php?admin_id="+admin_id);
					} 
					if(activation==0 && send_email==1){ //trying to send email without checking activation
						$("#action-result").html("<i class='fa fa-check-square'></i> Please Activate User").addClass("btn-danger animated flash infinite").show().delay(5000).fadeOut();
					} 
					if(activation==1 && send_email==1){ //activate user and send email
						$("#action-result").html("<i class='fa fa-check-square'></i> Activation Email Sent").removeClass("btn-danger").addClass("btn-success animated flash infinite").show().delay(5000).fadeOut();
						$("#admin_status_div").load("admin_status.php?admin_id="+admin_id);
						$("#action").load("register_email.php?page_type=activate-admin&admin_id="+admin_id,function(){
							$("#action_email").load("../../sendmail.php");
						})
					} 
					if(activation==1 && send_email==0){ // activate user without sending email
						$("#action-result").html("<i class='fa fa-check-square'></i> User Activated").removeClass("btn-danger").addClass("btn-success animated flash infinite").show().delay(5000).fadeOut();
						$("#admin_status_div").load("admin_status.php?admin_id="+admin_id);
						
					} 
					if(activation==2 && send_email==2){ // send deactivation email
						$("#action-result").html("<i class='fa fa-check-square'></i> Deactivation Notice Sent").removeClass("btn-danger").addClass("btn-success animated flash infinite").show().delay(5000).fadeOut();
						$("#admin_status_div").load("admin_status.php?admin_id="+admin_id);
						$("#action").load("register_email.php?page_type=deactivate-admin&admin_id="+admin_id,function(){
							$("#action_email").load("../../sendmail.php");																						  
						})
					}
										   
		})
		} else {
			$("#action-result").html("<i class='fa fa-times'></i> Both Passwords Must Be The Same").show().delay(2000).addClass("animated infinite flash btn-danger");
		}
	}
}
function list_user_orders(user_id){
	var dialog_popup = new BootstrapDialog.show({
			title: 'List User Orders',
            message: $('<div></div>').load('user-orders.php?vehicle_user_id='+user_id),
			buttons: [{
				id: 'close_button',
                label: 'Close',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(){
				 //dialog_popup.getModalBody().css('height',($( window ).height()*0.8)+"px");
				 dialog_popup.getModalBody().css('height',($( window ).height()*0.7)+"px");
				 dialog_popup.getModalBody().css('overflow','auto');
            }
		}).setSize(BootstrapDialog.SIZE_WIDE);
}

function edit_profile(user_id){
	BootstrapDialog.show({
			title: 'Edit Profile',
            message: $('<div></div>').load('edit-admin-user.php?id='+user_id),
			closable: false,
			buttons: [{
				id: 'action-result',
				cssClass: 'btn-success pull-left'
					  },{
				id: 'add_new_brand_button',
                label: 'Update Profile',
                cssClass: 'btn-primary',
                action: function(dialog){
                   edit_profile_user_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Close',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                $("#vehicle_brand_text").focus();
				$("#action-result").hide();
            }
		});
}
function edit_profile_user_submit(){
	var query = $("#admin_user_form").serializeArray(), json={};
	//alert($("#admin_user_form").valid());	
	if ($("#admin_user_form").valid()) {
		// check if passwords are the same
		var pwd1 = $("#admin_user_form #admin_user_p").val();
		var pwd2 = $("#admin_user_form #admin_user_p2").val();
		
		if (pwd1 == pwd2) {
			
		//alert($("#admin_user_form").valid());	
		$("#action").load("profile_user_submit.php", query, function(data){
				$("#action-result").html("<i class='fa fa-check-square'></i> Profile Updated").addClass("btn-success animated flash infinite").show().delay(5000).fadeOut();

					$(".password-meter-message,.password-meter-bar").html("");	
					//$(".required").val("").qtip('destroy');															  
										   
		})
		} else {
			$("#action-result").html("<i class='fa fa-times'></i> Both Passwords Must Be The Same").show().delay(2000).addClass("animated infinite flash btn-danger");
		}
	}
}

function no_of_days(where){
	var startdate = $("#from-date").val();
	var enddate = $("#to-date").val();
		$(where).load("no_of_days.php", {"startdate":startdate,"enddate":enddate}, function(){
			
		})
}

function show_popup(subject){
	var page_detail = $.parseJSON(get_page_detail(subject));
	//alert((page_detail.text));
	
	var dialog_popup = new BootstrapDialog.show({
			title: page_detail.title,
			buttons: [{
				id: 'cancel-button',
                label: 'Close',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
				}
                
            }],
			
			onhide: function(){
				$(".required").qtip('destroy');
			},
			onshown: function(){
				 /*dialog_popup.getModalBody().css('height',($(window).height()*0.75)+120+"px");
				 dialog_popup.getModalBody().css('height',($(window).height()*0.75)+"px");
				 dialog_popup.getModalBody().css('overflow','auto');*/
            },
            message: $('<div>'+page_detail.desc+'</div>'),
			draggable: true,
        }).setSize(BootstrapDialog.SIZE_WIDE).setId('dialog_popup');
}
function open_location(state_id,vehicle_operator_id){
	var dialog = BootstrapDialog.show({
			title: "Coverage Areas (Detail)",
			closable: true,
			buttons: [{
				id: 'action-note3',
				cssClass: 'btn-success'
					  },{
				id: 'register-button3',
                label: 'Update Coverage Areas (Detail)',
                cssClass: 'btn-primary',
                action: function(dialog){
                   register_coverage_subareas_submit(dialog);
					}
				},{
				id: 'action-result3',
				label: 'Close',
				cssClass: 'btn-danger animated flash infinite',
				 action: function(dialog){
                  dialog.close();
				 }
				
                }],
			onshown: function(dialog){
                $("#fullname").focus();
				$("#action-result3").hide();
				$("#action-note3").hide();
				dialog.getModalBody().css('height',($(window).height()*0.7)+100+"px");
				dialog.getModalBody().css('height',($(window).height()*0.7)+"px");
				dialog.getModalBody().css('overflow','auto');
            },
			onhide: function(){
				$(".required").qtip('destroy');
			},
            message: $('<div></div>').load('location_state_subareas.php?state_id='+state_id+'&vehicle_operator_id='+vehicle_operator_id, function() {
				
			}),
			draggable: true,
        }).setSize(BootstrapDialog.SIZE_WIDE);
		
}

function toggle_all_checkbox(){
	if ($("#vehicle_operator_coverage_subareas_all").prop("checked")){
		$(".checkbox").prop("checked", true);
	} else {
		$(".checkbox").prop("checked", false);
	}
}

/**** Season ****/
function add_season(){
	BootstrapDialog.show({
			title: 'Add Season',
            message: $('<div></div>').load('add-season.php'),
			buttons: [{
				id: 'action-note'
					  },{
				id: 'action-result'
					  },{
				id: 'add_season_button',
                label: 'Add New Season',
                cssClass: 'btn-primary',
                action: function(dialog){
                   add_season_submit();
                }
            }],
			onshown: function(dialog){
                
				$("#action-result").hide();
            }
		}).setSize(BootstrapDialog.SIZE_WIDE);
}
function add_season_submit(dialog){
	if ($("#form_add_season").valid()) {
		
			$("#action-note").html("<i class='fa fa-check-square' style='color:white'></i> All input has been validated").addClass("btn-success").show();//alert("validated");	
			var query = $("#form_add_season").serializeArray(),json={};
			$("#list-season-div").load("list-season.php",query,function(data){
				if (data!=0){ // user_session returned. continue
					$("#action-note").html("<i class='fa fa-check-square' style='color:white'></i> Season Addition Successful").show();
					
					
				} else if (data==0) {
					$("#action-note").html("<i class='fa fa-times' style='color:white'></i> Season could not be added").show().removeClass("btn-success").addClass("btn-danger");	
				}
			})
		
	}
}

/*-------------------------*/
function edit_staff(staff_id){
	BootstrapDialog.show({
			title: 'Kemaskini Kakitangan',
            message: $('<div></div>').load('edit_staff.php?staff_id='+staff_id),
			buttons: [{
				id: 'action-note-edit-staff',
				cssClass: 'pull-left'
					  },{
				id: 'action-result-edit-staff'
					  },{
				id: 'add_new_model_button',
                label: 'Kemaskini',
                cssClass: 'btn-primary',
                action: function(dialog){
                  edit_staff_submit();
                }
            },{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		}).setSize(BootstrapDialog.SIZE_FULL);
}
function edit_staff_submit(){
	if ($("#file_selected").val()=="1"){
		$('#file_upload').uploadifive("upload");
	} else {
		edit_staff_submit_final();
	}
}
function edit_staff_submit_final(){
		var id = $("#edit_staff_form #id_ekehadiran_staff").val();
		var query = $("#edit_staff_form").serializeArray(),json={};
		$("#action").load("edit_staff_submit.php",query,function(){
			$("#action-note-edit-staff").html("Profil Berjaya Dikemaskini").addClass("btn btn-success animated flash");
			get_avatar(id);
		})
	
}
function add_staff(){
	BootstrapDialog.show({
			title: 'Tambah Kakitangan',
            message: $('<div></div>').load('edit_staff.php'),
			buttons: [{
				id: 'action-note-edit-staff',
				cssClass: 'pull-left'
					  },{
				id: 'action-result-edit-staff'
					  },{
				id: 'add_new_model_button',
                label: 'Tambah',
                cssClass: 'btn-primary',
                action: function(dialog){
                  add_staff_submit_final();
                }
            },{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		}).setSize(BootstrapDialog.SIZE_FULL);
}
function add_staff_submit(){
	if ($("#file_selected").val()=="1"){
		$('#file_upload').uploadifive("upload");
	} else {
		add_staff_submit_final();
	}
}
function add_staff_submit_final(){
		var id = $("#edit_staff_form #id_ekehadiran_staff").val();
		var query = $("#edit_staff_form").serializeArray(),json={};
		$("#action").load("edit_staff_submit.php",query,function(){
			$("#action-note-edit-staff").html("Kakitangan Berjaya Ditambah").addClass("btn btn-success animated flash");
			get_avatar(id);
		})
	
}
function get_avatar(id){
	
	$('#avatar-img').html("<img src='../../userfiles/avatar/"+avatar_img(id)+"' class='img-responsive'>");
			
}
function avatar_img(id){
var return_value = $.ajax({
	url: 'avatar_img.php?id='+id,
	async: false
	}).responseText;
	return return_value;
}
/*-----------------*/
function show_attendance(){
	var bulan = $("#bulan").val();
	var tahun = $("#tahun").val();
	var staff_no = $("#staff_no").val();
	$("#list-attendance-div").load("list_attendance.php", {"bulan":bulan,"tahun":tahun,"staff_no":staff_no}, function(){
		/*loadAsync("warna_kad.php?staff_no="+staff_no+"&bulan="+bulan+"&tahun="+tahun,'#warna-kad-div');
		$("#warna-kad-div").html("<span class='btn btn-warning'><i class='fa fa-spinner fa-spin'></i> Sedang menjana warna kad</span>");*/
	}).html("<i class='fa fa-spinner fa-spin'></i> Sila tunggu");
}
function justifikasi(attendance_id,tarikh,ic){
	BootstrapDialog.show({
			title: 'Justifikasi Kakitangan',
            message: $('<div></div>').load('justifikasi.php?attendance_id='+attendance_id+"&tarikh="+escape(tarikh)+"&ic="+ic),
			buttons: [{
				id: 'action-note',
				cssClass: 'pull-left hidden',
					  },{
				id: 'action-result-justifikasi-kakitangan',
				cssClass: 'pull-left hidden',
					  },{
				id: 'add_justifikasi',
                label: 'Kemaskini',
                cssClass: 'btn-primary',
                action: function(dialog){
                  justifikasi_upload();
                }
            },{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		}).setSize(BootstrapDialog.SIZE_WIDE);
}
function justifikasi_upload(){
	//alert($("#file_selected").val());
	if ($("#file_selected").val()==1){
		$('#file_upload').uploadifive('upload');
	} else {
		justifikasi_submit();
	}
}
function justifikasi_submit(){
	var bulan = $("#bulan").val();
	var tahun = $("#tahun").val();
	var staff_no = $("#staff_no").val();
	$("#action-result-justifikasi-kakitangan").html("<i class='fa fa-spinner fa-spin'></i> Sila tunggu");
	var query = $("#justifikasi_form").serializeArray(),json={};
	$("#action").load("justifikasi_submit.php",query,function(){
		$("#action-result-justifikasi-kakitangan").html("Justifikasi Berjaya Dikemaskini").addClass("animated flash").removeClass("hidden");
		$("#list-attendance-div").load("list_attendance.php?bulan="+bulan+"&tahun="+tahun+"&staff_no="+staff_no, function(){
		
		})
	})
}
function search_staff_by_dept(){
	var deptname = $("#deptname").val();

	$("#list-staff-div").load("list_staff_table_by_dept.php?deptname="+deptname, function(){
		
	})
	
	
}
function search_laporan_staff_by_dept(){
	var deptname = $("#deptname").val();
	var bulan = $("#bulan").val();
	var tahun = $("#tahun").val();
	$(".action_result").html("<i class='fa fa-spinner fa-spin'></i> Sila tunggu...").show();
	$("#list-laporan-bahagian-div").load("laporan_staff_table_by_dept.php?deptname="+deptname+"&bulan="+bulan+"&tahun="+tahun, function(){
		$(".action_result").hide();
	})
	
	
}
function search_statistik_staff_by_dept(){
	var deptname = $("#deptname").val();
	var bulan = $("#bulan").val();
	var tahun = $("#tahun").val();
	var hari = $("#hari").val();
	$(".action_result").html("<i class='fa fa-spinner fa-spin'></i> Sila tunggu...").show();
	$("#list-laporan-bahagian-div").load("statistik_staff_table_by_dept.php?deptname="+deptname+"&hari="+hari+"&bulan="+bulan+"&tahun="+tahun, function(){
		$(".action_result").hide();
	})
	
	
}
function search_laporan_staff_by_dept_suk(){
	var deptname = $("#deptname").val();
	var bulan = $("#bulan").val();
	var tahun = $("#tahun").val();
	$(".action_result").html("<i class='fa fa-spinner fa-spin'></i> Sila tunggu...").show();
	$("#list-laporan-bahagian-div").load("laporan_staff_table_by_dept_suk.php?deptname="+deptname+"&bulan="+bulan+"&tahun="+tahun, function(){
		$(".action_result").hide();
	})
	
	
}
function add_news(){
	BootstrapDialog.show({
			title: 'Tambah Pengumuman',
            message: $('<div></div>').load('add_news.php'),
			closable: false,
			buttons: [{
				id: 'action-result',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_brand_button',
                label: 'Tambah Pengumuman',
                cssClass: 'btn-primary',
                action: function(dialog){
                   add_news_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});

}
function edit_news(id){
	BootstrapDialog.show({
			title: 'Kemaskini Pengumuman',
            message: $('<div></div>').load('edit_news.php?id='+id),
			closable: false,
			buttons: [{
				id: 'action-result',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_brand_button',
                label: 'Kemaskini Pengumuman',
                cssClass: 'btn-primary',
                action: function(dialog){
                   edit_news_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});

}
function add_news_submit(){
	if ($("#news_form").valid()) {
		var query = $("#news_form").serializeArray(),json={};
		$("#list-news-div").load("list_news.php",query,function(){})
	}
}function edit_news_submit(){
	if ($("#news_form").valid()) {
		var query = $("#news_form").serializeArray(),json={};
		$("#list-news-div").load("list_news.php",query,function(){})
	}
}
function delete_news(id){
	swal({
	  title: "Adakah anda pasti?",
	  text: "Pengumuman yang sudah dipadamkan tidak boleh dipanggil semula",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonClass: "btn-danger",
	  confirmButtonText: "Ya, padamkannya!",
	  cancelButtonText: "Tidak"
	},
	function(){
		
		var query = {"MM_delete":1, "id":id};
	$("#list-news-div").load("list_news.php",query,function(){})
	}).catch(swal.noop);
	
}
function check_staff(){
	if($("#check_staff_id:checkbox").prop('checked')==true){
		$(".checkbox_staff:checkbox").prop('checked', true);
	} else {
		$(".checkbox_staff:checkbox").prop('checked', false);
	}
}
function check_wbb_default(){
	if($("#ekehadiran_wbb_default:checkbox").prop('checked')==true){
		$("#sepanjang-tahun-div").hide();
		$("#ekehadiran_wbb_date_from").val("");$("#ekehadiran_wbb_date_to").val("");
	} else {
		$("#sepanjang-tahun-div").show();
	}
}

function add_wbb(){
	BootstrapDialog.show({
			title: 'Tambah Waktu Bekerja Berperingkat',
            message: $('<div></div>').load('add_wbb.php'),
			closable: false,
			buttons: [{
				id: 'action-result-add-wbb',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_brand_button',
                label: 'Tambah Waktu Bekerja Berperingkat',
                cssClass: 'btn-primary',
                action: function(dialog){
                   add_wbb_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});

}
function edit_wbb(id){
	BootstrapDialog.show({
			title: 'Kemaskini Waktu Bekerja Berperingkat',
            message: $('<div></div>').load('edit_wbb.php?id='+id),
			closable: false,
			buttons: [{
				id: 'action-result-edit-wbb',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_brand_button',
                label: 'Kemaskini Waktu Bekerja Berperingkat',
                cssClass: 'btn-primary',
                action: function(dialog){
                   edit_wbb_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});

}
function add_wbb_submit(){
	if ($("#wbb_form").valid()) {
		var query = $("#wbb_form").serializeArray(),json={};
		$("#list-wbb-div").load("list_wbb.php",query,function(){
			$("#action-result-add-wbb").html("<i class='fa fa-check-square'></i> Tambahan WBB Berjaya").addClass("animated flash");
		})
	}
}function edit_wbb_submit(){
	if ($("#wbb_form").valid()) {
		var query = $("#wbb_form").serializeArray(),json={};
		$("#list-wbb-div").load("list_wbb.php",query,function(){
			$("#action-result-edit-wbb").html("<i class='fa fa-check-square'></i> Kemaskini WBB Berjaya").addClass("animated flash");
		})
	}
}
function delete_wbb(id){
	swal({
	  title: "Adakah anda pasti?",
	  text: "Waktu Bekerja Berperingkat yang dipadamkan mungkin mengganggu laporan yang dijana. Pastikan Waktu Bekerja Berperingkat yang anda padam ini tidak digunakan oleh mana-mana kakitangan",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonClass: "btn-danger",
	  confirmButtonText: "Ya, padamkannya!",
	  cancelButtonText: "Tidak"
	},
	function(){
		
		var query = {"MM_delete":1, "id":id};
	$("#list-wbb-div").load("list_wbb.php",query,function(){})
	}).catch(swal.noop);
	
}

function add_cuti(){
	BootstrapDialog.show({
			title: 'Tambah Cuti',
            message: $('<div></div>').load('add_cuti.php'),
			closable: false,
			buttons: [{
				id: 'action-result-add-cuti',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_brand_button',
                label: 'Tambah Cuti',
                cssClass: 'btn-primary',
                action: function(dialog){
                   add_cuti_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});

}
function edit_cuti(id){
	BootstrapDialog.show({
			title: 'Kemaskini Cuti',
            message: $('<div></div>').load('edit_cuti.php?id='+id),
			closable: false,
			buttons: [{
				id: 'action-result-edit-cuti',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_brand_button',
                label: 'Kemaskini Cuti',
                cssClass: 'btn-primary',
                action: function(dialog){
                   edit_cuti_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});

}
function add_cuti_submit(){
	if ($("#cuti_form").valid()) {
		var query = $("#cuti_form").serializeArray(),json={};
		$("#list-cuti-div").load("list_cuti.php",query,function(){
			$("#action-result-add-cuti").html("<i class='fa fa-check-square'></i> Tambahan Cuti Berjaya").addClass("animated flash");
		})
	}
}function edit_cuti_submit(){
	if ($("#cuti_form").valid()) {
		var query = $("#cuti_form").serializeArray(),json={};
		$("#list-cuti-div").load("list_cuti.php",query,function(){
			$("#action-result-edit-cuti").html("<i class='fa fa-check-square'></i> Kemaskini Cuti Berjaya").addClass("animated flash");
		})
	}
}
function delete_cuti(id){
	swal({
	  title: "Adakah anda pasti?",
	  text: "Cuti yang dipadamkan mungkin mengganggu laporan yang dijana. ",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonClass: "btn-danger",
	  confirmButtonText: "Ya, padamkannya!",
	  cancelButtonText: "Tidak"
	},
	function(){
		
		var query = {"MM_delete":1, "id":id};
	$("#list-cuti-div").load("list_cuti.php",query,function(){})
	}).catch(swal.noop);
	
}


function add_notis_awal(){
	BootstrapDialog.show({
			title: 'Tambah Notis Awal',
            message: $('<div></div>').load('add_notis_awal.php'),
			closable: false,
			buttons: [{
				id: 'action-result-add-notis_awal',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_brand_button',
                label: 'Tambah Notis Awal',
                cssClass: 'btn-primary',
                action: function(dialog){
                   add_notis_awal_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});

}
function edit_notis_awal(id){
	BootstrapDialog.show({
			title: 'Kemaskini Notis Awal',
            message: $('<div></div>').load('edit_notis_awal.php?id='+id),
			closable: false,
			buttons: [{
				id: 'action-result-edit-notis_awal',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_brand_button',
                label: 'Kemaskini Notis Awal',
                cssClass: 'btn-primary',
                action: function(dialog){
                   edit_notis_awal_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});

}
function add_notis_awal_submit(){
	if ($("#notis_awal_form").valid()) {
		var query = $("#notis_awal_form").serializeArray(),json={};
		$("#list-notis_awal-div").load("list_notis_awal.php",query,function(){
			$("#action-result-add-notis_awal").html("<i class='fa fa-check-square'></i> Tambahan Notis Awal Berjaya").addClass("animated flash");
		})
	}
}function edit_notis_awal_submit(){
	if ($("#notis_awal_form").valid()) {
		var query = $("#notis_awal_form").serializeArray(),json={};
		$("#list-notis_awal-div").load("list_notis_awal.php",query,function(){
			$("#action-result-edit-notis_awal").html("<i class='fa fa-check-square'></i> Kemaskini Notis Awal Berjaya").addClass("animated flash");
		})
	}
}
function delete_notis_awal(id){
	swal({
	  title: "Adakah anda pasti?",
	  text: "Notis Awal yang dipadamkan mungkin mengganggu laporan yang dijana. ",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonClass: "btn-danger",
	  confirmButtonText: "Ya, padamkannya!",
	  cancelButtonText: "Tidak"
	},
	function(){
		
		var query = {"MM_delete":1, "id":id};
	$("#list-notis_awal-div").load("list_notis_awal.php",query,function(){})
	}).catch(swal.noop);
	
}
function assign_penyelia(){
	checkboxes = $("#list_staff_form .checkbox_staff:checkbox:checked");
	var countCheckedCheckboxes = checkboxes.length;
	if (countCheckedCheckboxes==0){
		swal("Tiada Kakitangan Dipilih","Sila pilih kakitangan untuk dipadankan dengan penyelia","warning");
	} else {
	BootstrapDialog.show({
			title: 'Padankan Penyelia Kepada Kakitangan',
            message: $('<div></div>').load('assign_penyelia.php'),
			closable: false,
			buttons: [{
				id: 'action-result-assign-penyelia',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_brand_button',
                label: 'Padankan Penyelia Kepada Kakitangan',
                cssClass: 'btn-primary',
                action: function(dialog){
                  assign_penyelia_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});
	}

}
function assign_penyelia_submit(){
	var penyelia_id = $("#penyelia_id").val();
	var staff_id = [];
	$("#list_staff_form .checkbox_staff:checkbox:checked").each(function() {
		staff_id.push(this.value);
	});
	
	$("#action").load("assign_penyelia_submit.php?penyelia_id="+penyelia_id, {"staff_id":staff_id}, function(){
		$("#action-result-assign-penyelia").html("Penyelia Telah Dipadankan").addClass("animated flash").removeClass("hidden");
	})
}
function assign_wbb(){
	checkboxes = $("#list_staff_form .checkbox_staff:checkbox:checked");
	var countCheckedCheckboxes = checkboxes.length;
	if (countCheckedCheckboxes==0){
		swal("Tiada Kakitangan Dipilih","Sila pilih kakitangan untuk dipadankan dengan penyelia","warning");
	} else {
	BootstrapDialog.show({
			title: 'Tetapkan Waktu Bekerja Kakitangan',
            message: $('<div></div>').load('assign_wbb.php'),
			closable: false,
			buttons: [{
				id: 'action-result-assign-wbb',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_wbb_button',
                label: 'Tetapkan Waktu Bekerja Kakitangan',
                cssClass: 'btn-primary',
                action: function(dialog){
                  assign_wbb_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});
	}

}
function assign_wbb_submit(){
	var wbb_id = $("#assign_wbb_form #wbb_text").val();
	var query = $("#list_staff_form").serializeArray(), json={};
	var search_table = $("#search_table").val();
	var staff_id = [];
	var bulan = $("#assign_wbb_form #bulan").val();
	var tahun = $("#assign_wbb_form #tahun").val();
	$("#list_staff_form .checkbox_staff:checkbox:checked").each(function() {
		staff_id.push(this.value);
	});
	
	$("#action-result-assign-wbb").html("<i class='fa fa-spinner fa-spin'></i> Tetapan Sedang Dibuat").addClass("animated flash").removeClass("hidden");
	
	$("#action").load("assign_wbb_submit.php?wbb="+wbb_id, {"staff_id":staff_id,"bulan":bulan,"tahun":tahun}, function(){
		
		//$("#list-staff-div").load("list_staff_table.php", {"search_table":search_table}, function(){
		//	$("#action-result-assign-wbb").html("Waktu Bekerja Telah Ditetapkan").addClass("animated flash").removeClass("hidden");
		//})
	});
}
function search_staff_by_penyelia(){
	var penyelia_id = $("#penyelia_id").val();
	$("#list-staff-by-penyelia-div").load("list_staff_by_penyelia.php?penyelia_id="+penyelia_id, function(){
		
	})
	
	
}

function add_dept(){
	BootstrapDialog.show({
			title: 'Tambah Jabatan',
            message: $('<div></div>').load('add_dept.php'),
			closable: false,
			buttons: [{
				id: 'action-result-add-dept',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_brand_button',
                label: 'Tambah Jabatan',
                cssClass: 'btn-primary',
                action: function(dialog){
                   add_dept_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});

}
function add_dept_submit(){
	if ($("#add_dept_form").valid()) {
		var query = $("#add_dept_form").serializeArray(),json={};
		$("#list-jabatan-div").load("list_jabatan.php",query,function(){
			$("#action-result-add-dept").html("<i class='fa fa-check-square'></i> Tambah Jabatan Berjaya").addClass("animated flash").removeClass("hidden").show();
		})
	}
}

function edit_dept(id){
	BootstrapDialog.show({
			title: 'Kemaskini Jabatan',
            message: $('<div></div>').load('edit_dept.php?id='+id),
			closable: false,
			buttons: [{
				id: 'action-result-edit-dept',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_brand_button',
                label: 'Kemaskini Jabatan',
                cssClass: 'btn-primary',
                action: function(dialog){
                   edit_dept_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});

}
function edit_dept_submit(){
	if ($("#edit_dept_form").valid()) {
		var query = $("#edit_dept_form").serializeArray(),json={};
		$("#list-jabatan-div").load("list_jabatan.php",query,function(){
			$("#action-result-edit-dept").html("<i class='fa fa-check-square'></i> Kemaskini Jabatan Berjaya").addClass("animated flash").show().removeClass("hidden");
		})
	}
}
function approve_justifikasi(attendance_id){
	BootstrapDialog.show({
			title: 'Kemaskini Justifikasi Kakitangan',
            message: $('<div></div>').load('approve_justifikasi.php?attendance_id='+attendance_id),
			buttons: [{
				id: 'action-note',
				cssClass: 'pull-left hidden',
					  },{
				id: 'action-result-justifikasi-kakitangan',
				cssClass: 'pull-left hidden',
					  },{
				id: 'approve_justifikasi_button',
                label: 'Kemaskini',
                cssClass: 'btn-primary',
                action: function(dialog){
                  approve_justifikasi_submit();
                }
            },{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		}).setSize(BootstrapDialog.SIZE_WIDE);
}
function approve_justifikasi_submit(){
	
	$("#action-result-justifikasi-kakitangan").html("<i class='fa fa-spinner fa-spin'></i> Sila tunggu");
	var query = $("#approve_justifikasi_form").serializeArray(),json={};
	$("#action").load("approve_justifikasi_submit.php",query,function(){
		$("#action-result-justifikasi-kakitangan").html("Justifikasi Berjaya Dikemaskini").addClass("animated flash").removeClass("hidden");
		$("#list-justifikasi-div").load("list_justifikasi_by_penyelia.php", function(){})
		/*$("#list-attendance-div").load("list_attendance.php?bulan="+bulan+"&tahun="+tahun+"&staff_no="+staff_no, function(){
		
		})*/
	})
}

function session_timeout(){
	swal({
	  title: "Sesi Telah Tamat",
	  text: "Anda telah membiarkan sistem ini tidak aktif. Untuk meneruskan sesi anda, sila log masuk semula",
	  timer: 5000,
	  onOpen: function () {
		swal.showLoading()
	  }
	}).then(
	  function () {},
	  // handling the promise rejection
	  function (dismiss) {
		if (dismiss === 'timer') {
		  window.location.href='logout.php'
		}
	  }
	).catch(swal.noop);
	
}
function current_card_color(staff_no){
	//$("#card_color").load("warna_kad_span.php?staff_no="+staff_no, function(){})
	loadAsync("warna_kad_span.php?staff_no="+staff_no,'#card_color');
	$("#card_color").html("<i class='fa fa-spinner fa-spin'></i>");
}
// Load scripts asynchronously
function loadAsync(url,div){
	// Don't use $.getScript since it disables caching
	$.ajax({
		'url': url,
		'dataType': 'html',
		'cache': true,
		'success': function(data){

    		$(div).html(data);
		}
	});
};
function open_file(filename) {
	var pdffile = escape(filename);
	var dialog = BootstrapDialog.show({
			title: 'Lihat Dokumen',
			size: BootstrapDialog.SIZE_WIDE ,
            message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
        
                return $message;
            },
			buttons: [{
				id: 'btn-popup-fullscreen-file',   
				icon: 'fa fa-expand',       
				label: 'Skrin Penuh',
				cssClass: 'btn-primary btn-fullscreen hidden-xs', 
				autospin: false,
				action: function(dialog){    
					//$(".modal .bootstrap-dialog").addClass("fullscreen");
					 
					 dialog.setSize(BootstrapDialog.SIZE_FULL);
					 $("#btn-popup-widescreen-file").show();
					$("#btn-popup-fullscreen-file").hide();
				}
			},{
				id: 'btn-popup-widescreen-file',   
				icon: 'fa fa-compress',       
				label: 'Skrin Biasa',
				cssClass: 'btn-danger btn-widescreen hidden-xs', 
				autospin: false,
				action: function(dialog){    
					//$(".modal .bootstrap-dialog").addClass("fullscreen");
					 
					 dialog.setSize(BootstrapDialog.SIZE_WIDE);
					 $("#btn-popup-fullscreen-file").show();
					 $("#btn-popup-widescreen-file").hide();
				}
			},{
				id: 'view-popup-close-file',   
				icon: 'fa fa-exit',       
				label: 'Tutup',
				cssClass: 'btn-warning', 
				autospin: false,
				action: function(dialog){    
					 dialog.close();

				}
			}],
			draggable: true,
			onshown: function(){
                
				$("#btn-popup-fullscreen-file").show();
				 $("#btn-popup-widescreen-file").hide();
				 $('.modal-content').css('height',($( window ).height()*0.6)+120+"px");
				 $('.modal-body').css('height',($( window ).height()*0.6)+"px");
				 $('.modal-body').css('overflow','auto');
				 $("#objectfile").css("height",($(".modal-content").height()-100)+"px");
            },
            data: {
                'pageToLoad': 'iframe.php?filename='+pdffile
            }
        });
	

}
function change_password(staff_id){
	BootstrapDialog.show({
			title: 'Tukar Kata Laluan',
            message: $('<div></div>').load('change_password.php?staff_id='+staff_id),
			buttons: [{
				id: 'action-note',
				cssClass: 'pull-left hidden',
					  },{
				id: 'action-result-justifikasi-kakitangan',
				cssClass: 'pull-left hidden',
					  },{
				id: 'change_password_button',
                label: 'Tukar',
                cssClass: 'btn-primary',
                action: function(dialog){
                  change_password_submit();
                }
            },{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		}).setSize(BootstrapDialog.SIZE_WIDE);
}
function change_password_submit(){
	var query = $("#change_password_form").serializeArray(), json={};
	$("#messages").load("change_password_submit.php", query, function(data){})
}
function check_justifikasi(){
	if($("#check_justifikasi_id:checkbox").prop('checked')==true){
		$(".checkbox_justifikasi:checkbox").prop('checked', true);
	} else {
		$(".checkbox_justifikasi:checkbox").prop('checked', false);
	}
}
function bulk_justifikasi(){
	checkboxes = $("#list_staff_form .checkbox_justifikasi:checkbox:checked");
	var countCheckedCheckboxes = checkboxes.length;
	if (countCheckedCheckboxes==0){
		swal("Tiada Kakitangan Dipilih","Sila pilih kakitangan sebelum membuat justifikasi","warning");
	} else {
	BootstrapDialog.show({
			title: 'Buat Justifikasi Secara Pukal',
            message: $('<div></div>').load('bulk_justifikasi.php'),
			closable: false,
			buttons: [{
				id: 'action-result-bulk-justifikasi',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add-bulk-justifikasi-button',
                label: 'Kemaskini Justifikasi',
                cssClass: 'btn-primary',
                action: function(dialog){
                  bulk_justifikasi_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});
	}

}
function bulk_justifikasi_submit(){
	var query = $("#justifikasi_form").serializeArray(), json={};
	var justifikasi_status = $("#justifikasi_status").val();
	var justifikasi_approved_by_id = $("#justifikasi_approved_by_id").val();
	var justifikasi_approved_by_text = $("#justifikasi_approved_by_text").val();
 	var justifikasi_status_text = $("#justifikasi_status_text").val();
 
	var staff_id = [];
	$("#list_staff_form .checkbox_justifikasi:checkbox:checked").each(function() {
		staff_id.push(this.value);
	});

	
	$("#action").load("bulk_justifikasi_submit.php", {"staff_id":staff_id,"justifikasi_status":justifikasi_status,"justifikasi_status_text":justifikasi_status_text,"justifikasi_approved_by_id":justifikasi_approved_by_id,"justifikasi_approved_by_text":justifikasi_approved_by_text}, function(){
		$("#action-result-bulk-justifikasi").html("Justifikasi Telah Dikemaskini").addClass("animated flash").removeClass("hidden");
		$("#list-justifikasi-div").load("list_justifikasi_by_penyelia.php", function(){})
	})
}
function create_account(){
	
	BootstrapDialog.show({
			title: 'Daftar Sebagai Pengguna',
            message: $('<div></div>').load('create_account.php'),
			closable: false,
			buttons: [{
				id: 'action-result-create-account',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add-create-account-button',
                label: 'Daftar',
                cssClass: 'btn-primary',
                action: function(dialog){
                  create_account_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            },
			onhidden: function(dialog){
                $(".required").qtip('destroy');
            }
		});
}
function create_account_submit(){
	if ($("#register_staff_form").valid()){
		var query = $("#register_staff_form").serializeArray(), json={};
		$("#action").load("create_account_submit.php", query, function(data){
			if (data==1){
				$("#action-result-create-account").html("Akaun Telah Didaftarkan").removeClass("hidden btn-danger").addClass("btn-success animated flash infinite");
				swal("Akaun Telah Didaftarkan","Akaun anda telah didaftarkan. Namun ia perlu mendapat kelulusan penyelia atau pentadbir sistem terlebih dahulu. Anda akan dimaklumkan sekiranya akaun anda telah diaktifkan","success");
			} else if (data==2){
				$("#action-result-create-account").html("Akaun Sudah Wujud").removeClass("hidden").addClass("btn-danger animated flash infinite");
			} else if (data==3){
				$("#action-result-create-account").html("Kata Laluan Tidak Sama").removeClass("hidden").addClass("btn-danger animated flash infinite");
			}
		});
	}
}
function padam_audit(audit_id){
	swal({
	  title: "Adakah anda pasti?",
	  text: "Audit trail yang dipadam tidak boleh dikembalikan semula ",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonClass: "btn-danger",
	  confirmButtonText: "Ya, padamkannya!",
	  cancelButtonText: "Tidak"
	}).then(function () {
	  var query = {"MM_delete":1, "audit_id":audit_id};
		$("#list-audit-trail-div").load("list_audit_trail.php",query,function(){})
	}).catch(swal.noop);
	

}
function forgot_password(){
	BootstrapDialog.show({
			title: 'Lupa Kata Laluan',
            message: $('<div></div>').load('forgot_password.php'),
			closable: false,
			buttons: [{
				id: 'action-result-forgot-password',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add-forgot-password-button',
                label: 'Daftar',
                cssClass: 'btn-primary',
                action: function(dialog){
                  forgot_password_submit(dialog);
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            },
			onhidden: function(dialog){
                $(".required").qtip('destroy');
            }
		});
}
function semak_maklumat(){
	if ($("#pwd_div").length>0){
		
		var u = $("#staffno").val();
		var p = $("#ekehadiran_admin_email").val();
		var check_maklumat = check_maklumat_fn(u,p);

		if (check_maklumat>0){
			$("#result-semak").html("Maklumat kakitangan dijumpai. Sila daftarkan kata laluan baru");
			$("#pwd_div").fadeIn();
			$(".required").qtip('destroy');
			$("#forgot_password_form #id_ekehadiran_staff").val(check_maklumat);
			$("#action-result-forgot-password").hide();
		} else {
			$("#result-semak").html("Maklumat kakitangan tidak dijumpai");
			 $(".required").qtip('destroy');
			$("#pwd_div").fadeOut();
			$("#forgot_password_form #id_ekehadiran_staff").val(0);
			$("#action-result-forgot-password").html("Maklumat Kakitangan Tidak Dijumpai").removeClass("hidden btn-danger").addClass("btn-success animated flash infinite").show();
		}
	
	} else {
		if ($("#forgot_password_form").valid()){
		var u = $("#staffno").val();
		var p = $("#ekehadiran_admin_email").val();
		var check_maklumat = check_maklumat_fn(u,p);

		if (check_maklumat>0){
			$("#result-semak").html("Maklumat kakitangan dijumpai. Sila daftarkan kata laluan baru");
			$("#pwd_div").fadeIn();
			$("#forgot_password_form #id_ekehadiran_staff").val(check_maklumat);
			$(".required").qtip('destroy');
		} else {
			$("#result-semak").html("Maklumat kakitangan tidak dijumpai");
			$(".required").qtip('destroy');
			$("#pwd_div").fadeOut();
			$("#forgot_password_form #id_ekehadiran_staff").val(0);
			$("#action-result-forgot-password").html("Maklumat Kakitangan Tidak Dijumpai").removeClass("hidden btn-danger").addClass("btn-success animated flash infinite").show();
		}
	} else {
		$("#result-semak").html("Masukkan No Kad Pengenalan dan Emel Kakitangan");
	}
	}
	
}
function forgot_password_submit(dialog){
	if ($("#forgot_password_form #id_ekehadiran_staff").val()>0){
		if ($("#forgot_password_form").valid()){
			var query = $("#forgot_password_form").serializeArray(), json={};
			$("#action").load("forgot_password_submit.php", query, function(data){
				if (data==1){
					$("#action-result-forgot-password").html("Kata Laluan Baru Telah Didaftarkan").removeClass("hidden btn-danger").addClass("btn-success animated flash infinite");
					swal({
						title: "Kata Laluan Baru Telah Didaftarkan",
						text: "Sila log masuk menggunakan kata laluan yang baru didaftarkan",
						type: "success"
					}, function() {
						 dialog.close();
					});
					//swal("Kata Laluan Baru Telah Didaftarkan","Sila log masuk menggunakan kata laluan yang baru didaftarkan","success");
				} else if (data==2){
				$("#action-result-forgot-password").html("Kakitangan Tidak Dijumpai").removeClass("hidden").addClass("btn-danger animated flash infinite");
			} else if (data==3){
				$("#action-result-forgot-password").html("Kata Laluan Tidak Sama").removeClass("hidden").addClass("btn-danger animated flash infinite");
			}
			});
		}
	} else {
		$("#action-result-forgot-password").html("Maklumat Kakitangan Tidak Dijumpai").removeClass("hidden btn-danger").addClass("btn-success animated flash infinite").show();
	}
}
function check_maklumat_fn(u,p){
	var return_value = $.ajax({
	url: 'semak_maklumat.php',
	data: {"u":u,"p":p}, 
	async: false
	}).responseText;
	return return_value;
}
function wbb_staff_by_year(){
	var staffno = $("#staffno").val();
	var tahun = $("#tahun").val();
	$("#list-wbb-div").load("list_wbb_by_year.php", {"staffno":staffno,"tahun":tahun}, function(){
		
	})
}
function assign_wbb_staff(wbb_id){
	
	BootstrapDialog.show({
			title: 'Tetapkan Waktu Bekerja Kakitangan',
            message: $('<div></div>').load('assign_wbb_staff.php?wbb_id='+wbb_id),
			closable: false,
			buttons: [{
				id: 'action-result-assign-wbb',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_new_wbb_button',
                label: 'Tetapkan Waktu Bekerja Kakitangan',
                cssClass: 'btn-primary',
                action: function(dialog){
                  assign_wbb_staff_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});
	

}
function assign_wbb_staff_submit(){
	var wbb_id = $("#assign_wbb_form #wbb_text").val();
	var query = $("#list_staff_form").serializeArray(), json={};
	var search_table = $("#search_table").val();
    var staff_id =  $("#assign_wbb_form #staff_id").val();
	var bulan = $("#assign_wbb_form #bulan").val();
	var tahun = $("#assign_wbb_form #tahun").val();

	
	$("#action-result-assign-wbb").html("<i class='fa fa-spinner fa-spin'></i> Tetapan Sedang Dibuat").addClass("animated flash").removeClass("hidden");
	
	$("#action").load("assign_wbb_staff_submit.php?wbb="+wbb_id, {"staff_id":staff_id,"bulan":bulan,"tahun":tahun}, function(){
		wbb_staff_by_year();
			$("#action-result-assign-wbb").html("Waktu Bekerja Telah Ditetapkan").addClass("animated flash").removeClass("hidden");
		
	});
}
function populate_wbb_staff(staff_no){
	
	BootstrapDialog.show({
			title: 'Tetapkan Waktu Bekerja Kakitangan',
            message: $('<div></div>').load('populate_wbb_staff.php?staff_no='+staff_no),
			closable: false,
			buttons: [{
				id: 'action-result-populate-wbb',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_populate_wbb_button',
                label: 'Populasikan Waktu Bekerja Kakitangan',
                cssClass: 'btn-primary',
                action: function(dialog){
                  populate_wbb_staff_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});
	

}
function populate_wbb_staff_submit(){
	var wbb_id = $("#assign_wbb_form #wbb_text").val();
	var query = $("#list_staff_form").serializeArray(), json={};
	var search_table = $("#search_table").val();
    var staff_id =  $("#assign_wbb_form #staff_id").val();
	var bulan = $("#assign_wbb_form #bulan").val();
	var tahun = $("#assign_wbb_form #tahun").val();

	
	$("#action-result-assign-wbb").html("<i class='fa fa-spinner fa-spin'></i> Tetapan Sedang Dibuat").addClass("animated flash").removeClass("hidden");
	
	$("#action").load("populate_wbb_staff_submit.php?wbb="+wbb_id, {"staff_id":staff_id,"bulan":bulan,"tahun":tahun}, function(){
		wbb_staff_by_year();
			$("#action-result-assign-wbb").html("Waktu Bekerja Telah Ditetapkan").addClass("animated flash").removeClass("hidden");
		
	});
}
function populate_wbb_staff_by_month(staff_no){
	
	BootstrapDialog.show({
			title: 'Tetapkan Waktu Bekerja Kakitangan (Mengikut Bulan & Tahun)',
            message: $('<div></div>').load('populate_wbb_staff_by_month.php?staff_no='+staff_no),
			closable: false,
			buttons: [{
				id: 'action-result-populate-wbb',
				cssClass: 'btn-success pull-left hidden'
					  },{
				id: 'add_populate_wbb_button',
                label: 'Populasikan Waktu Bekerja Kakitangan',
                cssClass: 'btn-primary',
                action: function(dialog){
                  populate_wbb_staff_by_month_submit();
                	}
            	},{
				id: 'close_button',
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialog){
                   dialog.close();
                	}
				}],
			onshown: function(dialog){
                
            }
		});
	

}
function populate_wbb_staff_by_month_submit(){
	var wbb_id = $("#assign_wbb_form #wbb_text").val();
	var query = $("#list_staff_form").serializeArray(), json={};
	var search_table = $("#search_table").val();
    var staff_id =  $("#assign_wbb_form #staff_id").val();
	var bulan = $("#assign_wbb_form #bulan").val();
	var tahun = $("#assign_wbb_form #tahun").val();

	
	$("#action-result-assign-wbb").html("<i class='fa fa-spinner fa-spin'></i> Tetapan Sedang Dibuat").addClass("animated flash").removeClass("hidden");
	
	$("#action").load("populate_wbb_staff_by_month_submit.php?wbb="+wbb_id, {"staff_id":staff_id,"bulan":bulan,"tahun":tahun}, function(){
		wbb_staff_by_year();
			$("#action-result-assign-wbb").html("Waktu Bekerja Telah Ditetapkan").addClass("animated flash").removeClass("hidden");
		
	});
}