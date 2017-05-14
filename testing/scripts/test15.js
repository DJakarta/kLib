var img=new Image();
img.src='http://localhost/imgs/bg/main2.jpg';
$k(img).on('load', function () {
	alert('done');
}, false);