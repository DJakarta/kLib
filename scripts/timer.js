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
			timer.tests[$_i][timer.no]=timer.elapsed();
		}
		timer.displayTimes();
		timer.no++;
	},
	add: function (name, code, times, prepCode, endCode) {
		currTest=new Array();
		currTest.name=name;
		currTest.code=code,
		currTest.times=times,
		currTest.prepCode=prepCode,
		currTest.endCode=endCode,
		timer.tests.push(currTest);
	},
	displayTimes: function () {
		cClose(1);
		for ($_i=0; $_i<timer.tests.length; $_i++) {
			currTest=timer.tests[$_i];
			currTest.sum=0;
			for ($_j=0; $_j<timer.no+1; $_j++) {
				currTest.sum+=currTest[$_j];
			}
			currTest.rep=(timer.no+1)*currTest.times;
			currTest.avg=Math.round(currTest.sum/(timer.no+1));
			cWrite(currTest.name+' @ '+currTest.times+' - '+currTest[timer.no]+'ms');
			cWrite(currTest.avg+'ms on average');
			cWrite((currTest.rep/currTest.sum).toFixed(5)+' cycles/ms');
			cWrite((currTest.sum/currTest.rep).toFixed(5)+' ms/cycles\n\n');
		}
		consoleDisplay.style.height="100%";
	}
}
window.onload=function () {
	$k("#run").el[0].addEventListener("click", timer.run, false);
}