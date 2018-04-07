var r = 10;
var color = '#eee';
var pointNumber = 50;
var time = 30;
var Height = $(window).height();
var Width = $(window).width();
var pointArray = [];
var c=document.getElementById("myCanvas");
c.height = Height;
c.width = Width;
var ctx=c.getContext("2d");
function begin(){
	$(window).resize(function() {
		Height = $(window).height();
		Width = $(window).width();
		c.height = Height;
		c.width = Width;
	});
	initObj(pointNumber);
	setInterval(function(){
		drow();
		work();
		line();
	},time)
}
function newPoint() {
	return obj = {
		x: Math.round(Math.random()*Width),
		y: Math.round(Math.random()*Height),
		v: Math.round(Math.random()*0+1),
		A: Math.round(Math.random()*360)
	};
}
function initObj(num){
	for (var i = 0; i < num; i++) {
		pointArray[i] = newPoint();
	}
}
function drow(){
	ctx.clearRect(0,0,Width,Height);
	for (var i = 0; i < pointArray.length; i++){
		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.arc(pointArray[i].x, pointArray[i].y, r, 0, Math.PI*2, false);
		ctx.fill();
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.closePath();
	}
}
function work(){
	for (var i = 0; i < pointArray.length; i++){
		pointArray[i].x += pointArray[i].v*Math.cos(2*Math.PI/360*pointArray[i].A);
		pointArray[i].y += pointArray[i].v*Math.sin(2*Math.PI/360*pointArray[i].A);
		if(pointArray[i].x > (Width+r)){
			pointArray[i].x = -r;
			pointArray[i].A = Math.round(Math.random()*360); 
		}
		if(pointArray[i].y > (Height+r)){
			pointArray[i].y = -r;
			pointArray[i].A = Math.round(Math.random()*360); 
		}
		if(pointArray[i].x < -r){
			pointArray[i].x = Width + r;
			pointArray[i].A = Math.round(Math.random()*360); 
		}
		if(pointArray[i].y < -r){
			pointArray[i].y = Height + r;
			pointArray[i].A = Math.round(Math.random()*360); 
		}
		//console.log(pointArray[0].y);
	}
}
function line(){
	for(var i = 0; i < pointArray.length; i++){
		for(var j = 0; j < pointArray.length; j++){
			if(i == j){
				continue;
			}
			if(Math.pow(pointArray[i].x - pointArray[j].x,2) + Math.pow(pointArray[i].y - pointArray[j].y,2) <= 10000){
				ctx.beginPath();
				ctx.moveTo(pointArray[i].x,pointArray[i].y);
				ctx.lineTo(pointArray[j].x,pointArray[j].y);
				ctx.lineWidth = 1;
				ctx.stroke();
				ctx.closePath();		
			}
		}
	}
}
jQuery(document).ready(function($) {
	begin();
});