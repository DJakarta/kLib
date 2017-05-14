/*dom array copying*/

if (window.opera) {
	Object.prototype.$kSlice=Array.prototype.slice;
}
else {
	NodeList.prototype.$kSlice=Array.prototype.slice;
}

var a=[], all, txt='', b=[];
all=$k("*").el;

copyArray1=function () {
	b=all;
}
copyArray2=function () {
	for (i=0; i<all.length; i++) {
		b[i]=all[i];
	}
}
copyArray3=function () {
	len=all.length;
	for (i=0; i<len; i++) {
		b[i]=all[i];
	}
}
copyArray4=function () {
	b=Array.prototype.slice.call(all, 0);
}
copyArray5=function () {
	b=[].slice.call(all, 0);
}
copyArray6=function () {
	b=Array().slice.call(all, 0);
}
copyArray7=function () {
	b=all.$kSlice(0);
}
copyArray8=function () {
	len=all.length;
	for (i=0; i<len;) {
		b[i]=all[i++];
	}
}

timer.add("copyArray1", copyArray1, 10000, function () {b=[];});
timer.add("copyArray2", copyArray2, 10000, function () {b=[];});
timer.add("copyArray3", copyArray3, 10000, function () {b=[];});
timer.add("copyArray4", copyArray4, 10000, function () {b=[];});
timer.add("copyArray5", copyArray5, 10000, function () {b=[];});
timer.add("copyArray6", copyArray6, 10000, function () {b=[];});
timer.add("copyArray7", copyArray7, 10000, function () {b=[];});
timer.add("copyArray8", copyArray8, 10000, function () {b=[];});

/*
results:

Opera:
copyArray1 ~ 1
copyArray2 ~ 78
copyArray3 ~ 47
copyArray4 ~ 26
copyArray5 ~ 32
copyArray6 ~ 32
copyArray7 ~ 25
copyArray8 ~ 45

Firefox:
copyArray1 ~ 0
copyArray2 ~ 55
copyArray3 ~ 34
copyArray4 ~ 42
copyArray5 ~ 48
copyArray6 ~ 49
copyArray7 ~ 47
copyArray8 ~ 33

Chrome:
copyArray1 ~ 0
copyArray2 ~ 56
copyArray3 ~ 31
copyArray4 ~ 54
copyArray5 ~ 54
copyArray6 ~ 61
copyArray7 ~ 58
copyArray8 ~ 31

Internet Explorer 9:
copyArray1 ~ 1
copyArray2 ~ 205
copyArray3 ~ 117
copyArray4 ~ 112
copyArray5 ~ 113
copyArray6 ~ 118
copyArray7 ~ 113
copyArray8 ~ 119

Konqueror:
copyArray1 ~ 14
copyArray2 ~ 562
copyArray3 ~ 556
copyArray4 ~ 375
copyArray5 ~ 382
copyArray6 ~ 378
copyArray7 ~ 374
copyArray8 ~ 541

Safari:
copyArray1 ~ 0
copyArray2 ~ 59
copyArray3 ~ 55
copyArray4 ~ 28
copyArray5 ~ 35
copyArray6 ~ 31
copyArray7 ~ 30
copyArray8 ~ 55

SeaMonkey:
copyArray1 ~ 0
copyArray2 ~ 63
copyArray3 ~ 36
copyArray4 ~ 47
copyArray5 ~ 49
copyArray6 ~ 51
copyArray7 ~ 52
copyArray8 ~ 36

Opera Mobile:
copyArray1 ~ 1
copyArray2 ~ 662
copyArray3 ~ 447
copyArray4 ~ 227
copyArray5 ~ 255
copyArray6 ~ 263
copyArray7 ~ 218
copyArray8 ~ 420

Android Browser:
copyArray1 ~ 11
copyArray2 ~ 256
copyArray3 ~ 159
copyArray4 ~ 268
copyArray5 ~ 261
copyArray6 ~ 263
copyArray7 ~ 285
copyArray8 ~ 152

Firefox Mobile:
copyArray1 ~ 10
copyArray2 ~ 563
copyArray3 ~ 236
copyArray4 ~ 252
copyArray5 ~ 259
copyArray6 ~ 270
copyArray7 ~ 293
copyArray8 ~ 225
*/