/*assigning*/
var a=[1000000];
assign=function () {
	a[0]=$_j;
}
assign2=function () {
	a[0]=13;
}
assign3=function () {
	b=13;
}
assign4=function () {
	var b=13;
}
assign5=function () {
	var b;
	b=13;
}
assignArray=function () {
	var c;
	c=new Array(1,2,3);
}
assignArray2=function () {
	var c;
	c=[1,2,3];
}
assignArray3=function () {
	var c=new Array(1,2,3);
}
assignArray4=function () {
	var c=[1,2,3];
}

timer.add("assign", assign, 1000000);
timer.add("assign2", assign2, 1000000);
timer.add("assign3", assign3, 1000000);
timer.add("assign4", assign4, 1000000);
timer.add("assign5", assign5, 1000000);
timer.add("assignArray", assignArray, 1000000);
timer.add("assignArray2", assignArray2, 1000000);
timer.add("assignArray3", assignArray3, 1000000);
timer.add("assignArray4", assignArray4, 1000000);
timer.add("assignArray5", assignArray5, 1000000);

/*
results:

Opera:
assign ~ 39
assign2 ~ 39
assign3 ~ 46
assign4 ~ 33
assign5 ~ 31
assignArray ~ 404
assignArray2 ~ 233
assignArray3 ~ 466
assignArray4 ~ 236

Firefox:
assign ~ 22
assign2 ~ 30
assign3 ~ 24
assign4 ~ 21
assign5 ~ 24
assignArray ~ 93
assignArray2 ~ 113
assignArray3 ~ 109
assignArray4 ~ 123

Chrome:
assign ~ 19
assign2 ~ 34
assign3 ~ 28
assign4 ~ 28
assign5 ~ 27
assignArray ~ 85
assignArray2 ~ 39
assignArray3 ~ 87
assignArray4 ~ 39

Internet Explorer 9:
assign ~ 44
assign2 ~ 41
assign3 ~ 39
assign4 ~ 37
assign5 ~ 33
assignArray ~ 371
assignArray2 ~ 320
assignArray3 ~ 383
assignArray4 ~ 337

Konqueror:
assign ~ 2830
assign2 ~ 2429
assign3 ~ 2459
assign4 ~ 2105
assign5 ~ 2122
assignArray ~ 3363
assignArray2 ~ 4812
assignArray3 ~ 3424
assignArray4 ~ 4809

Safari:
assign ~ 63
assign2 ~ 43
assign3 ~ 43
assign4 ~ 44
assign5 ~ 36
assignArray ~ 392
assignArray2 ~ 324
assignArray3 ~ 394
assignArray4 ~ 344

SeaMonkey:
assign ~ 28
assign2 ~ 30
assign3 ~ 29
assign4 ~ 26
assign5 ~ 27
assignArray ~ 98
assignArray2 ~ 92
assignArray3 ~ 105
assignArray4 ~ 103

Opera Mobile:
assign ~ 
assign2 ~ 
assign3 ~ 
assign4 ~ 
assign5 ~ 
assignArray ~ 
assignArray2 ~ 
assignArray3 ~ 
assignArray4 ~ 

Android Browser:
assign ~ 
assign2 ~ 
assign3 ~ 
assign4 ~ 
assign5 ~ 
assignArray ~ 
assignArray2 ~ 
assignArray3 ~ 
assignArray4 ~ 

Firefox Mobile:
assign ~ 
assign2 ~ 
assign3 ~ 
assign4 ~ 
assign5 ~ 
assignArray ~ 
assignArray2 ~ 
assignArray3 ~ 
assignArray4 ~ 
*/