kNoContext=function () {
	$k("input:not(#shit)");
}
kContext=function () {
	$k("input:not(#shit)", body);
}
jNoContext=function () {
	$("input:not(#shit)");
}
jContext=function () {
	$("input:not(#shit)", body);
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
k with no context ~ 7
k with context ~ 5
j with no context ~ 20
j with context ~ 75

Firefox:
k with no context ~ 35
k with context ~ 31
j with no context ~ 59
j with context ~ 115

Chrome:
k with no context ~ 34
k with context ~ 33
j with no context ~ 43
j with context ~ 59

Internet Explorer 9:
k with no context ~ 30
k with context ~ 24
j with no context ~ 41
j with context ~ 203

Konqueror:
k with no context ~ 57
k with context ~ 50
j with no context ~ 166
j with context ~ 268

Safari:
k with no context ~ 26
k with context ~ 25
j with no context ~ 37
j with context ~ 56

SeaMonkey:
k with no context ~ 41
k with context ~ 40
j with no context ~ 65
j with context ~ 134

Opera Mobile:
k with no context ~ 77
k with context ~ 19
j with no context ~ 87
j with context ~ 398

Android Browser:
k with no context ~ 171
k with context ~ 105
j with no context ~ 244
j with context ~ 379

Firefox Mobile:
k with no context ~ 167
k with context ~ 123
j with no context ~ 263
j with context ~ 594
*/