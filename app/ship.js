   // Se crea el objeto del barco

    function Ship(size) {
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.hits = 0;
        this.horizontal = false;
    }

    // Se crea la funcion para determinar si esta hundido el barco

    Ship.prototype.sunken = function(){
        return this.hits >= this.size;
    }

    module.exports = Ship;
    
