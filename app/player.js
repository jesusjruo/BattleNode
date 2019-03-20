var Ship = require ('./ship');
var Settings = require ('./settings');

function Player(id){

    var i;
    this.id = id;
    this.shots = Array(Settings.gridRow * Settings.gridCols);
    this.shipGrid = Array(Settings.gridRow * Settings.gridCols);
    this.Ship = [];

    for(i = 0; i < Settings.gridRow * Settings.gridCols ; i++){
        this.shots[i] = 0;
        this.shipGrid[i] = -1; 
    }

    //Solo en caso de que no se creen de forma aleatoria.
     if(!this.createRandom()){
         this.ships[i] = 0;
         this.createShips();

     }
};

//Crear barcos
Player.prototype.createShips = function(){

    var i, ship, shipArea, gridArea, x = [1, 3, 5, 8 , 8] , y = [1, 2, 5, 2, 8];
    var horizontal = [true, false, true, false, true];

    for(shipArea = 0 ; shipArea < Settings.ship.length ; shipArea++){
        ship = new Ship(Settings.ships[shipArea]);
        ship.horizontal = horizontal[shipArea];
        ship.x = x[shipArea];
        ship.y = y[shipArea];

        gridArea = ship.y * Settings.gridCols + ship.x;
        for(i = 0; i < ship.size; i++) {
            this.shipGrid[gridArea] = shipArea;
            gridArea += ship.horizontal ? 1 : Settings.gridCols;
          }
          this.ships.push(ship);
    }
};

//Crear barcos de manera aleatoria
Player.prototype.createRandom =  function(){

    var shipArea;
    for(shipArea = 0; shipArea < Settings.ships.length; shipArea ++){
        ship = new Ship(Settings.ships[shipArea]);
    }
    if(!this.placeRandom(ship , shipArea)){
        return false;
    }
    this.ships.push(ship);
    return true;
};

//Posicionar barcos de manera aleatoria
Player.prototype.placeRandom = function(ship, shipArea){
    var i, j, gridArea, xMax, yMax;

  for(i = 0; i < 25; i++) {
    ship.horizontal = Math.random() < 0.5;

    xMax = ship.horizontal ? Settings.gridCols - ship.size + 1 : Settings.gridCols;
    yMax = ship.horizontal ? Settings.gridRows : Settings.gridRows - ship.size + 1;

    ship.x = Math.floor(Math.random() * xMax);
    ship.y = Math.floor(Math.random() * yMax);

    //LLama a la funcion para verificar superposicion de barcos
    if(!this.checkover(ship)) {
      gridArea = ship.y * Settings.gridCols + ship.x;
      for(j = 0; j < ship.size; j++) {
        this.shipGrid[gridArea] = shipArea;
        gridArea += ship.horizontal ? 1 : Settings.gridCols;
      }
      return true;
    }
  }
  return false;    
};

//Chequear que un barco este sobre otro
Player.prototype.checkover = function(ship) {
    var i, gridArea = ship.y * Settings.gridCols + ship.x;
  
    for(i = 0; i < ship.size; i++) {
      if(this.shipGrid[gridArea] >= 0) {
        return true;
      }
      gridArea += ship.horizontal ? 1 : Settings.gridCols;
    }
  
    return false;
  };

//Disparar
Player.prototype.shoot = function(gridArea) {
    if(this.shipGrid[gridArea] >= 0) {
        //Acerto el disparo
        this.ships[this.shipGrid[gridArea]].hits++;
        this.shots[gridArea] = 2;
        return true;
      } else {
        //Fallo el disparo
        this.shots[gridIndex] = 1;
        return false;
      }
};

//Retornar las naves hundidas
Player.prototype.getSunkenShips = function() {
    var i, sunkenShips = [];

    for(i = 0; i < this.ships.length; i++) {
      if(this.ships[i].sunken()) {
        sunkShips.push(this.ships[i]);
      }
    }
    return sunkenShips;
  };

//Retorna las naves restantes
  Player.prototype.getShipsLeft = function() {
    var i, shipCount = 0;
  
    for(i = 0; i < this.ships.length; i++) {
      if(!this.ships[i].sunken()) {
        shipCount++;
      }
    }
    return shipCount;
  }