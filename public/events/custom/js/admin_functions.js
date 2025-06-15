<?php $default_width = '960'; $default_height='600'; ?> 
var default_width = 960;
var default_height = 600;
var max_width = $(window).width()-50;
var max_height = $(window).height()-50;
var half_width = $(window).width()*.5;
var threequarter_width = $(window).width()*.75;
var half_height = $(window).height()*.5;
var threequarter_height = $(window).height()*.75;

var loading_graf = '<center><i class=fa fa-spinner fa-spin></i> <?php admin_write("Generating results, please wait..","Keputusan sedang dijana, sila tunggu sebentar..");?>';
var success_text = "<i class='fa fa-check-square fa-lg' ></i> <?php admin_write('Update Successful','Kemaskini Berjaya');?>";
var error_text = "<i class='fa fa-times fa-lg' ></i> <?php admin_write('Update Failed','Kemaskini Tidak Berjaya');?>";
var processing_text = "<i class='fa fa-spinner fa-spin fa-lg' ></i> <?php admin_write('Processing','Sedang Diproses');?>";
var processing_text_done = "<i class='fa fa-check-square fa-lg' ></i> <?php admin_write('Updated','Sudah Dikemaskini');?>";
var loading = processing_text;
var options_noty = {
     	theme: 'sunset',
		timeout: 3500,
		progressBar: true
};
function processing(where,duration){
	
	if(duration=="" || duration == 0){
		$(where).html(processing_text);
	} else {
		$(where).html(processing_text).slideDown(duration).delay(duration).slideUp(duration);
	}
}
function processing_done(where,duration){
	
	if(duration=="" || duration == 0){
		$(where).html(processing_text_done);
	} else {
		$(where).html(processing_text_done).slideDown(duration).delay(duration).slideUp(duration);
	}
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
function buttonit() {
	/*$("input:submit").button();
	$("input:button").button();
	$("input:reset").button();
	$("button").button();*/
}
function login_submit() {
	var query = $("#login").serializeArray(), json={};
	$("#action").load("../admin/login_submit.php", query, function(data) {
		if (data==1) {
			location.href="main.php";	
		} 
	});	
}
function centerdiv(where){
	$(where).position({
		of: $(window),
		my: "center",
  		at: "center"
	});
}
function show_note(what,where){
	new Noty({
		text: what,
		theme: 'sunset',
		type: 'info',
		timeout: 5000,
		progressBar: true
	}).show();
}
function show_note_5sec(what,where){
	new Noty({
		text: what,
		theme: 'sunset',
		type: 'info',
		timeout: 5000,
		progressBar: true
	}).show();
}
function show_note_3sec(what,callback){
	new Noty({
		text: what,
		theme: 'sunset',
		type: 'info',
		timeout: 2000,
		progressBar: true,
		callbacks: {
			onClose: callback
		}
	}).show();
}
function note_alert_info(what,where){

	new Noty({
		text: what,
		theme: 'sunset',
		type: 'info',
		timeout: 3500,
		progressBar: true
	}).show();
}

function note_alert_warning(what,where){
	new Noty({
		text: what,
		theme: 'sunset',
		type: 'warning',
		timeout: 3500,
		progressBar: true
	}).show();
}
function note_alert_success(what,where){
	new Noty({
		text: what,
		theme: 'sunset',
		type: 'success',
		timeout: 3500,
		progressBar: true
	}).show();
}
function note_alert_danger(what,where){
	new Noty({
		text: what,
		theme: 'sunset',
		type: 'error',
		timeout: 3500,
		progressBar: true
	}).show();
}
function note_where(what,level,where,hide){
	if (hide==1){
		$(where).html("<div class='alert alert-"+level+"'><center><i class='fa fa-warning' style='color:#f00'></i> "+what+"</center></div>").show().delay(5000).fadeOut();
	} else {
		$(where).html("<div class='alert alert-"+level+"'><center><i class='fa fa-warning' style='color:#f00'></i> "+what+"</center></div>").show();
	}
}
function loadingtext(what) {
	return ("<center><i class='fa fa-spinner fa-spin fa-2x'></i> "+what+"</center>");
}
function alert_wait(what) {
	return ("<div class='alert alert-info'><i class='fa fa-spinner fa-spin fa-lg'></i> "+what+"</div>");
}
function wait(whichload,note,where) {
	$("#"+where).html("<center>"+whichload+" "+note+"</center>");
}
function wait_note(whichload,where) {
	$("#"+where).html("<center>"+whichload+"</center>");
}
function cufon_replace() {
	/*Cufon.replace('h1,h2,.h1,.h2', {fontFamily:'TitilliumText15L'});
	Cufon.replace('h3,h4,.h3,.h4', {fontFamily:'TitilliumText15L'});
	Cufon.replace('h5,h6,.h5,.h6', {fontFamily:'TitilliumText15L'});
	Cufon.replace('.title', {fontFamily:'TitilliumText15L'});
	Cufon.replace('.top_menu', {fontFamily:'TitilliumText15L'});
	Cufon.replace('.title_black', {fontFamily:'TitilliumText15L'});*/
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
function timenow(){
	var timenow = $.now().toString();
	var timestamp = timenow.substr(0, timenow.length-3);
	return timestamp;
}
function goto(whichpage,whichdiv)  {
						$("#showlist_div").load(whichpage, 
							function() {
								$("#list tr").mouseover(function(){$(this).addClass("over");}).mouseout(function(){$(this).removeClass("over")});
								$("#list tr:even").addClass("alt");
								//$("#dialog").dialog("destroy");
							});
					}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function confirm_delete_events(){
	if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system','Adakah anda pasti? Perkara yang telah dipadamkan tidak boleh dijana semula oleh sistem');?>")) {
		var query = $("#list_parents").serializeArray(), json={};
			$("#list_events_div").load("list_events.php", query, function(data){});
		}
	}
function search_events(){
	var query = $("#search_events_form").serializeArray(), json={};
	$("#list_events_div").load("list_events.php", query, function(data){});
}
function confirm_delete(whichform){
	
	Swal({
		title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
		text: "<?php admin_write('Deleted items cannot be retrieved from the system.','Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>",
		type: 'warning',
		showCancelButton: true,   
		confirmButtonColor: "#ff0000",   
		confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
		cancelButtonText: "<?php admin_write('No!','Tidak!');?>",   
		closeOnConfirm: true,   
		closeOnCancel: true 
	}).then((result) => {
	  if (result.value) {
			whichform.submit();
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		
	  }
	})
	

}
function show_parentchild(pt,parenturl){
	parenturl=escape(parenturl);
	ajaxpage('show_parentchild.php?pt='+pt+'&r='+parenturl,'list_parentchild');
	}
function check_pt(pt){
	var query = $("#make_section").serializeArray(), json={};
	 $("#list_parentchild").load("show_parentchild.php?pt="+pt, query, function() {});
	}
function delete_section(){
	var query = $("#list_parents").serializeArray(), json={};
	 $("#list_parentchild").load("show_parentchild.php", query, function() {});
}
function check_pt2(){
	var query = $("#make_child").serializeArray(), json={};
	 $("#list_child").load("list_child.php", query, function() {});
	 
	/*var make_child = document.make_child;
	var pt = document.getElementById('pt').value;
	document.getElementById('section_pt').value=pt;
	make_child.submit();*/
	}
function delete_child(){
	var query = $("#list_childs").serializeArray(), json={};
	 $("#list_child").load("list_child.php", query, function() {});
}	
function orgchart_edit(id) {
	$.scrollTo('#action',800);
	$("#action").load("orgchart_edit.php?id="+id, function(){
		//Cufon.refresh();
		});
}
function orgchart_add() {
	$.scrollTo('#action',800);
	$("#action").load("orgchart_add.php", function(){
		//Cufon.refresh();
		});
	}
function getClientWidth() {
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}
function getClientHeight() {
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
}
// get window size, accounting for browser stupidity
function getWindowSize(){
	if(typeof(window.innerHeight) == 'number')
		return {height:window.innerHeight, width:window.innerWidth};
	else{
		if(document.documentElement && document.documentElement.clientHeight)
			return {height:document.documentElement.clientHeight, width:document.documentElement.clientWidth}
		else
			if(document.body && document.body.clientHeight)
				return {height:document.body.clientHeight, width:document.body.clientWidth}
	}
}
// Example:
// onMouseOver="toolTip('tool tip text here')";
// onMouseOut="toolTip()";
// -or-
// onMouseOver="toolTip('more good stuff', '#FFFF00', 'orange')";
// onMouseOut="toolTip()"; 
/*
MOVE this to the <body>:
<div id="toolTipLayer" style="position:absolute; visibility: hidden"></div>
<script language="JavaScript"><!--
initToolTips(); //--></script>
*/
var ns4 = document.layers;
var ns6 = document.getElementById && !document.all;
var ie4 = document.all;
offsetX = 0;
offsetY = 20;
var toolTipSTYLE="";
function initToolTips()
{
  if(ns4||ns6||ie4)
  {
    if(ns4) toolTipSTYLE = document.toolTipLayer;
    else if(ns6) toolTipSTYLE = document.getElementById("toolTipLayer").style;
    else if(ie4) toolTipSTYLE = document.all.toolTipLayer.style;
    if(ns4) document.captureEvents(Event.MOUSEMOVE);
    else
    {
      toolTipSTYLE.visibility = "visible";
      toolTipSTYLE.display = "none";
    }
    document.onmousemove = moveToMouseLoc;
  }
}
function toolTip(msg, fg, bg)
{
  if(toolTip.arguments.length < 1) // hide
  {
    if(ns4) toolTipSTYLE.visibility = "hidden";
    else toolTipSTYLE.display = "none";
  }
  else // show
  {
    if(!fg) fg = "#777777";
    if(!bg) bg = "#FFFFFF";
    var content =
    '<table border="0" cellspacing="0" cellpadding="1" bgcolor="' + fg + '"><td>' +
    '<table border="0" cellspacing="0" cellpadding="1" bgcolor="' + bg + 
    '"><td align="center"><font face="sans-serif" color="' + fg +
    '" size="-2">&nbsp\;' + msg +
    '&nbsp\;</font></td></table></td></table>';
    if(ns4)
    {
      toolTipSTYLE.document.write(content);
      toolTipSTYLE.document.close();
      toolTipSTYLE.visibility = "visible";
    }
    if(ns6)
    {
      document.getElementById("toolTipLayer").innerHTML = content;
      toolTipSTYLE.display='block'
    }
    if(ie4)
    {
      document.all("toolTipLayer").innerHTML=content;
      toolTipSTYLE.display='block'
    }
  }
}
function moveToMouseLoc(e)
{
  if(ns4||ns6)
  {
    x = e.pageX;
    y = e.pageY;
  }
  else
  {
    x = event.x + document.body.scrollLeft;
    y = event.y + document.body.scrollTop;
  }
  toolTipSTYLE.Left = x + offsetX;
  toolTipSTYLE.Top = y + offsetY;
  return true;
}

function beautable(where) {
	$(where+" tr").mouseover(function(){$(this).addClass("over");}).mouseout(function(){$(this).removeClass("over")});
  $(where+" tr:even").addClass("alt");	
}
function create_xml(which) {
	if (which==undefined) {which = $("#news_type").val();}
	$("#jana").load("create_xml.php?eventstype="+which);
}
function directory_reorder() {
	var serialize = $("#form1").serialize();
	$("#showlist_div").load("show_list_directory.php?reorder=Reorder&"+serialize, function() {
		beautable("#list");
		});
}
function delete_phpcounter() {
	$("#mainaction").load("reset_stats.php", function() {
			alert("Hit counter has been reset");
		});
}
/* 
function showinfo(id) {
			$("#dialog_content").load("../admin/imageinfo.php?id="+id).dialog({
					 width:500,
					 height:450, 
					 modal: true, 
					 title:"<?php admin_write('Image Info','Maklumat Gambar');?>"
					})
				.dialog("open");
				
}
*/
function showinfo(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Maklumat Gambar','Image Info');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/imageinfo.php?id='+id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function update_image_info(){
	var query = $("#imageinfo_form").serializeArray(), json={};
	$("#dialog_content").load("imageinfo.php",query);
}
function section_search() {
	var sk = $("#sk").val();
	$("#section_div").load("section_search.php?sk="+sk);
}
function child_search() {
	var sk = $("#sk").val();
	$("#child_div").load("child_search.php?sk="+sk);
}
function delete_page_image(fileid,id) {
	$("#imagefail").load("list_page_image.php?del=1&fileid="+fileid+"&id="+id);
}
function delete_page_image_event(fileid,id) {
	$("#imagefail").load("list_page_image_event.php?del=1&fileid="+fileid+"&id="+id);
}
function delete_image_uploaded(fileid,id) {
	$("#action").load("delete_image.php?del=1&fileid="+fileid+"&id="+id, function(){
		$("#image_"+fileid).fadeOut();	
		rearrange_image();
	});
}
function edit_vacancy(page_id){
	location.href='page.php?pagetype=9&r=manage_vacancy.php&id='+page_id;
}
function add_vacancy() {
	//$("#mainaction").load("add_vacancy.php").dialog({"title":"Add Vacancy","height":500,"width":550}).dialog("open");
    location.href='page.php?pagetype=9&r=manage_vacancy.php';
}
function delete_vacancy(id) {
	if (confirm("<?php admin_write('Are you sure?','Adakah anda pasti?');?>")==true){
   		$("#list_vacancy_div").load("list_vacancy.php",{"id":id,"MM_delete":1});
   }
}
function add_vacancy_num(id) {
	$("#list_vacancy_div").load("list_vacancy.php",{"id":id,"add_vacancy_num":1});
}
function delete_vacancy_num(id) {
	$("#list_vacancy_div").load("list_vacancy.php",{"id":id,"delete_vacancy_num":1});
}
function padam_orgchart(id) {
	$("#orgchart_photo").load("padam_orgchart.php",{"id":id,"delete_orgchart":1});
}
/* 
function add_new_mailserver() {
		$("#dialog").load("add_new_mailserver.php", function() {
				setTimeout("centerdialog('dialog')",350);
		}).dialog({"title":"<?php admin_write('Add New Mail Server','Tambah Server Emel Baru');?>","height":"auto","width":500}).dialog("open"); 
}
*/
function add_new_mailserver() {
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add New Mail Server','Tambah Server Emel Baru');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
                return $message;
            },
		buttons: [{
			id: 'btn-add-new-mailsrvr',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Add New Mail Server','Tambah Server Emel Baru');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					add_new_mailserver_submit(dialog);
				},
			autospin: false
		},{
				id: 'view-popup-close',   
				icon: 'fa fa-times',       
				label: '<?php admin_write("Close","Tutup");?>',
				cssClass: 'btn-danger', 
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
            data: {
                'pageToLoad': '../admin/add_new_mailserver.php'
            }
	});
}
function centerdialog(which) {
	$("#"+which).dialog("option", "position",'center' );
}
function add_new_mailserver_submit(dialog){ 
	if ($("#add_new_mailserver_form").valid()==true) 
	{
	var query = $("#add_new_mailserver_form").serializeArray(), json={};
	$("#mail_server_list").load("mail_server_list.php", query, function() {
		note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#note_dialog"); 
		});
	}
}
function activate(id) {
	$("#mail_server_list").load("mail_server_list.php", {"activate":1,"mailserver_id":id}, function() {});
}
/* 
function mailserver_edit(id) {
	$("#dialog").load("edit_mailserver.php",{"mailserver_id":id}, function() {
   			setTimeout("centerdialog('dialog')",350);
    }).dialog({"title":"<?php admin_write('Edit Mail Server','Kemaskini Server Emel');?>","height":"auto","width":500}).dialog("open");
}
*/
function mailserver_edit(id) {
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Edit Mail Server','Kemaskini Server Emel');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
                return $message;
            },
		buttons: [{
			id: 'btn-mailsrvr-edt',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Edit Mail Server','Kemaskini Server Emel');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					edit_mailserver_submit(dialog);
				},
			autospin: false
		},{
				id: 'view-popup-close',   
				icon: 'fa fa-times',       
				label: '<?php admin_write("Close","Tutup");?>',
				cssClass: 'btn-danger', 
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
            data: {
                'pageToLoad': '../admin/edit_mailserver.php'
            }
	});
}
function edit_mailserver_submit(id) {
	if ($("#edit_mailserver_form").valid()==true) 
	{
	var query = $("#edit_mailserver_form").serializeArray(), json={};
	$("#mail_server_list").load("mail_server_list.php", query, function() {
		note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#note_dialog"); });
	}
}
function mailserver_delete(id){
	if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system.','Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")==true){
	$("#mail_server_list").load("mail_server_list.php", {"mailserver_id":id,"MM_delete":1}, function() {
		note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_msg");  
		});
	}
}
/* 
function play_audio_video(id) {
	$("#dialog").load("dialog_play.php?id="+id, function() {
    	setTimeout("centerdialog('dialog')",350);
    }).dialog({"title":"<?php admin_write('Audio Video Player','Pemain Audio Video');?>","height":"auto","width":520,"modal":true, beforeClose: function(event, ui) {
    	jwplayer("container").remove();
    }}).dialog("open");
}
*/
function play_audio_video(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Pemain Audio Video','Audio Video Player');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/dialog_play.php?id='+id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function update_file(desc_row,fileid,page_id) {
	desc_row_text = escape(desc_row);
	$("#fail").load('list_file.php?update=1&filename='+desc_row_text+'&fileid='+fileid+'&id='+page_id);
}
function edit_file(idxs_file,page_id) {
	$("#fail").load('list_file.php?edit=1&fileid='+idxs_file+'&id='+page_id);
}
function update_file_event(desc_row,fileid,page_id) {
	desc_row_text = escape(desc_row);
	$("#fail").load('list_file_event.php?update=1&filename='+desc_row_text+'&fileid='+fileid+'&id='+page_id);
}
function edit_file_event(idxs_file,page_id) {
	$("#fail").load('list_file_event.php?edit=1&fileid='+idxs_file+'&id='+page_id);
}
function dialog_close(which) {
	$(which).delay(1000).dialog("close");
}
function reorder_parentchild() {
	var query = $("#list_parents").serializeArray(), json={};
	$("#list_parentchild").load("show_parentchild.php", query, function() {});
}
$(window).resize(function() {
        //$("#dialog").dialog("option", "position", ['center', 'center']);
    });
function add_new_page(){
	if ($("#add_page").valid()){
		create_subject();
		var title = $("#title").val();
		var fileQueue = $("#file_selected").val();
		var imageQueue = $("#image_selected").val();
		if (title != '') {
			if (fileQueue == 1 && imageQueue == 1) {
				$('#uploadifive').uploadifive('upload');
			} else if (fileQueue == 1 && imageQueue == 0) {
						$('#uploadifive').uploadifive('upload');	
			} else if (fileQueue == 0 && imageQueue == 1) {
						$('#img_uploadifive').uploadifive('upload');
			} else {
				add_new_page_submit();	
			}
			
			
		} else {
			alert("<?php admin_write('Please add new event title!','Sila tambah tajuk');?>");
			return false;
		}
	}
}
function add_new_page_submit(){
	$("#note").html("<button class='btn btn-warning infinite animated flash'><?php admin_write('Adding New Page','Sedang Menambah Halaman');?></button>");
	var pagetype = $("#pagetype").val();
	var query = $("#add_page").serializeArray(), json={};
				var desc2 = CKEDITOR.instances['desc'].getData(); 
				query.push({ name: "desc2", value: desc2 });
				$("#action").load("../admin/page_submit.php", query, function(data){
					if (data==1) {
						show_note_3sec(success_text,function(){
							if (pagetype!=""){
								location.href="page.php?pagetype="+pagetype+"&r="+$("#r").val();
							} else {
								location.href="page.php?r="+$("#r").val();
							}
						});
						
					} else {
						show_note_5sec(error_text, ".action_result");
					}
				});
}
function edit_page(){
		//show_note(loading,".action_result");
		var title = $("#title").val();
		var fileQueue = $("#file_selected").val();
		var imageQueue = $("#image_selected").val();
		if (title != '') {
			if (fileQueue == 1 && imageQueue == 1) {
				$('#uploadifive').uploadifive('upload');	
			} else if (fileQueue == 1 && imageQueue == 0) {
						$('#uploadifive').uploadifive('upload');
			} else if (fileQueue == 0 && imageQueue == 1) {
						$('#img_uploadifive').uploadifive('upload');
			} else {
				edit_page_submit();
			}
			
		} else {
			alert("<?php admin_write('Please Enter Event Title','Sila Masukkan Tajuk');?>");
			return false;
		}
}
function edit_page_submit(){
				var page_id = $("#idxs_page").val();
				var fileQueue = $("#file_selected").val();
				var imageQueue = $("#image_selected").val();
				var query = $("#edit_page").serializeArray(), json={};
				var desc2 = CKEDITOR.instances['desc'].getData(); 
				query.push({ name: "desc2", value: desc2 });
				$("#action").load("page_submit.php", query, function(data){
					if (data==1) {
						if (fileQueue == 1) {
							$("#fail").load("list_file.php?id="+page_id);
						}
						if (imageQueue == 1){
							$("#imagefail").load("list_page_image.php?id="+page_id, function() {});
						}
						show_note_5sec(success_text,".action_result");
					} else {
						show_note_5sec(error_text, ".action_result");
					}
				});
			
}
function add_new_event(){
	//alert($("#eventstype").val());
	//alert($("#link_type option:selected").val());
		var eventstype = $("#eventstype").val();
		var linktype = $("#link_type option:selected").val();
		if (eventstype==3 || eventstype==4){ // tender/sebutharga
			if (linktype>1){ // must have link_to value. otherwise, alert error
				var linkto = $("#link_to option:selected").val();
				//alert(linkto);
				if (linkto==undefined || linkto == ""){
					alert("<?php admin_write('Please select Internal Link','Sila Pilih Link Dalaman');?>");
					return false;
				}
			}
			
		};
		//return false;
		var title = $("#title").val();
		var fileQueue = $("#file_selected").val();
		var imageQueue = $("#image_selected").val();
		if (title != '') {
			note_alert_info("<?php admin_write('Please wait...','Sila tunggu...');?>",'#add_events_result');
			if (fileQueue == 1 && imageQueue == 1) {
				$('#uploadifive').uploadifive('upload');	
			} else if (fileQueue == 1 && imageQueue == 0) {
						$('#uploadifive').uploadifive('upload');
			} else if (fileQueue == 0 && imageQueue == 1) {
						$('#img_uploadifive').uploadifive('upload');
			}  else {
				add_new_event_submit();
			}
			
		} else {
			alert("<?php admin_write('Please Enter Event Title','Sila Masukkan Tajuk');?>");
			return false;
		}
}
function add_new_event_submit() {
	var query = $("#add_page").serializeArray(), json={};
	var desc2 = CKEDITOR.instances['desc'].getData(); 
	query.push({ name: "desc2", value: desc2 });
	if ($("#broadcast").attr('checked')) { // populate broadcast table
		// reconfirm first. if yes, continue. otherwise, just update
	swal({   
				title: "<?php admin_write('Broadcasting?','Siarkan Kepada Umum?');?>",   
				text: "<?php admin_write('You have selected to broadcast this information to your subscribers. Are You Sure?','Anda telah memilih untuk menyiarkan maklumat ini kepada pelanggan. Adakah Anda Pasti?');?>",  
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
				cancelButtonText: "<?php admin_write('No! Just Update','Tidak! Hanya kemaskini');?>",   
				closeOnConfirm: true,   
				closeOnCancel: true 
			}, 
			function(isConfirm){   
				if (isConfirm) {     
					$("#populate").load("populate.php", query, function(data){
			note_alert_success("<?php admin_write('Populating Email','Sedang Menjana Emel');?>",'#add_events_result');
			$("#action").load("add_edit_events_submit.php", query, function(data){
				if (data==1) {
					note_alert_success("<?php admin_write('New Content Added','Maklumat Berjaya Dimasukkan');?>",'#add_events_result');
					location.href="edit_events.php?pagetype="+$("#eventstype").val()+"&r="+escape($("#r").val());
				}
				$("#background_process").load("cron_email_multiserver.php", function(){
					note_alert_success("<?php admin_write('Sending Email','Sedang Menghantar Emel');?>",'#add_events_result');														 
				});
			});
														
		});
				} else {     
					$("#action").load("add_edit_events_submit.php", query, function(data){
				if (data==1) {
					note_alert_success("<?php admin_write('New Content Added','Maklumat Berjaya Dimasukkan');?>",'#add_events_result');
					location.href="edit_events.php?pagetype="+$("#eventstype").val()+"&r="+escape($("#r").val());
				}
			});		
					  
				} 
			});
	
		
	} else {
		$("#action").load("add_edit_events_submit.php", query, function(data){
				if (data==1) {
					note_alert_success("<?php admin_write('New Content Added','Maklumat Berjaya Dimasukkan');?>",'#add_events_result');
					location.href="edit_events.php?pagetype="+$("#eventstype").val()+"&r="+escape($("#r").val());
				}
			});		
	}
				
	
}
function add_new_event_submit2() {
	var query = $("#add_page").serializeArray(), json={};
	var desc2 = CKEDITOR.instances['desc'].getData(); 
	query.push({ name: "desc2", value: desc2 });
				
	$("#action").load("add_edit_events_submit2.php", query, function(data){
		if (data==1) {
			note_alert_success("<?php admin_write('New Content Added','Maklumat Berjaya Dimasukkan');?>",'#add_events_result');
			location.href="edit_events.php?pagetype="+$("#eventstype").val()+"&r="+escape($("#r").val());
		}
	});
}
function update_event(){
	
		var title = $("#title").val();
		var fileQueue = $("#file_selected").val();
		var imageQueue = $("#image_selected").val();
		if (title != '') {
			//note_alert_info("<?php admin_write('Please wait...','Sila tunggu...');?>",'#update_events_result');
			if (fileQueue == 1 && imageQueue == 1) {
				$('#uploadifive').uploadifive('upload');
			} else if (fileQueue == 1 && imageQueue == 0) {
						$('#uploadifive').uploadifive('upload');
			} else if (fileQueue == 0 && imageQueue == 1) {
						$('#img_uploadifive').uploadifive('upload');
			} else {
				update_event_submit();
			}
			
		} else {
			alert("<?php admin_write('Please Enter Event Title','Sila Masukkan Tajuk');?>");
			return false;
		}
}
function update_event_submit() {
	var query = $("#edit_page").serializeArray(), json={};
	var desc2 = CKEDITOR.instances['desc'].getData(); 
	var fileQueue = $("#file_selected").val();
	var imageQueue = $("#image_selected").val();
	query.push({ name: "desc2", value: desc2 });
	var idxs_page = $("#idxs_events").val();
	if ($("#broadcast").prop('checked')) { // populate broadcast table
	
	// reconfirm first. if yes, continue. otherwise, just update
		
	Swal({
		title: "<?php admin_write('Broadcasting?','Siarkan Kepada Umum?');?>",
		text: "<?php admin_write('You have selected to broadcast this information to your subscribers. Are You Sure?','Anda telah memilih untuk menyiarkan maklumat ini kepada pelanggan. Adakah Anda Pasti?');?>", 
		type: 'warning',
		showCancelButton: true,   
		confirmButtonColor: "#ff0000",   
		confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
		cancelButtonText: "<?php admin_write('No! Just Update','Tidak! Hanya kemaskini');?>",   
		closeOnConfirm: true,   
		closeOnCancel: true 
	}).then((result) => {
	  if (result.value) {
		$("#populate").load("populate.php", query, function(data){

						note_alert_info("<?php admin_write('Populating Email','Sedang Menjana Emel');?>",'#add_events_result');
						$("#action").load("../admin/add_edit_events_submit.php", query, function(data){
							if (data==1) {
								note_alert_success("<?php admin_write('Content Updated','Maklumat Berjaya Dikemaskini');?>",'#update_events_result');
								if (fileQueue == 1) {
									$("#fail").load("list_file_event.php?id="+idxs_page);
								}
								if (imageQueue == 1){
									$("#imagefail").load("list_page_image_event.php?id="+idxs_page, function() {
									$('.lightbox').lightBox();
								});
								}
								$("#background_process").load("cron_email_multiserver.php", function(){
									note_alert_success("<?php admin_write('Sending Email','Sedang Menghantar Emel');?>",'#update_events_result');														 
								});
							};

						});

					});
	  } else  {
		$("#action").load("../admin/add_edit_events_submit.php", query, function(data){
						if (data==1) {
							note_alert_success("<?php admin_write('Content Updated','Maklumat Berjaya Dikemaskini');?>",'#update_events_result');
							if (fileQueue == 1) {
								$("#fail").load("list_file_event.php?id="+idxs_page);
							}
							if (imageQueue == 1){
								$("#imagefail").load("list_page_image_event.php?id="+idxs_page, function() {
								$('.lightbox').lightBox();
							});
							}

						}
					});
	  }
	})
	/*
	swal({   
				title: "<?php admin_write('Broadcasting?','Siarkan Kepada Umum?');?>",   
				text: "<?php admin_write('You have selected to broadcast this information to your subscribers. Are You Sure?','Anda telah memilih untuk menyiarkan maklumat ini kepada pelanggan. Adakah Anda Pasti?');?>",  
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
				cancelButtonText: "<?php admin_write('No! Just Update','Tidak! Hanya kemaskini');?>",   
				closeOnConfirm: true,   
				closeOnCancel: true 
			}, 
			function(isConfirm){   
				if (isConfirm) {     
					$("#populate").load("populate.php", query, function(data){

						note_alert_success("<?php admin_write('Populating Email','Sedang Menjana Emel');?>",'#add_events_result');
						$("#action").load("../admin/add_edit_events_submit.php", query, function(data){
							if (data==1) {
								note_alert_success("<?php admin_write('Content Updated','Maklumat Berjaya Dikemaskini');?>",'#update_events_result');
								if (fileQueue == 1) {
									$("#fail").load("list_file_event.php?id="+idxs_page);
								}
								if (imageQueue == 1){
									$("#imagefail").load("list_page_image_event.php?id="+idxs_page, function() {
									$('.lightbox').lightBox();
								});
								}
								$("#background_process").load("cron_email_multiserver.php", function(){
									note_alert_success("<?php admin_write('Sending Email','Sedang Menghantar Emel');?>",'#update_events_result');														 
								});
							};

						});

					});
				} else {     
					$("#action").load("../admin/add_edit_events_submit.php", query, function(data){
						if (data==1) {
							note_alert_success("<?php admin_write('Content Updated','Maklumat Berjaya Dikemaskini');?>",'#update_events_result');
							if (fileQueue == 1) {
								$("#fail").load("list_file_event.php?id="+idxs_page);
							}
							if (imageQueue == 1){
								$("#imagefail").load("list_page_image_event.php?id="+idxs_page, function() {
								$('.lightbox').lightBox();
							});
							}

						}
					});
					  
				} 
			});*/
		
	} else {
				
	$("#action").load("../admin/add_edit_events_submit.php", query, function(data){
		if (data==1) {
			note_alert_success("<?php admin_write('Content Updated','Maklumat Berjaya Dikemaskini');?>",'#update_events_result');
			if (fileQueue == 1) {
				$("#fail").load("list_file_event.php?id="+idxs_page);
			}
			if (imageQueue == 1){
				$("#imagefail").load("list_page_image_event.php?id="+idxs_page, function() {
				$('.lightbox').lightBox();
			});
			}
			
		}
	});
	}
}
	 
/* 
function add_poll() {
	$("#dialog").load("add_poll.php",function() { 
		centerdiv();
	}).dialog({"height":"auto","width":<?php echo $default_width;?>,"title":"<?php admin_write('Add New Poll','Tambah Undian Baru');?>", "modal":true}).dialog("open");
}
*/ 
function add_poll(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add New Poll','Tambah Undian Baru');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-add-pll',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Add New Poll','Tambah Undian Baru');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					add_poll_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/add_poll.php'
		}
	});
}
function add_poll_submit(dialog)
{
	if ($("#poll_add_form").valid()==true) 
	{
		var query = $("#poll_add_form").serializeArray(), json = {}; 
		$("#poll_div").load("poll_list.php", query, function() {
			$('#poll_add_form')[0].reset();
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#msg_popup");
		}); 	
	}
} 
/* 
function edit_poll(id) {
	$("#dialog").load("edit_poll.php?id="+id,function() 
	{ 
		centerdiv();
	}).dialog({"height":"auto","width":<?php echo $default_width;?>,"title":"<?php admin_write('Edit Poll','Kemaskini Undian');?>", "modal":true}).dialog("open");
}
*/
function edit_poll(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Edit Poll','Kemaskini Undian');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-pll',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Edit Poll','Kemaskini Undian');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					edit_poll_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/edit_poll.php?id='+id
		}
	});
}
function edit_poll_submit(dialog)
{
	if ($("#poll_edit_form").valid()==true) 
	{
		var query = $("#poll_edit_form").serializeArray(), json = {}; 
		$("#poll_div").load("../admin/poll_list.php", query, function() {
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya kemaskini');?>","#msg_popup");
		}); 
	}
}
function delete_poll(id){
	if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system.','Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")==true)
	 { 
		$("#poll_div").load("../admin/poll_list.php", {"delrow":id}, function() {
			note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_note");
		});  
    }
}
/* 
function view_poll(id) {
	$("#dialog").load("view_poll.php?id="+id,function() 
	{
		centerdiv();
	}).html(loading_graf).dialog({"height":"auto", "resizable":false,"width":<?php echo $default_width;?>,"title":"<?php admin_write('View Poll Result','Lihat Keputusan Undian');?>", "modal":true}).dialog("open").on('dialogclose', function(event) {
location.reload();
	});
}
*/
function view_poll(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('View Poll Result','Lihat Keputusan Undian');?>",
		size: BootstrapDialog.SIZE_FULL ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-danger', 
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
			poll_display_chart(id);
		},
		data: {
			'pageToLoad': '../admin/view_poll.php?id='+id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function poll_display_chart(id_poll) 
{
    var chart_type = $('#chart_type').val();
	if (chart_type == 'pie')
	{
		$("#chart_div").load("../admin/poll_chart_pie.php", {"id_poll":id_poll}).html(loading_graf); 
	}
	else if (chart_type == 'hor_bar')
	{
		$("#chart_div").load("../admin/poll_chart_bar.php", {"id_poll":id_poll}).html(loading_graf); 
	}
	else if (chart_type == 'line')
	{
		$("#chart_div").load("../admin/poll_chart_line.php", {"id_poll":id_poll}).html(loading_graf); 
	}
	 
}

function directory_cat(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Manage Dept/Division','Urus Jabatan/Bahagian');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: "<?php admin_write('Full Screen','Skrin Penuh');?>",
			cssClass: 'btn-primary  hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: "<?php admin_write('Normal Screen','Skrin Biasa');?>",
			cssClass: 'btn-warning hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-danger', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
			$("#display_dir_cat_list").load("directory_cat_senarai.php", function(){
				
			});
		},
		data: {
			'pageToLoad': '../admin/directory_cat.php'
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function show_main_dept(){
	$("#display_dir_cat_list").load("directory_cat_senarai_toplevel.php");
}
function show_full_dept(){
	$("#display_dir_cat_list").load("directory_cat_senarai.php");
}
function show_dir_cat_form() 
{ 
	$("#display_dir_cat_form").load("directory_cat_add.php");
}
function add_directory_cat(){  
	if ($("#directory_add_form").valid()==true) 
	{
		var query = $("#directory_add_form").serializeArray(), json = {}; 
		$("#display_dir_cat_list").load("directory_cat_senarai.php", query, function() 
		{ 
			$("#display_dir_cat_form").load("directory_cat_add.php", query, function() 
			{
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#msg_popup");  
			}); 	
		}); 	 
	}
} 
function delete_directory_cat(id) {
	
	const swalWithBootstrapButtons = swal.mixin({
	  confirmButtonClass: 'btn btn-success',
	  cancelButtonClass: 'btn btn-danger',
	  buttonsStyling: false,
	})

	swalWithBootstrapButtons({
	  title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
	  text: "<?php admin_write('Deleted items cannot be retrieved from the system','Data yang telah dipadam tidak boleh diakses semula dari sistem');?>",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonText: "<?php admin_write('Yes. Delete It!','Ya. Padamkannya!');?>",
	  cancelButtonText: "<?php admin_write('No!','Tidak!');?>",
	  reverseButtons: true
	}).then((result) => {
	  if (result.value) {
		$("#display_dir_cat_list").load("directory_cat_senarai.php",{"idxs_directory_cat":id,"MM_delete":1});
		note_alert_success("<?php admin_write('Data succesfully deleted','Data berjaya dipadam');?>","#msg_popup");
		  $("#directory_cat_list_select").load("directory_cat_list_var.php?directory_cat_var=directory_cat_id", function() {

			});
	  } else if (
		// Read more about handling dismissals
		result.dismiss === swal.DismissReason.cancel
	  ) {
		swalWithBootstrapButtons(
		  "<?php admin_write('Cancelled','Dibatalkan');?>",
		  "<?php admin_write('Data not deleted','Data tidak dipadam');?>",
		  'error'
		)
	  }
	})

}
function edit_directory_cat(id)
{ 
	$("#display_dir_cat_form").load("directory_cat_edit.php?id="+id, function() 
	{ 
		$("#directory_cat_text").focus();
	});
}
function update_directory_cat()
{
	if ($("#directory_edit_form").valid()==true) 
	{      
		var query = $("#directory_edit_form").serializeArray(), json = {}; 
		$("#display_dir_cat_list").load("directory_cat_senarai.php", query, function() 
		{ 
			$("#display_dir_cat_form").load("directory_cat_add.php", query, function() 
			{
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");  
			}); 	
		}); 	 	
	}
}
 
function directory_cat_reorder()
{   
		var query = $("#form2").serializeArray(), json = {}; 
		$("#display_dir_cat_list").load("directory_cat_senarai.php?reorder=Reorder", query, function() 
		{ 
			beautable(".senarai");
			note_alert_success("<?php admin_write('Record succesfully sorted','Maklumat berjaya disusun');?>","#msg_popup"); 	
		}); 	  
}

function directory_add(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Manage Staff Directory','Urus Direktori Staf');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>').clone();
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-drctry-add',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Add Staff','Tambah Kakitangan');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					add_directory_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			img_uploadifive_avatar_add();
			
		},
		onhide: function(){
			$('.qtip').remove();
		},
		data: {
			'pageToLoad': '../admin/add_edit_directory.php'
		}
	});
}
function img_uploadifive_avatar_add(){
	var moddate = $("#directory_add_form #directory_moddate").val();
	var modby = $("#directory_add_form #directory_modby").val();
	var token = md5('unique_salt'+moddate); 

	$('#img_uploadifive').uploadifive({
		'auto'             : false,
		'checkScript'      : 'plugins/uploadifive/check-exists.php',
		'formData'         : {
							   'timestamp' : moddate,
							   'token'     : token,
							   'modby'	   : modby, 
								'moddate'	: moddate, 
								'id_page'	: moddate
							 },
		'multi'				: false,
		'fileType'			: 'image/*',
		'buttonText'		: "<i class='far fa-file-image'></i> <?php admin_write('Select Images','Pilih Imej');?>",
		'removeCompleted'	: true,
		'dnd'				: true,					 
		'queueID'          : 'imageQueue',
		'uploadScript'     : 'plugins/uploadifive/img_uploadifive_directory.php',
		'onSelect'			: function(queue) {
							//alert('The file ' + file.name + ' was added to the queue.');
							$("#image_selected").val("1");
							//$("#directory_pix").val(queue.count);
						},
		'onClearQueue'		: function(queueItemCount) {
							$("#image_selected").val("0");
						} ,
		
		'onQueueComplete' : function(file, data) { 
			insert_directory();
		}
	});
}
function add_directory_submit(dialog)
{ 
	if ($("#directory_add_form").valid()==true) 
	{
		var title = $("#directory_name").val();
		var imageQueue = $("#image_selected").val();
 
			if (imageQueue == 1) {
				$('#img_uploadifive').uploadifive('upload');
					
			} else {
				insert_directory();
			} 
	}
		
}

