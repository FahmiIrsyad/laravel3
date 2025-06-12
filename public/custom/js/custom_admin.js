function showWaitingLayer() {
    $('#waitingLayer').css('display', 'block');
}
function startCountdown(targetTime, element) {
    //clearInterval(window.countdownInterval);
    window.countdownInterval = setInterval(() => {
    let distance = targetTime - Date.now(),
        days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000),
        tempoh_sah = `${days ? `<small>${days} hari</small> ` : ''}${hours ? `<small>${hours} jam</small> ` : ''}${minutes ? `<small>${minutes} minit</small> ` : ''}${seconds ? `<small>${seconds} saat</small> ` : ''}`;

        $(element).html(tempoh_sah || "<small>0 saat</small>");

           if (distance < 0) {
                clearInterval(window.countdownInterval);
                $(element).html("<small>Luput</small>");
                window.location.href = "logout.php";
           }
    }, 1000);
}

function startDuration(element) {
    clearInterval(window.durationInterval);
	
	let match = document.cookie.match(new RegExp('(^|\\s)remember_me=([^;]+)'));
    let loginTime = parseInt(match[2], 10);

    window.durationInterval = setInterval(() => {
        let now = Math.floor(Date.now() / 1000);
        let elapsed = now - loginTime;
		
        if (elapsed < 0) elapsed = 0; // Prevent negative values

        let days = Math.floor(elapsed / 86400);
        let hours = Math.floor((elapsed % 86400) / 3600);
        let minutes = Math.floor((elapsed % 3600) / 60);
        let seconds = elapsed % 60;

        // Build elapsed time string including all parts
        let elapsed_time = [];
        if (days > 0) elapsed_time.push(`<small>${days} hari</small>`);
        if (hours > 0) elapsed_time.push(`<small>${hours} jam</small>`);
        if (minutes > 0) elapsed_time.push(`<small>${minutes} minit</small>`);
        elapsed_time.push(`<small>${seconds} saat</small>`); // Always show seconds

        $(element).html(elapsed_time.join(" "));
    }, 1000);
}

// Hide the waiting layer
function hideWaitingLayer() {
    $('#waitingLayer').css('display', 'none');
}
function noti(w,t='success'){
    new Noty({
                    text: w,
                    type: t,
                    layout: 'topRight',
                    timeout: 3000, // 3 seconds timeout
                    progressBar: true,
                    theme: 'metroui'
                }).show();
}
function open_pdf(filename) {
    var isFullScreen = false; // Track the current state (full screen or not)

    BootstrapDialog.show({
        title: 'Lihat Dokumen',
        size: BootstrapDialog.SIZE_WIDE, // Initial size
        message: function(dialog) {
            var $content = $('<div></div>');
            var $iframe = $('<iframe></iframe>', {
                src: filename+'#view=FitH', // The PDF file path or URL
                style: 'width: 100%; height: 73vh; border: none; overflow: hidden;',
                frameborder: '0',
                scrolling: 'auto',
                id: 'pdfIframe' // Assign an ID to the iframe for later access
            });
            $content.append($iframe);
            return $content;
        },
        buttons: [
            {
                label: 'Paparan Penuh',
                id: 'fullScreenBtn', // ID for the button
                action: function(dialogRef) {
                    if (!isFullScreen) {
                        // Toggle to full screen
                        dialogRef.setSize(BootstrapDialog.SIZE_EXTRAWIDE); // Change to extra wide size
                        $('#fullScreenBtn').text('Keluar Paparan Penuh'); // Change button text
                        // Update iframe dimensions
                        $('#pdfIframe').css('height', '73vh'); // Increase the height for full screen
                        
                    } else {
                        // Toggle back to normal size
                        dialogRef.setSize(BootstrapDialog.SIZE_WIDE);
                        $('#fullScreenBtn').text('Paparan Penuh'); // Reset button text
                        // Reset iframe dimensions
                        $('#pdfIframe').css('height', '73vh');
                    }
                    isFullScreen = !isFullScreen; // Toggle the state
                }
            },
            {
                label: 'Tutup',
                action: function(dialogRef) {
                    dialogRef.close();
                }
            }
        ]
    });
}

function update_status_aduan(id_rekod) {
    var tindakan_aduan_status_id = $('#tindakan_aduan_status_id').val();
    var tindakan_oleh_admin_id = $('#tindakan_oleh_admin_id').val();
    var tindakan_oleh_nama = $('#tindakan_oleh_nama').val();
    var tindakan_oleh_bahagian = $('#tindakan_oleh_bahagian').val();
    var tindakan_oleh_tel = $('#tindakan_oleh_tel').val();
    var tindakan_oleh_emel = $('#tindakan_oleh_emel').val();
    var tindakan_pegawai_admin_id = $('#tindakan_pegawai_admin_id').val();
    var tindakan_pegawai_admin_email = $('#tindakan_pegawai_admin_email').val();
    var tindakan_pegawai_admin_tel = $('#tindakan_pegawai_admin_tel').val();
    var tindakan_pegawai = $('#tindakan_pegawai').val();
    var status_selesai = $('#status_selesai').val();

    if (tindakan_aduan_status_id === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Status Missing',
            text: 'Please select a status.'
        });
        return $.Deferred().reject(); // Return a rejected Deferred object if no status is selected
    }

    return $.ajax({
        url: 'update_tindakan.php', // PHP script for updating the status
        type: 'POST',
        dataType: 'json', // Expect JSON response
        data: {
            id_rekod: id_rekod,
            tindakan_aduan_status_id: tindakan_aduan_status_id,
            tindakan_oleh_admin_id: tindakan_oleh_admin_id,
            tindakan_oleh_nama: tindakan_oleh_nama,
            tindakan_oleh_bahagian: tindakan_oleh_bahagian,
            tindakan_oleh_tel: tindakan_oleh_tel,
            tindakan_oleh_emel: tindakan_oleh_emel,
            tindakan_pegawai: tindakan_pegawai,
            tindakan_pegawai_admin_id: tindakan_pegawai_admin_id,
            tindakan_pegawai_admin_email: tindakan_pegawai_admin_email,
            tindakan_pegawai_admin_tel: tindakan_pegawai_admin_tel,
            status_selesai: status_selesai
        },
        success: function(response) {
            if (response.success) {
                   $('#tindakan_aduan_upload').uploadifive({
                    'auto': true, // Automatically upload files upon selection
                    'queueID': 'tindakan_aduan_upload_queue', // ID of the queue container
                    'uploadScript': 'tindakan_aduan_uploadifive.php', // Server-side script to handle uploads
                    'buttonText': 'Pilih Dokumen', // Text for the upload button
                    'buttonClass':'btn btn-danger p-0',
                    'fileSizeLimit': '10MB', // Limit for file size
                    'fileType': ['application/pdf', 'image/jpeg', 'image/png'], // Allowed file types
                    'formData': {
                        'id_rekod': id_rekod, // Additional data to send with the upload
                        'id_tindakan_aduan': response.id_tindakan_aduan, // Additional data to send with the upload
                    },
                    'onUploadComplete': function(file, data) {
                        $('#tindakan_aduan_div').load('tindakan_pembetulan.php?id_rekod=' + id_rekod);
                        console.log('Upload completed:', file, data); // Callback for completed uploads
                    },
                    'onError': function(errorType, file) {
                        console.error('Error:', errorType, file); // Callback for upload errors
                    }
                });
                if ($('#tindakan_aduan_file_selected').val()==1) {
                    $('#tindakan_aduan_upload').uploadifive('upload'); // Trigger file upload
                } else {
                    $('#tindakan_aduan_div').load('tindakan_pembetulan.php?id_rekod=' + id_rekod);
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message
                });
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX Error:', status, error);
            Swal.fire({
                icon: 'error',
                title: 'AJAX Error',
                text: 'Failed to update the status. Please try again.'
            });
        }
    });
}

function update_status_aduan_pe(id_rekod) {
    var tindakan_aduan_status_id = $('#tindakan_aduan_status_id').val();
    var tindakan_action_status_id = $('#tindakan_action_status_id').val();
    var tindakan_aduan_step_id = $('#tindakan_aduan_step_id').val();
    var tindakan_oleh_admin_id = $('#tindakan_oleh_admin_id').val();
    var tindakan_oleh_nama = $('#tindakan_oleh_nama').val();
    var tindakan_oleh_bahagian = $('#tindakan_oleh_bahagian').val();
    var tindakan_oleh_tel = $('#tindakan_oleh_tel').val();
    var tindakan_oleh_emel = $('#tindakan_oleh_emel').val();
    var tindakan_pegawai_admin_id = $('#tindakan_pegawai_admin_id').val();
    var tindakan_pegawai_admin_email = $('#tindakan_pegawai_admin_email').val();
    var tindakan_pegawai_admin_tel = $('#tindakan_pegawai_admin_tel').val();
    var tindakan_pegawai = $('#tindakan_pegawai').val();
    var status_selesai = $('#status_selesai').val();
    var tindakan_text = $('#tindakan_text').val();

    if (tindakan_aduan_status_id === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Status Missing',
            text: 'Please select a status.'
        });
        return $.Deferred().reject(); // Return a rejected Deferred object if no status is selected
    }

    return $.ajax({
        url: 'update_tindakan_pe.php', // PHP script for updating the status
        type: 'POST',
        dataType: 'json', // Expect JSON response
        data: {
            id_rekod: id_rekod,
            tindakan_aduan_status_id: tindakan_aduan_status_id,
            tindakan_action_status_id: tindakan_action_status_id,
            tindakan_aduan_step_id: tindakan_aduan_step_id,
            tindakan_oleh_admin_id: tindakan_oleh_admin_id,
            tindakan_oleh_nama: tindakan_oleh_nama,
            tindakan_oleh_bahagian: tindakan_oleh_bahagian,
            tindakan_oleh_tel: tindakan_oleh_tel,
            tindakan_oleh_emel: tindakan_oleh_emel,
            tindakan_pegawai: tindakan_pegawai,
            tindakan_pegawai_admin_id: tindakan_pegawai_admin_id,
            tindakan_pegawai_admin_email: tindakan_pegawai_admin_email,
            tindakan_pegawai_admin_tel: tindakan_pegawai_admin_tel,
            status_selesai: status_selesai,
            tindakan_text: tindakan_text
        },
        success: function(response) {
            if (response.success) {
                   $('#tindakan_aduan_upload').uploadifive({
                    'auto': true, // Automatically upload files upon selection
                    'queueID': 'tindakan_aduan_upload_queue', // ID of the queue container
                    'uploadScript': 'tindakan_aduan_uploadifive.php', // Server-side script to handle uploads
                    'buttonText': 'Pilih Dokumen', // Text for the upload button
                    'buttonClass':'btn btn-danger p-0',
                    'fileSizeLimit': '10MB', // Limit for file size
                    'fileType': ['application/pdf', 'image/jpeg', 'image/png'], // Allowed file types
                    'formData': {
                        'id_rekod': id_rekod, // Additional data to send with the upload
                        'id_tindakan_aduan': response.id_tindakan_aduan, // Additional data to send with the upload
                    },
                    'onUploadComplete': function(file, data) {
                        $('#tindakan_aduan_div').load('tindakan_pembetulan.php?id_rekod=' + id_rekod);
                        console.log('Upload completed:', file, data); // Callback for completed uploads
                    },
                    'onError': function(errorType, file) {
                        console.error('Error:', errorType, file); // Callback for upload errors
                    }
                });
                
                if ($('#tindakan_aduan_file_selected').val()==1) {
                    $('#tindakan_aduan_upload').uploadifive('upload'); // Trigger file upload
                } else {
                    $('#tindakan_aduan_div').load('tindakan_pembetulan.php?id_rekod=' + id_rekod);
                }
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message
                });
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX Error:', status, error);
            Swal.fire({
                icon: 'error',
                title: 'AJAX Error',
                text: 'Failed to update the status. Please try again.'
            });
        }
    });
}


