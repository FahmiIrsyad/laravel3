// Show the waiting layer
function showWaitingLayer() {
    $('#waitingLayer').css('display', 'block');
}

// Hide the waiting layer
function hideWaitingLayer() {
    $('#waitingLayer').css('display', 'none');
}

function login_submit() {

    // Get form data
    var username = $('#admin_u').val();
    var password = $('#admin_p').val();
    var csrfToken = $('input[name="csrf_token"]').val();
	var rememberMe = $('#rememberme').is(':checked') ? 1 : 0;

    console.log("Sending data:", {
        u: username,
        p: password,
        csrf_token: csrfToken,
        remember_me: rememberMe
    });


    // Make an AJAX request using jQuery
    $.ajax({
        url: 'login_submit.php',
        type: 'POST',
        data: {
            u: username,
            p: password,
            csrf_token: csrfToken,
            remember_me: rememberMe
        },
        dataType: 'json',
        success: function(data) {
            // Handle the JSON response
            if (data.status === "1") {
                if (rememberMe !== 1) {
                    Swal.fire({
                        title: '<?php echo tag("Active Time Limit");?>',
                        html: '<?php echo tag("This system only allows <b>24 minutes of inactivity</b>. After that, you will be automatically logged out. If you wish to remain active in the system, please perform any activity or use the <b>Remember Me</b> function.");?>',
                        icon: 'warning',
                        confirmButtonText: '<?php echo tag("I understand");?>'
                    }).then((result) => {
                        if (result.isConfirmed || result.dismiss) {
                            window.location.href = 'index.php';
                        }
                    });
                } else {
                    // Valid user, redirect to index.php
                    window.location.href = 'index.php';
                }
            } else {
                // Handle other status codes and display messages
                Swal.fire("Error",data.message,"error");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
            //alert('An error occurred while submitting the form.');
            Swal.fire("Error",'An error occurred while submitting the form.',"error");
        }
    });
}
function show_pass_admin() {
    const passwordField = $('#admin_p');
    const icon = $('#show_pass');

    if (passwordField.attr('type') === 'password') {
        passwordField.attr('type', 'text');
        icon.removeClass('fa-eye-slash').addClass('fa-eye');
    } else {
        passwordField.attr('type', 'password');
        icon.removeClass('fa-eye').addClass('fa-eye-slash');
    }
}
function forgot_password() {
    
    $.ajax({
        url: 'forgot_password.php',
        type: 'GET',

        success: function (response) {
            // Open the Bootstrap dialog with the loaded content
            BootstrapDialog.show({
                title: 'Lupa Kata Laluan',
                draggable: true,
                closable:false,
                message: $(response),  // Load the response HTML
                buttons: [{
                    label: 'Tutup',
                    cssClass: 'btn-danger',
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                },{
                    label: 'Semak',
                    cssClass: 'btn-primary',
                    action: function (dialogRef) {
                        // Trigger AJAX request to validate email and No_KP
                        showWaitingLayer();
                        $.ajax({
                            url: 'forgot_password_process.php',
                            type: 'POST',
                            data: $('#forgot_password_form').serialize(),
                            success: function (response) {
                                hideWaitingLayer();
                                if (response.success) {
                                    Swal.fire('Sila Semak Emel','Emel untuk tetapan semula kata laluan telah dihantar. Sila semak emel termasuk spam box','success');
                                    dialogRef.close();
                                } else {
                                    Swal.fire('Ralat', response.message,'warning');
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.error("Error details:", {
                                    textStatus: textStatus,
                                    errorThrown: errorThrown,
                                    responseText: jqXHR.responseText
                                });

                                Swal.fire('Ralat', `Sila cuba lagi. <br><small>${textStatus}: ${errorThrown}</small>`, 'error');
                                hideWaitingLayer();
                            }

                        });
                    }
                } ]
            });
        },
        error: function () {
            alert('Tidak dapat memuat halaman lupa kata laluan.');
        }
    });
}
function reset_password_process() {
    const form = $("#reset_password_form");
    $.ajax({
        url: "reset_password_process.php",
        type: "POST",
        data: form.serialize(),
        dataType: "json",
        success: function (response) {
            if (response.success) {
                Swal.fire("Berjaya", response.message, "success").then(() => {
                    window.location.href = "login.php";
                });
            } else {
                Swal.fire("Gagal", response.message, "error");
            }
        },
        error: function () {
            Swal.fire("Ralat", "Ralat berlaku, sila cuba lagi.", "error");
        },
    });
}
