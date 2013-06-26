NoHtml5Validation
=================

A jQuery validation plugin for browsers that do not have HTML5 the validation feature.
The plugin mimics Mozilla Firefox's HTML5 validation look and feel.

To-do's
_____________

IE7 z-index bug
Input box highlighting for invalid fields
Default email, pattern, select, checkbox messages if none provided
Additional support for new input types 


Implementation
_________________

including options and their defaults
	$(form).NoHtml5Validation({
		elementTypes: 'input,select,textarea',
		messageCheckbox: 'Please check this box if you want to proceed',
		messageTextPattern: 'Please match the requested format',
		messageTextEmail: 'Please enter a valid email address',
		messageSelect: 'Please select an item from the list',
		messageDefault: 'Please fill in this field'
	});