function maklumat_aduan_submit(id_rekod) {
    var action = $("#button-hantar").data("action");
    
    if (action==1){
        // Show SweetAlert confirmation before submitting the form
        Swal.fire({
            title: 'Adakah anda pasti?',
            text: "Anda akan mengemaskinikan tindakan aduan",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hantar!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                update_status_aduan_proceed(id_rekod, action)
            }
        });
    } else {
        // Show SweetAlert confirmation before submitting the form
        Swal.fire({
            title: 'Adakah anda pasti?',
            text: "Anda akan mengemaskinikan aduan ini dan pegawai yang ditetapkan akan dimaklumkan",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hantar!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                update_status_aduan_proceed(id_rekod, action)
            }
        });
    }
    
}
function tindakan_aduan_submit(id_rekod) {
    var action = $("#button-hantar").data("action");
    update_status_aduan_proceed_then_uploadifive(id_rekod, action);
   //alert(action);
}

function butiran_tetapan_submit(id_rekod) {
    var q = $("#butiran_tetapan_form").serializeArray();
    q.push({name: 'id_rekod', value: id_rekod}); // Add id_rekod to the serialized data

    $.ajax({
        url: 'butiran_tetapan_submit.php',
        type: 'POST',
        data: q,
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                noti(response.message, 'success');
            } else {
                noti(response.message, 'error');
            }
        },
        error: function(xhr, status, error) {
            noti('An error occurred while processing your request. Please try again.', 'error');
            console.error('AJAX Error:', status, error);
        }
    });
}
function update_status_aduan_proceed_then_uploadifive(id_rekod, action){
    
            // Run update_status_aduan and wait for it to complete. This is to update tindakan_aduan
    
    if (action == 0) { // kemaskini dan hantar makluman kepada pegawai
        update_status_aduan(id_rekod).done(function() {
                
                
                
                // Serialize form data
                var formData = $('#maklumat_aduan_form').serializeArray(); // Use serializeArray to add custom data

                // Gather selected jenis_aduan from badges
                var selectedJenisAduan = [];
                $('#selectedJenisAduan .badge').each(function() {
                    selectedJenisAduan.push($(this).data('id')); // Extract the data-id of each badge
                });

                // Add selected jenis_aduan array to formData
                formData.push({ name: 'jenis_aduan', value: JSON.stringify(selectedJenisAduan) });
                formData.push({ name: 'tindakan_aduan_status_id', value: $("#tindakan_aduan_status_id").val() });
                formData.push({ name: 'status_selesai', value: $("#butiran_tetapan_form #status_selesai").val() });
                //console.log('status_selesai=>'+$("#status_selesai").val());
                // Submit form using AJAX
                $.ajax({
                    url: 'maklumat_aduan_submit.php?id_rekod=' + id_rekod, // Replace with your actual URL
                    type: 'POST',
                    data: $.param(formData), // Convert formData array into URL-encoded string
                	dataType: 'text', // Force jQuery to treat response as plain text
                    success: function(response) {
                        response = response.trim(); // Remove any unwanted whitespace
                        //console.log('maklumat_aduan_submit=>'+response);
                        if (response === 'success') {
                            $('#tindakan_aduan_div').load('tindakan_pembetulan.php?id_rekod=' + id_rekod);
                            if (action==1) {
                                var msg = 'Maklumat aduan telah dikemaskini.';
                            } else if (action==0) {
                                var msg = 'Maklumat aduan telah dihantar kepada pegawai untuk tindakan lanjut.'
                            }
                            
                            Swal.fire(
                                'Berjaya!',
                                msg,
                                'success'
                            );
                        
                            $("#log_sms_div").load("log_sms.php?id_rekod="+id_rekod);
                            $("#log_email_div").load("log_email.php?id_rekod="+id_rekod);
                        
                        } else {
                            Swal.fire(
                                'Ralat!',
                                'Gagal untuk menghantar maklumat aduan.',
                                'error'
                            );
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error('Error details:', textStatus, errorThrown, jqXHR.responseText);
                        Swal.fire(
                            'Ralat!',
                            'Satu ralat telah berlaku semasa menghantar maklumat aduan.',
                            'error'
                        );
                    }
                });
                
                //$(".reset").val("");
            });
        
    } else if (action == 1) {
        
                update_status_aduan_pe(id_rekod).done(function() {
                    
                    
                });

                
    }
            
        
}

function update_status_aduan_proceed(id_rekod, action){
    
            // Run update_status_aduan and wait for it to complete. This is to update tindakan_aduan
    
    if (action == 0) {
        update_status_aduan(id_rekod).done(function() {
                
                
                
                // Serialize form data
                var formData = $('#maklumat_aduan_form').serializeArray(); // Use serializeArray to add custom data

                // Gather selected jenis_aduan from badges
                var selectedJenisAduan = [];
                $('#selectedJenisAduan .badge').each(function() {
                    selectedJenisAduan.push($(this).data('id')); // Extract the data-id of each badge
                });

                // Add selected jenis_aduan array to formData
                formData.push({ name: 'jenis_aduan', value: JSON.stringify(selectedJenisAduan) });
                formData.push({ name: 'tindakan_aduan_status_id', value: $("#tindakan_aduan_status_id").val() });

                // Submit form using AJAX
                $.ajax({
                    url: 'maklumat_aduan_submit.php?id_rekod=' + id_rekod, // Replace with your actual URL
                    type: 'POST',
                    data: $.param(formData), // Convert formData array into URL-encoded string
                    success: function(response) {
                        if (response === 'success') {
                            $('#tindakan_aduan_div').load('tindakan_pembetulan.php?id_rekod=' + id_rekod);
                            if (action==1) {
                                var msg = 'Maklumat aduan telah dikemaskini.';
                            } else if (action==0) {
                                var msg = 'Maklumat aduan telah dihantar kepada pegawai untuk tindakan lanjut.'
                            }
                            
                            Swal.fire(
                                'Berjaya!',
                                msg,
                                'success'
                            );
                        } else {
                            Swal.fire(
                                'Ralat!',
                                'Gagal untuk menghantar maklumat aduan.',
                                'error'
                            );
                        }
                    },
                    error: function() {
                        Swal.fire(
                            'Ralat!',
                            'Satu ralat telah berlaku semasa menghantar maklumat aduan.',
                            'error'
                        );
                    }
                });
                
                //$(".reset").val("");
            });
        
    } else {
        
                
                
                
                // Serialize form data
                var formData = $('#maklumat_aduan_form').serializeArray(); // Use serializeArray to add custom data

                // Gather selected jenis_aduan from badges
                var selectedJenisAduan = [];
                $('#selectedJenisAduan .badge').each(function() {
                    selectedJenisAduan.push($(this).data('id')); // Extract the data-id of each badge
                });

                // Add selected jenis_aduan array to formData
                formData.push({ name: 'jenis_aduan', value: JSON.stringify(selectedJenisAduan) });
                formData.push({ name: 'tindakan_aduan_status_id', value: $("#tindakan_aduan_status_id").val() });

                // Submit form using AJAX
                $.ajax({
                    url: 'maklumat_aduan_submit.php?id_rekod=' + id_rekod, // Replace with your actual URL
                    type: 'POST',
                    data: $.param(formData), // Convert formData array into URL-encoded string
                    success: function(response) {
                        if (response === 'success') {
                            $('#tindakan_aduan_div').load('tindakan_pembetulan.php?id_rekod=' + id_rekod);
                            if (action==1) {
                                var msg = 'Maklumat aduan telah dikemaskini.';
                            } else if (action==0) {
                                var msg = 'Maklumat aduan telah dihantar kepada pegawai untuk tindakan lanjut.'
                            }
                            
                            Swal.fire(
                                'Berjaya!',
                                msg,
                                'success'
                            );
                        } else {
                            Swal.fire(
                                'Ralat!',
                                'Gagal untuk menghantar maklumat aduan.',
                                'error'
                            );
                        }
                    },
                    error: function() {
                        Swal.fire(
                            'Ralat!',
                            'Satu ralat telah berlaku semasa menghantar maklumat aduan.',
                            'error'
                        );
                    }
                });
                
    }
            
        
}

function update_tindakan_pic(id_rekod) {
    var tindakan_oleh_maklumbalas = $('#tindakan_oleh_maklumbalas').val();
    var status_tindakan = $('#tindakan_aduan_status_id').val();
    var tindakan_oleh_nama = $('#tindakan_oleh_nama').val();
    var tindakan_oleh_bahagian = $('#tindakan_oleh_bahagian').val();
    var tindakan_oleh_bahagian_id = $('#tindakan_oleh_bahagian_id').val();
    var tindakan_oleh_emel = $('#tindakan_oleh_emel').val();
    var tindakan_oleh_tel = $('#tindakan_oleh_tel').val();
    var tindakan_selesai = $('#status_selesai').val();
    
    // Check if fields are empty
    if (tindakan_oleh_maklumbalas === '' || status_tindakan === '') {
        alert('Sila isi semua medan sebelum menghantar.');
        return;
    }

    $.ajax({
        url: 'update_tindakan_pic.php',  // PHP script URL to handle the database operation
        method: 'POST',
        data: {
            id_rekod: id_rekod,
            tindakan_oleh_maklumbalas: tindakan_oleh_maklumbalas,
            status_tindakan: status_tindakan,
            tindakan_oleh_nama: tindakan_oleh_nama,
            tindakan_oleh_bahagian: tindakan_oleh_bahagian,
            tindakan_oleh_bahagian_id: tindakan_oleh_bahagian_id,
            tindakan_oleh_emel: tindakan_oleh_emel,
            tindakan_oleh_tel: tindakan_oleh_tel,
            tindakan_selesai: tindakan_selesai
        },
        success: function(response) {
            // Assuming the PHP response contains { success: true }
            if (response.success) {
                $('#tindakan_aduan_div').load('tindakan_pembetulan.php?id_rekod=' + id_rekod);
                
                // Clear the #tindakan_oleh_maklumbalas input field
                $('#tindakan_oleh_maklumbalas').val('');
                
                // Show a Noty notification for success
                new Noty({
                    text: 'Tindakan telah berjaya dikemaskini.',
                    type: 'success',
                    layout: 'topRight',
                    timeout: 3000, // 3 seconds timeout
                    progressBar: true,
                    theme: 'mint'
                }).show();
            } else {
                alert('Terdapat masalah semasa mengemaskini tindakan.');
            }
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            alert('Ralat dalam permintaan.');
        }
    });
}
function add_eaduan() {
    BootstrapDialog.show({
        title: 'Tambah Aduan',
        closable: true,
        draggable: true,
        scrollable: true,
        size: BootstrapDialog.SIZE_WIDE,
        message: function() {
            return $('<div>').load('search_pengadu.php', function() {
                let $namaPengadu = $("#add_aduan_form #nama_pengadu");
                let $idAduanUser = $("#add_aduan_form #id_aduan_user");

                if (!$namaPengadu.length) return;

                // Inject custom CSS dynamically for Autocomplete UI
                $("<style>")
                    .prop("type", "text/css")
                    .html(`
                        .ui-autocomplete {
                            z-index: 99999 !important;
                            max-height: 250px;
                            overflow-y: auto;
                            background: white;
                            border: 1px solid #ccc;
                            padding: 5px;
                            position: absolute !important;
                        }
                    `)
                    .appendTo("head");

                // Initialize Autocomplete
                $namaPengadu.autocomplete({
                    source: function(request, response) {
                        $.ajax({
                            url: "search_pengadu_ac.php",
                            type: "POST",
                            dataType: "json",
                            data: { term: request.term },
                            success: function(data) {
                                response($.map(data, function(item) {
                                    return {
                                        label: item.name, // used for selection
                                        value: item.name, // this value is set in the input field
                                        id: item.id
                                    };
                                }));
                            }
                        });
                    },
                    minLength: 3,
                    select: function(event, ui) {
                        $idAduanUser.val(ui.item.id);
                    },
                    response: function(event, ui) {
                        if (!ui.content.length) {
                            alert("Tiada pengadu dijumpai. Sila tambah pengadu terlebih dahulu.");
                            tambah_pengadu();
                        }
                    }
                }).autocomplete("instance")._renderItem = function(ul, item) {
                    return $("<li>")
                        .append(`<a href="javascript:login_as_user(${item.id})">${item.value}</a>`)
                        .appendTo(ul);
                };
            });
        },
        buttons: [
            {
                label: 'Tutup',
                cssClass: 'btn-danger',
                action: function(dialogRef) {
                    dialogRef.close();
                }
            }
        ]
    });
}

function add_faq(){
    var isFullScreen = false;  // Ensure fullscreen state is tracked
    var lastDialogSize = BootstrapDialog.SIZE_WIDE;  // Set the default dialog size

    var dialog = BootstrapDialog.show({
        title: 'Tambah Soalan Lazim',
        message: $('<div></div>').load('faq_form.php'),  // Load the form for adding a new FAQ
        size:  lastDialogSize,  // Use the last toggled size (either WIDE or EXTRAWIDE)
        onshown: function(dialogRef) {
            // Set the height of the dialog to 93vh
            dialogRef.$modalDialog.css('height', '93vh');
            $(".bootstrap-dialog-body").height('76vh');
            $(".modal-content").height('93vh');

            // Initialize CKEditor
            CKEDITOR.loadTemplates(CKEDITOR.config.templates_files, '');
            CKEDITOR.replace('faq_answer', {
                filebrowserBrowseUrl: 'assets/ckfinder/ckfinder.html',
                filebrowserImageBrowseUrl: 'assets/ckfinder/ckfinder.html?Type=Images',
                filebrowserUploadUrl: 'assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
                filebrowserImageUploadUrl: 'assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
                extraPlugins: 'stylesheetparser,codemirror',
                contentsCss: [],
                on: {
                    instanceReady: function(ev) {
                        this.dataProcessor.writer.setRules('div', {
                            indent: false,
                            breakBeforeOpen: false,
                            breakAfterOpen: false,
                            breakBeforeClose: false,
                            breakAfterClose: false
                        });

                        // Temporarily disable BootstrapDialog's focus enforcement when CKEditor dialog opens
                        CKEDITOR.on('dialogShow', function() {
                            dialogRef.$modal.off('focusin.modal');
                        });

                        // Re-enable BootstrapDialog's focus enforcement when CKEditor dialog closes
                        CKEDITOR.on('dialogHide', function() {
                            dialogRef.$modal.on('focusin.modal', function(e) {
                                if (dialogRef.$modal[0] !== e.target && !dialogRef.$modal.has(e.target).length) {
                                    dialogRef.$modal.trigger('focus');
                                }
                            });
                        });

                        // Handling CKEditor keyboard shortcuts for adding a new FAQ
                        ev.editor.on('key', function(evt) {
                            if (evt.data.keyCode === 1114195) {  // Detect specific keypress for FAQ submission
                                evt.data.domEvent.preventDefault();
                                add_faq_submit(dialogRef);
                            }
                        });
                    }
                }
            });
        },
        buttons: [{
            label: 'Tutup',
            cssClass: 'bg-danger',
            action: function(dialogRef) {
                dialogRef.close();
            }
        }, {
            id: 'btn-fullscreen-toggle',
            label: isFullScreen ? 'Saiz Biasa' : 'Saiz Besar',  // Set initial button label
            cssClass: 'bg-warning',
            action: function(dialogRef) {
                var $button = dialog.getButton('btn-fullscreen-toggle');  // Get the button by ID

                // Toggle between WIDE and EXTRAWIDE sizes
                if (isFullScreen) {
                    dialogRef.setSize(BootstrapDialog.SIZE_WIDE);
                    dialogRef.$modalDialog.css('height', '93vh');  // Reapply height for wide view
                    $button.text('Saiz Besar'); // Set label back to 'Fullscreen'
                    lastDialogSize = BootstrapDialog.SIZE_WIDE;  // Update global variable
                } else {
                    dialogRef.setSize(BootstrapDialog.SIZE_EXTRAWIDE);
                    dialogRef.$modalDialog.css('height', '93vh');  // Ensure height remains consistent in fullscreen mode
                    $button.text('Saiz Biasa'); // Set label to 'Normal Screen'
                    lastDialogSize = BootstrapDialog.SIZE_EXTRAWIDE;  // Update global variable
                }

                isFullScreen = !isFullScreen;  // Toggle the fullscreen flag
            }
        }, {
            id: 'btn-add-faq',
            label: 'Tambah',
            cssClass: 'bg-primary',
            action: function(dialogRef) {
                // Trigger form submission to add a new FAQ and close dialog on success
                add_faq_submit(dialogRef);  // Pass the dialog reference to close it later
            }
        }]
    });
}

// Submit the new FAQ form
function add_faq_submit(dialogRef) {
    var faq_question = $('#faq_form #faq_question').val();  // Get the question value
    var faq_answer = CKEDITOR.instances['faq_answer'].getData();  // Get CKEditor data for the answer
    var faq_category = $('#faq_form #faq_category').val();  // Get the selected category
    
    // Log values for debugging purposes
    //console.log("FAQ Question: ", faq_question);
    //console.log("FAQ Answer: ", faq_answer);
    //console.log("FAQ Category: ", faq_category);

    // Ensure required fields are filled
    if (faq_question === '' || faq_answer === '' || faq_category === '') {
        alert('Sila isi semua medan sebelum menghantar.');
        return;
    }

    // Send the form data via AJAX
    $.ajax({
        url: 'faq_add_submit.php',  // Backend script to handle adding a new FAQ
        method: 'POST',
        data: {
            faq_category: faq_category,  // Send the category ID
            faq_question: faq_question,  // Send the question
            faq_answer: faq_answer       // Send the answer
        },
        success: function(response) {
            if (response.success) {
                // Show success notification using Noty
                new Noty({
                    type: 'success',
                    theme: 'mint',
                    layout: 'topRight',
                    text: 'Soalan lazim berjaya ditambah.',
                    timeout: 3000
                }).show();
                
// Reload the DataTable to reflect the new FAQ
                $('#faq_table').DataTable().ajax.reload(null, false);  // Reload without resetting pagination

                // Reset the form fields
                $('#faq_form #faq_question').val('');  // Clear the question input field
                CKEDITOR.instances['faq_answer'].setData('');  // Clear CKEditor data for the answer
                //$('#faq_form #faq_category').val('');  // Optionally reset the category dropdown
            
            } else {
                alert('Terdapat masalah semasa menambah soalan lazim.');
            }
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            alert('Ralat dalam permintaan.');
        }
    });
}
function tutup_aduan(id_rekod) {
    // Get the window name using the given id_rekod
    const windowName = 'aduan_' + id_rekod;

    // Access the window by its name and close it if it exists
    const aduanWindow = window.open('', windowName);
    if (aduanWindow) {
        aduanWindow.close();
        console.log(`Window '${windowName}' has been closed.`);
    } else {
        console.log(`No window found with the name '${windowName}'.`);
    }
}
function sidebartoggler() {
    // Check if the body has the 'mini-sidebar' class to determine the current sidebar state
    if ($("body").hasClass("mini-sidebar")) {
        console.log('no sidebar');
        // If in mini-sidebar mode, expand the sidebar
        $("body").removeClass("mini-sidebar");
        $(".navbar-brand span").show(); // Show the brand name
        $("body").trigger("resize"); // Trigger resize to ensure layout updates
    } else {
        console.log('got sidebar');
        // If not in mini-sidebar mode, collapse the sidebar
        $("body").addClass("mini-sidebar");
        $(".navbar-brand span").hide(); // Hide the brand name
        $("body").trigger("resize"); // Trigger resize to ensure layout updates
    }
}
function cari_aduan(){
    var k = $("#k").val();
    location.href='senarai_aduan.php?k='+k;
}
function senarai_aduan_by_tempoh(start,end) {
    location.href="senarai_aduan.php?tempoh_start="+start+"&tempoh_end="+end;
}
function senarai_aduan_by_sumber(id_sumber) {
    location.href="senarai_aduan.php?sumber_aduan="+id_sumber;
}

function edit_admin(idadmin_user) {
            BootstrapDialog.show({
                title: 'Kemaskini Pentadbir',
                size: BootstrapDialog.SIZE_WIDE,
                message: function (dialog) {
                    var $content = $('<div></div>');
                    $content.load('edit_admin_form.php?id=' + idadmin_user);
                    return $content;
                },
                buttons: [
                    {
                        label: 'Tutup',
                        cssClass: 'bg-danger',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    },
                    {
                        label: 'Kemaskini',
                        cssClass: 'bg-primary',
                        action: function (dialogRef) {
                            var formData = $('#edit_admin_form').serialize();
                            $.post('edit_admin_submit.php', formData, function (response) {
                                if (response.success) {
                                    dialogRef.close();
                                    $('#dtAdmin').DataTable().draw(); // Refresh the DataTable
                                } else {
                                    alert('Kemaskini gagal: ' + response.message);
                                }
                            }, 'json');
                        }
                    }
                ]
            });
        }

function delete_admin(idadmin_user) {
            Swal.fire({
                title: 'Adakah Anda Pasti?',
                text: "Tindakan ini tidak boleh diundur!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, padam!',
                cancelButtonText: 'Tidak'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.post('delete_admin.php', { id: idadmin_user }, function (response) {
                        if (response.success) {
                            Swal.fire(
                                'Telah Dipadam!',
                                'Pentadbir telah dipadamkan.',
                                'success'
                            );
                            $('#dtAdmin').DataTable().draw(); // Refresh the DataTable
                        } else {
                            Swal.fire(
                                'Ralat!',
                                'Gagal untuk memadam rekod: ' + response.message,
                                'error'
                            );
                        }
                    }, 'json');
                }
            });
}
function add_admin() { 
        BootstrapDialog.show({
            title: 'Tambah Pentadbir',
            closable: false,
            size: BootstrapDialog.SIZE_WIDE,
            message: function(dialog) {
                var $content = $('<div></div>');
                $content.load('add_admin_form.php');
                return $content;
            },
            buttons: [
                {
                    label: 'Tutup',
                    cssClass: 'btn-danger',
                    action: function(dialogRef) {
                        dialogRef.close();
                    }
                },
                {
                    label: 'Tambah Pentadbir',
                    cssClass: 'btn-primary',
                    action: function(dialogRef) {
                        var isValid = true;
                        $('#add_admin_form .required').each(function() {
                            if (!this.checkValidity()) {
                                isValid = false;
                                $(this).tooltip({
                                    title: this.validationMessage,
                                    placement: 'top',
                                    trigger: 'manual'
                                }).tooltip('show');

                                $(this).on('input', function() {
                                    $(this).tooltip('dispose');
                                });
                            }
                        });

                        if (isValid) {
                            var formData = $('#add_admin_form').serialize();
                            $.post('add_admin_submit.php', formData, function(response) {
                                if (response.success) {
                                    dialogRef.close();
                                    $('#dtAdmin').DataTable().draw(); // Refresh the DataTable
                                    new Noty({
                                        text: 'Pentadbir berjaya ditambah!',
                                        type: 'success',
                                        layout: 'topRight',
                                        timeout: 3000
                                    }).show();
                                } else {
                                    new Noty({
                                        text: 'Tambah gagal: ' + response.message,
                                        type: 'error',
                                        layout: 'topRight',
                                        timeout: 3000
                                    }).show();
                                }
                            }, 'json');
                        }
                    }
                }
            ]
        });
    }
