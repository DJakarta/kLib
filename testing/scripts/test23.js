//to do:
//check point in shape for negative coordomates --done
//other stuff

//return a new context object
function canvas(canvas) {
	
	//context of the canvas
	this.context=canvas.getContext('2d');
	
	//objects on the canvas
	this.objects=[];
	this.points=[];
	this.lines=[];
	
	//rendering flags
	this.renderObjectRadius=false;
	this.renderObjectSpeed=false;
	this.renderPointsOnCanvas=true;
	this.renderLinesOnCanvas=true;
	
	//dimensions
	this.height=canvas.height;
	this.width=canvas.width;
	
	//value of a meter in pixels
	this.meter=100;
	this.time=1/100;
	this.ms=0;
	this.maxSpeed=100;
	
	//limits for drawing of objects
	this.limits={
		left: -this.width,
		right: 2*this.width,
		top: -this.height,
		bottom: 2*this.height
	};
};

//return a new object
function object(x, y, image, rendering, fillColor, strokeColor) {
	
	//if the first argument is an existing object, copy it without setting the context
	if (x instanceof object) {
		$k.extend(this, x);
		this.canvas=null;
	}
	else {
		
		//set the coordinates
		this.x=x;
		this.y=y;
		this.xSpeed=0;
		this.ySpeed=0;
		
		//set the context to 'null' so it can be added to any canvas later
		this.canvas=null;
		this.image=image;
		
		//set the rendering properties
		this.rendering=rendering;
		this.fillColor=fillColor;
		this.strokeColor=strokeColor;
	}
};

//return a point object
function point(x, y) {
	this[0]=x;
	this[1]=y;
}

//alternative, internal use
function altpoint(x, y) {
	this.x=x;
	this.y=y;
}

//return a shape
function shape(x, y, points) {
	var i, len=(x instanceof shape) ? x.length : points.length, tmp=0;
	
	//if the first argument is an existing shape, copy it
	if (x instanceof shape) {
		$k.extend(this, x);
	}
	else {
		
		//set the coordinates (offset)
		this.x=x;
		this.y=y;
		this.radius=0;
		
		//set the points
		for (i=0; i<len; i++) {
			this[i]=[];
			this[i][0]=points[i][0];
			this[i][1]=points[i][1];
			
			//also, find the farthest point from the set center
			if ((tmp=distance(x, y, this[i][0], this[i][1]))>this.radius) {
				this.radius=tmp;
			}
		}
		this.length=len;
	}
}

//return a line
function line(A, B) {
	this.A=new altpoint(A.x, A.y);
	this.B=new altpoint(B.x, B.y);
	
	//compute the slope
	this.m=(A.y-B.y)/(A.x-B.x);
	
	//compute a, b and c from ax+by+c=0
	this.a=this.m;
	this.b=-1;
	this.c=-this.m*A.x+A.y;
}

//return the distance between 2 points
function distance(a, b, x, y) {
	return Math.sqrt((y-b)*(y-b)+(x-a)*(x-a));
}

