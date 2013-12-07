navigator.getUserMedia = navigator.getUserMedia ||navigator.webkitGetUserMedia ||navigator.mozGetUserMedia || navigator.msGetUserMedia;

window.addEventListener("load",windowLoaded,false);
function windowLoaded(){
	app();
}

function app(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var video = document.getElementById("video");

	function drawCanvas(){
		context.drawImage(video,0,0)
	}

	function loop(){
		window.setTimeout(loop,1000/24);
		drawCanvas();
	}
	canvas.width = video.width;
	canvas.heiight = video.height;
	if(!!navigator.getUserMedia){
		navigator.getUserMedia({video: true, audio:true}, function(userMedia){
			video.src = window.URL.createObjectURL(userMedia);}, fail);
		loop();
	}else{
		fail();
	}
}

function fail(){
	alert("App not supported! :(");
}