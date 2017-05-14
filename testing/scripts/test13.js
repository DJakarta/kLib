/*finding*/

/*
css: function (obj, val) {
	var camelized, _i, _prop, currentStyle, cachedDisplay;
	if (typeof obj==='string' && typeof val==='string') {
		camelized=obj.toCamelCase();
		for (_i=0; _i<this.length; _i++) {
			this[_i].style[camelized]=val;
		}
	}
	else if (typeof obj==='object') {
		camelized={};
		for (_prop in obj) {
			camelized[_prop.toCamelCase()]=obj[_prop];
		}
		for (_i=0; _i<this.length; _i++) {
			currentStyle=this[_i].style;
			cachedDisplay=currentStyle.display;
			currentStyle.display='none';
			for (_prop in camelized) {
				if (_prop==='display') {
					cachedDisplay=camelized.display;
				}
				else {
					currentStyle[_prop]=camelized[_prop];
				}
			}
			currentStyle.display=cachedDisplay;
		}
	}
	else {
		throw new TypeError('Unexpected parameters in function.');
	}
	return this;
},
css2: function (obj, val) {
	var camelized, _i, _prop, currentStyle, cachedDisplay, arr='';
	if (typeof obj==='string' && typeof val==='string') {
		camelized=obj.toCamelCase();
		for (_i=0; _i<this.length; _i++) {
			this[_i].style[camelized]=val;
		}
	}
	else if (typeof obj==='object') {
		for (_prop in obj) {
			if (_prop!=='constr') {
				arr+=_prop+':'+obj[_prop]+';';
			}
		}
		for (_i=0; _i<this.length; _i++) {
			this[_i].style.cssText=arr;
		}
	}
	else {
		throw new TypeError('Unexpected parameters in function.');
	}
	return this;
},
css3: function (obj, val) {
	var camelized, _i, _prop, currentStyle, cachedDisplay, arr='';
	if (typeof obj==='string' && typeof val==='string') {
		camelized=obj.toCamelCase();
		for (_i=0; _i<this.length; _i++) {
			this[_i].style[camelized]=val;
		}
	}
	else if (typeof obj==='object') {
		for (_prop in obj) {
			if (_prop!=='constr') {
				arr+=_prop+':'+obj[_prop]+';';
			}
		}
		for (_i=0; _i<this.length; _i++) {
			this[_i].setAttribute('style', arr);
		}
	}
	else {
		throw new TypeError('Unexpected parameters in function.');
	}
	return this;
},
*/
var css1=function () {
	try {$k("li").css({'background-color': '#ffff00', 'color': 'black', 'padding': '3px;'});}catch(err){}
}
var css2=function () {
	try {$k("li").css2({'background-color': '#ffff00', 'color': 'black', 'padding': '3px;'});}catch(err){}
}
var css3=function () {
	try {$k("li").css3({'background-color': '#ffff00', 'color': 'black', 'padding': '3px;'});}catch(err){}
}
var css4=function () {
	try {$("li").css({'background-color': '#ffff00', 'color': 'black', 'padding': '3px;'});}catch(err){}
}

timer.add("css1", css1, 10);
timer.add("css2", css2, 10);
timer.add("css3", css3, 10);
timer.add("css4", css4, 10);

/*
results:

Opera:
css1 ~ 64
css2 ~ 17
css3 ~ 8
css4 ~ 97

Firefox:
css1 ~ 246
css2 ~ 68
css3 ~ 15
css4 ~ 239

Chrome:
css1 ~ 54
css2 ~ 41
css3 ~ 35
css4 ~ 91

Internet Explorer 9:
css1 ~ 334
css2 ~ 72
css3 ~ 66
css4 ~ 134

Konqueror:
css1 ~ 269
css2 ~ 115
css3 ~ 156
css4 ~ 454

Safari:
css1 ~ 78
css2 ~ 43
css3 ~ 45
css4 ~ 119

SeaMonkey:
css1 ~ 332
css2 ~ 102
css3 ~ 20
css4 ~ 302

Opera Mobile:
css1 ~ 412
css2 ~ 121
css3 ~ 88
css4 ~ 814

Android Browser:
css1 ~ 471
css2 ~ 205
css3 ~ 210
css4 ~ 557

Firefox Mobile:
css1 ~ 1808
css2 ~ 364
css3 ~ 99
css4 ~ 1698
*/