function add_projek_lokasi() { 
        BootstrapDialog.show({
            title: 'Tambah Projek',
            size: BootstrapDialog.SIZE_WIDE,
            message: function(dialog) {
                var $content = $('<div></div>');
                $content.load('add_projek_lokasi_form.php');
                return $content;
            },
            buttons: [
                {
                    label: 'Tutup',
                    cssClass: 'btn-danger',
                    action: function(dialogRef) {
                        dialogRef.close();
                    }
                },
                {
                    label: 'Tambah Projek',
                    cssClass: 'btn-primary',
                    action: function(dialogRef) {
                        var isValid = true;
                        $('#add_projek_lokasi_form .required').each(function() {
                            if (!this.checkValidity()) {
                                isValid = false;
                                $(this).tooltip({
                                    title: this.validationMessage,
                                    placement: 'top',
                                    trigger: 'manual'
                                }).tooltip('show');

                                $(this).on('input', function() {
                                    $(this).tooltip('dispose');
                                });
                            }
                        });

                        if (isValid) {
                            var formData = $('#add_projek_lokasi_form').serialize();
                            $.post('add_projek_lokasi_submit.php', formData, function(response) {
                                if (response.success) {
                                    dialogRef.close();
                                    $('#dtProjek').DataTable().draw(); // Refresh the DataTable
                                    new Noty({
                                        text: 'Projek berjaya ditambah!',
                                        type: 'success',
                                        layout: 'topRight',
                                        timeout: 3000
                                    }).show();
                                } else {
                                    new Noty({
                                        text: 'Tambah gagal: ' + response.message,
                                        type: 'error',
                                        layout: 'topRight',
                                        timeout: 3000
                                    }).show();
                                }
                            }, 'json');
                        }
                    }
                }
            ]
        });
    }
