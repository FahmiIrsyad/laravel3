function login(){
	alert('Logging In');
}
function sign_up(){
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
			

			$('.modal-content').css('margin','5px 0');
			$('.modal-content').css('max-height','90vh');
			//$('.modal-body').css('max-height','80vh');
			$('.modal-body').css('max-height','70vh');
			$("#objectfile").css("height",'68vh');
		},
		data: {
			'pageToLoad': 'sign_up.php'
		}
	});
	//dialog.getModalHeader().css('background-color', bgcolor);
}