/*
	NoHtml5Validation v0.1
	Updated: June 25, 2013

	http://www.fantasmagorical.co.uk/

	Copyright (c) 2013, Fantasmagorical Ltd.
	Author: Steven Thompson
  Licensed under the MIT license.
	
	Usage: 
	
	$('form').NoHtml5Validation();
	
*/
(function ( $ ) { // Used for compatibility with other plugins

	// Plugin defaults – added as a property on our plugin function.
	var defaults = {
    elementTypes: 'input,select,textarea',
		messageCheckbox: 'Please check this box if you want to proceed',
		messageTextPattern: 'Please match the requested format',
		messageTextEmail: 'Please enter a valid email address',
		messageSelect: 'Please select an item from the list',
		messageDefault: 'Please fill in this field'
  };
	var settings; 
	

	// Check to see if the browser suppoers HTML5 by seeing if the checkValidity feature exists
	var hasFormValidation = function() {
		var ua = navigator.userAgent.toLowerCase(); +63
		return (typeof document.createElement( 'input' ).checkValidity == 'function');
	};
	
	// Basic email validation
	var  validateEmail = function(email) {
		var re = /\S+@\S+\.\S+/;
		return re.test(email);
	}

	// Initialise the for fields with the additional div needed to display the error
	var init = function(form){
		$.each($(settings.elementTypes, form), function(){
			// Check if the field is required and not a hidden text input
			if($(this).attr('required') && $(this).attr('type') != 'hidden'){
				if($(this).attr('data-validation-message')){
					$errorMessage = $(this).attr('data-validation-message');
				} else {
					if($(this).prop('tagName') == 'SELECT'){
						$errorMessage = settings.messageSelect;
					} else if($(this).data('pattern')){
						$errorMessage = settings.messageTextPattern;
					} else if($(this).attr('type') == 'checkbox'){
						$errorMessage = settings.messageCheckbox;
					} else if($(this).data('type') == 'email'){
						$errorMessage = settings.messageTextEmail;
					} else {
						$errorMessage = settings.messageDefault;
					}
				}
				$(this).parent().append('<div class="html5-error">'+$errorMessage+'</div>');
			}
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
		
		if($(field).attr('type') == 'checkbox'){ // Check for required checkbox
			if(!$(field).is(':checked')){									
				displayError(field);
			}
		}
		if($(field).attr('required') && $(field).val() == ''){ // Apply required validation
			displayError(field);
		}
		if($(field).data('type') == 'email'){ // Check for email fields
			if(!validateEmail($(field).val())){
			displayError(field);
			}
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
	$.fn.NoHtml5Validation = function(options){
		settings = $.extend( {}, defaults, options );
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