function insert_directory(){
	var timestamp = timenow();
	var query = $("#directory_add_form").serializeArray(), json = {};
	$('#showlist_div').load('show_list_directory.php',query, function() {
			$("#image_selected").val("0");
			$("#directory_moddate").val(timestamp);
			img_uploadifive_avatar_add();
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>",".action_result");
			$(".allowreset").val("");
			
		}); 
}

function edit_directory(directory_id,is_search) {
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Update Staff Directory','Kemaskini Direktori Kakitangan');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-drctry',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Update Staff','Kemaskini Kakitangan');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					edit_directory_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			img_uploadifive_avatar_edit();
		},
		onhide: function(){
			$('.qtip').remove();
		},
		data: {
			'pageToLoad': '../admin/add_edit_directory.php?edit=1&directory_id='+directory_id+'&is_search='+is_search
		}
	});
}
function img_uploadifive_avatar_edit(){
	var moddate = $("#directory_edit_form #directory_moddate").val();
	var modby = $("#directory_edit_form #directory_modby").val();
	var token = md5('unique_salt'+moddate); 
	var id_page = $("#directory_edit_form #idxs_directory").val();
	var directory_pix = $("#directory_edit_form #directory_pix").val();
	
	$('#img_uploadifive').uploadifive({
		'auto'             : false,
		'checkScript'      : 'plugins/uploadifive/check-exists.php',
		'formData'         : {
							   'timestamp' : moddate,
							   'token'     : token,
							   'modby'	   : modby, 
								'moddate'	: moddate, 
								'id_page'	: id_page
							 },
		'multi'				: false,
		'fileType'			: 'image/*',
		'buttonText'		: "<i class='far fa-file-image'></i> <?php admin_write('Select Images','Pilih Imej');?>",
		'removeCompleted'	: true,
		'dnd'				: true,					 
		'queueID'          : 'imageQueue',
		'uploadScript'     : 'plugins/uploadifive/img_uploadifive_directory.php',
		'onSelect'			: function(file) {
							//alert('The file ' + file.name + ' was added to the queue.');
							$("#image_selected").val("1");
							$("#directory_pix").val(file.name);
						},
		'onClearQueue'		: function(queueItemCount) {
							$("#image_selected").val("0");
						} ,
		
		'onQueueComplete' : function(file, data) { 
			update_directory();
		}
	});
}
function edit_directory_submit(dialog){
		
	if ($("#directory_edit_form").valid()==true) 
	{
		var title = $("#directory_name").val();
		var imageQueue = $("#image_selected").val();
	 
		if (imageQueue == 1) {
			$('#img_uploadifive').uploadifive('upload');
		} else {
			update_directory();
		} 		
	}
}

