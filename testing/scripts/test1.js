/*reverse loop test*/

forward=function () {
	for (i=0; i<10000; i++) {
	}
}
reverse=function () {
	for (i=10000; i>0; i--) {
	}
}
reverseNot=function () {
	for (i=10000; i!=0; i--) {
	}
}

timer.add("forward", forward, 1000);
timer.add("reverse", reverse, 1000);
timer.add("reverseNot", reverseNot, 1000);

/*
results:
Opera:
forward ~ 996
reverse ~ 1049
reverseNot ~ 1067

Firefox:
forward ~ 36
reverse ~ 35
reverseNot ~ 37

Chrome:
forward ~ 37
reverse ~ 42
reverseNot ~ 45

Internet Explorer 9:
forward ~ 96
reverse ~ 101
reverseNot ~ 104

Konqueror:
forward ~ 8068
reverse ~ 8062
reverseNot ~ 8224

Safari:
forward ~ 159
reverse ~ 172
reverseNot ~ 227

SeaMonkey:
forward ~ 31
reverse ~ 33
reverseNot ~ 39

Opera Mobile:
forward ~ 985
reverse ~ 892
reverseNot ~ 897

Android Browser:
forward ~ 692
reverse ~ 624
reverseNot ~ 709

Firefox Mobile:
forward ~ DNF
reverse ~ DNF
reverseNot ~ DNF
*/