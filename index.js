var Observable =  Rx.Observable;

var sec = document.getElementById("sec");
var min = document.getElementById("min");
var hr = document.getElementById("hr");

var start = document.getElementById("start");
var stop = document.getElementById("stop");
var split = document.getElementById("split");
var reset = document.getElementById("reset");

let counter = {value: 0};

const starter = 1;
const stopper = 2;
const reseter = 3;
const spliter = 4;

var srt = acc => ( subscribed(starter) );
var stp = acc => ( subscribed(stopper) );
var rst = acc => ( subscribed(reseter) );
var slt = acc => ( subscribed(spliter) );

button$
	.scan( (acc,update) => update(acc), counter)
	.subscribe(counter => {
		sec.innerHTML = sec.value;
	});

var button$ = Observable.merge(
	Observable.fromEvent(start,'click'),mapTo(srt),
	Observable.fromEvent(stop,'click'),mapTo(stp),
	Observable.fromEvent(split,'click'),mapTo(rst),
	Observable.fromEvent(reset,'click'),mapTo(slt)
)

	
let continues = new Rx.Subject();
var subscription;
var source = Observable
	.interval(1000 /* ms */)
	.timeInterval()
	.pauseable(continues);
			
function subscribed(state){

	 subscription = source.subscribe(
		
		function (x){
			sec.value ++;
			if(sec.value == 60) {
				sec.value = 0;
				min.value ++;
				
				if(min.value == 60) {
					min.value = 0;
					hr.value ++;
				}
			}
		});

		if(state == 1){
			continues.onNext(true);
		}
		if(state == 2){
			continues.onNext(false);
			subscribed.dispose();
		}

}

