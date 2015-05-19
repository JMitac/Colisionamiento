function Player(arguments) {
	this.height = 50;
	this.width = 50;
	this.x = 100;
	this.y = 100;
	this.desplazamiento = 8;
	this.doMoveLeft = false;
	this.doMoveRight = false;
	this.doMoveUp = false;
	this.doMoveDown = false;
    this.doSpace = false;
	this.gameCtx = arguments.contexto;
	this.imageObj = arguments.image;
}

Player.prototype.tick = function() {
	if ( this.doMoveLeft){//Izquierda  
		if(this.x > 0 && this.y < 1000){
			this.x -= this.desplazamiento;
			if(this.x < 2 && this.y < 1000){//COLISIONAMIENTO
				this.x = 20;
			}			
		}
	}

	if ( this.doMoveRight){//Derecha
		if(this.x < 945){
			this.x += this.desplazamiento;
			
			if(this.x > 944){//COLISIONAMIENTO
				this.x = 924;
			}
			//TOMALO COMO UNA LINEA(COLISIONAMIENTO DEL CUADRADO, LADO IZQU)
			if(this.y >= 257 && this.y <= 598){
				if(this.x = 257){
				//if(this.y >= 257 && this.y <= 598){
					this.x = 240;}
				//}
			}
		}
	}

	if ( this.doMoveUp){//Arriba
		if(this.y > 0){
			this.y -= this.desplazamiento;
			if(this.y < 2){
				this.y = 20;
			}
		}
	}

	if ( this.doMoveDown){//Abajo
		if(this.y < 650){
			this.y += this.desplazamiento;
			console.log(this.y);
			if(this.y > 649){
				this.y = 639;
			}
			//else if(this.y > 257 && this.y < 556 && this.x)

		}
	}
  
  if ( this.doSpace){
    var positionJson = { x: this.x , y: this.y };
    this.sendPosition(positionJson);
    this.doSpace = false;
  }
};



Player.prototype.draw = function() {
	this.gameCtx.drawImage(this.imageObj, this.x, this.y, this.width, this.height);
	//this.gameCtx.fillRect( this.x, this.y, this.width, this.height);
};


/*
* Socket Player Events
*/

Player.prototype.sendPosition = function(position){
  socket.emit("calcularPosition", position);  
};

/*
* Set event keyboard listener
*/

Player.prototype.listenKeyBoardEvent = function() {
	var that = this;

	// https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
	document.addEventListener("keydown", function(e) {
		that.keyDown(e);
	}, false);

	document.addEventListener("keyup", function(e) {
		that.keyUp(e);
	}, false);
};

Player.prototype.keyDown = function(e) {
	var keyCode = e.keyCode;
	//LEFT
	if(keyCode == 37){
		this.doMoveLeft = true;
	}
	//UP
	else if(keyCode == 38){
		this.doMoveUp = true;
	}
	//RIGHT
	else if(keyCode == 39){
		this.doMoveRight = true;
	}
	//DOW
	else if(keyCode == 40){
		this.doMoveDown = true;
	}
};

Player.prototype.keyUp = function(e) {
	var keyCode = e.keyCode;
	//UP KEY
	if(keyCode == 38){
		this.doMoveUp = false;
	}
	//LEFT
	else if(keyCode == 37){
		this.doMoveLeft = false;
	}
	//RIGHT
	else if(keyCode == 39){
		this.doMoveRight = false;
	}
	//DOW
	else if(keyCode == 40){
		this.doMoveDown = false;
	}
  //SPACE
  else if(keyCode == 32){
    this.doSpace = true;
  }
};