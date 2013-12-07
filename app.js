navigator.getUserMedia = navigator.getUserMedia ||navigator.webkitGetUserMedia ||navigator.mozGetUserMedia || navigator.msGetUserMedia;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var video = document.getElementById("video");

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
		}
	}
	init();
}
function fail(){
	alert("App not supported! :(");
}