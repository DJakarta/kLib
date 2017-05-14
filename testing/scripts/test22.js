function point(x, y) {
	this[0]=x;
	this[1]=y;
}

function altpoint(x, y) {
	this.x=x;
	this.y=y;
}

function shape(x, y, points) {
	var i, len=points.length;
	this.x=x;
	this.y=y;
	this.points=[];
	for (i=0; i<len; i++) {
		this[i]=[];
		this[i][0]=points[i][0];
		this[i][1]=points[i][1];
	}
	this.length=len;
}

point.prototype={
	inShape: function (shape) {
		var len=shape.length-1, i, intersections=0, A, B, aux, D;
		D=new altpoint(0, 0);
		D.y=this[1];
		for (i=0; i<len; i++) {
			A=new altpoint(shape[i][0]+shape.x, shape[i][1]+shape.y);
			B=new altpoint(shape[i+1][0]+shape.x, shape[i+1][1]+shape.y);
			if (A.y>B.y) {
				aux=A;
				A=B;
				B=aux;
			}
			if (this[1]>=A.y && this[1]<B.y) {
				if (A.x<B.x) {
					D.x=((B.x-A.x)*(D.y-A.y)/(B.y-A.y))+A.x;
					if (this[0]>=D.x) {
						intersections++;
					}
				}
				else {
					D.x=((A.x-B.x)*(B.y-D.y)/(B.y-A.y))+B.x;
					if (this[0]>=D.x) {
						intersections++;
					}
				}
			}
		}
		A=new altpoint(shape[i][0]+shape.x, shape[i][1]+shape.y);
		B=new altpoint(shape[0][0]+shape.x, shape[0][1]+shape.y);
		if (A.y>B.y) {
			aux=A;
			A=B;
			B=aux;
		}
		if (this[1]>=A.y && this[1]<B.y) {
			if (A.x<B.x) {
				D.x=((B.x-A.x)*(D.y-A.y)/(B.y-A.y))+A.x;
				if (this[0]>=D.x) {
					intersections++;
				}
			}
			else {
				D.x=((A.x-B.x)*(B.y-D.y)/(B.y-A.y))+B.x;
				if (this[0]>=D.x) {
					intersections++;
				}
			}
		}
		return !!(intersections%2);
	}
}

shape.prototype={
	fill: function (context) {
		var i, len=this.length, x=this.x, y=this.y;
		context.beginPath();
		context.moveTo(x+this[0][0], y+this[0][1]);
		for (i=1; i<len; i++) {
			context.lineTo(x+this[i][0], y+this[i][1]);
		}
		context.lineTo(x+this[0][0], y+this[0][1]);
		context.fill();
		context.closePath();
		return true;
	},
	stroke: function (context) {
		var i, len=this.length, x=this.x, y=this.y;
		context.beginPath();
		context.moveTo(x+this[0][0], y+this[0][1]);
		for (i=1; i<len; i++) {
			context.lineTo(x+this[i][0], y+this[i][1]);
		}
		context.lineTo(x+this[0][0], y+this[0][1]);
		context.stroke();
		context.closePath();
	},
	toString: function() {
		var i, str='[';
		for (i=0; i<this.length-1; i++) {
			str+='['+this[i][0]+', '+this[i][1]+'], ';
		}
		str+='['+this[i][0]+', '+this[i][1]+']]';
		return str;
	}
};

ctx=$k('canvas')[0].getContext('2d');

ctx.beginPath();
ctx.moveTo(400, 200);
ctx.lineTo(25, 50);
ctx.lineTo(100, 250);
ctx.fill();
ctx.closePath();

cpoint=new point(0, 0);

$k('canvas').on('mouseup', function (event) {
	cpoint[0]=event.offsetX;
	cpoint[1]=event.offsetY;
	cWrite(cpoint[0]+'\n'+cpoint[1]+'\n'+cpoint.inShape(tr), true);
}, false);

cWrite(point.x+'\n'+point.y);
ctx.fillStyle='#ffff00';

tr=new shape(15, 15, [[40, 100], [50, 60], [10, 70], [30, 30], [2, 20], [2, 90]]);
tr.fill(ctx);

for (i=0; i<500; i++) {
	for (j=0; j<300; j++) {
		if ((new point(i, j)).inShape(tr)) {
			ctx.fillStyle='#ff0000';
			ctx.fillRect(i, j, 1, 1);
		}
	}
}

$k('canvas').on('click', function (event) {
	if (!window.sh) {
		window.sh=new shape(0, 0, []);
	}
	sh[sh.length]=[event.offsetX, event.offsetY];
	sh.length++;
	ctx.clearRect(0, 0, 1000, 1000);
	sh.fill(ctx);
	sh.stroke(ctx);
	cWrite(sh, true);
}, false);