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

    // if(!this.createRandom()){
    //     this.ships[i] = 0;
    //     this.createShips();

    // }
};

Player.prototype.createShips = function(){

    var i, ship, shipArea, gridArea, x = [1, 3, 5, 8 , 8] , y = [1, 2, 5, 2, 8];
    var horizontal = [true, false, true, false, true];

    for(shipArea = 0 ; shipArea < Settings.ship.length ; shipArea++){
        ship = new Ship(Settings.ships[shipArea]);
        ship.horizontal = horizontal[shipArea];
        ship.x = x[shipArea];
        ship.y = y[shipArea];
    }
    

}

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
Player.prototype.placeRandom = function(){
    var i, j, xMax, yMax, gridArea;

    for(i = 0 ; i < 25 ; i++){
        ship.horizontal = Math.random() < 0.5;
        xMax = ship.horizontal ? Settings.gridCols - ship.size + 1 : Settings.gridCols;
        yMax = ship.horizontal ? Settings.gridRows : Settings.gridRows - ship.size + 1;
        ship.x = Math.floor(Math.random() * xMax);
        ship.y = Math.floor(Math.random() * yMax);
        
    }

}