point.prototype={
	
	//check if a point is in a specific shape
	inShape: function (shp) {
		var len=shp.length-1, i, intersections=0, A, B, aux, D;
		
		//check the number of intersections with the sides on the left on the point
		D=new altpoint(0, 0);
		D.y=this[1];
		
		//check each side excepting the last
		for (i=0; i<len; i++) {
			A=new altpoint(shp[i][0]+shp.x, shp[i][1]+shp.y);
			B=new altpoint(shp[i+1][0]+shp.x, shp[i+1][1]+shp.y);
			
			//normalize the order of the points
			if (A.y>B.y) {
				aux=A;
				A=B;
				B=aux;
			}
			
			//check by formulas
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
		
		//check the last side, also
		A=new altpoint(shp[i][0]+shp.x, shp[i][1]+shp.y);
		B=new altpoint(shp[0][0]+shp.x, shp[0][1]+shp.y);
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
		
		//if the number is even, it is outside, if it is odd, it is inside
		return !!(intersections%2);
	},
	
	//check if a point is in a specific object
	inObject: function (object) {
		
		//if the object hasn't got a shape return null
		if (!(object.image instanceof window.shape)) {
			return null;
		}
		var shp=object.image, len=shp.length-1, i, intersections=0, A, B, aux, D;
		
		//check the number of intersections with the sides on the left on the point
		D=new altpoint(0, 0);
		D.y=this[1];
		
		//check each side excepting the last
		for (i=0; i<len; i++) {
			A=new altpoint(shp[i][0]+shp.x+object.x, shp[i][1]+shp.y+object.y);
			B=new altpoint(shp[i+1][0]+shp.x+object.x, shp[i+1][1]+shp.y+object.y);
			
			//normalize the order of the points
			if (A.y>B.y) {
				aux=A;
				A=B;
				B=aux;
			}
			
			//check by formulas
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
		
		//check the last side, also
		A=new altpoint(shp[i][0]+shp.x+object.x, shp[i][1]+shp.y+object.y);
		B=new altpoint(shp[0][0]+shp.x+object.x, shp[0][1]+shp.y+object.y);
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
		
		//if the number is even, it is outside, if it is odd, it is inside
		return !!(intersections%2);
	},
	
	//distance to a line by formula |ax0+by0+c|/rad(a^2+b^2)
	distanceToLine: function (line) {
		
		//if the line is vertical, return the difference of the x values
		if (line.m===Infinity) {
			return Math.abs(line.A.x-this[0]);
		}
		return Math.abs(line.a*this[0]+line.b*this[1]+line.c)/Math.sqrt(line.a*line.a+line.b*line.b);
	}
}

shape.prototype={
	
	//output the points of a shape
	toString: function() {
		var i, str='[';
		for (i=0; i<this.length-1; i++) {
			str+='['+this[i][0]+', '+this[i][1]+'], ';
		}
		str+='['+this[i][0]+', '+this[i][1]+']]';
		return str;
	}
};

//prototype of the context object
canvas.prototype={
	
	//add an object to the context
	addObject: function (object) {
		
		//make a temporary reference from the end of the objects array
		var temp=this.objects[this.objects.length]={};
		
		//extended it with the object
		$k.extend(temp, object, 1);
		
		//add the context to the object
		temp.canvas=this;
		return temp;
	},
	
	//add a point
	addPoint: function (pnt) {
		return this.points[this.points.length]=new point(pnt[0], pnt[1]);
	},
	
	//add a line
	addLine: function (ln) {
		return this.lines[this.lines.length]=new line(ln.A, ln.B);
	},
	
	//render all the objects on the canvas
	renderObjects: function (clear) {
		var objs=this.objects, len=this.objects.length, i;
		
		//clear the canvas
		if (clear===true) {
			this.clear();
		}
		
		//render each object
		for (i=0; i<len; i++) {
			objs[i].render();
		}
	},
	
	//render the points
	renderPoints: function (clear) {
		var pnts=this.points, len=this.points.length, i, curr, context=this.context;
		
		//clear the canvas
		if (clear===true) {
			this.clear();
		}
		
		//render each point
		context.beginPath();
		for (i=0; i<len; i++) {
			curr=pnts[i];
			context.moveTo(curr[0]-3, curr[1]-3);
			context.lineTo(curr[0]+3, curr[1]+3);
			context.moveTo(curr[0]-3, curr[1]+3);
			context.lineTo(curr[0]+3, curr[1]-3);
		}
		context.stroke();
		context.closePath();
	},
	
	//render the lines
	renderLines: function (clear) {
		var lns=this.lines, len=this.lines.length, i, curr, context=this.context;
		
		//clear the canvas
		if (clear===true) {
			this.clear();
		}
		
		//render each line
		context.beginPath();
		for (i=0; i<len; i++) {
			curr=lns[i];
			context.moveTo(curr.A.x, curr.A.y);
			context.lineTo(curr.B.x, curr.B.y);
		}
		context.stroke();
		context.closePath();
	},
	
	//render all on canvas
	render: function () {
		this.renderObjects(true);
		if (this.renderPointsOnCanvas) {
			this.renderPoints();
		}
		if (this.renderLinesOnCanvas) {
			this.renderLines();
		}
	},
	
	//clear the entire canvas
	clear: function () {
		
		//clear a rectangle the size of the canvas
		this.context.clearRect(0, 0, this.width, this.height);
	},
	
	//process the physics
	physics: function () {
		var objs=this.objects, i, curr, limits=this.limits;
		this.ms+=this.time*1000;
		for (i=0; i<objs.length; i++) {
			curr=objs[i];
			if (curr.x>limits.right || curr.x<limits.left || curr.y>limits.bottom || curr.y<limits.top) {
				objs.splice(i, 1);
				i--;
			}
			else {
				curr.xSpeed=curr.xSpeed+this.time+((-1/60)*(curr.x-100))*this.time;
				curr.ySpeed=curr.ySpeed+this.time+((-1/60)*(curr.y-100))*this.time;
				curr.x=curr.x+(curr.xSpeed*this.time)*this.meter;
				curr.y=curr.y+(curr.ySpeed*this.time)*this.meter;
			}
		}
	}
};

//prototype of the canvas objects
object.prototype={
	
	//render the object on the canvas
	render: function (canvas) {
		var context;
		
		//if the object has a canvas, render on it
		if (this.canvas) {
			context=this.canvas.context;
			canvas=this.canvas;
		}
		
		//if not and a canvas is specified, render on that one
		else if (canvas) {
			context=canvas.context;
		}
		else {
			return false;
		}
		
		//if the object has an image, use that image
		if (this.image instanceof Image) {
			context.drawImage(this.image, this.x-this.image.width/2, this.y-this.image.height/2);
		}
		
		//if it has a shape, use it
		else if (!this.image instanceof shape) {
			if (this.rendering==='fill' || this.rendering==='both') {
				this.fill(context);
			}
			if (this.rendering==='stroke' || this.rendering==='both') {
				this.stroke(context);
			}
		}
		else {
			context.fillStyle=this.fillColor;
			context.fillRect(this.x-3, this.y-3, 6, 6);
		}
		if (canvas.renderObjectRadius) {
			context.beginPath();
			context.arc(this.x, this.y, this.image.radius, 0, 2*Math.PI, false);
			if (this.possibleCollision()) {
				context.fillStyle='rgba(127, 127, 127, 0.4)';
			}
			else {
				context.fillStyle='rgba(0, 0, 127, 0.4)';
			}
			context.fill();
			context.closePath();
		}
		if (canvas.renderObjectSpeed) {
			context.beginPath();
			context.strokeStyle='#000000';
			context.moveTo(this.x, this.y);
			context.lineTo(this.x+this.xSpeed*1, this.y+this.ySpeed*1);
			context.stroke();
			context.closePath();
		}
		return true;
	},
	
	//fill the shape on a context
	fill: function (context, offset) {
		var i, shp=this.image, len=this.image.length, x=this.x+this.image.x, y=this.y+this.image.y, fs;
		if (offset) {
			x+=offset.x;
			y+=offset.y;
		}
		if (this.fillColor) {
			fs=context.fillStyle;
			context.fillStyle=this.fillColor;
		}
		context.beginPath();
		context.moveTo(x+shp[0][0], y+shp[0][1]);
		for (i=1; i<len; i++) {
			context.lineTo(x+shp[i][0], y+shp[i][1]);
		}
		context.lineTo(x+shp[0][0], y+shp[0][1]);
		context.closePath();
		context.fill();
		if (this.fillColor) {
			context.fillStyle=fs;
		}
		return true;
	},
	
	//stroke the shape on a context
	stroke: function (context, offset) {
		var i, shp=this.image, len=this.image.length, x=this.x+this.image.x, y=this.y+this.image.y, ss;
		if (offset) {
			x+=offset.x;
			y+=offset.y;
		}
		if (this.strokeColor) {
			ss=context.strokeStyle;
			context.strokeStyle=this.strokeColor;
		}
		context.beginPath();
		context.moveTo(x+shp[0][0], y+shp[0][1]);
		for (i=1; i<len; i++) {
			context.lineTo(x+shp[i][0], y+shp[i][1]);
		}
		context.lineTo(x+shp[0][0], y+shp[0][1]);
		context.stroke();
		context.closePath();
		if (this.strokeColor) {
			context.strokeStyle=ss;
		}
	},
	
	//quick distance between two objects, the distance between the circles of the objects
	aproximateDistance: function (obj) {
		return distance(this.x, this.y, obj.x, obj.y)-this.image.radius-obj.image.radius;
	},
	
	//quick check if the object can collide in the next frame
	possibleCollision: function () {
		var i, len=this.canvas.objects.length;
		for (i=0; i<len; i++) {
			
			//a collision might exist if the distance between the objects minus the distance they will travel in the next frame
			//is lower then 0, also make sure it does not check against itself
			if ((this.aproximateDistance(this.canvas.objects[i])-(2*this.canvas.maxSpeed*this.canvas.time*this.canvas.meter))<=0
				&& this!==this.canvas.objects[i]) {
				return true;
			}
		}
		return false;
	}
};



/////////////////////part 2
var display=new canvas($k('canvas')[0]),
	buttons=0, mouseX=0, mouseY=0;
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return [curleft,curtop];
	}
}
pos=findPos($k('canvas')[0]);
	
