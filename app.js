navigator.getUserMedia = navigator.getUserMedia ||navigator.webkitGetUserMedia ||navigator.mozGetUserMedia || navigator.msGetUserMedia;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var video = document.getElementById("video");
var prevData = null;
var nextData = null;

canvas.width = 600;
canvas.height = 480;

window.addEventListener("load",windowLoaded,false);
function windowLoaded(){
	if(!!navigator.getUserMedia){
		app();
	}else{
		fail();
	}
}

function app(){
	function init(){
		navigator.getUserMedia({video: true, audio:true}, make, fail);
	}
	function make(userMedia){
		video.src = window.URL.createObjectURL(userMedia);
		appLoop();
	}
	function appLoop(){
		setTimeout(appLoop,1000/24);
		drawCanvas();

		function drawCanvas(){
			context.drawImage(video,0,0);
			if(!prevData){
				prevData = context.getImageData(0,0,canvas.width,canvas.height);
				nextData = prevData;
			}else{
				prevData = nextData;
				nextData = context.getImageData(0,0,canvas.width,canvas.height);
			}
			var returnData = calcData(nextData,prevData);
			context.putImageData(returnData,0,0);

			function calcData(data1,data2){
				if (data1.data.length!=data2.data.length) return null;
				var i =0;
				var newData = context.createImageData(canvas.width,canvas.height);//(Math.floor(canvas.width*0.25),Math.floor(canvas.height*0.25));
				while(i<=Math.floor(data1.data.length*0.25)){
					var avg1 = (data1.data[i*4]+data1.data[i*4+1]+data1.data[i*4+2])/3;
					var avg2 = (data2.data[i*4]+data2.data[i*4+1]+data2.data[i*4+2])/3;
					var diff  = threshold(Math.abs(avg1-avg2));
					newData.data[4*i] = diff;
					newData.data[4*i+1]=diff;
					newData.data[4*i+2]=diff;
					newData.data[4*i+3]=0xff;
					i++;
				}
				return newData;
			}
			function threshold(value){
				return (value>0x15)? 0xFF : 0;
			}
		}
	}
	init();
}
function fail(){
	alert("App not supported! :(");
}