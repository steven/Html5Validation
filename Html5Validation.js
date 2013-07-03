/*
	Html5Validation v0.2
	Updated: June 25, 2013

	http://www.fantasmagorical.co.uk/

	Copyright (c) 2013, Fantasmagorical Ltd.
	Author: Steven Thompson
  Licensed under the MIT license.
	
	Usage: 
	
	$('form').Html5Validation();
	
*/
(function ( $ ) { // Used for compatibility with other plugins

	// Plugin defaults – added as a property on our plugin function.
	var defaults = {
    elementTypes	: 'input,select,textarea',
		css						: {
			htmlError 	: {
				position								:	'absolute',
				top											:	'0',
				left										:	'102%',
				padding									:	'10px',
				'z-Index'								:	'4000',
				color										:	'#000',
				display									:	'none',
				background							:	'#f0f0f0',
				'-webkit-border-radius'	: '5px',
				'-moz-border-radius'		: '5px',
				'border-radius'					:	'5px',
				'-moz-box-shadow'				: '0 0 5px #888',
				'-webkit-box-shadow'		: '0 0 5px #888',
				'box-shadow'						:	'0 0 5px #888',
				'fontSize'							:	'8pt',
				'fontFamily'						:	'Arial, Helvetica, sans-serif'
			},
			validationContainer	: {
				position					:	'relative',
				display						:	'inline'
			}
		},
		errorMessages : {
			Checkbox	: {
				text 	:	'Please check this box if you want to proceed.',
				width	: 220
			},
			Pattern: {
				text 	:	'Please match the requested format.',
				width	: 170
			},
			Email: {
				text 	:	'Please enter a valid email address.',
				width	: 170
			},
			Select: {
				text 	:	'Please select an item from the list.',
				width	: 170
			},
			Default: {
				text 	:	'Please fill in this field.',
				width	: 100
			}
		}
  };
	var settings; 
	

	// Check to see if the browser supports HTML5 by seeing if the checkValidity feature exists
	var hasFormValidation = function() {
		var ua = navigator.userAgent.toLowerCase();
		return (typeof document.createElement( 'input' ).checkValidity == 'function');
	};
	
	// Check to see if the browser supports HTML5 input types
	var hasHtml5Input = function(type){
		temp = document.createElement("input");
		temp.setAttribute("type", type);
		return temp.type !== "text";
	}
	
	// Basic email validation
	var validateEmail = function(email) {
		var re = /\S+@\S+\.\S+/;
		return re.test(email);
	}

	// Initialise the for fields with the additional div needed to display the error
	var init = function(form){
		$.each($(settings.elementTypes, form), function(){
			// Check if the field is required and not a hidden text input
			if($(this).attr('required') && $(this).attr('type') != 'hidden'){
				if($(this).attr('data-validation-message')){ // To apply custom validation messages
					$errorMessage = $(this).attr('data-validation-message');
				} else {
					if($(this).prop('tagName') == 'SELECT'){
						$errorMessage = settings.errorMessages.Select.text;
						$errorWidth = settings.errorMessages.Select.width;
					} else if($(this).attr('pattern')){
						$errorMessage = settings.errorMessages.Pattern.text;
						$errorWidth = settings.errorMessages.Pattern.width;
					} else if($(this).attr('type') == 'checkbox'){
						$errorMessage = settings.errorMessages.Checkbox.text;
						$errorWidth = settings.errorMessages.Checkbox.width;
					} else if($(this).attr('type') == 'email'){
						$errorMessage = settings.errorMessages.Email.text;
						$errorWidth = settings.errorMessages.Email.width;
					} else {
						$errorMessage = settings.errorMessages.Default.text;
						$errorWidth = settings.errorMessages.Default.width;
					}
				}
				$(this).wrap('<div class="validation-container" />');
				$(this).parent().append('<div class="html5-error" style="width:'+$errorWidth+'px;">'+$errorMessage+'</div>');
			}
			$('.validation-container').css(settings.css.validationContainer);
			$('.html5-error').css(settings.css.htmlError);
			$(this).not(':checkbox, :hidden').bind('keyup change', function(){
				validateField(this);
			});
			$(this).not(':checkbox, :hidden').bind('blur', function(){
			$('.html5-error', $(this).parent()).hide();
			});
		});
	};

	var displayError = function(field){
		$('.html5-error', $(field).parent()).css('opacity',0).css('margin-top','-10px').show().animate({opacity:1,marginTop:0},200);
		$(field).focus();
		fail = true;
	}
		
	var validateField = function(field){
		fail = false;
		
		switch($(field).attr('type')){
			case 'email':
				if(!validateEmail($(field).val())){
					displayError(field);
				}
			break;
			case 'checkbox':
				if(!$(field).is(':checked')){									
					displayError(field);
				}
			break;			
		}

		if($(field).attr('required') && $(field).val() == ''){ // Apply required validation
			displayError(field);
		}
		
		if($(field).attr('pattern')){ // Pattern match
			if(field.value.search(new RegExp($(field).attr('pattern'))) < 0){
				displayError(field);
			}
		}
		if($(field).data('match')){ // Match fields
			if($(field).val() != $('#'+$(field).data('match')).val()){
				displayError(field);
			}
		}
		if(fail == false){
			$('.html5-error', $(field).parent()).hide();
			return true;
		} else {
			return false;
		}
	};
	$.fn.Html5Validation = function(options){
		settings = $.extend( true, defaults, options );
		if(!hasFormValidation()){
			init(this);
			$(this).submit(function(){
				$('.html5-error').hide();	
				$.each($(settings.elementTypes, this), function(){
					if(!validateField(this)){
						return false;
					}
				});
				if($('.html5-error').is(':visible')){
					return false;
				}
			});
		}	
	};
}( jQuery ));