function edit_projek_lokasi(id_aduan_projek_lokasi) {
        BootstrapDialog.show({
            title: 'Kemaskini Projek Lokasi',
            size: BootstrapDialog.SIZE_WIDE,
            message: function(dialog) {
                var $content = $('<div></div>');
                $content.load('edit_projek_lokasi_form.php?id=' + id_aduan_projek_lokasi);
                return $content;
            },
            buttons: [
                {
                    label: 'Tutup',
                    cssClass: 'btn-danger',
                    action: function(dialogRef) {
                        dialogRef.close();
                    }
                },
                {
                    label: 'Kemaskini Projek',
                    cssClass: 'btn-primary',
                    action: function(dialogRef) {
                        var formData = new FormData(document.getElementById('edit_projek_lokasi_form'));
                        formData.append('id_aduan_projek_lokasi', id_aduan_projek_lokasi);

                        fetch('edit_projek_lokasi_submit.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                           // alert(data.message);
                            if (data.success) {
                                $('#dtProjek').DataTable().draw(); // Refresh the DataTable
                                dialogRef.close();
                            }
                        })
                        .catch(error => console.error('Error:', error));
                    }
                }
            ]
        });
    }

function delete_projek_lokasi(id_aduan_projek_lokasi) {
    Swal.fire({
        title: 'Adakah Anda Pasti?',
        text: "Tindakan ini tidak boleh diundur!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, padam!',
        cancelButtonText: 'Tidak'
    }).then((result) => {
        if (result.isConfirmed) {
            $.post('delete_projek_lokasi.php', { id: id_aduan_projek_lokasi }, function (response) {
                if (response.success) {
                    Swal.fire(
                        'Telah Dipadam!',
                        'Projek lokasi telah dipadamkan.',
                        'success'
                    );
                    $('#dtProjek').DataTable().draw(); // Refresh the DataTable
                } else {
                    Swal.fire(
                        'Ralat!',
                        'Gagal untuk memadam rekod: ' + response.message,
                        'error'
                    );
                }
            }, 'json');
        }
    });
}

function updateTownship(selectElement, idRekod) {
    var selectedValue = selectElement.value;

    $.ajax({
        url: "update_township.php", // A separate PHP script to handle updates
        type: "POST",
        data: {
            id_rekod: idRekod,
            data_aduan_lokasi_id: selectedValue
        },
        success: function(response) {
            if (response.success) {
                //alert("Township updated successfully.");
                $('#resultsTable').DataTable().ajax.reload(null, false); // Reload the DataTable
            } else {
                //alert("Failed to update Township.");
            }
        },
        error: function() {
            //alert("An error occurred while updating.");
        }
    });
}
function sahkan(idRekod) {
    $.ajax({
        url: "update_lokasi_confirmed.php",
        type: "POST",
        data: {
            id_rekod: idRekod,
            data_aduan_lokasi_confirmed: 1
        },
        success: function(response) {
            if (response.success) {
                //alert("Lokasi telah disahkan.");
                $('#resultsTable').DataTable().ajax.reload(null, false); // Reload the DataTable
            } else {
                alert("Gagal mengesahkan lokasi.");
            }
        },
        error: function() {
            //alert("Terjadi kesalahan semasa mengesahkan lokasi.");
        }
    });
}