function update_directory(){
	// get the keyword search, if available
	var keyword = $("#search #keyword").val();
	var directory_moddate = $("#directory_edit_form #directory_moddate").val();
	var directory_cat_id = $("#search #directory_cat_id").val();
	var timestamp = timenow();
		
	if ($("#directory_edit_form").valid()==true) 
	{   var idxsd = $("#idxs_directory").val(); 
		var query = $("#directory_edit_form").serializeArray(), json = {}; 
		query.push({ name: "keyword", value: keyword });
	 	query.push({ name: "directory_cat_id", value: directory_cat_id});
		$('#showlist_div').load('show_list_directory.php', query, function() {
			if ($("#image_selected").val()==1){
				$("#directory_pix_div").load("directory_pix.php?directory_id="+idxsd);
				$("#directory_moddate").val(timestamp);
				$("#image_selected").val("0");
				img_uploadifive_avatar_edit();
				//$("#div_add_edit").load("add_edit_directory.php?edit=1&id="+idxsd);
			}
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");  
		}); 	
	}
}

function confirm_deletedirectory(id,is_search){

	var query = $("#search").serializeArray(), json = {}; 
	
	Swal({
		title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
		text: "<?php admin_write('Deleted items cannot be retrieved from the system.','Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>",
		type: 'warning',
		showCancelButton: true,   
		confirmButtonColor: "#ff0000",   
		confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
		cancelButtonText: "<?php admin_write('No!','Tidak!');?>",   
		closeOnConfirm: true,   
		closeOnCancel: true 
	}).then((result) => {
	  if (result.value) {
		  if (is_search==1){
			  query.push({ name: "is_search", value: is_search });
		  }
		query.push({ name: "delete", value: 1 });
	 	query.push({ name: "delid", value: id});
		$("#showlist_div").load("show_list_directory.php",query, function() {
		    note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_note");  
		})
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		
	  }
	})
	
}
function padam_directory_pix(file_id,directory_id){
	var timestamp = timenow();
	Swal({
		title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
		text: "<?php admin_write('Deleted items cannot be retrieved from the system.','Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>",
		type: 'warning',
		showCancelButton: true,   
		confirmButtonColor: "#ff0000",   
		confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
		cancelButtonText: "<?php admin_write('No!','Tidak!');?>",   
		showLoaderOnConfirm: true,
		  preConfirm: function() {
			return new Promise(function(resolve) {
			  setTimeout(function() {
				resolve()
			  }, 2000)
			})
		  }
	}).then((result) => {
	  if (result.value) {
		$("#directory_pix_div").load("padam_directory_pix.php", {"directory_id":directory_id,"file_id":file_id,"padam_directory_pix":1}, function() {  
			$("#directory_avatar_"+directory_id).load("directory_avatar.php?directory_id="+directory_id+"&file_id="+file_id+"&timestamp="+timestamp);
		}); 
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		
	  }
	})
	
}
function add_new_banner(banner_group){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add New Banner','Tambah Banner Baru');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-add-new-bnnr',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Add New Banner','Tambah Banner Baru');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
				add_banner_uploadifive(banner_group);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			img_uploadifive_banner_add();
			datepicker();
		},
		onhide: function(){
			$('.qtip').remove();
		},
		data: {
			'pageToLoad': '../admin/add_edit_banner.php?banner_group='+banner_group
		}
	});
}
function img_uploadifive_banner_add(){
	var moddate = $("#add_banner_form #banner_moddate").val();
	var modby = $("#add_banner_form #banner_modby").val();
	var token = md5('unique_salt'+moddate); 
	var banner_group = $("#add_banner_form #banner_group").val();

	$('#img_uploadifive').uploadifive({
		'auto'             : false,
		'checkScript'      : 'plugins/uploadifive/check-exists.php',
		'formData'         : {
							   	'timestamp' : moddate,
							   	'token'     : token,
							   	'modby'	   	: modby, 
								'moddate'	: moddate, 
								'id_page'	: moddate
							 },
		'multi'				: false,
		'fileType'			: 'image/*',
		'buttonText'		: "<i class='far fa-file-image'></i> <?php admin_write('Select Images','Pilih Imej');?>",
		'removeCompleted'	: true,
		'dnd'				: true,					 
		'queueID'          : 'imageQueue',
		'uploadScript'     : 'plugins/uploadifive/banner_uploadifive.php',
		'onSelect'			: function(queue) {
							//alert('The file ' + file.name + ' was added to the queue.');
							$("#image_selected").val("1");
							
						},
		'onClearQueue'		: function(queue) {
							$("#image_selected").val("0");
						} ,
		
		'onQueueComplete' : function(uploads) { 
			add_banner_submit(banner_group);
		}
	});
}
function add_banner_submit(){
	var timestamp = timenow();
	var query = $("#add_banner_form").serializeArray(), json = {};
	$('#banner_div').load('banner_list.php',query, function() {
			$("#image_selected").val("0");
			$("#banner_moddate").val(timestamp);
			img_uploadifive_banner_add();
			note_alert_success("<?php admin_write('Banner succesfully added','Banner berjaya ditambah');?>",".action_result");
			$(".allowreset").val("");
			
		}); 
}
/*
function add_banner_submit(banner_group, dialog){
	if ($("#add_banner_form").valid()==true) {
		var query = $("#add_banner_form").serializeArray(), json = {};
		$("#banner_div").load("../admin/banner_list.php?banner_group="+banner_group, query, function(){
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#msg_popup"); 
			$("#action").dialog("close");																							 
		});
		
	}
}
*/
function add_banner_uploadifive(banner_group){
	
	if ($("#add_banner_form").valid()==true)  {
		var title = $("#banner_title").val();
		var imageQueue = $("#image_selected").val();
	 
		if (imageQueue == 1) {
			$('#img_uploadifive').uploadifive('upload');
		} else {
			add_banner_submit(banner_group);
		} 		
	}
}
function delete_banner(banner_id,banner_group) {
	Swal({
		title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
		text: "<?php admin_write('Deleted items cannot be retrieved from the system.','Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>",
		type: 'warning',
		showCancelButton: true,   
		confirmButtonColor: "#ff0000",   
		confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
		cancelButtonText: "<?php admin_write('No!','Tidak!');?>",   
		closeOnConfirm: true,   
		closeOnCancel: true 
	}).then((result) => {
	  if (result.value) {
		$("#banner_div").load("banner_list.php", {"delrow":banner_id,"banner_group":banner_group});
					note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_msg");
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		swal("<?php admin_write('Cancelled','Dibatalkan');?>", "<?php admin_write('You have cancelled this action','Anda telah membatalkan tindakan ini');?>", "error");
	  }
	})
	

	
		
}
function datepicker(){
	$("#action").load("datepicker.php");
}
function edit_banner(banner_id, banner_group) {
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Edit Banner','Kemaskini Banner');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
                return $message;
            },
		buttons: [{
			id: 'btn-edit-bnnr',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Edit Banner','Kemaskini Banner');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					edit_banner_uploadifive(banner_group,dialog);
				},
			autospin: false
		},{
				id: 'view-popup-close',   
				icon: 'fa fa-times',       
				label: '<?php admin_write("Close","Tutup");?>',
				cssClass: 'btn-danger', 
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
				img_uploadifive_banner_edit(dialog);
				datepicker();
            },
            data: {
				'pageToLoad': '../admin/add_edit_banner.php?banner_id='+banner_id
            }
	});
}
function img_uploadifive_banner_edit(dialog){
	var moddate = $("#edit_banner_form #banner_moddate").val();
	var modby = $("#edit_banner_form #banner_modby").val();
	var token = md5('unique_salt'+moddate); 
	var banner_group = $("#edit_banner_form #banner_group").val();

	$('#img_uploadifive').uploadifive({
		'auto'             : false,
		'checkScript'      : 'plugins/uploadifive/check-exists.php',
		'formData'         : {
							   	'timestamp' : moddate,
							   	'token'     : token,
							   	'modby'	   	: modby, 
								'moddate'	: moddate, 
								'id_page'	: moddate
							 },
		'multi'				: false,
		'fileType'			: 'image/*',
		'buttonText'		: "<i class='far fa-file-image'></i> <?php admin_write('Select Images','Pilih Imej');?>",
		'removeCompleted'	: true,
		'dnd'				: true,					 
		'queueID'          : 'imageQueue',
		'uploadScript'     : 'plugins/uploadifive/banner_uploadifive.php',
		'onSelect'			: function(queue) {
							//alert('The file ' + file.name + ' was added to the queue.');
							$("#image_selected").val("1");
							
						},
		'onClearQueue'		: function(queue) {
							$("#image_selected").val("0");
						} ,
		
		'onQueueComplete' : function(uploads) { 
			edit_banner_submit(banner_group,dialog);
		}
	});
}
function edit_banner_uploadifive(banner_group,dialog){
	
	if ($("#edit_banner_form").valid()==true) 
	{
		var title = $("#banner_title").val();
		var imageQueue = $("#image_selected").val();
	 
		if (imageQueue == 1) {
			$('#img_uploadifive').uploadifive('upload');	
		} else {
			edit_banner_submit(banner_group,dialog);
		} 		
	}
}
function edit_banner_submit(banner_group,dialog){
	if ($("#edit_banner_form").valid()==true) {	
		var banner_id = $("#edit_banner_form #idxs_banner").val();
		var query = $("#edit_banner_form").serializeArray(), json = {};
		$("#banner_div").load("banner_list.php?banner_group="+banner_group, query, function(){
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");
			dialog.close();
			edit_banner(banner_id, banner_group);
			/*$("#banner_pix").load("banner_pix.php", {"banner_id":banner_id}, function(){
				
			});*/
	});

	}
}

