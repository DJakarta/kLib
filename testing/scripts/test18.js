a=$k('body>*');
j=0;
obj={};
obj.i=0;
arr=['a', 'b', 'c', 'a', 'b', 'c', 'a'];

b=function (ceva, arra) {
	this.style.backgroundColor=new Color(ceva.i*60, 100, 50, 'hsl');
	this.no=ceva.i;
	cWrite(ceva.i++);
	cWrite('this.no='+this.no+arra[ceva.i-1]);
	cWrite(this.style.backgroundColor);
	
}

cWrite(a.forEach(b, [obj, arr]));