function login_as_user(id_aduan_user) {
    // Get CSRF token from csrf_token.php
    $.ajax({
        url: 'get_csrf_token.php',
        type: 'GET',
        success: function(response) {
            var csrf_token = response.csrf_token; // assuming csrf_token.php returns {csrf_token: "value"}

            // Make AJAX call to login_as_user.php
            $.ajax({
                url: '../login_as_user.php',
                type: 'POST',
                data: {
                    csrf_token: csrf_token,
                    id_aduan_user: id_aduan_user
                },
                 success: function(result) {
                try {
                    var response = JSON.parse(result);

                    // Check if status is "1" and open dashboard if valid
                    if (response.status === "1") {
                        //window.location.href = "../dashboard.php";
                        window.open("../dashboard.php","aduan_user_"+id_aduan_user);
                    } else {
                        alert("Login failed: " + response.message);
                    }
                } catch (error) {
                    console.error("Error parsing JSON response:", error);
                    alert("An error occurred. Please try again.");
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX error:", status, error);
                alert("An error occurred. Please try again.");
            }
            });
        },
        error: function() {
            alert('Unable to retrieve CSRF token. Please try again.');
        }
    });
}

function login_as_user_rekod(id_aduan_user, id_rekod) {
    // Get CSRF token from csrf_token.php
    $.ajax({
        url: 'get_csrf_token.php',
        type: 'GET',
        success: function(response) {
            var csrf_token = response.csrf_token; // assuming csrf_token.php returns {csrf_token: "value"}

            // Make AJAX call to login_as_user.php
            $.ajax({
                url: '../login_as_user.php',
                type: 'POST',
                data: {
                    csrf_token: csrf_token,
                    id_aduan_user: id_aduan_user
                },
                 success: function(result) {
                try {
                    var response = JSON.parse(result);

                    // Check if status is "1" and open dashboard if valid
                    if (response.status === "1") {
                        //window.location.href = "../dashboard.php";
                        window.open("../sah_aduan_submit.php?id_rekod="+id_rekod,"aduan_user_"+id_aduan_user);
                    } else {
                        alert("Login failed: " + response.message);
                    }
                } catch (error) {
                    console.error("Error parsing JSON response:", error);
                    alert("An error occurred. Please try again.");
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX error:", status, error);
                alert("An error occurred. Please try again.");
            }
            });
        },
        error: function() {
            alert('Unable to retrieve CSRF token. Please try again.');
        }
    });
}

function login_as_admin(id_admin_user) {
    // Get CSRF token from csrf_token.php
    $.ajax({
        url: 'get_csrf_token.php',
        type: 'GET',
        success: function(response) {
            var csrf_token = response.csrf_token; // assuming csrf_token.php returns {csrf_token: "value"}

            // Make AJAX call to login_as_user.php
            $.ajax({
                url: 'login_as_admin.php',
                type: 'POST',
                data: {
                    csrf_token: csrf_token,
                    id_admin_user: id_admin_user
                },
                 success: function(result) {
                try {
                    var response = JSON.parse(result);

                    // Check if status is "1" and open dashboard if valid
                    if (response.status === "1") {
                        //window.location.href = "../dashboard.php";
                        window.open("index.php","aduan_admin_"+id_admin_user);
                    } else {
                        alert("Login failed: " + response.message);
                    }
                } catch (error) {
                    console.error("Error parsing JSON response:", error);
                    alert("An error occurred. Please try again.");
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX error:", status, error);
                alert("An error occurred. Please try again.");
            }
            });
        },
        error: function() {
            alert('Unable to retrieve CSRF token. Please try again.');
        }
    });
}

function login_as_admin_ori(id_admin_user) {
    // Get CSRF token from csrf_token.php
    $.ajax({
        url: 'get_csrf_token.php',
        type: 'GET',
        success: function(response) {
            var csrf_token = response.csrf_token; // assuming csrf_token.php returns {csrf_token: "value"}

            // Make AJAX call to login_as_user.php
            $.ajax({
                url: 'login_as_admin.php',
                type: 'POST',
                data: {
                    csrf_token: csrf_token,
                    id_admin_user: id_admin_user
                },
                 success: function(result) {
                try {
                    var response = JSON.parse(result);

                    // Check if status is "1" and open dashboard if valid
                    if (response.status === "1") {
                        //window.location.href = "../dashboard.php";
                        window.open("index.php","aduan_admin_"+id_admin_user);
                    } else {
                        alert("Login failed: " + response.message);
                    }
                } catch (error) {
                    console.error("Error parsing JSON response:", error);
                    alert("An error occurred. Please try again.");
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX error:", status, error);
                alert("An error occurred. Please try again.");
            }
            });
        },
        error: function() {
            alert('Unable to retrieve CSRF token. Please try again.');
        }
    });
}
function profile_saya(user_id) {
    // Open the dialog and load the content from profile_saya.php
    BootstrapDialog.show({
        title: '<?php echo tag("My Profile");?>',
        closable: false,
        message: $('<div></div>').load('profile_saya.php', { user_id: user_id }, function(response, status, xhr) {
            if (status == "error") {
                noti('Failed to load profile data.');
            } else {
                // Initialize uploadifive here, after the DOM has loaded
                $('#spq_admin_avatar').uploadifive({
                    'auto': true,
                    'multiple': false,
                    'formData': {
                        'user_id': user_id
                    },
                    'queueID': 'file_upload_queue',
                    'buttonText': '<?php echo tag("Upload Profile Picture");?>',
                    'fileSizeLimit': '5MB',
                    'fileType': ['png', 'jpg', 'gif', 'jpeg', 'webp'],
                    'buttonClass': 'btn btn-danger btn-sm ms-0 p-2',
                    'uploadScript': 'upload_profile_picture.php',  // The PHP file to handle the upload
                    'onUploadComplete': function(file, data) {
                        console.log('File upload completed');
                        var response = JSON.parse(data);
                        if (response.status === 'success') {
                            // Update the image source with the new file path
                            $('.avatar').attr('src', response.filePath);
                            $('#avatar_div').show();
                        } else {
                            noti('Error uploading the file.');
                        }
                    },
                    'onError': function(errorType) {
                        noti('Error: ' + errorType);
                    }
                });
            }
        }),
        size: BootstrapDialog.SIZE_WIDE,  // Set dialog size to wide
        onshown: function(dialogRef) {
            // Initialize password change or other functionalities that depend on the dialog being fully shown
            initialize_password_change();
        },
        buttons: [ {
            label: '<?php echo tag("Close");?>',
            cssClass: 'btn btn-danger btn-block',
            action: function(dialogRef) {
                dialogRef.close();
            }
        }, {
            label: '<?php echo tag("Save");?>',
            cssClass: 'btn btn-primary btn-block',
            action: function(dialogRef) {
                var formData = new FormData($('#profile_form')[0]);
                $.ajax({
                    url: 'update_user_profile.php',  // PHP script to handle profile update
                    method: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        var r = JSON.parse(response);
                        if (r.status === 'success') {
                            noti('Profil peribadi anda telah dikemaskini!');
                        } else {
                            noti('Gagal untuk mengemaskini profil.','error');
                        }
                    }
                });
            }
        }]
    });
}

function initialize_password_change() {
        // Show password guide on focus
        $('#new_password, #confirm_password').on('focus', function () {
            $('#password-guide').removeClass('d-none');
        });

        // Password strength and requirements check
        $('#new_password').on('input', function () {
            const password = $(this).val();
            const result = zxcvbn(password);
            const meter = $('#password-meter');
            const feedback = $('#password-feedback');

            // Update meter value
            meter.val(result.score);

            // Set feedback text based on strength score
            let strengthText = '';
            switch (result.score) {
                case 0:
                case 1:
                    strengthText = '<?php echo tag("Very Weak");?>';
                    feedback.removeClass().addClass('text-danger');
                    break;
                case 2:
                    strengthText = '<?php echo tag("Weak");?>';
                    feedback.removeClass().addClass('text-warning');
                    break;
                case 3:
                    strengthText = '<?php echo tag("Strong Enough");?>';
                    feedback.removeClass().addClass('text-info');
                    break;
                case 4:
                    strengthText = '<?php echo tag("Very Strong");?>';
                    feedback.removeClass().addClass('text-success');
                    break;
            }
            feedback.text(strengthText);

            // Check individual requirements
            updateRequirement('#lengthCheck', password.length >= 8 && password.length <= 12);
            updateRequirement('#letterCheck', /[a-zA-Z]/.test(password));
            updateRequirement('#numberCheck', /\d/.test(password));
            updateRequirement('#symbolCheck', /[!@#$%^&*(),.?":{}|<>]/.test(password));
        });

        // Check if passwords match
        $('#confirm_password').on('input', function () {
            const password = $('#new_password').val();
            const confirmPassword = $(this).val();
            if (password !== confirmPassword) {
                $('#password-feedback').text('<?php echo tag("Passwords Are Not The Same");?>.').removeClass().addClass('text-danger');
            } else {
                $('#password-feedback').text('');
            }
        });

        // Function to update individual requirement status
        function updateRequirement(selector, isValid) {
            const requirement = $(selector);
            const icon = requirement.find('i');
            if (isValid) {
                icon.removeClass('fa-times text-danger').addClass('fa-check text-success');
            } else {
                icon.removeClass('fa-check text-success').addClass('fa-times text-danger');
            }
        }

        // Toggle password visibility
        $('.toggle-password').on('click', function () {
            const target = $($(this).data('target'));
            const type = target.attr('type') === 'password' ? 'text' : 'password';
            target.attr('type', type);

            // Update icon
            $(this).find('i').toggleClass('fa-eye fa-eye-slash');
        });
}
function buang_avatar(user_id) {
    Swal.fire({
        title: '<?php echo tag("Are You Sure?");?>',
        text: "<?php echo tag('You are trying to remove this avatar');?>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '<?php echo tag("Yes, remove");?>',
        cancelButtonText: '<?php echo tag("Cancel");?>'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'remove_avatar.php',
                type: 'POST',
                data: { user_id: user_id },
                dataType: 'json',
                success: function(response) {
                    if (response.status === 'success') {
                        $('.avatar').attr('src', "../../userfiles/avatar/man-sil-02.jpg");
                        $('#avatar_div').hide();
                        Swal.fire(
                            '<?php echo tag("Avatar Dibuang!");?>',
                            '<?php echo tag("Avatar pengguna berjaya dibuang.");?>',
                            'success'
                        );
                    } else {
                        Swal.fire(
                            '<?php echo tag("Ralat!");?>',
                            '<?php echo tag("Gagal membuang avatar. Sila cuba lagi.");?>',
                            'error'
                        );
                    }
                },
                error: function() {
                    Swal.fire(
                        '<?php echo tag("Ralat!");?>',
                        '<?php echo tag("Gagal menghubungi server. Sila cuba lagi.");?>',
                        'error'
                    );
                }
            });
        }
    });
}


function delete_audit_trail(id_audit_trail) {
    Swal.fire({
            title: 'Adakah Anda Pasti?',
            text: "Tindakan ini tidak boleh diundur!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', // Red color for the confirm button
            cancelButtonColor: '#3085d6', // Blue color for the cancel button
            confirmButtonText: 'Ya, Padam!',
            preConfirm: () => {
                // Return a promise that resolves when the AJAX call is complete
                return new Promise((resolve) => {
                    // Show loading indicator
                    Swal.showLoading();

                    $.ajax({
                        url: 'delete_audit_trail.php', // Server-side script to handle deletion
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            id_audit_trail: id_audit_trail
                        },
                        success: function(response) {
                            resolve(response);
                        },
                        error: function(xhr, status, error) {
                            // Handle AJAX errors by resolving with an error status
                            resolve({
                                status: 'Error',
                                message: 'An error occurred while processing your request.'
                            });
                            console.error('AJAX Error:', status, error);
                        }
                    });
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                var response = result.value;

                if (response.status === 'OK') {
                    // Remove the deleted row from the table
                    $('#dt_audit_trail').DataTable().ajax.reload(null, false);
                    
                } else {
                    // Show failure feedback
                    Swal.fire(
                        'Error!',
                        response.message,
                        'error'
                    );
                }
            }
        });
 }
function lihat_aduan(id_rekod, nokp) {
    // Define necessary variables
    var sistem = 'sistemEaduan';
    var windowName = 'aduan_' + id_rekod; // Unique window name based on id_rekod

    // Use jQuery to find the button and retrieve data attributes
    var $button = $(`[data-id="${id_rekod}"]`);
    var id_baharu = $button.data('id-baharu');
    var is_umum = $button.data('is-umum');

    // Set the target URL based on id_baharu value
    var url = (id_baharu === 0) 
        ? '../../admin/detail_aduan.php?id_rekod=' + id_rekod 
        : (is_umum === 1) 
            ? 'maklumat_aduan_umum.php?id_rekod=' + id_rekod 
            : 'maklumat_aduan.php?id_rekod=' + id_rekod;

    if (id_baharu === 0) {
        // Check login status by connecting to admin_login.php first
        $.ajax({
            url: '../../admin/admin_login.php',
            type: 'POST',
            data: { nokp: nokp, sistem: sistem },
            success: function(response) {
                // Log the response to inspect its format
                console.log("Raw response:", response);

                try {
                    var result = typeof response === 'string' ? JSON.parse(response) : response;

                    console.log("Parsed result:", result);

                    if (result.status === "1" || result.status === 1) {
                        // If status is 1, proceed to open the URL in a new tab
                        window.open(url, windowName);
                    } else {
                        alert("Sila log masuk sebagai pentadbir untuk mengakses halaman ini.");
                    }
                } catch (e) {
                    console.error("Failed to parse response:", e);
                    alert("Ralat semasa menyemak status log masuk. Sila cuba lagi.");
                }
            },
            error: function() {
                alert("Ralat semasa menyemak status log masuk. Sila cuba lagi.");
            }
        });
    } else {
        // For other cases, open the URL directly
        window.open(url, windowName);
    }
}

function open_pdf_tindakan(id_tindakan_aduan) {
    var isFullScreen = false; // Track the current state (full screen or not)

    // Fetch the filename using AJAX
    $.ajax({
        url: 'get_tindakan_filename.php', // PHP file to fetch filename
        type: 'POST',
        dataType: 'json', // Expect JSON response
        data: { id_tindakan_aduan: id_tindakan_aduan },
        success: function(response) {
            if (response.success) {
                var filename = response.filename; // Get the filename from the response

                // Show the Bootstrap dialog
                BootstrapDialog.show({
                    title: 'Lihat Dokumen Tindakan',
                    size: BootstrapDialog.SIZE_WIDE, // Initial size
                    message: function(dialog) {
                        var $content = $('<div></div>');
                        var $iframe = $('<iframe></iframe>', {
                            src: filename + '#view=FitH', // The PDF file path or URL
                            style: 'width: 100%; height: 73vh; border: none; overflow: hidden;',
                            frameborder: '0',
                            scrolling: 'auto',
                            id: 'pdfIframe' // Assign an ID to the iframe for later access
                        });
                        $content.append($iframe);
                        return $content;
                    },
                    buttons: [
                        {
                            label: 'Paparan Penuh',
                            id: 'fullScreenBtn', // ID for the button
                            action: function(dialogRef) {
                                if (!isFullScreen) {
                                    // Toggle to full screen
                                    dialogRef.setSize(BootstrapDialog.SIZE_EXTRAWIDE); // Change to extra wide size
                                    $('#fullScreenBtn').text('Keluar Paparan Penuh'); // Change button text
                                    // Update iframe dimensions
                                    $('#pdfIframe').css('height', '73vh'); // Increase the height for full screen
                                } else {
                                    // Toggle back to normal size
                                    dialogRef.setSize(BootstrapDialog.SIZE_WIDE);
                                    $('#fullScreenBtn').text('Paparan Penuh'); // Reset button text
                                    // Reset iframe dimensions
                                    $('#pdfIframe').css('height', '73vh');
                                }
                                isFullScreen = !isFullScreen; // Toggle the state
                            }
                        },
                        {
                            label: 'Tutup',
                            action: function(dialogRef) {
                                dialogRef.close();
                            }
                        }
                    ]
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message
                });
            }
        },
        error: function(xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch the filename. Please try again.'
            });
        }
    });
}
function borang_adp(id_rekod) {
    BootstrapDialog.show({
        title: 'Borang ADP',
        size: BootstrapDialog.SIZE_WIDE, // Adjust size as needed (SIZE_NORMAL, SIZE_SMALL, SIZE_WIDE, SIZE_LARGE, etc.)
        message: function(dialogRef) {
            // Create the iframe element dynamically
            var iframe = $('<iframe>', {
                src: 'borang_adp.php?id_rekod=' + encodeURIComponent(id_rekod),
                width: '100%',
                height: '500px', // Adjust height as needed
                frameborder: '0',
                allowfullscreen: true
            });
            return iframe;
        },
        buttons: [{
            label: 'Tutup',
            action: function(dialogRef) {
                dialogRef.close(); // Close the dialog
            }
        }]
    });
}
/*function borang_adp2(id_rekod) {
    BootstrapDialog.show({
        title: 'Borang ADP',
        size: BootstrapDialog.SIZE_WIDE,
        message: function(dialog) {
            var $iframe = $('<iframe>', {
                src: 'borang_adp_1.php?id_rekod=' + id_rekod,
                style: 'width: 100%; height: 500px; border: none;',
            });
            return $iframe;
        },
        buttons: [{
            label: 'Close',
            action: function(dialog) {
                dialog.close();
            }
        },{
            label: 'PDF',
            action: function(dialog) {
                print_pdf(id_rekod);
            }
        }]
    });
}*/

function borang_adp2(id_rekod) {
    var pageToLoad = 'borang_adp_1.php?id_rekod=' + id_rekod;

    var dialog = BootstrapDialog.show({
        title: 'Lihat Borang ADP-01',
        size: BootstrapDialog.SIZE_WIDE,
        closable: false,
        message: function(dialog) {
            // Create an iframe with proper attributes
            var $message = $('<iframe>', {
                id: 'bs_content',
                src: pageToLoad,
                width: '100%',
                height: '400px', // You can adjust this
                frameborder: '0',
                scrolling: 'yes'
            });

            return $message;
        },
        buttons: [
            {
                id: 'view-popup-close',
                icon: 'fa fa-times',
                label: 'Tutup',
                cssClass: 'btn-danger',
                autospin: false,
                action: function(dialog) {
                    dialog.close();
                }
            },
            {
                id: 'view-print-resit',
                icon: 'fa fa-print',
                label: 'Cetak',
                cssClass: 'btn-primary float-right',
                autospin: false,
                action: function(dialog) {
                    print_pdf(id_rekod);
                }
            }
        ],
        draggable: true,
        onshown: function() {
            $("#btn-popup-fullscreen-1").show();
            $("#btn-popup-widescreen-1").hide();
            $('.modal-content').css('margin', '5px 0');
            $('.modal-content').css('max-height', '90vh');
            $('.modal-body').css('max-height', '70vh');
            $("#objectfile").css("height", '68vh');
            print_pdf(id_rekod);
        }
    });
}
function borang_adp_direct(id_rekod){

    $("#action").load('borang_adp_1.php?id_rekod='+id_rekod, function(){
        print_pdf(id_rekod);
    })
    
	
}
function print_pdf(id_rekod) {
    var contentHtml = $('#content').html();
    
    if (!contentHtml) {
        alert("Content not found inside the iframe.");
        return;
    }

    var encodedContent = encodeURIComponent(contentHtml); // Encode HTML content

    var dialog = BootstrapDialog.show({
        title: 'Lihat Borang ADP',
        size: BootstrapDialog.SIZE_WIDE,
        message: function (dialog) {
            var $message = $('<div></div>');
            $message.load('print_pdf.php', { 
                "id_rekod": id_rekod, 
                "content": encodedContent 
            }, function(response, status, xhr){
                if (status === "error") {
                    console.error("Error loading print_pdf.php: ", xhr.status, xhr.statusText);
                }
            });

            return $message;
        },
        buttons: [
            {
                id: 'btn-popup-fullscreen-1',
                icon: 'fa fa-expand',
                label: 'Skrin Penuh',
                cssClass: 'btn-primary btn-fullscreen hidden-xs',
                autospin: true,
                action: function (dialog) {
                    dialog.setSize(BootstrapDialog.SIZE_FULL);
                    $("#btn-popup-widescreen-1").show();
                    $("#btn-popup-fullscreen-1").hide();
                }
            }, 
            {
                id: 'btn-popup-widescreen-1',
                icon: 'fa fa-compress',
                label: 'Skrin Biasa',
                cssClass: 'btn-danger btn-widescreen hidden-xs',
                autospin: true,
                action: function (dialog) {
                    dialog.setSize(BootstrapDialog.SIZE_WIDE);
                    $("#btn-popup-fullscreen-1").show();
                    $("#btn-popup-widescreen-1").hide();
                }
            }, 
            {
                id: 'view-popup-close-1',
                icon: 'fa fa-times',
                label: 'Tutup',
                cssClass: 'btn-warning',
                autospin: true,
                action: function (dialog) {
                    dialog.close();
                }
            }
        ],
        draggable: true,
        onshown: function () {
            $("#btn-popup-fullscreen-1").show();
            $("#btn-popup-widescreen-1").hide();
            $('.modal-content').css('margin', '5px 0');
            $('.modal-content').css('max-height', '90vh');
            $('.modal-body').css('max-height', '70vh');
            $("#objectfile").css("height", '68vh');
        }
    });
}

function borang_adp_wip(id_rekod) {
    BootstrapDialog.show({
        title: 'Borang ADP',
        size: BootstrapDialog.SIZE_WIDE, // Adjust size as needed (SIZE_NORMAL, SIZE_SMALL, SIZE_WIDE, SIZE_LARGE, etc.)
        message: function(dialogRef) {
            // Create the iframe element dynamically
            var iframe = $('<iframe>', {
                src: 'borang_adp_wip.php?id_rekod=' + encodeURIComponent(id_rekod),
                width: '100%',
                height: '500px', // Adjust height as needed
                frameborder: '0',
                allowfullscreen: true
            });
            return iframe;
        },
        buttons: [{
            label: 'Tutup',
            action: function(dialogRef) {
                dialogRef.close(); // Close the dialog
            }
        }]
    });
}

function notis_akuan_terima(id_rekod) {
    BootstrapDialog.show({
        title: 'Surat Pendaftaran Aduan',
        size: BootstrapDialog.SIZE_WIDE, // Adjust size as needed (SIZE_NORMAL, SIZE_SMALL, SIZE_WIDE, SIZE_LARGE, etc.)
        message: function(dialogRef) {
            // Create the iframe element dynamically
            var iframe = $('<iframe>', {
                src: '../cetak_notis_akuan_terima.php?id_rekod=' + encodeURIComponent(id_rekod),
                width: '100%',
                height: '500px', // Adjust height as needed
                frameborder: '0',
                allowfullscreen: true
            });
            return iframe;
        },
        buttons: [{
            label: 'Tutup',
            action: function(dialogRef) {
                dialogRef.close(); // Close the dialog
            }
        }]
    });
}
function laporan_siasatan_aduan(id_rekod) {
    window.open("cetak_eaduan_pdf.php?id_rekod="+id_rekod)
}
function hantar_sms_pengadu(id_rekod) {
    BootstrapDialog.show({
        title: 'Hantar SMS Kepada Pengadu',
        closable: false,
        size: BootstrapDialog.SIZE_WIDE, // Adjust size as needed (SIZE_NORMAL, SIZE_SMALL, SIZE_WIDE, SIZE_LARGE, etc.)
        message: function(dialogRef) {
            var $content = $('<div>Loading...</div>'); // Placeholder content while loading
            $.ajax({
                url: 'hantar_sms_pengadu.php',
                type: 'GET',
                data: { id_rekod: id_rekod }, // Send the id_rekod to the PHP file
                success: function(response) {
                    $content.html(response); // Load the response from hantar_sms_pengadu.php
                },
                error: function(xhr, status, error) {
                    $content.html('<div class="alert alert-danger">Failed to load content. Please try again.</div>');
                    console.error('Error:', status, error);
                }
            });
            return $content; // Return the placeholder content
        },
        buttons: [{
            label: 'Tutup',
            cssClass: 'bg-danger text-white',
            action: function(dialogRef) {
                dialogRef.close(); // Close the dialog
            }
        }, {
            label: 'Hantar SMS',
            id: 'submit_sms',
            cssClass: 'bg-primary',
            action: function(dialogRef) {
                // Call the `hantar_sms_pengadu_submit` function
                hantar_sms_pengadu_submit(id_rekod,dialogRef);
            }
        }],
        onshown: function (dialogRef) {
            // Make the dialog draggable
            dialogRef.getModalDialog().draggable({
                handle: ".modal-header"// Restrict dragging within the window
            });
        }
    });
}

function hantar_sms_pengadu_submit(id_rekod, d) {
    const smsContent = $('#sms_out_msg').val();
    const phoneNumber = $('#notel_pengadu').val();

    // Send the SMS content via AJAX
    $.ajax({
        url: 'hantar_sms_pengadu_submit.php',
        method: 'POST',
        data: {
            id_rekod: id_rekod,
            sms_out_msg: smsContent,
            notel_pengadu: phoneNumber
        },
        success: function(response) {
            if (response.success) {
                Swal.fire({
                    title: 'Berjaya!',
                    text: 'SMS telah berjaya dihantar.',
                    icon: 'success'
                }).then(() => {
                    d.close();
                    $("#log_sms_div").load("log_sms.php?id_rekod="+id_rekod)
                });
            } else {
                Swal.fire({
                    title: 'Ralat!',
                    text: response.message || 'Gagal menghantar SMS.',
                    icon: 'error'
                });
            }
        },
        error: function(xhr, status, error) {
            Swal.fire({
                title: 'Ralat!',
                text: 'Masalah teknikal berlaku semasa menghantar SMS.',
                icon: 'error'
            });
            console.error('Error:', error);
        }
    });
}

function salin_template(id_rekod) {
    BootstrapDialog.show({
        title: 'Pilih Template SMS',
        size: BootstrapDialog.SIZE_WIDE,
        message: function (dialogRef) {
            var $content = $('<div>').html('<div class="text-center">Memuatkan template...</div>');
            $.ajax({
                url: 'salin_template.php',
                method: 'GET',
                data: { id_rekod: id_rekod },
                success: function (response) {
                    $content.html(response);
                },
                error: function () {
                    $content.html('<div class="text-danger">Gagal memuatkan template. Sila cuba lagi.</div>');
                }
            });
            return $content;
        },
        buttons: [
            {
                label: 'Tutup',
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }
        ],
        onshown: function (dialogRef) {
            // Make the dialog draggable
            dialogRef.getModalDialog().draggable({
                handle: ".modal-header"
            });

            // Handle template selection
            $(document).on('click', '.select-template', function () {
                const templateText = $(this).data('template-text');
                $('#sms_out_msg').val(templateText); // Copy the template to the textarea
                dialogRef.close(); // Close only the current dialog
            });
        }
    });
}
function tambah_aduan(){
    // firsly check for nokp_pengadu from aduan_user
    // if found, then show the list of hartanah he has
    // then select from the list of hartanah and open the page to enter detail
    // if not found, open bootstrapdialog to create user in aduan_user
}


function tambah_pengadu() { 
        BootstrapDialog.show({
            title: 'Tambah Pengadu',
            closable: false,
            size: BootstrapDialog.SIZE_WIDE,
            message: function(dialog) {
                var $content = $('<div></div>');
                $content.load('tambah_pengadu_form.php');
                return $content;
            },
            buttons: [
                {
                    label: 'Tutup',
                    cssClass: 'btn-danger',
                    action: function(dialogRef) {
                        dialogRef.close();
                    }
                },
                {
                    label: 'Tambah Pengadu',
                    cssClass: 'btn-primary',
                    action: function(dialogRef) {
                        var isValid = true;
                        $('#tambah_pengadu_form .required').each(function() {
                            if (!this.checkValidity()) {
                                isValid = false;
                                $(this).tooltip({
                                    title: this.validationMessage,
                                    placement: 'top',
                                    trigger: 'manual'
                                }).tooltip('show');

                                $(this).on('input', function() {
                                    $(this).tooltip('dispose');
                                });
                            }
                        });

                        if (isValid) {
                            var formData = $('#tambah_pengadu_form').serialize();
                            $.post('tambah_pengadu_submit.php', formData, function(response) {
                                if (response.success) {
                                    dialogRef.close();
                                    $('#dtAdmin').DataTable().draw(); // Refresh the DataTable
                                    new Noty({
                                        text: 'Pengadu berjaya ditambah!',
                                        type: 'success',
                                        layout: 'topRight',
                                        timeout: 3000
                                    }).show();
                                } else {
                                    new Noty({
                                        text: 'Tambah Pengadu Gagal: ' + response.message,
                                        type: 'error',
                                        layout: 'topRight',
                                        timeout: 3000
                                    }).show();
                                }
                            }, 'json');
                        }
                    }
                }
            ]
        });
    }

function checkDLPStatus() {
    var data_aduan_hartanah_id = $("#data_aduan_hartanah_id").val();
    const dlpStart = $('#aduan_hartanah_dlp_start').datepicker('getDate');
    const dlpEnd = $('#aduan_hartanah_dlp_end').datepicker('getDate');
    const currentDate = new Date();

    if (!dlpStart || !dlpEnd) {
        // If either date is not selected, set status to "Tiada Maklumat"
        $('#aduan_hartanah_dlp_status_id').val('0');
    } else if (currentDate >= dlpStart && currentDate <= dlpEnd) {
        // If the current date is within the DLP range, set status to "Aktif"
        $('#aduan_hartanah_dlp_status_id').val('1');
    } else {
        // If the current date is outside the DLP range, set status to "Tidak Aktif"
        $('#aduan_hartanah_dlp_status_id').val('2');
        prompt_update_dlp_status(data_aduan_hartanah_id);
    }
}
function prompt_update_dlp_status(data_aduan_hartanah_id) {
    Swal.fire({
        title: 'Maklumkan Kepada Pengadu?',
        text: "Hartanah ini telah tamat tempoh DLP. Adakah anda ingin memaklumkan bahawa aduannya tidak diterima dan akan ditutup?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then((result) => {
        if (result.isConfirmed) {
            // User clicked "Ya"
            showWaitingLayer();
            $("#aduan_hartanah_dlp_end_inform_user").hide();
            $.ajax({
                url: 'sendmail_tamat_dlp.php',
                type: 'POST',
                data: {
                    // Pass whatever data you need to sendmail_tamat_dlp.php
                    data_aduan_hartanah_id: data_aduan_hartanah_id, 
                    subject: "tamat_dlp", 
                    id_rekod: $('#id_rekod').val() // example
                },
                success: function(response) {
                    // After successful AJAX request
                    Swal.fire('Berjaya', 'Pengadu telah dimaklumkan mengenai status DLP.', 'success');
                    hideWaitingLayer();
                },
                error: function(xhr, status, error) {
                    Swal.fire('Ralat', 'Tidak dapat memaklumkan pengadu: ' + error, 'error');
                    hideWaitingLayer();
                }
            });
        }
        // If "Tidak", just do nothing; the SweetAlert closes automatically.
    });
}
function open_aduan(id,nokp,id_baharu,is_umum){
 
        var sistem = 'sistemEaduan'; 

        // Set the target URL based on id_baharu value
        var url = (id_baharu === 0) ? '../../admin/detail_aduan.php?id_rekod=' + id : (is_umum === 1) ? 'maklumat_aduan_umum.php?id_rekod=' + id : 'maklumat_aduan.php?id_rekod=' + id;
        var windowName = 'aduan_' + id; // Unique window name based on id_rekod

        if (id_baharu === 0) {
            // Check login status by connecting to admin_login.php first
            $.ajax({
                url: '../../admin/admin_login.php',
                type: 'POST',
                data: { nokp: nokp, sistem: sistem },
                success: function(response) {
                    // Log the response to inspect its format
                    console.log("Raw response:", response);

                    try {
                        var result = typeof response === 'string' ? JSON.parse(response) : response;

                        console.log("Parsed result:", result);

                        if (result.status === "1" || result.status === 1) {
                            // If status is 1, proceed to open the URL in a new tab
                            window.open(url, windowName);
                        } else {
                            alert("Sila log masuk sebagai pentadbir untuk mengakses halaman ini.");
                        }
                    } catch (e) {
                        console.error("Failed to parse response:", e);
                        alert("Ralat semasa menyemak status log masuk. Sila cuba lagi.");
                    }
                },
                error: function() {
                    alert("Ralat semasa menyemak status log masuk. Sila cuba lagi.");
                }
            });
        } else {
            // For other cases, open the URL directly
            window.open(url, windowName);
        }

};
//// New Admin Functions

function update_administrator(user_id) {
    // Open the dialog and load the content from profile_saya.php
    BootstrapDialog.show({
        title: '<?php echo tag("Update Administrator");?>',
        closable: false,
        message: $('<div></div>').load('update_administrator.php', { user_id: user_id }, function(response, status, xhr) {
            if (status == "error") {
                noti('Failed to load profile data.');
            } else {
                // Initialize uploadifive here, after the DOM has loaded
                $('#spq_admin_avatar').uploadifive({
                    'auto': true,
                    'multiple': false,
                    'formData': {
                        'user_id': user_id
                    },
                    'queueID': 'file_upload_queue',
                    'buttonText': '<?php echo tag("Upload Profile Picture");?>',
                    'fileSizeLimit': '5MB',
                    'fileType': ['png', 'jpg', 'gif', 'jpeg', 'webp'],
                    'buttonClass': 'btn btn-danger btn-sm ms-0 p-2',
                    'uploadScript': 'upload_profile_picture.php',  // The PHP file to handle the upload
                    'onUploadComplete': function(file, data) {
                        console.log('File upload completed');
                        var response = JSON.parse(data);
                        if (response.status === 'success') {
                            // Update the image source with the new file path
                            $('.avatar').attr('src', response.filePath);
                            $('#avatar_div').show();
                        } else {
                            noti('Error uploading the file.');
                        }
                    },
                    'onError': function(errorType) {
                        noti('Error: ' + errorType);
                    }
                });
            }
        }),
        size: BootstrapDialog.SIZE_WIDE,  // Set dialog size to wide
        onshown: function(dialogRef) {
            // Initialize password change or other functionalities that depend on the dialog being fully shown
            initialize_password_change();
        },
        buttons: [ {
            label: '<?php echo tag("Close");?>',
            cssClass: 'btn btn-danger btn-block',
            action: function(dialogRef) {
                dialogRef.close();
            }
        }, {
            label: '<?php echo tag("Save");?>',
            cssClass: 'btn btn-primary btn-block',
            action: function(dialogRef) {
                var formData = new FormData($('#profile_form')[0]);
                $.ajax({
                    url: 'update_administrator_submit.php',  // PHP script to handle profile update
                    method: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        var r = JSON.parse(response);
                        if (r.status === 'success') {
                            noti('Profil peribadi anda telah dikemaskini!');
                            $('#dt').DataTable().ajax.reload(false, null);
                        } else {
                            noti('Gagal untuk mengemaskini profil.','error');
                        }
                    }
                });
            }
        }]
    });
}

