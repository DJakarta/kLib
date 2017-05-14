/*dom array copying*/

str='      test str     ';
trimLeft=/^\s+/;
trimRight=/\s+$/;
String.prototype.trim2fn=function () {
	var string=this, i=this.length;
	while (string[0]==' ') {
		string=string.slice(1);
	}
	while (string[--i]==' ') {
		string=string.slice(0, i);
	}
	return string;
}
String.prototype.trim3fn=function () {
	var i=0, j=this.length;
	while (this[i++]==' ');
	while (this[--j]==' ');
	return this.slice(i-1, j+1);
}
String.prototype.trim4fn=function () {
	return this.replace(/(^\s+)/g, '').replace(/(\s+$)/g, '');
}
String.prototype.trim5fn=function () {
	return this.replace(/(^\s+)/, '').replace(/(\s+$)/, '');
}
String.prototype.trim6fn=function () {
	return this.replace(trimLeft, '').replace(trimRight, '');
}
trim2left=/^\s\s*/;
trim2right=/\s\s*$/;
String.prototype.trim7fn=function () {
	return this.replace(trim2left, '').replace(trim2right, '');
}
String.prototype.trim8fn=function () {
	var i=0, j=this.length;
	while (this[i++]==' ');
	while (this[--j]==' ');
	return this.substr(i-1, j-i+2);
}
	
trim1=function () {
	str.trimSpaces();
}
trim2=function () {
	str.trim2fn();
}
trim3=function () {
	str.trim3fn();
}
trim4=function () {
	str.trim4fn();
}
trim5=function () {
	str.trim5fn();
}
trim6=function () {
	str.trim6fn();
}
trim7=function () {
	str.trim7fn();
}
trim8=function () {
	str.trim8fn();
}

timer.add("trim1", trim1, 100000);
timer.add("trim2", trim2, 100000);
timer.add("trim3", trim3, 100000);
timer.add("trim4", trim4, 100000);
timer.add("trim5", trim5, 100000);
timer.add("trim6", trim6, 100000);
timer.add("trim7", trim7, 100000);
timer.add("trim8", trim8, 100000);

/*
results:

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




