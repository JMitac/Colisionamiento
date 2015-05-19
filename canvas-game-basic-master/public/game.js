"use strick";
window.addEventListener("load",load);
var socket;

function load() {
    socket = io();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var fps = 40;
	var imageObj = new Image();
    var players = [];
    imageObj.src = 'http://fc04.deviantart.net/fs11/i/2006/210/9/6/Gunbound_Lightning__by_Canapin.png';
  
    var currentPlayer = new Player({ contexto: ctx , image: imageObj});
    currentPlayer.listenKeyBoardEvent();
  
    (function tick() {
        drawWorld();
        setTimeout( function() { tick(); }  , 1000/fps);
    })();

    function drawWorld() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(300, 300, 300, 300);
       currentPlayer.tick();
       currentPlayer.draw();      
    }
  
    /*
    * Socket Listener
    */
    socket.on("rataMensaje", function(data){
      console.log(data);
    });

}