function edit_fb_form(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Edit Survey Form','Kemaskini Borang Kajiselidik');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-blk-asrama',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Edit Survey Form','Kemaskini Borang Kajiselidik');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					edit_fb_form_submit(dialog) ;
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			qtip();
		},
		onhide: function(){
			$('.qtip').remove();
		},
		data: {
			'pageToLoad': '../admin/edit_fb_form.php?id='+id
		}
	});
}

function manage_fb_form_cat(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Manage Feedback Category','Urus Kategori Soalan');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/manage_fb_form_cat.php?id='+id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function add_fb_form_cat_submit()
{
	if ($("#add_fb_form_cat_form").valid()==true) 
	{      
		var query = $("#add_fb_form_cat_form").serializeArray(), json = {};
		var nh = $("#add_fb_form_cat_form #fb_form_type_id").val();
		$("#list_fb_cat_detail").load("../admin/list_manage_fb_form_cat.php?id="+nh , query, function(){
			$("#survey_ques_div").load("manage_survey_ques_list.php?id_survey="+nh);
			buttonit();   
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#msg_popup");
			$("#add_fb_form_cat_form")[0].reset();
		});
	}
}
function padam_fb_form_cat(id, id_type)
{ 
	if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system.','Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")==true)
	{
	$("#action").load("../admin/delete_fb_form_cat.php", {"delete_fb_form_cat":1,"idxs_maklumbalas_category":id,"id_type":id_type}, function(){
	    $("#dialog").load("../admin/manage_fb_form_cat.php?id="+id_type, function(){
		$("#survey_ques_div").load("manage_survey_ques_list.php?id_survey="+id_type);
		buttonit();		
		note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#msg_popup");
		});
		
	}); 
}}
function kemaskini_fb_form_cat(id,id_type) 
{
	$("#cat_"+id).load("../admin/kemaskini_fb_form_cat.php?id="+id+"&id_type="+id_type);
}
 
function kemaskini_fb_form_cat_submit(id_fb_cat,id_type)
{
	if ($("#edit_fb_form_cat_form").valid()==true) 
	{ 
		var query = $("#edit_fb_form_cat_form").serializeArray(), json = {}; 
		$("#cat_"+id_fb_cat).load("../admin/kemaskini_fb_form_cat_submit.php?id_fb_cat="+id_fb_cat+"&id_type="+id_type, query, function(){
		$("#survey_ques_div").load("manage_survey_ques_list.php?id_survey="+id_type);
		buttonit();
	    note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#kemaskini_note"); 
	    });
		
		
	}
}
 
function delete_fb_form(id) { 
	Swal({
		title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
		text: "<?php admin_write('Form information such as lists of questions, answers and respondents will be deleted from the system','Maklumat borang seperti senarai soalan, jawapan dan responden akan dipadam dari sistem');?>",
		type: 'warning',
		showCancelButton: true,   
		confirmButtonColor: "#ff0000",   
		confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
		cancelButtonText: "<?php admin_write('No!','Tidak!');?>",   
		closeOnConfirm: true,   
		closeOnCancel: true 
	}).then((result) => {
	  if (result.value) {
		$("#action").load("../admin/delete_fb_form.php", {"delete_fb_form":1,"idmbtype":id}, function(){
		$("#survey_div").load("survey_list.php", function() {

		    note_alert_success("<?php admin_write('Survey succesfully deleted','Maklumat kajiselidik berjaya dipadam');?>","#page_note");  
		}); });
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		
	  }
	})
	
} 
function delete_fb_form_with_respondent(id)
{ 
	if (confirm("<?php admin_write('First Reminder: Are you sure? Form information such as lists of questions and answers will be deleted from system.','Peringatan Pertama: Adakah anda pasti? Maklumat borang seperti senarai soalan dan jawapan akan dipadam dari sistem.');?>")) 
	{
		if (confirm("<?php admin_write('Last Reminder: Are you sure? Deleted items cannot be retrieved from the system.','Peringatan Terakhir: Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")) 
	    {
		$("#action").load("../admin/delete_fb_form.php", {"delete_fb_form_with_respondent":1,"idmbtype":id}, function(){
		$("#survey_div").load("survey_list.php", function() {
			buttonit(); 
		    note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_note");  
		}); }); 
		}
		
	}
} 
/* 
function manage_fb_form_ques(id) 
{
 	$("#dialog").load("../admin/edit_fb_form_ques.php?id="+id, function() {
		buttonit();
	}).dialog({"title":"<?php admin_write('Manage Feedback Question','Urus Soalan Maklumbalas');?>","width":<?php echo $default_width;?>,"height":default_height,"modal":true}).dialog("open");	
}
*/
function manage_fb_form_ques(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Urus Soalan Maklumbalas','Manage Feedback Question');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/edit_fb_form_ques.php?id='+id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function kemaskini_fb_form_ques(id, id_cat) 
{
	$("#ques_"+id).load("../admin/kemaskini_fb_form_ques.php?id="+id+"&id_cat="+id_cat);
}
function kemaskini_fb_form_ques_submit(id_fb_ques, id_cat)
{
	if ($("#fb_form_ques_form").valid()==true) 
	{ 
	var fb_form_ques_text = $("#ques_"+id_fb_ques+" #fb_form_ques").val();
	$("#ques_"+id_fb_ques).load("../admin/kemaskini_fb_form_ques_submit.php", {"fb_form_ques_text":fb_form_ques_text,"MM_update":"fb_form_ques_text_input","id_fb_ques":id_fb_ques,"id_cat":id_cat}, function(){
		buttonit()
	   note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#page_note_"+id_cat); 
	});
	}
}
function add_fb_ques(idfbtyp){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add Survey Question','Tambah Soalan Maklumbalas');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-blk-asrama',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Add Survey Question','Tambah Soalan Maklumbalas');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					add_fb_ques_form_submit(idfbtyp, dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			qtip();
		},
		onhide: function(){
			$('.qtip').remove();
		},
		data: {
			'pageToLoad': '../admin/add_fb_ques.php?idfbtyp='+idfbtyp
		}
	});
}
function add_fb_ques_form_submit(id, dialog) { 
	if ($("#add_fb_ques_form").valid()){ 
	var query = $("#add_fb_ques_form").serializeArray(), json={};
	$("#survey_ques_div").load("../admin/manage_survey_ques_list.php?id_survey="+id,query,function() { 
		dialog.close();
		add_fb_ques(id);
		note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#note_dialog2");   
		
		   
	});	
	}
}
function edit_fb_form_submit(dialog) 
{
	if ($("#edit_fb_form_form").valid()){
	var query = $("#edit_fb_form_form").serializeArray(), json={};
	$("#survey_div").load("survey_list.php",query, function() {
		 buttonit();
	  note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#note_dialog"); 
	});	
	}
}

function add_fb_form(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add Feedback Form','Tambah Borang Kajiselidik');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-blk-asrama',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Add Feedback Form','Tambah Borang Kajiselidik');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					add_fb_form_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			qtip();
		},
		onhide: function(){
			$('.qtip').remove();
		},
		data: {
			'pageToLoad': '../admin/add_fb_form.php'
		}
	});
}
function add_fb_form_submit(dialog) {
	if ($("#add_fb_form_form").valid()){
	var query = $("#add_fb_form_form").serializeArray(), json={};
	$("#survey_div").load("survey_list.php",query, function() {
		note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#note_dialog"); 
		$("#add_fb_form_form")[0].reset();
	});	
	}
}
function padam_fb_form_ques(id,id_survey)
{ 
	if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system.','Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")==true)
	{
	$("#action").load("../admin/delete_fb_form_ques.php", {"delete_fb_form_ques":1,"idxs_maklumbalas_question":id}, function()
	{
		$("#survey_ques_div").load("manage_survey_ques_list.php", {"id_survey":id_survey}, function()
		{
			note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_note");  
		});	 
	});
	}
}
function view_statement_checkbox_answ(id) {
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('View Answer Choice','Lihat Pilihan Jawapan');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/manage_statement_checkbox_answ.php?id='+id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function edit_statement_checkbox_answ(id,id_parent_ques) 
{
	$("#ques_"+id).load("../admin/edit_statement_checkbox_answ.php?id="+id+"&id_parent_ques="+id_parent_ques);
}
/*function edit_statement_checkbox_answ_submit(id_fb_ques,id_parent_ques)
{
	if ($("#edit_cb_answ").valid())
	{
	var fb_form_ques_text = $("#ques_"+id_fb_ques+" #fb_form_ques").val();
	$("#ques_"+id_fb_ques).load("../admin/edit_statement_checkbox_answ_submit.php", {"fb_form_ques_text":fb_form_ques_text,"MM_update":"fb_form_ques_text_input","id_fb_ques":id_fb_ques,"id_parent_ques":id_parent_ques}, function(){
		buttonit() 
		note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#note_dialog"); 
 	});
	} ;
} */
function edit_statement_checkbox_answ_submit(id_fb_ques,id_parent_ques)
{
	if ($("#edit_cb_answ").valid())
	{ 	
		var query = $("#ques_"+id_fb_ques+" #edit_cb_answ").serializeArray(), json={};
		$("#ques_"+id_fb_ques).load("../admin/edit_statement_checkbox_answ_submit.php?id_fb_ques="+id_fb_ques+"&id_parent_ques="+id_parent_ques, query, function(){
		buttonit() 
		note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#note_dialog"); 
 		});
	} 
} 
function delete_statement_checkbox_answ(id,id_parent_ques)
{ 
if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system.','Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")==true){
	$("#action").load("../admin/delete_statement_checkbox_answ.php", {"delete_fb_form_ques":1,"idxs_maklumbalas_question":id,"id_parent_ques":id_parent_ques}, function(){
		 
		 $("#dialog").load("../admin/manage_statement_checkbox_answ.php?id="+id_parent_ques, function() {
			note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#note_dialog");  
		}); 
	}); 
}}
function add_statement_checkbox_answ(){
if ($("#add_statement_checkbox_answ_form").valid())
	{
	var query = $("#add_statement_checkbox_answ_form").serializeArray(), json = {};
	var nh = $("#add_statement_checkbox_answ_form #fb_form_ques_id").val();
	$("#list_statement_checkbox_answ").load("../admin/view_statement_checkbox_answ.php?id="+nh , query, function(){
		buttonit(); 
		note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#div_add"); 
		$("#statement_checkbox_answ").val('').focus(); 
	});
	}
}
function kemaskini_fb_form_ques_popup(idfbques,id_survey){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Edit Survey Question','Kemaskini Soalan Maklumbalas');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-blk-asrama',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Edit Survey Question','Kemaskini Soalan Maklumbalas');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
				kemaskini_fb_form_ques_popup_submit(idfbques, id_survey, dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/kemaskini_fb_form_ques_popup.php?idfbques='+idfbques+'&id_survey='+id_survey
		}
	});
}
function kemaskini_fb_form_ques_popup_submit(idfbques, id_survey, dialog) {
	if ($("#edit_fb_ques_form").valid()){
	var query = $("#edit_fb_ques_form").serializeArray(), json={};
	 $("#note_dialog2").load("../admin/edit_fb_form_ques.php?id="+idfbques,query,function() 
	 {

		$("#survey_ques_div").load("manage_survey_ques_list.php", {"id_survey":id_survey}, function()
		{
			note_alert_success("<?php admin_write('Information succesfully edited','Maklumat berjaya dikemaskini');?>","#dialog_note");  
		}); 
	});	
	}
}
/* 
function view_survey_respondent(idmbt) 
{
	$("#dialog").load("../admin/list_survey_respondent.php?idmbt="+idmbt, function() {
		buttonit();
	}).dialog({"title":"<?php admin_write('List of Respondent','Senarai Responden');?>","width":default_width,"height":default_height,"modal":true}).dialog("open");
}
 */
