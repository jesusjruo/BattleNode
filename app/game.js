var Player = require('./player.js');
var Settings = require('./settings.js');
var GameStatus = require('./gameStatus.js');

function Game(id, player1Id, player2Id){
  this.id = id;
  this.currentPlayer = Math.floor(Math.random() * 2);
  this.winningPlayer = null;
  this.gameStatus = GameStatus.inProgress;
  this.players = [new Player(player1Id), new Player(player2Id)];
}

//Retornar id de un jugador
Game.prototype.getPlayerId = function(player) {
    return this.players[player].id;
  };

//Retornar id  del ganador
Game.prototype.getWinnerId = function() {
    if(this.winningPlayer === null) {
      return null;
    }
    return this.players[this.winningPlayer].id;
  };

//Retornar id del perdedor
Game.prototype.getLoserId = function() {
    if(this.winningPlayer === null) {
      return null;
    }
    var loser = this.winningPlayer === 0 ? 1 : 0;
    return this.players[loser].id;
  };
  
//Cambiar de turno  
Game.prototype.switchPlayer = function() {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
  };
  
//Rendirse  
Game.prototype.surrender = function(player) {
    this.gameStatus = GameStatus.gameOver;
    this.winningPlayer = player === 0 ? 1 : 0;
  }

//Disparar al oponente
Game.prototype.shoot = function(position) {
    var opponent = this.currentPlayer === 0 ? 1 : 0,
        gridArea = position.y * Settings.gridCols + position.x;

    //Chequea si no ha sido disparado antes.
    if(this.players[opponent].shots[gridArea] === 0 && this.gameStatus === GameStatus.inProgress) {
      //Si fallo el tiro.
      if(!this.players[opponent].shoot(gridArea)) {
        this.switchPlayer();
      }
      //Chequear si termino el juego
      if(this.players[opponent].getShipsLeft() <= 0) {
        this.gameStatus = GameStatus.gameOver;
        this.winningPlayer = opponent === 0 ? 1 : 0;
      }
      return true;
    }
    return false;
  };

//Obtener Tablero de juego
Game.prototype.getGrid = function(player, hideShips) {
    return {
      shots: this.players[player].shots,
      ships: hideShips ? this.players[player].getSunkenShips() : this.players[player].ships
    };
  };


//Repartir el estado actual del juego a cada jugador
Game.prototype.getGameState = function(player, gridOwner) {
    return {
      turn: this.currentPlayer === player,            
      gridIndex: player === gridOwner ? 0 : 1,             
      grid: this.getGrid(gridOwner, player !== gridOwner)  
    };
};

module.exports = Game;