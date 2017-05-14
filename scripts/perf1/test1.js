/*Unoptimized for id, class, element*/

kNoContext=function () {
	$k("#img1");
}
kContext=function () {
	$k("#img1", body);
}
jNoContext=function () {
	$("#img1");
}
jContext=function () {
	$("#img1", body);
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
k with no context ~ 6
k with context ~ 5
j with no context ~ 6
j with context ~ 70

Firefox:
k with no context ~ 26
k with context ~ 26
j with no context ~ 14
j with context ~ 133

Chrome:
k with no context ~ 22
k with context ~ 22
j with no context ~ 4
j with context ~ 50

Internet Explorer 9:
k with no context ~ 24
k with context ~ 20
j with no context ~ 7
j with context ~ 186

Konqueror:
k with no context ~ 49
k with context ~ 42
j with no context ~ 40
j with context ~ 242

Safari:
k with no context ~ 15
k with context ~ 15
j with no context ~ 7
j with context ~ 53

SeaMonkey:
k with no context ~ 30
k with context ~ 28
j with no context ~ 12
j with context ~ 129

Opera Mobile:
k with no context ~ 79
k with context ~ 18
j with no context ~ 36
j with context ~ 389

Android Browser:
k with no context ~ 132
k with context ~ 91
j with no context ~ 45
j with context ~ 387

Firefox Mobile:
k with no context ~ 151
k with context ~ 94
j with no context ~ 48
j with context ~ 589
*/