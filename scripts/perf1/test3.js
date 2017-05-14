/*Optimized for id, class, element*/

kNoContext=function () {
	$k("#mycanv");
}
kContext=function () {
	$k("#mycanv", body);
}
jNoContext=function () {
	$("#mycanv");
}
jContext=function () {
	$("#mycanv", body);
}
getBody=function () {
	body=document.getElementsByTagName("body")[0];
}
timer.add("k without context", kNoContext, 1000);
timer.add("k with context", kContext, 1000, getBody);
timer.add("j without context", jNoContext, 1000);
timer.add("j with context", jContext, 1000, getBody);

/*
results:
Opera:
k with no context ~ 20
k with context ~ 18
j with no context ~ 8
j with context ~ 84

Firefox:
k with no context ~ 25
k with context ~ 24
j with no context ~ 15
j with context ~ 138

Chrome:
k with no context ~ 38
k with context ~ 35
j with no context ~ 4
j with context ~ 54

Internet Explorer 9:
k with no context ~ 18
k with context ~ 15
j with no context ~ 7
j with context ~ 178

Konqueror:
k with no context ~ 115
k with context ~ 115
j with no context ~ 45
j with context ~ 260

Safari:
k with no context ~ 12
k with context ~ 11
j with no context ~ 6
j with context ~ 52

SeaMonkey:
k with no context ~ 26
k with context ~ 24
j with no context ~ 13
j with context ~ 136

Opera Mobile:
k with no context ~ 131
k with context ~ 89
j with no context ~ 38
j with context ~ 417

Android Browser:
k with no context ~ 233
k with context ~ 134
j with no context ~ 27
j with context ~ 321

Firefox Mobile:
k with no context ~ DNF
k with context ~ DNF
j with no context ~ DNF
j with context ~ DNF
*/