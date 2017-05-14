/*selecting*/

kLibSel=function () {
	$k("input");
}
jQuerySel=function () {
	$("input");
}
plain=function () {
	document.getElementsByTagName("input");
}
modSelection=function (string, context) {
	if (!context) {
		context=window.document;
	}
	if (typeof string=='string') {
		elements=new kLib.QuerySelection(string, context);
		return elements;
	}
	else if (string==kLib.currElement || string==this) {
		return kLib.currElement;
	}
}
kLibSelMod=function () {
	modSelection("input");
}

timer.add("kLibSel", kLibSel, 1000);
timer.add("jQuerySel", jQuerySel, 1000);
timer.add("plain", plain, 1000);
timer.add("kLibSelMod", kLibSelMod, 1000);

/*
results:
general times: plain < kLibSelMod < kLibSel < jQuerySel

Opera:
kLibSel ~ 
jQuerySel ~ 
plain ~ 
kLibSelMod ~ 

Firefox:
kLibSel ~ 
jQuerySel ~ 
plain ~ 
kLibSelMod ~ 

Chrome:
kLibSel ~ 
jQuerySel ~ 
plain ~ 
kLibSelMod ~ 

Internet Explorer 9:
kLibSel ~ 
jQuerySel ~ 
plain ~ 
kLibSelMod ~ 

Konqueror:
kLibSel ~ 
jQuerySel ~ 
plain ~ 
kLibSelMod ~ 

Safari:
kLibSel ~ 
jQuerySel ~ 
plain ~ 
kLibSelMod ~ 

SeaMonkey:
kLibSel ~ 
jQuerySel ~ 
plain ~ 
kLibSelMod ~ 

Opera Mobile:
kLibSel ~ 
jQuerySel ~ 
plain ~ 
kLibSelMod ~ 

Android Browser:
kLibSel ~ 
jQuerySel ~ 
plain ~ 
kLibSelMod ~ 

Firefox Mobile:
kLibSel ~ 
jQuerySel ~ 
plain ~ 
kLibSelMod ~ 
*/