function view_survey_respondent(idmbt){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('List of Respondent','Senarai Responden');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/list_survey_respondent.php?idmbt='+idmbt
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
 

function faq_cat_manage(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Manage Question Category','Urus Kategori Soalan');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Skrin Penuh");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/manage_faq_cat.php'
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function add_faq_cat(dialog)
{  
	if ($("#faq_add_form").valid()==true) 
	{
		var query = $("#faq_add_form").serializeArray(), json = {}; 
		$("#display_faq_cat_list").load("faq_cat_senarai.php", query, function() 
		{ 
			$("#display_faq_cat_form").load("faq_cat_add.php", query, function() 
			{
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#msg_popup");  
			}); 	
		}); 	 
	}
} 
function edit_faq_cat(id)
{ 
	$("#display_faq_cat_form").load("faq_cat_edit.php?id="+id, function() 
	{ 
		$("#faq_cat_text").focus();
	});
}
function update_faq_cat()
{
	if ($("#faq_edit_form").valid()==true) 
	{      
		var query = $("#faq_edit_form").serializeArray(), json = {}; 
		$("#display_faq_cat_list").load("faq_cat_senarai.php", query, function() 
		{ 
			$("#display_faq_cat_form").load("faq_cat_add.php", query, function() 
			{
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");  
			}); 	
		}); 	 	
	}
}
function show_faq_cat_form() 
{ 
	$("#display_faq_cat_form").load("faq_cat_add.php");
}
function delete_faq_cat(id){
	const swalWithBootstrapButtons = swal.mixin({
	  confirmButtonClass: 'btn btn-success',
	  cancelButtonClass: 'btn btn-danger',
	  buttonsStyling: false,
	})

	swalWithBootstrapButtons({
	  title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
	  text: "<?php admin_write('Deleted items cannot be retrieved from the system','Data yang telah dipadam tidak boleh diakses semula dari sistem');?>",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonText: "<?php admin_write('Yes. Delete It!','Ya. Padamkannya!');?>",
	  cancelButtonText: "<?php admin_write('No!','Tidak!');?>",
	  reverseButtons: true
	}).then((result) => {
	  if (result.value) {
		$("#display_faq_cat_list").load("faq_cat_senarai.php",{"idxs_faq_cat":id,"MM_delete":1});
		note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#msg_popup");
	  } else if (
		// Read more about handling dismissals
		result.dismiss === swal.DismissReason.cancel
	  ) {
		swalWithBootstrapButtons(
		  "<?php admin_write('Cancelled','Dibatalkan');?>",
		  "<?php admin_write('Data not deleted','Data tidak dipadam');?>",
		  'error'
		)
	  }
	})
	
}
function faq_add(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add New FAQ','Tambah Soalan Lazim Baru');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Skrin Penuh");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-chevron-circle-right',      
			label: '<?php admin_write("Add New FAQ","Tambah Soalan Lazim");?>',
			cssClass: 'btn-primary float-right', 
			autospin: false,
			action: function(dialog){    
				 insert_faq(dialog);
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
			ckeditor_init('desc');
		},
		data: {
			'pageToLoad': '../admin/add_edit_faq.php'
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function search_faq() {
	var query = $("#search_icon_form").serializeArray(), json={};
	$("#showlist_div").load("show_list_faq.php", query, function() {})
}
function insert_faq(){ 
	if ($("#faq_add_form").valid()) {	
	note_alert_info("<?php admin_write('Processing','Sedang Diproses');?>","#note_dialog"); 
	$('#showlist_div').load('show_list_faq.php', {
		"title":$('#title').val(), 
		"desc":CKEDITOR.instances.desc.getData(),
		"pagetype":$('#pagetype').val(),
		"moddate":$('#moddate').val(),
		"modby":$('#modby').val(), 
		"xs_faq_cat_id":$('#xs_faq_cat_id').val(), 
		"published":$("#published:checked").val(),
		"MM_insert":"form1"
				}, function() {
				$("#title").val('');
				$("#desc").val(''); 
				CKEDITOR.instances.desc.setData('');
				buttonit();
				note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#note_dialog"); 
				})
	}
}
function confirm_deletefaq(id){
	const swalWithBootstrapButtons = swal.mixin({
	  confirmButtonClass: 'btn btn-success',
	  cancelButtonClass: 'btn btn-danger',
	  buttonsStyling: false,
	})

	swalWithBootstrapButtons({
	  title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
	  text: "<?php admin_write('Deleted items cannot be retrieved from the system','Data yang telah dipadam tidak boleh diakses semula dari sistem');?>",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonText: "<?php admin_write('Yes. Delete It!','Ya. Padamkannya!');?>",
	  cancelButtonText: "<?php admin_write('No!','Tidak!');?>",
	  reverseButtons: true
	}).then((result) => {
	  if (result.value) {
		$("#showlist_div").load("show_list_faq.php",{"delete":1, "delid":id}, function() {
			note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_note");
		})
	  } else if (
		// Read more about handling dismissals
		result.dismiss === swal.DismissReason.cancel
	  ) {
		swalWithBootstrapButtons(
		  "<?php admin_write('Cancelled','Dibatalkan');?>",
		  "<?php admin_write('Data not deleted','Data tidak dipadam');?>",
		  'error'
		)
	  }
	});
	
}
function edit_faq_dialog(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Edit FAQ','Kemaskini Soalan Lazim');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Skrin Penuh");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		},{
			id: 'kemaskini-faq',   
			icon: 'fa fa-chevron-circle-right',       
			label: '<?php admin_write("Update FAQ","Kemaskini Soalan Lazim");?>',
			cssClass: 'btn-primary float-right', 
			autospin: false,
			action: function(dialog){    
				update_faq(dialog);
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
			ckeditor_init('desc');
		},
		data: {
			'pageToLoad': '../admin/edit_faq.php?edit=1&id='+id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function ckeditor_init(id){
	CKEDITOR.replace(id);
	CKEDITOR.on('dialogDefinition', function (event) {
            var editor = event.editor;
            var dialogDefinition = event.data.definition;
            var dialogName = event.data.name;

            var cleanUpFuncRef = CKEDITOR.tools.addFunction(function ()
            {
                // Do the clean-up of filemanager here (called when an image was selected or cancel was clicked)
                $('#fm-iframe').remove();
                $("body").css("overflow-y", "scroll");
            });

            var tabCount = dialogDefinition.contents.length;
            for (var i = 0; i < tabCount; i++) {
                var browseButton = dialogDefinition.contents[i].get('browse');

                if (browseButton !== null) {
                    browseButton.hidden = false;
                    browseButton.onClick = function (dialog, i)
                    {
                        editor._.filebrowserSe = this;
                        var iframe = $("<iframe id='fm-iframe' class='fm-modal'/>").attr({
                            src: 'plugins/RichFilemanager/index.html' + // Change it to wherever  Filemanager is stored.
                                '?CKEditorFuncNum=' + CKEDITOR.instances[event.editor.name]._.filebrowserFn +
                                '&CKEditorCleanUpFuncNum=' + cleanUpFuncRef +
                                '&langCode=en' +
                                '&CKEditor=' + event.editor.name
                        });

                        $("body").append(iframe);
                        $("body").css("overflow-y", "hidden");  // Get rid of possible scrollbars in containing document
                    }
                }
            }
        });
}
function update_faq(dialog)
{  
	if ($("#faq_edit_form").valid())
	{
		note_alert_info("<?php admin_write('Processing','Sedang Diproses');?>","#note_dialog"); 
		var query = $("#faq_edit_form").serializeArray(), json={};
		$('#showlist_div').load('show_list_faq.php', {
			"published":$("#published:checked").val(),
			"title":$('#title').val(),
			"desc":CKEDITOR.instances.desc.getData(),
			"idxs_page":$('#idxs_page').val(),
			"pagetype":$('#pagetype').val(), 
			"faq_cat":$('#faq_cat').val(),
			"moddate":$('#moddate').val(),
			"modby":$('#modby').val(), 
			"MM_update":"form1"
				}, function() { 
					note_alert_success("<?php admin_write('Information succesfully edited','Maklumat berjaya dikemaskini');?>","#note_dialog"); 
				})
	}
	
}
function events_add(type,returnlink) 
{
	location.href=  'edit_events.php?pagetype='+type+'&r='+returnlink;
}
	
function events_edit(idxs_page,type,returnlink) {
location.href= 'edit_events.php?idxs_page='+idxs_page+'&pagetype='+type+'&r='+returnlink;
}
function search_directory() {
	$("#wait_directory").show();
	var keyword = escape($("#search #keyword").val()); 
	var directory_cat_id = $("#search #directory_cat_id").val();  
	$("#showlist_div").load("show_list_directory.php?keyword="+keyword+"&directory_cat_id="+directory_cat_id+"&is_search=1", function() {
		$(".senarai").tablesorter();
		$("#wait_directory").fadeOut();
	})
}
function search_poll() 
{  
var key = $("#key").val(); 
$("#poll_div").load("poll_list.php", { "key":key
}, function() {beautable('#list') })
}
function search_survey() 
{  
var key = $("#key").val(); 
$("#survey_div").load("survey_list.php", { "key":key
}, function() {beautable('#list') })
}
function search_answ_survey() 
{  
var key = $("#key").val(); 
$("#answer_survey_div").load("answer_survey_list.php", { "key":key
}, function() {beautable('#list') })
}
function submit_maklumbalas()
{
	if ($("#form_maklumbalas").valid())
	{	
		var query = $("#form_maklumbalas").serializeArray(), json={};
			//var idxs_user = $('#idxs_user').val();
			var id_survey = $('#id_survey').val();  
			
		$("#action").load("add_feedback_submit.php", query, function(data)
		{
		   if(data==1){	
		   $("#answer_survey_ques_div").load("answer_survey_ques_list.php?id_survey="+id_survey, function(data)
			   { 
			   note_alert_success("<?php admin_write('Feedback saved','Maklumat maklumbalas berjaya disimpan');?>","#note_page");  
			   }).html();
		   } 
		   else if (data==2)
		   { // no input
				alert("Harap maaf, sila jawab borang maklumbalas.")
		   }
		}).html();	
	}
}
function itsmeulookingfor(radioval)
{ 
	if(radioval == '1')
	{
		$("#nama_user").last().addClass( "required" ); 
		$("#notel_user").last().addClass( "required" );
		$("#emel_user").last().addClass( "required" ); 
	}
	else if (radioval == '0')
	{
		$("#nama_user").last().removeClass( "required" ); 
		$("#notel_user").last().removeClass( "required" ); 
		$("#emel_user").last().removeClass( "required" ); 
	} 
}
function delete_fb_respondent(id_survey_history, id_survey) {
	
	Swal({
		title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
		text: "<?php admin_write('This user response will be deleted and cannot be recovered','Respon pengguna ini akan dipadamkan dan tidak boleh diperolehi semula');?>",
		type: 'warning',
		showCancelButton: true,   
		confirmButtonColor: "#ff0000",   
		confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
		cancelButtonText: "<?php admin_write('No!','Tidak!');?>",   
		closeOnConfirm: true,   
		closeOnCancel: true 
	}).then((result) => {
	  if (result.value) {
		$("#action").load("../admin/delete_fb_respondent.php", {"id_survey_history":id_survey_history,"MM_delete":id_survey_history}, function() {
			$("#dialog").load("../admin/list_survey_respondent.php?idmbt="+id_survey, function() {
				note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#dialog_note"); 
			}) 
		})
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		
	  }
	})
	
}
function view_fb_respondent_answ(idmbhis){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Feedback Details','Maklumat Maklumbalas');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-resp-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-resp-1").show();
				$("#btn-popup-fullscreen-resp-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-resp-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-resp-1").show();
				 $("#btn-popup-widescreen-resp-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-resp-1").show();
			$("#btn-popup-widescreen-resp-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/list_fb_respondent_answ.php?idmbhis='+idmbhis
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
/* 
function staf_add() 
{
	$("#div_add_edit").load("add_edit_staf.php", function() {
		$('#directory_cat_div').load("directory_cat_list.php");
		$.scrollTo($('#action'), 800); 
	}).dialog({"height":"auto","width":<?php echo $default_width;?>,"modal":true,"title":"<?php admin_write('Add Staff Information','Tambah Maklumat Staf');?>"}).dialog("open");
}
*/
function staf_add() {
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Tambah Maklumat Staf','Add Staff Information');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-stf-add',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Tambah Maklumat Staf','Add Staff Information');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					add_staf_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/add_edit_staf.php'
		}
	});
}
function add_staf_submit(dialog)
{ 
var userid_new = $("#userid").val();
	if ($("#staf_add_form").valid()==true) 
	{
	$("#check_userid").load("check_userid.php?userid="+userid_new, function(check_userid){
	if(check_userid==0){
		var title = $("#staf_name").val();
		var imageQueue = $("#image_selected").val();
 
			if (imageQueue == 1) {
				$('#img_uploadifive').uploadifive('upload','*');
					
			} else {
				insert_staf();
			} 
	
	}else{
		note_alert_success("<?php admin_write('Sorry, username already used','Harap maaf, ID Pengguna telah wujud');?>","#msg_popup");
		$('#userid').val('');
	}
	});
	}
		
}
function insert_staf()
{
	var query = $("#staf_add_form").serializeArray(), json = {};
	$('#showlist_div').load('show_list_staf.php',query, function() 
	{
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#msg_popup");
		}); 
}
function edit_staf_submit(dialog)
{
	
	var id_staf = $("#idxs_staf").val();
	var userid_new = $("#userid").val();
	if ($("#staf_edit_form").valid()==true) 
	{
	$("#check_userid").load("check_userid.php?idxs_staf="+id_staf+"&userid="+userid_new+"&edit=1", function(check_userid){
	if(check_userid==0){
		var title = $("#staf_name").val();
		var imageQueue = $("#image_selected").val();
	 
		if (imageQueue == 1) {
			$('#img_uploadifive').uploadifive('upload','*');;	
		} else {
			update_staf();
		} 		
	
	}else{
	note_alert_success("<?php admin_write('Sorry, username already used','Harap maaf, ID Pengguna telah wujud');?>","#msg_popup");
	$('#userid').val('');
	}
	});
	}
}
/* 
function edit_staf(id) 
{
	$("#div_add_edit").load("add_edit_staf.php?edit=1&id="+id, function() { 
		$.scrollTo($('#action'), 800); 
	}).dialog({"height":"auto","width":<?php echo $default_width;?>,"modal":true,"title":"<?php admin_write('Update Staff Information','Kemaskini Maklumat Staf');?>"}).dialog("open");
} 
*/
function edit_staf(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Kemaskini Maklumat Staf','Update Staff Information');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-blk-asrama',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Kemaskini Maklumat Staf','Update Staff Information');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					edit_staf_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/add_edit_staf.php?edit=1&id='+id
		}
	});
}
function update_staf()
{
	if ($("#staf_edit_form").valid()==true) 
	{   var idxsd = $("#idxs_staf").val(); 
		var query = $("#staf_edit_form").serializeArray(), json = {}; 
		$('#showlist_div').load('show_list_staf.php', query, function() {
			$("#div_add_edit").load("add_edit_staf.php?edit=1&id="+idxsd);
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");  
		}); 	
	}
}
function confirm_deletestaf(id){
	if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system.','Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")==true){
		$("#showlist_div").load("show_list_staf.php",{
			"delete":1,
			"delid":id
		}, function() {
			beautable();
		    note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_note");  
		})
	}
}
function padam_staf_pix(id)
{
if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system.','Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")==true)
	{	  
		$("#staf_pix_div").load("padam_staf_pix.php", {"id":id,"padam_staf_pix":1}, function() 
		{  
			$('#showlist_div').load('show_list_staf.php');
		}); 
	}
}
function search_audio_video() 
{  
var key = $("#key").val();  
$("#audio_video_list").load("audio_video_list.php", { "key":key
}, function() {beautable('#list') })
}
function audio_video_delete(id) 
{
		if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system.','Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")==true)
		{ 
		$("#audio_video_list").load("audio_video_list.php",{"MM_delete":1,"id":id}, function() 
		{  
		note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_note");  
		}); 
		
		
	}
}
/* 
function add_new_audio_video() 
{
	$("#dialog").load("add_audiovideo.php", function() {
		centerdiv(".ui-dialog");
	}).dialog({"title":"<?php admin_write('Add Audio/Video','Tambah Audio/Video');?>","height":"auto","width":600}).dialog("open");
}
*/
function add_new_audio_video(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Tambah Audio/Video','Add Audio/Video');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-add-nw-adio-vdeo',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Tambah Audio/Video','Add Audio/Video');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					upload_audio_video(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/add_audiovideo.php'
		}
	});
}
/* 
function add_new_video_audio() 
{
	$("#dialog").load("add_videoaudio.php", function() {
		centerdiv(".ui-dialog");
	}).dialog({"title":"<?php admin_write('Add Video','Tambah Video');?>","height":"auto","width":600}).dialog("open");
}
*/
function add_new_video_audio(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Tambah Video','Add Video');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-blk-asrama',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Tambah Video','Add Video');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					add_video_audio_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/add_videoaudio.php'
		}
	});
}
function add_video_audio_submit(dialog) {
	if ($("#form_video_audio").valid()==true) 
	{
	var query = $("#form_video_audio").serializeArray(), json={};
	$("#audio_video_list").load("audio_video_list.php", query, function() {
		//$("#dialog").dialog("close");	
		note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#note_dialog");  
																			
	});
	}
}
function upload_audio_video(dialog) {
	$('#file_upload').uploadifive('upload');
}
/* 
function audio_video_edit(id) {
	$("#dialog").load("edit_audiovideo.php?id="+id, function() {
		centerdiv(".ui-dialog");
	}).dialog({"title":"<?php admin_write('Edit Audio/Video','Kemaskini Audio/Video');?>","height":"auto","width":600}).dialog("open");
}
*/
function audio_video_edit(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Kemaskini Audio/Video','Edit Audio/Video');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-audio-vdeo-edit',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Kemaskini Audio/Video','Edit Audio/Video');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					audio_video_edit_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/edit_audiovideo.php?id='+id
		}
	});
}
function audio_video_edit_submit(dialog) {
	if ($("#form_edit_audiovideo").valid()==true) 
	{
	var query = $("#form_edit_audiovideo").serializeArray(), json={};
	$("#audio_video_list").load("audio_video_list.php", query, function() {
		//$("#dialog").dialog("close");	
		note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#note_dialog");  
																			
	});
	}
}
function qf_add() {
 	$("#dialog").load("../admin/add_edit_quick_facts.php", function() {
		buttonit();
	}).dialog({"title":"<?php admin_write('Add New Quick Fact','Tambah Fakta Pantas Baru');?>","width":<?php echo $default_width;?>,"height":"auto","modal":true }); 
}
function insert_quick_facts(){ 
	if ($("#quick_facts_add_form").valid())
	{	 
	var published = $('input:radio[name=published]:checked').val();
	$('#showlist_div').load('show_list_quick_facts.php', { 
		"published":published,
		"desc":CKEDITOR.instances.desc.getData(),
		"pagetype":$('#pagetype').val(),
		"moddate":$('#moddate').val(),
		"modby":$('#modby').val(), 
		"MM_insert":"form1"
				}, function() { 
				$("#desc").val(''); 
				CKEDITOR.instances.desc.setData('');
				buttonit();
				note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#note_dialog"); 
				})
	} 
}
function confirm_deleteqf(id){
	if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system.','Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")==true){
		$("#showlist_div").load("show_list_quick_facts.php",{
			"delete":1,
			"delid":id
		}, function() { 
			note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_note");
		})
	}
}
function edit_quick_facts_dialog(id) {
 	$("#dialog").load("edit_quick_facts.php?edit=1&id="+id, function() {
		buttonit();
	}).dialog({"title":"<?php admin_write('Edit Quick Fact','Kemaskini Fakta Pantas');?>","width":<?php echo $default_width;?>,"height":"auto","modal":true }).dialog({"open": function() {
		
	}}); 
}
function update_qf()
{  
	if ($("#qf_edit_form").valid())
	{
	var query = $("#qf_edit_form").serializeArray(), json={};
	var published = $('input:radio[name=published]:checked').val();
	$('#showlist_div').load('show_list_quick_facts.php', {
		"published":published, 
		"desc":CKEDITOR.instances.desc.getData(),
		"idxs_page":$('#idxs_page').val(),
		"pagetype":$('#pagetype').val(),
		"moddate":$('#moddate').val(),
		"modby":$('#modby').val(), 
		"MM_update":"form1"
				}, function() { 
				buttonit;	
				note_alert_success("<?php admin_write('Information succesfully edited','Maklumat berjaya dikemaskini');?>","#note_dialog"); 
				})
	}
	
}
function revoke_page_access(id_owner,idpage){
	if (confirm("<?php admin_write('Are you sure to revoke the page access for the selected administrator?.','Adakah anda pasti untuk membatalkan akses halaman untuk pentadbir yang dipilih?');?>")==true){
		$("#owner_individual").load("page_owner_individual.php?id_page="+idpage,{
			"delete":1,
			"delid":id_owner,
			"idpage":idpage
			
		}, function() { 
/*		    note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_note");  
*/		})
	}
}
function add_admin(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add Administrator','Tambah Pentadbir');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-add-admn',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Add Administrator','Tambah Pentadbir');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					add_admin_form_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			$("#list_directory_cat_div").load("directory_cat_list_var.php?directory_cat_var=directory_cat_id", function() {

			});	
		},
		onhide: function(){
			$('.qtip').remove();
		},
		data: {
			'pageToLoad': '../admin/add_admin_form.php'
		}
	});
}
function add_admin_form_submit(dialog){ 
	var email = $("#email").val(); 
	if ($("#add").valid()==true) 
	{
		var query = $("#add").serializeArray(), json = {};  
			$("#check_admin").load("check_admin_exist.php?email="+email, function(check_admin_exist){
		if(check_admin_exist==0)
		{ 
			$("#list").load("../admin/list_admin.php", query, function() {
				var what = "<i class='fa fa-check'></i> <?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>";
				var where = "#msg_popup";
				show_note_5sec(what,where); 
				//$('#add')[0].reset();
				$(".resetable").val("");
			});	
		}else{
	note_alert_danger("<?php admin_write('Sorry, email already used','Harap maaf, emel telah wujud');?>","#msg_popup");
	$('#email').val('');
	}
	});		
	}
}
 
