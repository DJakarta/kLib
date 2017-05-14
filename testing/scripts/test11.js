/*finding*/

String.prototype.find1=function (arr) {
	for (_i=0, _len=arr.length; _i<_len; _i++) {
		if (this.indexOf(arr[_i])!==-1) {
			return true;
		}
	}
	return false;
}
String.prototype.find2=function (exp) {
	return exp.test(this);
}

mystr1="my string is this one but what the heck";
mystr2="this [this) will be true";
mystr3="* this will match quicker";
exp=/[\*\.\,\>\+\[\]\=\~\:\^\(\)]/;
exp2=/[\*|\.|\,|\>|\+|\[|\]|\=|\~|\:|\^|\(|\)]/;
exp3=/(\*|\.|\,|\>|\+|\[|\]|\=|\~|\:|\^|\(|\))/;
arr=['*','.',',','>','+','[',']','=','~',':','^','(',')'];
find1=function () {
	mystr1.find1(arr);
}
find2=function () {
	mystr1.find2(exp);
}
find3=function () {
	mystr2.find1(arr);
}
find4=function () {
	mystr2.find2(exp);
}
find5=function () {
	mystr3.find1(arr);
}
find6=function () {
	mystr3.find2(exp);
}
find7=function () {
	mystr3.find2(exp2);
}
find8=function () {
	mystr3.find2(exp3);
}

timer.add("find1", find1, 100000);
timer.add("find2", find2, 100000);
timer.add("find3", find3, 100000);
timer.add("find4", find4, 100000);
timer.add("find5", find5, 100000);
timer.add("find6", find6, 100000);
timer.add("find7", find7, 100000);
timer.add("find8", find8, 100000);

/*
results:

Opera:
find1 ~ 368
find2 ~ 29
find3 ~ 156
find4 ~ 29
find5 ~ 38
find6 ~ 29
find7 ~ 29
find8 ~ 28

Firefox:
find1 ~ 222
find2 ~ 78
find3 ~ 106
find4 ~ 53
find5 ~ 31
find6 ~ 48
find7 ~ 48
find8 ~ 53

Chrome:
find1 ~ 593
find2 ~ 251
find3 ~ 393
find4 ~ 298
find5 ~ 299
find6 ~ 285
find7 ~ 276
find8 ~ 279

Internet Explorer 9:
find1 ~ 188
find2 ~ 36
find3 ~ 78
find4 ~ 46
find5 ~ 29
find6 ~ 27
find7 ~ 33
find8 ~ 32

Konqueror:
find1 ~ 2130
find2 ~ 617
find3 ~ 1110
find4 ~ 488
find5 ~ 428
find6 ~ 463
find7 ~ 466
find8 ~ 478

Safari:
find1 ~ 736
find2 ~ 80
find3 ~ 337
find4 ~ 54
find5 ~ 78
find6 ~ 53
find7 ~ 50
find8 ~ 51

SeaMonkey:
find1 ~ 228
find2 ~ 81
find3 ~ 112
find4 ~ 58
find5 ~ 34
find6 ~ 52
find7 ~ 52
find8 ~ 54

Opera Mobile:
find1 ~ 1489
find2 ~ 241
find3 ~ 763
find4 ~ 324
find5 ~ 300
find6 ~ 252
find7 ~ 276
find8 ~ 254

Android Browser:
find1 ~ 5019
find2 ~ 2503
find3 ~ 3559
find4 ~ 2490
find5 ~ 2497
find6 ~ 2605
find7 ~ 2735
find8 ~ 2542

Firefox Mobile:
find1 ~ 1317
find2 ~ 603
find3 ~ 691
find4 ~ 545
find5 ~ 261
find6 ~ 482
find7 ~ 536
find8 ~ 420
*/