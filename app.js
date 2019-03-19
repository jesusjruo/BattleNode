var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

//var BattleshipGame = ('.app/game.js');
//var GameStatus = require('./app/gameStatus.js');

var users = {};

var port = 3000;


app.use(express.static(__dirname + '/public'));

http.listen(port, function(){
  console.log('listening on port: ' +port);
});

// Eventos que ocurren al iniciar un puerto

io.on('connection' , function(socket){
  console.log((new Date().toISOString()) + ' El jugador ' + socket.id + ' se ha conectado.');

  //Se crea el objeto users
    // users[socket.id] ={
    //   player: null,
    //   inGame: null
    // };

  //Se une a la sala de espera hasta que un segundo jugador inicie el puerto
  //socket.join('Sala de espera');

  //Chat entre jugadores
  socket.on('chat' , function(msg){
      // if(users[socket.id].inGame != null) {
      console.log('Mensaje de ' + socket.id + ' : ' + msg);
      // socket.broadcast.to(' game ' + users[socket.id]).emit('chat',{
      //   name: 'Oponente',
      //   message: entities.encode(msg),
      // });
      // io.to(socket.id).emit('chat', {
      //   name: 'Yo',
      //   message: entities.encode(msg),
      // });
    // }
  }); 


});