$k('canvas').on('mousemove', function (ev) {
	mouseX=(ev.offsetX) ? ev.offsetX : ev.layerX-pos[0];
	mouseY=(ev.offsetY) ? ev.offsetY : ev.layerY-pos[1];
}, false);

$k('canvas').on('mousedown', function () {buttons=1;}, false);
$k(window).on('mouseup', function () {buttons=0;}, false);

function avg(arr) {
	var s=0, i;
	for (i=0; i<arr.length-1; i++) {
		s+=arr[i+1].getTime()-arr[i].getTime();
	}
	return s/arr.length;
}

//part 3
fct=function () {
	ms=new shape(0, 0, [[0, 0], [0, 50], [50, 50], [50, 0]]);
	obj1=new object(20, 40, ms, 'both', 'yellow');
	obj2=new object(90, 110, ms, 'both', 'blue');
	obj2.xSpeed=10;
	obj1=display.addObject(obj1);
	obj2=display.addObject(obj2);
	display.physics();
	obj3=display.addPoint(new point(100, 100));
	ln1=display.addLine(new line(new altpoint(95, 200), new altpoint(95, 100)));
}
fct();

function game() {
	date2=new Date();
	dates.splice(0, 1);
	dates.push(date2);
	average=Math.round(1/avg(dates)*1000/3);
	cWrite(display.objects.length+'\n'+average*3+'\n'+display.ms, true);
	cWrite(obj3.distanceToLine(ln1));
	ln1=display.lines[0];
	display.lines[0]=new line(new altpoint(ln1.A.x, ln1.A.y-1), new altpoint(ln1.B.x+1, ln1.B.y));
	
	if (buttons==1 && fr==2) {
		var m=kLib.math;
		a=display.addObject(new object(mouseX, mouseY, new shape(sh), 'both'));
		a.xSpeed=m.randomSign()*Math.random();
		a.ySpeed=-Math.random();
		if (oldColor.hue===359) {
			oldColor.set('hue', 0);
		}
		else {
			oldColor.change('hue', 1);
		}
		a.fillColor=oldColor.toHEX();
		a.strokeColor=new Color(oldColor.hue, oldColor.saturation, oldColor.lightness+20, 'hsl').toHEX();
	}
	display.physics();
	if (fr==2) {
		display.render();
		fr=0;
	}
	else {
		fr++;
	}
}

img=new Image();
img.src='http://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/STOP_nuvola.svg/33px-STOP_nuvola.svg.png';

window.dates=[new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()];
var fr=0;
setInterval(game, 10);
date=new Date();
display.addObject(new object(100, display.height, img));

sh=new shape(0, 0, [[0, 0], [10, 5], [20, 20], [15, 30], [-5, 20]]);
oldColor=new Color(60, 100, 50, 'hsl');