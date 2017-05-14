/*dom array copying*/

if (window.opera) {
	Object.prototype.$kSlice=Array.prototype.slice;
}
else if (/firefox/i.test(navigator.userAgent) || navigator.appName=="Microsoft Internet Explorer") {
	HTMLCollection.prototype.$kSlice=Array.prototype.slice;
}
else {
	NodeList.prototype.$kSlice=Array.prototype.slice;
}

var a=[], all, txt='', b=[];
all=$k("li").el;

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
similar
Opera:


Firefox:


Chrome:


Internet Explorer 9:


Konqueror:


Safari:


SeaMonkey:


Opera Mobile:
copyArray1 ~ 
copyArray2 ~ 
copyArray3 ~ 
copyArray4 ~ 
copyArray5 ~ 
copyArray6 ~ 
copyArray7 ~ 
copyArray8 ~ 

Android Browser:
copyArray1 ~ 
copyArray2 ~ 
copyArray3 ~ 
copyArray4 ~ 
copyArray5 ~ 
copyArray6 ~ 
copyArray7 ~ 
copyArray8 ~ 

Firefox Mobile:
copyArray1 ~ 
copyArray2 ~ 
copyArray3 ~ 
copyArray4 ~ 
copyArray5 ~ 
copyArray6 ~ 
copyArray7 ~ 
copyArray8 ~ 
*/