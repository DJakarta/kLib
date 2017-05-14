/*finding*/

var css1=function () {
	try {$k("li").css({'background-color':'#ffff00'});}catch(err){}
}
var css2=function () {
	try {$k("li").css2({'background-color':'#ffff00'});}catch(err){}
}
var css3=function () {
	try {$k("li").css3({'background-color':'#ffff00'});}catch(err){}
}
var css4=function () {
	try {$("li").css({'background-color':'#ffff00'});}catch(err){}
}

timer.add("css1", css1, 10);
timer.add("css2", css2, 10);
timer.add("css3", css3, 10);
timer.add("css4", css4, 10);

/*
results:

Opera:
css1 ~ 32
css2 ~ 12
css3 ~ 7
css4 ~ 37

Firefox:
css1 ~ 102
css2 ~ 50
css3 ~ 11
css4 ~ 67

Chrome:
css1 ~ 28
css2 ~ 27
css3 ~ 19
css4 ~ 42

Internet Explorer 9:
css1 ~ 254
css2 ~ 37
css3 ~ 38
css4 ~ 65

Konqueror:
css1 ~ 181
css2 ~ 55
css3 ~ 75
css4 ~ 180

Safari:
css1 ~ 55
css2 ~ 27
css3 ~ 30
css4 ~ 54

SeaMonkey:
css1 ~ 133
css2 ~ 63
css3 ~ 13
css4 ~ 75

Opera Mobile:
css1 ~ 289
css2 ~ 86
css3 ~ 60
css4 ~ 278

Android Browser:
css1 ~ 337
css2 ~ 117
css3 ~ 139
css4 ~ 280

Firefox Mobile:
css1 ~ 587
css2 ~ 281
css3 ~ 73
css4 ~ 311
*/