function edit_admin(idxs_admin,admin_group){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Update Administrator Information','Kemaskini Maklumat Pentadbir');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-admn',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Update Administrator Information','Kemaskini Maklumat Pentadbir');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					edit_admin_form_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			validate_form("#edit");
			$("#list_directory_cat_div").load("directory_cat_list_var.php?directory_cat_var=directory_cat_id&directory_cat_id="+admin_group, function() {
				
			});	
		},
		onhide: function(){
			$('.qtip').remove();
		},
		data: {
			'pageToLoad': '../admin/add_admin_form.php?idxs_admin='+idxs_admin
		}
	});
}
function edit_admin_form_submit(dialog)
{
	var email = $("#email").val(); 
	var idxs_admin = $("#idxs_admin").val(); 
	if ($("#edit").valid()==true) 
	{
		var query = $("#edit").serializeArray(), json = {};
		
		$("#check_admin").load("check_admin_exist.php?email="+email+"&idxs_admin="+idxs_admin, function(check_admin_exist){
		if(check_admin_exist==0)
		{ 
			$("#list").load("../admin/list_admin.php", query, function() {
			var what = "<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>";
			var where = "#msg_popup";
			show_note_5sec(what,where);
				
			});
		}else{
	note_alert_danger("<?php admin_write('Sorry, email already used','Harap maaf, emel telah wujud');?>","#msg_popup");
	$('#email').val('');
	}
	});				
	}
}
function add_os_module() {
 	$("#dialog").load("../admin/add_os_module.php", function() {
		buttonit();
	}).dialog({"title":"<?php admin_write('Add New Module: Online Statistic','Tambah Modul: Statistik Atas Talian');?>","width":<?php echo $default_width;?>,"height":"auto","modal":true }); 
}
function add_os_module_submit()
{  
	if ($("#add_os_module_form").valid()==true) 
	{
		var query = $("#add_os_module_form").serializeArray(), json = {}; 
		$("#display_os_module_list").load("os_module_list.php", query, function() { 
			$("#module_name").val("");
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#note_dialog");  	
		}); 	 
	}
} 
function urus_os_module() {
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Manage Indicators','Urus Indikator');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Skrin Penuh");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
			search_page_autocomplete();
		},
		data: {
			'pageToLoad': '../admin/urus_os_module.php'
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function add_online_statistic() {
 	$("#dialog").load("../admin/add_online_statistic.php", function() {
		centerdiv();
		buttonit();
	}).dialog({"title":"<?php admin_write('Add Statistics','Tambah Statistik');?>","width":<?php echo $default_width;?>,"height":"auto","modal":true }); 
}
function add_online_statistic() {
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add Statistics','Tambah Statistik');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/urus_os_module.php'
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}

function edit_indicator(id) {
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Edit Indicator','Kemaskini Indikator');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Skrin Penuh");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		},{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-chevron-circle-right',       
			label: '<?php admin_write("Update Indicator","Kemaskini Indikator");?>',
			cssClass: 'btn-primary float-right', 
			autospin: false,
			action: function(dialog){    
				edit_indicator_submit();
			}
		},],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/edit_indicator.php?edit=1&id='+id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function confirm_deleteos(id){
	Swal({
		title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
		text: "<?php admin_write('Deleting this indicator will delete all statistical data related to it','Sekiranya anda memadamkan indikator ini, semua data statistik yang berkaitan dengannya juga akan dipadamkan');?>",
		type: 'warning',
		showCancelButton: true,   
		confirmButtonColor: "#ff0000",   
		confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
		cancelButtonText: "<?php admin_write('No!','Tidak!');?>",   
		closeOnConfirm: true,   
		closeOnCancel: true 
	}).then((result) => {
	  if (result.value) {
			$("#showlist_div").load("list_indicator_by_page_id.php",{ "delete":1, "delid":id }, function() { 
				note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_note");
			})
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		
	  }
	})
	
	
}

function add_os_submit()
{ 
	if ($("#os_add_form").valid()==true) 
	{
		var fileQueue = $("#file_selected").val();
		if (fileQueue == 1) {
			$('#uploadifive').uploadifive('upload','*'); 	 
		} else {
			add_os_submit_go();
		} 
	}  
}
 
function add_os_submit_go()
{  
	if ($("#os_add_form").valid()==true) 
	{
		var query = $("#os_add_form").serializeArray(), json = {}; 
		$("#showlist_div").load("list_online_stat.php", query, function()  
		{  
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#msg_popup");  
			$('#os_add_form')[0].reset(); 	
		}); 	 
	}
} 
function edit_os_submit()
{ 
	if ($("#os_edit_form").valid()==true) 
	{
		var fileQueue = $("#file_selected").val();
		if (fileQueue == 1) {
			$('#uploadifive').uploadifive('upload','*'); 	 
		} else {
			edit_os_submit_go();
		} 
	}  
}
function edit_os_submit_go()
{  
	if ($("#os_edit_form").valid()==true) 
	{
		var query = $("#os_edit_form").serializeArray(), json = {}; 
		var id_os = $("#id_os").val(); 
		$("#showlist_div").load("list_online_stat.php", query, function()  
		{  
			$("#fail").load("list_file_os.php?id="+id_os); 
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");   	
		}); 	 
	}
} 
function edit_file_os(idxs_file,page_id) {
	$("#fail").load('list_file_os.php?edit=1&fileid='+idxs_file+'&id='+page_id);
}
 
