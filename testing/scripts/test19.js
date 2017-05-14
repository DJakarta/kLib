a=$k('body, div, img, span');

fn=function (eveniment, ceva) {
	cWrite('clicked '+this);
	cWrite(ceva);
	cWrite(eveniment);
}

a.on('click', fn);

$k('#btn').on('click', function () {
	a.off('click', fn);
});