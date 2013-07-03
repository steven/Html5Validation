NoHtml5Validation
=================

A jQuery validation plugin for browsers that do not have HTML5 the validation feature.
The plugin mimics Mozilla Firefox's HTML5 validation look and feel.

Updates in Html5Validation v0.2
_____________

- CSS styling is performed within the plugin so no additional styles are needed
- Standard HTML5 input attributes (pattern) detected


To-do's
_____________

-	IE7 z-index bug
-	Input box highlighting for invalid fields
-	Additional support for new HTML5 input types 

Implementation
_________________

including options and their defaults

HTML form example

	<form action="#" id="testEmail">
		<label for="checkbox">Email</label>
		<input type="email" required>
		<button type="submit">Try me</button>
	</form>
			
	<form action="#" id="testPattern">
		<label>Numbers only please</label>
		<input type="text" required pattern="[0-9]{3}">
		<button type="submit">Try me</button>
	</form>
		
	<form action="#" id="testSelect">
		<label>Choose an option</label>
		<select required>
			<option value="">Option 1 is empty</option>
			<option>Option 2 is NOT empty</option>
			<option>Option 3 is NOT empty</option>
			<option>Option 3 is NOT empty</option>
		</select><br>
		<label for="checkbox">Check me please</label>
		<input type="checkbox" required>
		<button type="submit">Try me</button>
	</form>

Script

	$('form#testEmail').NoHtml5Validation({
		elementTypes: 'input',
	});
	
	$('form#testPattern').NoHtml5Validation({
		elementTypes: 'input',
	});
	
	$('form#testSelect').NoHtml5Validation({
		elementTypes: 'select, input',
	});
	
	$('form#testSelect').NoHtml5Validation({
		elementTypes: 'select',
	});