function update_file_os(desc_row,fileid,page_id) {
	desc_row_text = escape(desc_row);
	$("#fail").load('list_file_os.php?update=1&filename='+desc_row_text+'&fileid='+fileid+'&id='+page_id);
}
function delete_file_os(fileid,id) {
	if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system.','Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")==true){
	$("#fail").load('list_file_os.php?del=1&fileid='+fileid+'&id='+id);
	}
}
 
 
function edit_os_module(id)
{ 
	$("#display_os_module_form").load("edit_os_module.php?id="+id, function()   
	{ 
		$("#module_name").focus();
	});
}
 
 
 function edit_os_module_submit()
{  
	if ($("#edit_os_module_form").valid()==true) 
	{
		var idxs_os_module_cat = $("#idxs_os_module_cat").val(); 
		var query = $("#edit_os_module_form").serializeArray(), json = {}; 
		$("#display_os_module_list").load("os_module_list.php", query, function() 
		{ 
			$("#display_os_module_form").load("edit_os_module.php?id="+idxs_os_module_cat, query, function() 
			{
			note_alert_success("<?php admin_write('Information succesfully edited','Maklumat berjaya dikemaskini');?>","#note_dialog");  
			$("#showlist_div").load("list_online_stat.php");
			}); 	
		}); 	 
	}
} 
function show_os_module_add_form()
{
	$("#display_os_module_form").load("add_os_module.php", function()   
	{ 
		$("#module_name").focus();
	});
}
function delete_os_module(id)
{
	if (confirm("<?php admin_write('Are you sure? Deleted items cannot be retrieved from the system.','Adakah anda pasti? Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>")==true)
	 {
		$("#display_os_module_list").load("os_module_list.php",{"idxs_os_module_cat":id,"MM_delete":1});
		note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#msg_popup");
		$("#showlist_div").load("list_online_stat.php");
    }
}
function update_setup_upload(){
	if ($("#new_upload").val()==1){
		$('#file_upload').uploadifive('upload');
	} else {
		update_setup();	
	}
}
function update_setup() {
	$("#setup_result");
	var currentpage = $("#currentpage").val();
	var query = $("#edit").serializeArray(), json={};
	$("#action").load("update_setup.php", query, function(data){
		if (data==1) {
			show_note_5sec(success_text,"#setup_result");
			//alert($("#single_lang_yes").prop("checked"));
			if ($("#single_lang_yes").prop("checked")==false){
				$("#change_lang_div").load("../admin/change_lang_admin.php", {"currentpage":currentpage}).show();	
			} else {
				$("#change_lang_div").hide();	
			}
		} else {
			show_note_5sec(error_text,"#setup_result");
		}
	});
}
function create_subject() {
	// check if subject already has title
	if ($("#subject").val()==""){
		var subjectold = $("#title").val(); 
		subjectnew=subjectold.replace(/[!@#$%^&*(),-]/g,"");
		subjectnew=subjectnew.replace(/\s+/g," ");
		subjectnew=subjectnew.replace(/\s+/g,"-");
		subjectnew=subjectnew.replace(/\s{2,}/g,"-").toLowerCase();
		
		$("#subject").val(subjectnew);
	}
}
function unclick(page_id){
	var unclickable = $("#unclickable_"+page_id).is(':checked');
	//alert(unclickable);	
	if (unclickable == true) {
		unclickable_val = 1;
	} else {
		unclickable_val = 0;
	}
	$("#action").load("../admin/unclickable.php?page_id="+page_id+"&unclickable="+unclickable_val, function() {
		//$("#action_result").html("<i class=''></i> Updated");	
		note_alert_success("Updated","#action_result");
	})
}
function org_chart_update(){
	if ($("#img_selected").val()==1) {
			swal({   
				title: "Adakah anda pasti?",   
				text: " Pastikan gambar yang dimuat-naik adalah berkaitan",  
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Ya. Teruskan!",   
				cancelButtonText: "Batalkan!",   
				closeOnConfirm: true,   
				closeOnCancel: false 
			}, 
			function(isConfirm){   
				if (isConfirm) {     
					$("#img_uploadifive").uploadifive('upload');  
				} else {     
					swal("Dibatalkan", "Anda telah membatalkan aduan ini. Sila semak aduan anda dan hantar semula.", "error"); 
					$("#action_result").html("Sila semak aduan anda dan hantar semula");   
				} 
			});
			
		}	
}
function org_chart_uploaded() {
	$("#orgchart_image_div").load("orgchart_image.php",function(){});
}
/* 
function edit_icon(id) {
	$("#dialog").load("../admin/edit_icon.php?idxs_icon="+id, function() {
		buttonit();
	}).dialog({"title":"<?php admin_write('Edit Icon','Kemaskini Ikon');?>","width":default_width,"height":half_height,"modal":true}).dialog("open");	
}
*/
function edit_icon(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Kemaskini Ikon','Edit Icon');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-icn',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Kemaskini Ikon','Edit Icon');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					edit_icon_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/edit_icon.php?idxs_icon='+id
		}
	});
}
function edit_icon_submit(dialog){
	var query = $("#edit_icon_form").serializeArray(), json={};
	$("#list_icons_div").load("list_icons.php", query, function(){});
}
/* 
function add_icon() {
	$("#dialog").load("../admin/add_icon.php", function() {
		buttonit();
	}).dialog({"title":"<?php admin_write('Add Icon','Tambah Ikon');?>","width":default_width,"height":half_height,"modal":true}).dialog("open");	
}
*/
function add_icon(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Tambah Ikon','Add Icon');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-add-icn',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Tambah Ikon','Add Icon');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					add_icon_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/add_icon.php'
		}
	});
}
function add_icon_submit(dialog){
	var query = $("#add_icon_form").serializeArray(), json={};
	$("#list_icons_div").load("list_icons.php", query, function(){});
}
function search_icon(){
	var query = $("#search_icon_form").serializeArray(), json={};
	$("#list_icons_div").load("list_icons.php", query, function(){});
}
function padam_icon(id){
	var query = ({"MM_delete":1,"idxs_icon":id});
	swal({   
				title: "Adakah Anda Pasti?",   
				text:"Maklumat yang dipadamkan tidak boleh dijana semula",  
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Ya! Pasti",   
				cancelButtonText: "Tidak",   
				closeOnConfirm: true,   
				closeOnCancel: false 
			}, 
			function(isConfirm){   
				if (isConfirm) {     
					 $("#list_icons_div").load("list_icons.php", query, function(){});
				} else {     
					swal("Dibatalkan", "Anda telah membatalkan tindakan ini", "error"); 
	
				} 
			});	
}
/* 
function manage_icon_group(){
	$("#dialog_content").load("../admin/list_icon_group.php", function() {
		buttonit();
	}).dialog({"title":"<?php admin_write('Manage Icon Group','Urus Kumpulan Ikon');?>","width":default_width,"height":half_height,"modal":true}).dialog("open");
}
*/
function manage_icon_group(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Urus Kumpulan Ikon','Manage Icon Group');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-manage-icn-grp',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Urus Kumpulan Ikon','Manage Icon Group');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					add_icon_group_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/list_icon_group.php'
		}
	});
}
function add_icon_group_submit(dialog){
	var query = $("#add_icon_group_form").serializeArray(), json={};
	$("#list_icon_group_div").load("list_icon_group_detail.php", query, function(){
		$("#add_icon_group_form #icon_group_subject").val("");																			 
	});
}
function edit_icon_group(id){
	var query = ({"idxs_icon_group":id})
	$("#list_icon_group_form").load("icon_group_edit.php", query, function(){
		buttonit();		
		$("#list_icon_group_form_add").hide();
		$("#list_icon_group_form").show();
	});
}
function edit_icon_group_submit(){
	var query = $("#edit_icon_group_form").serializeArray(), json={};
	$("#list_icon_group_div").load("list_icon_group_detail.php", query, function(){
		$("#list_icon_group_form_add").show();	
		$("#list_icon_group_form").hide();			
	});
}
function check_icon_group(id){
	var return_value = $.ajax({
	  url: '../admin/check_icon_group.php',
	  data: {"icon_group_id":id}, 
	  async: false
	  }).responseText;
	return return_value;
}
function delete_icon_group(id){
	var query = ({"MM_delete":1,"idxs_icon_group":id});
	// check if icon_group can be deleted or not
	if (check_icon_group(id)==1){
	swal({   
				title: "Tidak Boleh Dipadamkan",   
				text:"Kumpulan yang anda cuba padamkan sudah mempunyai data yang tidak boleh dipadamkan",
				type:"warning"
			})
	} else {
		swal({   
				title: "Adakah Anda Pasti?",   
				text:"Maklumat yang dipadamkan tidak boleh dijana semula",  
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Ya! Pasti",   
				cancelButtonText: "Tidak",   
				closeOnConfirm: true,   
				closeOnCancel: false 
			}, 
			function(isConfirm){   
				if (isConfirm) {     
					 $("#list_icon_group_div").load("list_icon_group_detail.php", query, function(){});
				} else {     
					swal("Dibatalkan", "Anda telah membatalkan tindakan ini", "error"); 
	
				} 
			});	
	}
	
	
}
function delete_feedback(id){
		swal({   
				title: "Adakah Anda Pasti?",   
				text:"Maklumat yang dipadamkan tidak boleh dijana semula",  
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Ya! Pasti",   
				cancelButtonText: "Tidak",   
				closeOnConfirm: true,   
				closeOnCancel: false 
			}, 
			function(isConfirm){   
				if (isConfirm) {     
					 $("#list_feedback").load("list_feedback.php?del=1&id="+id,  function(){});
				} else {     
					swal("Dibatalkan", "Anda telah membatalkan tindakan ini", "error"); 
	
				} 
			});	
}
function reset_site(current_url){
		swal({   
				title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",   
				text:"<?php admin_write('Deleted information cannot be restored','Maklumat yang dipadamkan tidak boleh dijana semula');?>",  
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#f00",   
				confirmButtonText: "<?php admin_write('Yes! Confirm','Ya! Pasti');?>",   
				cancelButtonText: "<?php admin_write('No!','Tidak!');?>",   
				closeOnConfirm: true,   
				closeOnCancel: false 
			}, 
			function(isConfirm){   
				if (isConfirm) {     
					 $("#action").load("reset_site.php", function(){
						swal({
							 title:"<?php admin_write('Reset To Factory Settings','Set Semula Berjaya');?>",
							 text:"<?php admin_write('This site has just been reset to factory settings','Sistem ini sudah berjaya di set semula kepada konfigurasi asal');?>",  
							 type:"success"}), 
				function() {
					if ($("#main").length==0) {
						location.href=current_url;	
					}
				};
				});
				} else {     
					swal("<?php admin_write('Action Cancelled','Dibatalkan');?>", "<?php admin_write('You have cancelled this action','Anda telah membatalkan tindakan ini');?>", "error"); 
	
				} 
			});	
}	
function toggle_delrow(){
	if ($("#delrow_all").is(":checked")){
		//alert($("#delrow_all").is(":checked"));	
		$(".delrow").prop("checked",true);
	} else {
		//alert($("#delrow_all").is(":checked"));	
		$(".delrow").prop("checked",false);
	}
}
function toggle_row(id,row){
	if ($("#"+id).is(":checked")){
		$("#"+row).css("display","table-row");
	} else {
		$("#"+row).css("display","none");
	}
}
function unselect(element) {
if (document.getElementById(element).style.display == 'none') {
	document.getElementById(element).style.display = 'table-row';
} else {
	document.getElementById(element).style.display = 'none';}
}
function view_main_image(filename){
	$("#file_main").load("view_main_image.php?filename="+filename);
}
function toggle_page(which){
	$(which).slideToggle("slow", function(){
		if ($(which+"_toggler").hasClass("fa-minus-square")){
			$(which+"_toggler").removeClass("fa-minus-square").addClass("fa-plus-square");
		} else {
			$(which+"_toggler").removeClass("fa-plus-square").addClass("fa-minus-square");
		}
	});
	
}
function rotate_right(img_id){
	
	$("#image_"+img_id).load("rotate_image.php?img_id="+img_id+"&degrees=-90", function(){
		rearrange_image()
	}).html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
}
function rotate_left(img_id){
	$("#image_"+img_id).load("rotate_image.php?img_id="+img_id+"&degrees=90", function(){
		rearrange_image()																   
	}).html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
}
function rearrange_image(){
	// init Masonry
	var $grid = $('.grid').masonry({
		  
		});
	// layout Masonry after each image loads
	
	  $grid.masonry('layout');
}
function rotate_right_directory(file_id,directory_id){
	var timestamp = timenow();
	$("#directory_pix_"+file_id).load("rotate_image_directory.php?file_id="+file_id+"&directory_id="+directory_id+"&degrees=-90&timestamp="+timestamp, function(){
		// update avatar
		$("#directory_avatar_"+directory_id).load("directory_avatar.php?directory_id="+directory_id+"&file_id="+file_id+"&timestamp="+timestamp);
	});
}
function rotate_left_directory(file_id,directory_id){
	var timestamp = timenow();
	$("#directory_pix_"+file_id).load("rotate_image_directory.php?file_id="+file_id+"&directory_id="+directory_id+"&degrees=90&timestamp="+timestamp, function(){
		$("#directory_avatar_"+directory_id).load("directory_avatar.php?directory_id="+directory_id+"&file_id="+file_id+"&timestamp="+timestamp);										   
	});
}
/* 
function add_new_subscriber(){
	$("#action").load("../admin/add_user.php",function(){}).dialog({"height":half_height,"width":half_width,"modal":true,"title":"<?php admin_write('Add New Subscriber','Tambah Pelanggan Baru');?>"}).dialog("open");
}
*/
function add_new_subscriber(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add New Subscriber','Tambah Pelanggan Baru');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-add-new-sbscrbr',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Add New Subscriber','Tambah Pelanggan Baru');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					add_new_subscriber_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/add_user.php'
		}
	});
}
function add_new_subscriber_submit(dialog){
	processing(".action_result");
	// check if email exists or not
	var email = $("#add_user_form #user_email").val();
	var email_exist = check_user_email(email);
	if (email_exist == 0) { // user not found. please add
		var query = $("#add_user_form").serializeArray(), json={};	
		$("#list_subscribers_div").load("../admin/list_subscribers.php", query, function(){
			note_alert_success("<?php admin_write('New subscriber added. Please add more','Pelanggan berjaya didaftarkan. Sila tambah pelanggan lagi.');?>",".action_result");
			$(".required").val("");
			
		});
	} else {
		note_alert_danger("<?php admin_write('Subscriber already exists','Pelanggan sudah ada dalam senarai pelanggan');?>",".action_result");
	}
}
function check_user_email(email){
	var return_value = $.ajax({
	  url: '../admin/check_user_email.php',
	  data: {"email":email}, 
	  async: false
	  }).responseText;
	return return_value;
}
function update_subscribers(){
	var query = $("#list_subscribers_form").serializeArray(), json={};
	$("#list_subscribers_div").load("list_subscribers.php",query, function(){});
}
/* 
function edit_subscriber(id){
	$("#action").load("../admin/edit_user.php?id="+id,function(){}).dialog({"height":half_height,"width":half_width,"modal":true,"title":"<?php admin_write('Edit Subscriber','Kemaskini Pelanggan');?>"}).dialog("open");
}
*/
function edit_subscriber(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Edit Subscriber','Kemaskini Pelanggan');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
				var $message = $('<div></div>');
				var pageToLoad = dialog.getData('pageToLoad');
				$message.load(pageToLoad);
				return $message;
			},
		buttons: [{
			id: 'btn-edit-sbscrbr',   
			icon: 'fa fa-chevron-circle-right',       
			label: "<?php admin_write('Edit Subscriber','Kemaskini Pelanggan');?>",
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
					edit_subscriber_submit(dialog);
				},
				autospin: false
				},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': '../admin/edit_user.php?id='+id
		}
	});
}
function edit_subscriber_submit(dialog){
	processing(".action_result");
	// check if email exists or not
	var email = $("#edit_user_form #user_email").val();
	var email_exist = check_user_email(email);
	if (email_exist == 0) { // user not found. please add
		var query = $("#edit_user_form").serializeArray(), json={};	
		$("#list_subscribers_div").load("../admin/list_subscribers.php", query, function(){
			note_alert_success("<?php admin_write('Subscriber Updated','Pelanggan Berjaya Dikemaskini');?>",".action_result");
			
			
		});
	} else {
		note_alert_danger("<?php admin_write('Subscriber with the email address already exists','Pelanggan dengan alamat emel ini sudah ada dalam senarai pelanggan');?>",".action_result");
	}
}
function populate_answer_text(rows,where,quesid){
	if (quesid!=undefined){
		$(where).load("../admin/populate_answer_text.php?rows="+rows+"&quesid="+quesid, function(data){})
	} else {
		$(where).load("../admin/populate_answer_text.php?rows="+rows, function(data){})
	}
}
/* 
function view_feedback(id) {
 	$("#dialog").load("../admin/view_feedback.php?id="+id, function() {
		buttonit();
	}).dialog({"title":"<?php admin_write('View Feedback','Lihat Feedback');?>","width":<?php echo $default_width;?>,"height":<?php echo $default_height;?>,"modal":true}).dialog("open");	
}
*/
function view_feedback(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Lihat Feedback','View Feedback');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/view_feedback.php?id='+id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function activate_internal_link(){
	//alert($("#link_type").val());
	// check if tender type > 1
	var link_type = $("#link_type").val();
	var pagetype = $("#eventstype").val();
	if($("#link_type").val()>1){
		$("#internal").prop('checked', true);
		// make sure the list does not contain the same link_type, otherwise, there would be duplication
		$("#link_to_div").load("link_to.php?pagetype="+pagetype+"&link_type="+link_type, function() {
			$("#externalrow,#externalspan").hide();
			$("#internalrow,#internalspan").show();
			note_where("<?php admin_write('Please make sure Internal Link is selected','Pastikan Link Dalaman dipilih');?>","warning","#note-tender-sebutharga",0);
			$("#internalrow select").css("box-shadow","-1px 1px 5px 5px #f00");																
		});
		
	} else {
		$("#internal").prop('checked', false);
		$("#externalspan,#internalspan").show();
		$("#internalrow,#externalrow").hide();
		$("#note-tender-sebutharga").html("");
		$("#internalrow select").css("box-shadow","-1px 1px 5px 5px rgba(0,0,0,0)");
	}
}
/* 
function assign_folder_bak(file_id,page_id){
	$("#dialog").load("assign_folder.php?file_id="+file_id+"&page_id="+page_id, function() {
		buttonit();
	}).dialog({"title":"<?php admin_write('File Settings','Tetapan Fail');?>" ,"width":threequarter_width,"height":threequarter_height,"modal":true}).dialog("open");	 
}
*/
function assign_folder_bak(file_id,page_id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Tetapan Fail','File Settings');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/assign_folder.php?file_id='+file_id+'&page_id='+page_id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function add_folder(page_id){  
	if ($("#add_folder_form").valid()==true) 
	{
		var query = $("#add_folder_form").serializeArray(), json = {}; 
		$("#display_dir_cat_list").load("create_folder_senarai.php?page_id="+page_id, query, function() 
		{ 
			$("#display_dir_cat_form").load("create_folder_add.php?page_id="+page_id, query, function() 
			{
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#msg_popup");  
			}); 	
		}); 	 
	}
} 

function assign_folder(file_id,page_id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('File Settings','Tetapan Fail');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
                return $message;
            },
		buttons: [{
			id: 'btn-edit-admin-user-personal',   
			icon: 'fa fa-chevron-circle-right',       
			label: '<?php admin_write("Update Settings","Kemaskini Tetapan");?>',
			cssClass: 'btn-primary float-right',
			action: function(dialog){    
				update_file_folder(file_id,page_id,dialog);
				//dialog.close();
				},
				autospin: false
			},{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': "assign_folder.php?file_id="+file_id+"&page_id="+page_id
		}
	});
}
function update_file_folder(file_id,page_id,dialog){
var query = $("#update_file_folder_form").serializeArray(), json = {}; 
	var file_k = $("#file_k").val();
	query.push({ name: "file_k", value: file_k });
		$("#action").load("assign_folder_submit.php?file_id="+file_id+"&page_id="+page_id, query, function() { 
			dialog.close();
			assign_folder(file_id,page_id);
			$("#fail").load("list_file.php?id="+page_id, query, function()  {
				
				note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");  
			}); 	
		}); 	
}
  
