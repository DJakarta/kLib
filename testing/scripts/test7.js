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

timer.add("copyArray1", copyArray1, 1000, function () {b=[];});
timer.add("copyArray2", copyArray2, 1000, function () {b=[];});
timer.add("copyArray3", copyArray3, 1000, function () {b=[];});
timer.add("copyArray4", copyArray4, 1000, function () {b=[];});
timer.add("copyArray5", copyArray5, 1000, function () {b=[];});
timer.add("copyArray6", copyArray6, 1000, function () {b=[];});
timer.add("copyArray7", copyArray7, 1000, function () {b=[];});
timer.add("copyArray8", copyArray8, 1000, function () {b=[];});

/*
results:

Opera:
copyArray1 ~ 0
copyArray2 ~ 570
copyArray3 ~ 312
copyArray4 ~ 529
copyArray5 ~ 535
copyArray6 ~ 536
copyArray7 ~ 546
copyArray8 ~ 302

Firefox:
copyArray1 ~ 0
copyArray2 ~ 354
copyArray3 ~ 174
copyArray4 ~ 243
copyArray5 ~ 252
copyArray6 ~ 246
copyArray7 ~ 254
copyArray8 ~ 173

Chrome:
copyArray1 ~ 0
copyArray2 ~ 430
copyArray3 ~ 246
copyArray4 ~ 266
copyArray5 ~ 276
copyArray6 ~ 263
copyArray7 ~ 282
copyArray8 ~ 243

Internet Explorer 9:
copyArray1 ~ 0
copyArray2 ~ 1281
copyArray3 ~ 678
copyArray4 ~ 626
copyArray5 ~ 642
copyArray6 ~ 655
copyArray7 ~ 606
copyArray8 ~ 679

Konqueror:
copyArray1 ~ 2
copyArray2 ~ 4232
copyArray3 ~ 4292
copyArray4 ~ 2615
copyArray5 ~ 2715
copyArray6 ~ 2684
copyArray7 ~ 2740
copyArray8 ~ 4050

Safari:
copyArray1 ~ 0
copyArray2 ~ 425
copyArray3 ~ 373
copyArray4 ~ 127
copyArray5 ~ 122
copyArray6 ~ 124
copyArray7 ~ 123
copyArray8 ~ 366

SeaMonkey:
copyArray1 ~ 0
copyArray2 ~ 464
copyArray3 ~ 226
copyArray4 ~ 314
copyArray5 ~ 313
copyArray6 ~ 311
copyArray7 ~ 315
copyArray8 ~ 229

Opera Mobile:
copyArray1 ~ 2
copyArray2 ~ 5498
copyArray3 ~ 3013
copyArray4 ~ 4236
copyArray5 ~ 4733
copyArray6 ~ 4243
copyArray7 ~ 5100
copyArray8 ~ 3440

Android Browser:
copyArray1 ~ 1
copyArray2 ~ 1888
copyArray3 ~ 976
copyArray4 ~ 1078
copyArray5 ~ 1052
copyArray6 ~ 1061
copyArray7 ~ 1267
copyArray8 ~ 961

Firefox Mobile:
copyArray1 ~ 1
copyArray2 ~ 3900
copyArray3 ~ 1154
copyArray4 ~ 1162
copyArray5 ~ 1173
copyArray6 ~ 1394
copyArray7 ~ 1185
copyArray8 ~ 1164
*/