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

timer.add("kLibSel", kLibSel, 1000);
timer.add("jQuerySel", jQuerySel, 1000);
timer.add("plain", plain, 1000);

/*
results:
Opera:
kLibSel ~ 44
jQuerySel ~ 51
plain ~ 7

Firefox:
kLibSel ~ 25
jQuerySel ~ 43
plain ~ 0

Chrome:
kLibSel ~ 42
jQuerySel ~ 17
plain ~ 0

Internet Explorer 9:
kLibSel ~ 20
jQuerySel ~ 21
plain ~ 3

Konqueror:
kLibSel ~ 153
jQuerySel ~ 156
plain ~ 20

Safari:
kLibSel ~ 12
jQuerySel ~ 17
plain ~ 0

SeaMonkey:
kLibSel ~ 25
jQuerySel ~ 39
plain ~ 1

Opera Mobile:
kLibSel ~ 145
jQuerySel ~ 113
plain ~ 19

Android Browser:
kLibSel ~ 778
jQuerySel ~ 582
plain ~ 580

Firefox Mobile:
kLibSel ~ DNF
jQuerySel ~ DNF
plain ~ DNF
*/