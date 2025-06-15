(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: MY (Malay; Melayu)
 */
$.extend( $.validator.messages, {
	required: "<i class='fa fa-warning infinite animated flash'></i> Ruangan ini diperlukan",
	remote: "<i class='fa fa-warning infinite animated flash'></i> Sila betulkan medan ini",
	email: "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan alamat emel yang betul",
	url: "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan URL yang betul",
	date: "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan tarikh yang betul",
	dateISO: "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan tarikh(ISO) yang betul",
	number: "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan nombor yang betul",
	digits: "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan nilai digit sahaja",
	creditcard: "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan nombor kredit kad yang betul",
	equalTo: "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan nilai yang sama semula",
	extension: "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan nilai yang telah diterima",
	maxlength: $.validator.format( "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan tidak lebih dari {0} aksara" ),
	minlength: $.validator.format( "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan sekurang-kurangnya {0} aksara" ),
	rangelength: $.validator.format( "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan antara {0} dan {1} panjang aksara" ),
	range: $.validator.format( "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan nilai antara {0} dan {1} aksara" ),
	max: $.validator.format( "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan nilai yang kurang atau sama dengan {0}" ),
	min: $.validator.format( "<i class='fa fa-warning infinite animated flash'></i> Sila masukkan nilai yang lebih atau sama dengan {0}" )
} );
$.extend($.validator.passwordRating.messages, {
    "similar-to-username": " Terlalu hampir dengan nama pengguna",
    "too-short": " Terlalu Pendek",
    "very-weak": " Terlalu Lemah",
    "weak": " Lemah",
    "good": " Bagus",
    "strong": " Terbaik"
});
return $;
}));