/*finding*/

//$k("li").css({'background-color': '#ffff00', 'color': 'blue', 'padding': '3px'});

obj={'background-color': '#ffff00', 'color': 'blue', 'padding': '3px', 'margin-left': '10px', 'font-face': 'Tahoma', 'font-size': '15px', 'font-weight': 'bold', 'display': 'none', 'padding-right': '16px'};
arr1='';
arr2=[];
css1=function () {
	arr1='';
	for (_prop in obj) {
		arr1+=_prop+':'+obj[_prop]+';';
	}
}
css2=function () {
	arr2=[];
	for (_prop in obj) {
		arr2.push(_prop+':');
		arr2.push(obj[_prop]+';');
	}
	arr2=arr2.join('');
}

timer.add("css1", css1, 1000);
timer.add("css2", css2, 1000);

/*
results:
css2 out of the question
Opera:


Firefox:


Chrome:


Internet Explorer 9:


Internet Explorer 8:


Internet Explorer 7:


Konqueror:


Safari:


SeaMonkey:


Opera Mobile:
css1 ~ 
css2 ~ 
css3 ~ 
css4 ~ 

Android Browser:
css1 ~ 
css2 ~ 
css3 ~ 
css4 ~ 

Firefox Mobile:
css1 ~ 
css2 ~ 
css3 ~ 
css4 ~ 
*/