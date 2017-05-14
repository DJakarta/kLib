/* basic test
$k("*").css({"width":"500px"}).on("click", function () {
	$k(this).toggle("style", {"background-color":["yellow","white"]});
});*/


/* #1 test (dom & kLib objects)
var k=0;
$k("input").on("click", function () {
	cWrite($k(this).css("width", "300px").toggle("css", {"background-color":["yellow","white"]})+this);
	$k("span, div").forEach(function () {
		$k(this).textContent=k+++". "+this+":"+$k(this);
	});
});*/

/* #2 test (default objects)
str=["friendly string with a dot.","som @33 4very random .kch-aract h-ers #happy#3","#-2JS4on some var-a"]
num=69;
k=0;
for (i=0; i<3; i++) {
	cWrite(k+++"."+str[i].toCamelCase());
}
for (i=0; i<3; i++) {
	cWrite(k+++"."+str[i].toDashCase());
}
for (i=0; i<3; i++) {
	cWrite(k+++"."+str[i].toUnderscoreCase());
}
for (i=0; i<3; i++) {
	cWrite(k+++"."+str[i].toJSONCase());
}
for (i=0; i<3; i++) {
	cWrite(k+++"."+str[i].firstChar());
}
for (i=0; i<3; i++) {
	cWrite(k+++"."+str[i].lastChar());
}
for (i=0; i<3; i++) {
	cWrite(k+++"."+str[i].find("k"));
}
cWrite(k+++"."+num.leadingZeroes(5));*/

/* #3 test ()*/