var propertyArray=[], i=0;
for (var prop in window) {
	propertyArray[i++]=prop;
}
propertyArray.sort();
for (i=0, len=propertyArray.length; i<len; i++) {
	if (typeof window[propertyArray[i]]=='function' && !/native/.test(window[propertyArray[i]])) {
		document.write(propertyArray[i]+': '+'defined function'+'<br />');
	}
	else {
		document.write(propertyArray[i]+': '+window[propertyArray[i]]+'<br />');
	}
}