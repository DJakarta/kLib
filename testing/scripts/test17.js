cWrite(Color.parse(0));


a=new Color(100, 50, 50, 'hsl');
b=new Color(150, 100, 50, 'rgb')
cWrite(a);
cWrite(b);
cWrite(b.toHSLA());

ctx=$k('canvas')[0].getContext('2d');
date=(new Date()).getTime();
for (i=0; i<300; i++) {
	for (j=0; j<300; j++) {
		ctx.fillStyle=(new Color(i, 100, j/2.55, 'hsl')).toRGB();
		ctx.fillRect(j, i, 1, 1);
	}
}
date2=(new Date()).getTime();
cWrite(date2-date);

body=$k('body')[0].style;
a=new Color(0, 100, 50, 'hsl');
increase=1;

fn=function () {
	date1=(new Date()).getTime();
	increase=a.lightness==0 ? 1 : a.lightness==100 ? -1 : increase;
	(a.hue<359 ? a.change('h', 1) : a.set('h', 0));
	a.change('lightness', increase);
	body.backgroundColor=a;
	cWrite(a, 1);
	date2=(new Date()).getTime();
	cWrite(date2-date1);
}

setInterval(fn, 10);