function delete_administrator(id_spq_admin) {
    Swal.fire({
        title: '<?php echo tag("Are You Sure?");?>',
        text: '<?php echo tag("This action cannot be reversed");?>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '<?php echo tag("Yes, delete!");?>',
        cancelButtonText: '<?php echo tag("Cancel");?>'
    }).then((result) => {
        if (result.isConfirmed) {
            $.post('delete_administrator.php', { id_spq_admin: id_spq_admin }, function (response) {
                if (response.success) {
                    Swal.fire({
                        title: '<?php echo tag("Administrator Removed!");?>',
                        text: '<?php echo tag("This administrator has been removed");?>',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    $('#dt').DataTable().ajax.reload(null, false);
                } else {
                    Swal.fire(
                        '<?php echo tag("Error!");?>',
                        '<?php echo tag("This administrator failed to be removed");?>: ' + response.message,
                        'error'
                    );
                }
            }, 'json');
        }
    });
}

function add_admin() { 
        BootstrapDialog.show({
            title: 'Tambah Pentadbir',
            closable: false,
            size: BootstrapDialog.SIZE_WIDE,
            message: function(dialog) {
                var $content = $('<div></div>');
                $content.load('add_admin_form.php');
                return $content;
            },
            buttons: [
                {
                    label: 'Tutup',
                    cssClass: 'btn-danger',
                    action: function(dialogRef) {
                        dialogRef.close();
                    }
                },
                {
                    label: 'Tambah Pentadbir',
                    cssClass: 'btn-primary',
                    action: function(dialogRef) {
                        var isValid = true;
                        $('#add_admin_form .required').each(function() {
                            if (!this.checkValidity()) {
                                isValid = false;
                                $(this).tooltip({
                                    title: this.validationMessage,
                                    placement: 'top',
                                    trigger: 'manual'
                                }).tooltip('show');

                                $(this).on('input', function() {
                                    $(this).tooltip('dispose');
                                });
                            }
                        });

                        if (isValid) {
                            var formData = $('#add_admin_form').serialize();
                            $.post('add_admin_submit.php', formData, function(response) {
                                if (response.success) {
                                    dialogRef.close();
                                    $('#dtAdmin').DataTable().draw(); // Refresh the DataTable
                                    new Noty({
                                        text: 'Pentadbir berjaya ditambah!',
                                        type: 'success',
                                        layout: 'topRight',
                                        timeout: 3000
                                    }).show();
                                } else {
                                    new Noty({
                                        text: 'Tambah gagal: ' + response.message,
                                        type: 'error',
                                        layout: 'topRight',
                                        timeout: 3000
                                    }).show();
                                }
                            }, 'json');
                        }
                    }
                }
            ]
        });
    }

function manage_administrators_search(){
    var q = $("#manage_administrators_form").serializeArray(), json={};
    $("#manage_administrators_content_div").load("manage_administrators_content.php", q, function(){
        
    })
}

function add_administrator() {
    // Open the dialog and load the content from profile_saya.php
    BootstrapDialog.show({
        title: '<?php echo tag("Add Administrator");?>',
        closable: false,
        message: $('<div></div>').load('add_administrator.php', {  }, function(response, status, xhr) {
            $("#spq_admin_fullname").focus();
            if (status == "error") {
                noti('Failed to load profile data.');
            } else {
                // Initialize uploadifive here, after the DOM has loaded
                $('#spq_admin_avatar').uploadifive({
                    'auto': false,
                    'multiple': false,
                    
                    'queueID': 'file_upload_queue',
                    'buttonText': '<?php echo tag("Upload Profile Picture");?>',
                    'fileSizeLimit': '5MB',
                    'fileType': ['png', 'jpg', 'gif', 'jpeg', 'webp'],
                    'buttonClass': 'btn btn-danger btn-sm ms-0 p-2',
                    'uploadScript': 'upload_profile_picture_after.php',  // The PHP file to handle the upload
                    'onUploadComplete': function(file, data) {
                        console.log('File upload completed');
                        var response = JSON.parse(data);
                        if (response.status === 'success') {
                            // Update the image source with the new file path
                            $('.avatar').attr('src', response.filePath);
                            $('#avatar_div').show();
                        } else {
                            noti('Error uploading the file.');
                        }
                    },
                    'onError': function(errorType) {
                        noti('Error: ' + errorType);
                    }
                });
            }
        }),
        size: BootstrapDialog.SIZE_WIDE,  // Set dialog size to wide
        onshown: function(dialogRef) {
            // Initialize password change or other functionalities that depend on the dialog being fully shown
            initialize_password_change();
        },
        buttons: [ {
            label: '<?php echo tag("Close");?>',
            cssClass: 'btn btn-danger btn-block',
            action: function(dialogRef) {
                dialogRef.close();
            }
        }, {
    label: '<?php echo tag("Add");?>',
    cssClass: 'btn btn-primary btn-block',
    action: function(dialogRef) {
        var formData = new FormData($('#profile_form')[0]);
        $.ajax({
            url: 'add_administrator_submit.php',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                var r = (response);
                if (r.status === 'success') {
                    noti('New administrator added!');

                    // Initialize UploadiFive now that we have the user_id
                    let userId = r.user_id;
                    $('#spq_admin_avatar').data('user-id', userId);

                    $('#spq_admin_avatar').uploadifive({
                        'auto': false,
                        'queueID': 'file_upload_queue',
                        'buttonText': '<?php echo tag("Upload Profile Picture");?>',
                        'fileSizeLimit': '5MB',
                        'fileType': ['png', 'jpg', 'gif', 'jpeg', 'webp'],
                        'buttonClass': 'btn btn-danger btn-sm ms-0 p-2',
                        'uploadScript': 'upload_profile_picture.php',
                        'formData': {
                            'user_id': userId
                        },
                        'onUploadComplete': function(file, data) {
                            console.log('File upload completed');
                            var response = JSON.parse(data);
                            if (response.status === 'success') {
                                $('.avatar').attr('src', response.filePath);
                                $('#avatar_div').show();
                            } else {
                                noti('Error uploading the file.');
                            }
                        },
                        'onError': function(errorType) {
                            noti('Upload error: ' + errorType);
                        }
                    });

                    // Manually trigger upload
                    $('#spq_admin_avatar').uploadifive('upload');

                    // Optionally close dialog after short delay
                    setTimeout(() => {
                        $('#dt').DataTable().ajax.reload(false, null);
                        dialogRef.close();
                    }, 1000);
                } else {
                    noti('Gagal untuk mengemaskini profil.','error');
                }
            }
        });
    }
}
]
    });
}