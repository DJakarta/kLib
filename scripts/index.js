/*var txt='', prop;
for (prop in window) {
	txt+=prop+': '+window[prop]+'<br />';
}
document.write(txt);*/
var aux={color:[0,1,0.5]};
canvas=document.getElementsByTagName("canvas")[0].getContext("2d");
img=document.getElementsByTagName("img")[0];

function initialDraw() {
	for (j=0; j<300; j++) {
		for (i=0; i<50; i++) {
			canvas.fillStyle="rgba("+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[0]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[1]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[2]+",1)";
			canvas.fillRect(i*3, j*3, 3, 3);
		}
		for (i=0; i<50; i++) {
			canvas.fillStyle="rgba("+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[0]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[1]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[2]+",1)";
			canvas.fillRect(297-i*3, j*3, 3, 3);
		}
	}
	img.src=document.getElementsByTagName("canvas")[0].toDataURL();
}

function hslToRgb(h, s, l){
    var r, g, b;
    if (s == 0) {
        r = g = b = l;
    }
	else {
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
}

function draw(dir) {
	if (dir=="up") {
		canvas.putImageData(canvas.getImageData(0, 0, 300, 300), 0, 3);
		for (i=0; i<50; i++) {
			canvas.fillStyle="rgba("+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[0]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[1]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[2]+",1)";
			canvas.fillRect(i*3, 0, 3, 3);
		}
		for (i=0; i<50; i++) {
			canvas.fillStyle="rgba("+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[0]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[1]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[2]+",1)";
			canvas.fillRect(297-i*3, 0, 3, 3);
		}
		if (aux.color[0]>1) {
			aux.color[0]=0;
		}
		else {
			aux.color[0]+=0.00027;
		}
	}
	else if (dir=="down") {
		canvas.putImageData(canvas.getImageData(0, 0, 300, 300), 0, -3);
				for (i=0; i<50; i++) {
			canvas.fillStyle="rgba("+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[0]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[1]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[2]+",1)";
			canvas.fillRect(i*3, 297, 3, 3);
		}
		for (i=0; i<50; i++) {
			canvas.fillStyle="rgba("+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[0]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[1]+","+hslToRgb(aux.color[0], 1, i/100+Math.random()*100%6/100)[2]+",1)";
			canvas.fillRect(297-i*3, 297, 3, 3);
		}
		if (aux.color[0]<0) {
			aux.color[0]=1;
		}
		else {
			aux.color[0]-=0.00027;
		}
	}
}

document.onclick=function () {
}
document.onload=initialDraw();
document.onkeydown=function (ev) {
	if (ev.keyCode==38) {
		aux.intUp=setInterval("draw('up')", 10);
	}
	else if (ev.keyCode==40) {
		aux.intDown=setInterval("draw('down')", 10);
	}
}
document.onkeyup=function (ev) {
	if (ev.keyCode==38) {
		clearInterval(aux.intUp);
	}
	else if (ev.keyCode==40) {
		clearInterval(aux.intDown);
	}
}
document.getElementsByTagName("input")[0].onclick=function () {
	img.src=document.getElementsByTagName("canvas")[0].toDataURL();
}
cWrite("a");