function delete_folder(folder_id,page_id)
{ 
	Swal({
		title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
		text: "<?php admin_write('Deleted items cannot be retrieved from the system.','Data yang telah dipadam tidak boleh diakses semula dari sistem.');?>",
		type: 'warning',
		showCancelButton: true,   
		confirmButtonColor: "#ff0000",   
		confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
		cancelButtonText: "<?php admin_write('No!','Tidak!');?>",   
		closeOnConfirm: true,   
		closeOnCancel: true 
	}).then((result) => {
	  if (result.value) {
		$("#display_dir_cat_list").load("create_folder_senarai.php",{"folder_id":folder_id,"page_id":page_id,"MM_delete":1}, function(){
			$("#fail").load("list_file.php?id="+page_id,   function()  {
				note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#msg_popup");  
				}); 

		});
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		
	  }
	})
	
}
function edit_folder(folder_id,page_id)
{ 
	$("#display_dir_cat_form").load("edit_folder.php?folder_id="+folder_id+"&page_id="+page_id, function() 
	{ 
		$("#folder_name").focus();
	});
}
function edit_folder_submit(folder_id,page_id)
{
	if ($("#edit_folder_form").valid()==true) 
	{      
		var query = $("#edit_folder_form").serializeArray(), json = {}; 
		$("#display_dir_cat_list").load("create_folder_senarai.php?folder_id="+folder_id+"&page_id="+page_id, query, function() 
		{ 
			$("#display_dir_cat_form").load("create_folder_add.php?page_id="+page_id, query, function() 
			{
			$("#fail").load("list_file.php?id="+page_id); 
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");  
			}); 	
		}); 	 	
	}
}
function show_create_folder(page_id) 
{ 
	$("#display_dir_cat_form").load("create_folder_add.php?page_id="+page_id);
}
function backup_db() {
	var emailto = encodeURIComponent($("#email_to").val());
	if ($('#send_email').is(":checked")){
	  	send_email = 1;
	} else {
		send_email = 0;
	}

	$("#backup_run").load("plugins/phpmysqlautobackup/run_view.php?email="+emailto+"&site=<?php echo urlencode($_SESSION['site']);?>&send_email="+send_email).html("<i class='fa fa-spinner fa-spin'></i> <?php admin_write('Backup is running. Please wait for a few seconds..','Penyimpanan Data sedang dilakukan. Sila tunggu...');?>");
}
function create_folder_bak(page_id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Jana Folder','Create Folder');?>",
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/create_folder.php?page_id='+page_id
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function create_folder(page_id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Manage Folder','Urus Folder');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
                return $message;
            },
		buttons: [{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
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
			'pageToLoad': "create_folder.php?page_id="+page_id
		}
	});
}
function search_file(){
	k = $("#file_k").val();
	page_id = $("#idxs_page").val();
	$("#fail").load("list_file.php", {"file_k":k, "id":page_id}, function(){
		
	})
}
function openpdf2(filename){
	var pdffile = escape(filename);
	$("#action").show();
	var dialog = BootstrapDialog.show({
		title: 'View Documents',
		size: BootstrapDialog.SIZE_WIDE ,
		message: function(dialog) {
			var $message = $('<div></div>');
			var pageToLoad = dialog.getData('pageToLoad');
			$message.load(pageToLoad);
	
			return $message;
		},
		buttons: [{
			id: 'btn-popup-fullscreen-1',   
			icon: 'fa fa-expand',       
			label: '<?php admin_write("Full Screen","Normal Screen");?>',
			cssClass: 'btn-primary btn-fullscreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_FULL);
				 $("#btn-popup-widescreen-1").show();
				$("#btn-popup-fullscreen-1").hide();
			}
		},{
			id: 'btn-popup-widescreen-1',   
			icon: 'fa fa-compress',       
			label: '<?php admin_write("Normal Screen","Skrin Biasa");?>',
			cssClass: 'btn-danger btn-widescreen hidden-xs', 
			autospin: false,
			action: function(dialog){    
				//$(".modal .bootstrap-dialog").addClass("fullscreen");
				 
				 dialog.setSize(BootstrapDialog.SIZE_WIDE);
				 $("#btn-popup-fullscreen-1").show();
				 $("#btn-popup-widescreen-1").hide();
			}
		},{
			id: 'view-popup-close-1',   
			icon: 'fa fa-exit',       
			label: '<?php admin_write("Close","Tutup");?>',
			cssClass: 'btn-warning', 
			autospin: false,
			action: function(dialog){    
				 dialog.close();
			}
		}],
		draggable: true,
		onshown: function(){
			
			$("#btn-popup-fullscreen-1").show();
			$("#btn-popup-widescreen-1").hide();
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': '../admin/iframe.php?filename='+pdffile
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}
function changepassword(element) {
	if ($(element).css('display') == 'none'){
		$(element).css('display','table-row');
		$("#change_pwd_btn").text("<?php admin_write("Cancel Password Change","Batalkan Penukaran Katalaluan");?>");
		$("#change_pwd_btn").addClass("btn-primary").removeClass("btn-danger");
		
	} else {
		$(element).css('display','none');
		$("#change_pwd_btn").text("<?php admin_write("Change Password","Tukar Katalaluan");?>");
		$("#change_pwd_btn").removeClass("btn-primary").addClass("btn-danger");
	}
}
function compare_pwd(){
	pwd1 = $("#admin_password").val();
	pwd2 = $("#admin_password2").val();
	if (pwd1!=pwd2){
		Swal("<?php admin_write('Password Is Not The Same','Katalaluan Tidak Sama');?>","<?php admin_write('Please enter the same password for both password fields','Sila masukkan katalaluan yang sama untuk kedua-dua ruangan katalaluan');?>","error");
		return false;
	} else {
		return true;
	}
}
function subscribe(user_id){
	$("#user_"+user_id).load("subscribe.php", {"subscription_status":1,"user_id":user_id,"MM_update":"1"}, function(){
		
	})
}
function unsubscribe(user_id){
	$("#user_"+user_id).load("subscribe.php", {"subscription_status":0,"user_id":user_id,"MM_update":"1"}, function(){
		
	})
}

function search_subscribers(){  
	var query = $("#search_subscribers").serializeArray(), json={};
	
		$("#list_subscribers_div").load("list_subscribers.php", query, function() {
	
	})
}
function profile_submit(which_form){
	if ($("#"+which_form).valid()){
		
		var query = $("#"+which_form).serializeArray(), json={};
		$("#action").load("profile_submit.php", query, function(data){
			if (data == 1){
				note_alert_success("<?php admin_write('Password successfully changed','Katalaluan berjaya ditukar');?>","");
			} else if (data == 0){
				note_alert_danger("<?php admin_write('Password not changed','Katalaluan tidak berjaya ditukar');?>","");
			} else if (data == 3){
				note_alert_success("<?php admin_write('Profile Updated','Profil berjaya ditukar');?>","");
			} else if (data == 4){
				note_alert_danger("<?php admin_write('Password Empty','Katalaluan Kosong');?>","");
			}
		})
}
	
}
function search_page_autocomplete(showid=1){
	 var cache = {};
    $( "#page_name" ).autocomplete({
      

	  minLength: 2,
      source: function( request, response ) {
        var term = request.term;
        if ( term in cache ) {
          response( cache[ term ] );
		  return;

        }
		
 
        $.getJSON( "search_page.php?showid="+showid, request, function( data, status, xhr ) {
          cache[ term ] = data;
          response( data );
		  
        });
      },
	  select: function( event, ui ) {
		  if (showid==1){
			  
		  }
        $("#page_title").val(ui.item.value);
		$("#os_group").val(ui.item.id);
		$("#display_os_module_list").load("os_module_list.php?os_group="+ui.item.id)
      }
    });
}
function edit_stat_by_year(stat_id,id_page){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Edit Statistics by Year','Kemaskini Statistik Mengikut Tahun');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
                return $message;
            },
		buttons: [{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
				cssClass: 'btn-danger float-left',
				autospin: false,
				action: function(dialog){
					dialog.close();
				
			}
		},{
				id: 'view-update-stat',
				icon: 'fa fa-chevron-circle-right',
				label: '<?php admin_write("Update Statistics","Kemaskini Statistik");?>',
				cssClass: 'btn-primary float-right',
				autospin: false,
				action: function(dialog){
					edit_stat_submit();
				
			}
		},{
				id: 'delete-stat',
				icon: 'fas fa-trash-alt',
				label: '<?php admin_write("Delete This Statistics","Padam Statistik Ini");?>',
				cssClass: 'btn-warning float-left',
				autospin: false,
				action: function(dialog){
					delete_stat_id();
				
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
			'pageToLoad': "edit_stat_by_page.php?stat_id="+stat_id+"&id_page="+id_page
		}
	});
}
function edit_stat_submit()
{ 
	if ($("#edit_stat_form").valid()==true) 
	{
		var fileQueue = $("#file_selected").val();
		if (fileQueue == 1) {
			$('#uploadifive').uploadifive('upload','*'); 	 
		} else {
			edit_stat_submit_go();
		} 
	}  
}
function edit_stat_submit_go()
{  
	if ($("#edit_stat_form").valid()==true) 
	{
		var query = $("#edit_stat_form").serializeArray(), json = {}; 
		var id_os = $("#id_os").val(); 
		$("#showlist_div").load("list_indicator_by_page_id.php", query, function()  {  
			//$("#fail").load("list_file_os.php?id="+id_os); 
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");   	
		}); 	 
	}
} 
function add_stat_by_year(stat_id,id_page){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add Statistics by Year','Tambah Statistik Mengikut Tahun');?>",
		size: BootstrapDialog.SIZE_FULL,
		message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
                return $message;
            },
		buttons: [{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
				cssClass: 'btn-danger float-left',
				autospin: false,
				action: function(dialog){
					dialog.close();
				
			}
		},{
				id: 'view-update-stat',
				icon: 'fa fa-chevron-circle-right',
				label: '<?php admin_write("Add Statistics","Tambah Statistik");?>',
				cssClass: 'btn-primary float-right',
				autospin: false,
				action: function(dialog){
					add_stat_submit();
				
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
			'pageToLoad': "add_stat_by_page.php?stat_id="+stat_id+"&id_page="+id_page
		}
	});
}
function add_stat_submit(){ 
	if ($("#add_stat_form").valid()==true) 
	{
		var fileQueue = $("#file_selected").val();
		if (fileQueue == 1) {
			$('#uploadifive').uploadifive('upload','*'); 	 
		} else {
			add_stat_submit_go();
		} 
	}  
}
function add_stat_submit_go()
{  
	if ($("#add_stat_form").valid()==true) 
	{
		var query = $("#add_stat_form").serializeArray(), json = {}; 
		var id_os = $("#id_os").val(); 
		$("#showlist_div").load("list_indicator_by_page_id.php", query, function()  {  
			//$("#fail").load("list_file_os.php?id="+id_os); 
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#msg_popup");   	
		}); 	 
	}
} 
function add_stat_page(){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add Statistics Page','Tambah Halaman Statistik');?>",
		size: BootstrapDialog.SIZE_WIDE,
		message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
                return $message;
            },
		buttons: [{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
				cssClass: 'btn-danger float-left',
				autospin: false,
				action: function(dialog){
					dialog.close();
				
			}
		},{
				id: 'view-update-stat',
				icon: 'fa fa-chevron-circle-right',
				label: '<?php admin_write("Add Statistics Page","Tambah Halaman Statistik");?>',
				cssClass: 'btn-primary float-right',
				autospin: false,
				action: function(dialog){
					add_stat_page_submit();
				
			}
		}],
		draggable: true,
		onshown: function(){
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			$('.modal-body').css('max-height','70vh');
			search_page_autocomplete(0);
		},
		onhide: function(){
			$('.qtip').remove();
		},
		
		data: {
			'pageToLoad': "add_stat_page.php"
		}
	});
}
function add_stat_page_submit(){ 
	if ($("#add_stat_page_form").valid()==true) {
		var query = $("#add_stat_page_form").serializeArray(), json = {}; 
		$("#showlist_div").load("list_stat_page.php", query, function()  {  
			//$("#fail").load("list_file_os.php?id="+id_os); 
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#msg_popup");   	
		}); 
	}  
}
function add_indicator(id_page){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Add Indicator','Tambah Indikator');?>",
		size: BootstrapDialog.SIZE_WIDE,
		message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
                return $message;
            },
		buttons: [{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
				cssClass: 'btn-danger float-left',
				autospin: false,
				action: function(dialog){
					dialog.close();
				
			}
		},{
				id: 'view-update-stat',
				icon: 'fa fa-chevron-circle-right',
				label: '<?php admin_write("Add Indicator","Tambah Indikator");?>',
				cssClass: 'btn-primary float-right',
				autospin: false,
				action: function(dialog){
					add_indicator_submit();
				
			}
		}],
		draggable: true,
		onshown: function(){
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			$('.modal-body').css('max-height','70vh');
			search_page_autocomplete(0);
		},
		onhide: function(){
			$('.qtip').remove();
		},
		
		data: {
			'pageToLoad': "add_indicator.php?id_page="+id_page
		}
	});
}
function add_indicator_submit(){ 
	if ($("#add_indicator_form").valid()==true) {
		var query = $("#add_indicator_form").serializeArray(), json = {}; 
		$("#showlist_div").load("list_indicator_by_page_id.php", query, function()  {  
			//$("#fail").load("list_file_os.php?id="+id_os); 
			note_alert_success("<?php admin_write('Information succesfully added','Maklumat berjaya ditambah');?>","#msg_popup");   	
		}); 
	}  
}
function edit_indicator_submit(){ 
	if ($("#edit_indicator_form").valid()==true) {
		var query = $("#edit_indicator_form").serializeArray(), json = {}; 
		$("#showlist_div").load("list_indicator_by_page_id.php", query, function()  {  
			//$("#fail").load("list_file_os.php?id="+id_os); 
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");   	
		}); 
	}  
}

function delete_indicator(indicator_id, id_page){ 	
	Swal({
		title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
		text: "<?php admin_write('Deleting this indicator will also delete all statistical data related to it','Sekiranya anda memadamkan indikator ini, semua data statistik yang berkaitan dengannya juga akan dipadamkan');?>",
		type: 'warning',
		showCancelButton: true,   
		confirmButtonColor: "#ff0000",   
		confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
		cancelButtonText: "<?php admin_write('No!','Tidak!');?>",   
		closeOnConfirm: true,   
		closeOnCancel: true 
	}).then((result) => {
	  if (result.value) {
			$("#showlist_div").load("list_indicator_by_page_id.php", {"indicator_id":indicator_id,"id_page":id_page,"MM_delete":"1"}, function()  {  
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");   	
		}); 
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		
	  }
	})
		
}
function confirm_delete_stat_page(id){
	Swal({
		title: "<?php admin_write('Are You Sure?','Adakah Anda Pasti?');?>",
		text: "<?php admin_write('Deleting this page will delete all indicators and statistical data related to it','Sekiranya anda memadamkan halaman ini, semua data statistik termasuk indikator yang berkaitan dengannya juga akan dipadamkan');?>",
		type: 'warning',
		showCancelButton: true,   
		confirmButtonColor: "#ff0000",   
		confirmButtonText: "<?php admin_write('Yes. Continue!','Ya. Teruskan!');?>",   
		cancelButtonText: "<?php admin_write('No!','Tidak!');?>",   
		closeOnConfirm: true,   
		closeOnCancel: true 
	}).then((result) => {
	  if (result.value) {
			$("#showlist_div").load("list_stat_page.php",{ "delete":1, "delid":id }, function() { 
				note_alert_success("<?php admin_write('Information succesfully deleted','Maklumat berjaya dipadam');?>","#page_note");
			})
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		
	  }
	})
	
	
}
function edit_stat_page(id){
	var dialog = BootstrapDialog.show({
		title: "<?php admin_write('Edit Statistics Page','Kemaskini Halaman Statistik');?>",
		size: BootstrapDialog.SIZE_WIDE,
		message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);
                return $message;
            },
		buttons: [{
				id: 'view-popup-close',
				icon: 'fa fa-times',
				label: '<?php admin_write("Close","Tutup");?>',
				cssClass: 'btn-danger float-left',
				autospin: false,
				action: function(dialog){
					dialog.close();
				
			}
		},{
				id: 'view-update-stat',
				icon: 'fa fa-chevron-circle-right',
				label: "<?php admin_write('Edit Statistics Page','Kemaskini Halaman Statistik');?>",
				cssClass: 'btn-primary float-right',
				autospin: false,
				action: function(dialog){
					edit_stat_page_submit();
				
			}
		}],
		draggable: true,
		onshown: function(){
			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			$('.modal-body').css('max-height','70vh');
			search_page_autocomplete(0);
		},
		onhide: function(){
			$('.qtip').remove();
		},
		
		data: {
			'pageToLoad': "add_stat_page.php"
		}
	});
}

function edit_stat_page_submit(){ 
	if ($("#edit_stat_page_form").valid()==true) {
		var query = $("#edit_stat_page_form").serializeArray(), json = {}; 
		$("#showlist_div").load("list_stat_page.php", query, function()  {  
			//$("#fail").load("list_file_os.php?id="+id_os); 
			note_alert_success("<?php admin_write('Information succesfully updated','Maklumat berjaya dikemaskini');?>","#msg_popup");   	
		}); 
	}  
}