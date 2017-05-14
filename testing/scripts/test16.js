var times=0;

function off() {
	cWrite('rem');
	$k('#run').off('click', func, false);
}

$k('#run').on('click', function func() {
	cWrite(times++ +' clicks!');
	if (times>8) {
		cWrite('>8');
		off();
	}
}, false);