NoHtml5Validation
=================

A jQuery validation plugin for browsers that do not have HTML5 the validation feature.
The plugin mimics Mozilla Firefox's HTML5 validation look and feel.

To-do's
_____________

-	IE7 z-index bug
-	Input box highlighting for invalid fields
-	Additional support for new HTML5 input types 

Implementation
_________________

including options and their defaults

HTML form example

	<form action="#" id="test">
		<div class="validation-container">
			<label for="checkbox">Email</label>
			<input type="text" required data-type="email">
		</div>
		<div class="validation-container">
			<label for="checkbox">Numbers only please</label>
			<input type="text" required pattern="[0-9]{3}">
		</div>
		<div class="validation-container">
			<label>Choose an option</label>
			<select required>
				<option value="">Option 1 is empty</option>
				<option>Option 2 is NOT empty</option>
				<option>Option 3 is NOT empty</option>
				<option>Option 3 is NOT empty</option>
			</select>
		</div>
		<div class="validation-container">
			<label>Please write something</label>
			<textarea required></textarea>
		</div>
		<div class="validation-container">
			<label for="checkbox">Check me please</label>
			<input type="checkbox" required>
		</div>
		<button type="submit">Try me</button>
	</form>


CSS

	.html5-error{
		position:absolute;
		top:110%;
		padding:10px;
		z-index:4000;
		color:#000;
		display:none;
		background:#f0f0f0;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		border-radius: 2px;
		-moz-box-shadow: 0 0 5px #888;
		-webkit-box-shadow: 0 0 5px#888;
		box-shadow: 0 0 5px #888;
		font-size:0.95em;
		font-family:Arial, Helvetica, sans-serif;
		font-size:70%;
		left:0;
	}


Script

	$('form#test').NoHtml5Validation({
		elementTypes: 'input,select,textarea',
		messageCheckbox: 'Please check this box if you want to proceed',
		messageTextPattern: 'Please match the requested format',
		messageTextEmail: 'Please enter a valid email address',
		messageSelect: 'Please select an item from the list',
		messageDefault: 'Please fill in this field'
	});