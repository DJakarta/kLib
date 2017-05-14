var timer={
	no: 0,
	tests: [],
	start: function () {
		timer.date1=new Date().getTime();
	},
	end: function () {
		timer.date2=new Date().getTime();
	},
	elapsed: function () {
		return timer.date2-timer.date1;
	},
	run: function () {
		for ($_i=0; $_i<timer.tests.length; $_i++) {
			timer.start();
			for ($_j=0; $_j<timer.tests[$_i].times; $_j++) {
			}
			timer.end();
			loop=timer.elapsed();
			timer.start();
			if (timer.tests[$_i].prepCode) {
				timer.tests[$_i].prepCode();
			}
			for ($_j=0; $_j<timer.tests[$_i].times; $_j++) {
				timer.tests[$_i].code();
			}
			if (timer.tests[$_i].endCode) {
				timer.tests[$_i].endCode();
			}
			timer.end();
			timer.tests[$_i][timer.no]=(timer.elapsed()-loop>0)?timer.elapsed()-loop:0;
		}
		timer.displayTimes();
		timer.no++;
	},
	add: function (tName, code, times, prepCode, endCode) {
		currTest=new Array();
		currTest.tName=tName;
		currTest.code=code,
		currTest.times=times,
		currTest.prepCode=prepCode,
		currTest.endCode=endCode,
		timer.tests.push(currTest);
	},
	displayTimes: function () {
		cClose(1);
		text="";
		for ($_i=0; $_i<timer.tests.length; $_i++) {
			currTest=timer.tests[$_i];
			currTest.sum=0;
			for ($_j=0; $_j<timer.no+1; $_j++) {
				currTest.sum+=currTest[$_j];
			}
			currTest.rep=(timer.no+1)*currTest.times;
			currTest.avg=Math.round(currTest.sum/(timer.no+1));
			cWrite(currTest.tName+' @ '+currTest.times+' - '+currTest[timer.no]+'ms');
			cWrite(currTest.avg+'ms on average');
			cWrite((currTest.rep/currTest.sum).toFixed(5)+' cycles/ms');
			cWrite((currTest.sum/currTest.rep).toFixed(5)+' ms/cycles\n\n');
			text+=currTest.tName+' ~ '+currTest.avg+'\n';
		}
		cWrite(text);
		consoleDisplay.style.height='100%';
	}
}
$k(window).on('load', function () {
	$k('#run').on('click', timer.run, false);
});