//to do:
//check point in shape for negative coordomates

//return a new context object
function canvas(canvas) {
	
	//context of the canvas
	this.context=canvas.getContext('2d');
	
	//objects on the canvas
	this.objects=[];
	
	//dimensions
	this.height=canvas.height;
	this.width=canvas.width;
	
	//value of a meter in pixels
	this.meter=100;
	this.time=1/40;
	this.ms=0;
	
	//limits for drawing of objects
	this.limits={
		left: -this.width,
		right: 2*this.width,
		top: -this.height,
		bottom: 2*this.height
	};
};

//return a new object
function object(x, y, image) {
	var rand=kLib.math.randomInt;
	//set the coordinates
	this.x=x;
	this.y=y;
	this.xSpeed=0;
	this.ySpeed=-5;
	
	//set the context to 'null' so it can be added to any canvas later
	this.context=null;
	this.image=image;
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
function shape(x, y, points, rendering, fillColor, strokeColor) {
	var i, len=(x instanceof shape) ? x.length : points.length;
	
	//if the first argument is an existing shape, copy it
	if (x instanceof shape) {
		$k.extend(this, x);
	}
	else {
		
		//set the coordinates (offset)
		this.x=x;
		this.y=y;
		
		//set the points
		for (i=0; i<len; i++) {
			this[i]=[];
			this[i][0]=points[i][0];
			this[i][1]=points[i][1];
		}
		this.length=len;
		this.rendering=rendering;
		this.fillColor=fillColor;
		this.strokeColor=strokeColor;
	}
}

point.prototype={
	
	//check if a point is in a specific shape
	inShape: function (shape) {
		var len=shape.length-1, i, intersections=0, A, B, aux, D;
		
		//check the number of intersections with the sides on the left on the point
		D=new altpoint(0, 0);
		D.y=this[1];
		
		//check each side excepting the last
		for (i=0; i<len; i++) {
			A=new altpoint(shape[i][0]+shape.x, shape[i][1]+shape.y);
			B=new altpoint(shape[i+1][0]+shape.x, shape[i+1][1]+shape.y);
			
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
		
		//if the number is even, it is outside, if it is odd, it is inside
		return !!(intersections%2);
	}
}

shape.prototype={
	
	//fill the shape on a context
	fill: function (context, offset) {
		var i, len=this.length, x=this.x, y=this.y, fs;
		if (offset) {
			x+=offset.x;
			y+=offset.y;
		}
		if (this.fillColor) {
			fs=context.fillStyle;
			context.fillStyle=this.fillColor;
		}
		context.beginPath();
		context.moveTo(x+this[0][0], y+this[0][1]);
		for (i=1; i<len; i++) {
			context.lineTo(x+this[i][0], y+this[i][1]);
		}
		context.lineTo(x+this[0][0], y+this[0][1]);
		context.closePath();
		context.fill();
		if (this.fillColor) {
			context.fillStyle=fs;
		}
		return true;
	},
	
	//stroke the shape on a context
	stroke: function (context, offset) {
		var i, len=this.length, x=this.x, y=this.y, ss;
		if (offset) {
			x+=offset.x;
			y+=offset.y;
		}
		if (this.strokeColor) {
			ss=context.strokeStyle;
			context.strokeStyle=this.strokeColor;
		}
		context.beginPath();
		context.moveTo(x+this[0][0], y+this[0][1]);
		for (i=1; i<len; i++) {
			context.lineTo(x+this[i][0], y+this[i][1]);
		}
		context.lineTo(x+this[0][0], y+this[0][1]);
		context.stroke();
		context.closePath();
		if (this.strokeColor) {
			context.strokeStyle=ss;
		}
	},
	
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
	
	//render all the objects on the canvas
	renderObjects: function () {
		var objs=this.objects, len=this.objects.length, i;
		
		//clear the canvas
		this.clear();
		
		//render each object
		for (i=0; i<len; i++) {
			objs[i].render();
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
				curr.xSpeed=curr.xSpeed+3*this.time;
				curr.ySpeed=curr.ySpeed+10*this.time;
				curr.x=curr.x+(curr.xSpeed*this.time+0.5*3*this.time*this.time)*this.meter;
				curr.y=curr.y+(curr.ySpeed*this.time+0.5*10*this.time*this.time)*this.meter;
			}
		}
	}
};

//prototype of the canvas objects
object.prototype={
	
	//render the object on the canvas
	render: function () {
		
		//if the object has an image, use that image
		if (this.image instanceof Image) {
			this.canvas.context.drawImage(this.image, this.x-this.image.width/2, this.y-this.image.height/2);
		}
		
		//if it has a shape, use it
		else if (this.image instanceof shape) {
			if (this.image.rendering==='fill' || this.image.rendering==='both') {
				this.image.fill(this.canvas.context, this);
			}
			if (this.image.rendering==='stroke' || this.image.rendering==='both') {
				this.image.stroke(this.canvas.context, this);
			}
		}
		else {
			this.color.change('l', 1);
			this.canvas.context.fillStyle=this.color.toRGBA();
			this.canvas.context.beginPath();
			this.canvas.context.arc(this.x, this.y, 5, 0, 2*Math.PI);
			this.canvas.context.fill();
			this.canvas.context.stroke();
		}
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

function game() {
	date2=new Date();
	dates.splice(0, 1);
	dates.push(date2);
	average=Math.round(1/avg(dates)*1000);
	cWrite(display.objects.length+'\n'+average+'\n'+display.ms, true);
	
	if (buttons==1) {
		a=display.addObject(new object(mouseX, mouseY, new shape(sh)));
		if (oldColor.hue===359) {
			oldColor.set('hue', 0);
		}
		else {
			oldColor.change('hue', 1);
		}
		a.image.fillColor=oldColor.toHEX();
		a.image.strokeColor=new Color(oldColor.hue, oldColor.saturation, oldColor.lightness+20, 'hsl').toHEX();
	}
	
	display.renderObjects();
	display.physics();
}

img=new Image();
img.src='http://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/STOP_nuvola.svg/33px-STOP_nuvola.svg.png';

window.dates=[new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()];
setInterval(game, 25);
date=new Date();
display.addObject(new object(100, display.height, img));

sh=new shape(0, 0, [[0, 0], [15, 5], [10, 15], [15, 20], [5, 25]], 'both');
oldColor=new Color(60, 100, 50, 'hsl');