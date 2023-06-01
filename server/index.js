'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

// socket server singleton // sometimes called io
const server = new Server();

// listening for all events on port at http://localhost:3001
server.listen(PORT);

function logger(event,payload) {
  const timestamp = new Date();
  console.log('EVENT:', { event, timestamp, payload });
}


// from DEMO: allows the capablitiy for clients to connect to http://localhost:3000
server.on('connection', (socket) => {
// proof of life
  console.log('connected to event server', socket.id);

  socket.on('pickup', (payload)=>{
    logger();
    console.log('pickup: pickup event', payload);

    socket.broadcast.emit('pickup', payload); // should send to all parties except sender based on demo
  });

  socket.on('in-transit', (payload) => {
    logger();
    console.log('in transit: pickup event', payload);
    socket.broadcast.emit('in-transit', payload); // should send to all parties except sender based on demo
  });

  socket.on('delivered', (payload) => {
    logger();
    console.log('in transit: pickup event', payload);
    socket.broadcast.emit('deliverd', payload); // should send to all parties except sender based on demo
  });

});

// create a name space
// listening for all events at http//localhost:3000/caps
const caps = server.of('/caps');
caps.on('connection', (socket) => {
  console.log('socket connected to caps namespace', socket.id);


  // FROM DEMO: How to join a room
  socket.on('JOIN', (room) => {
    socket.join(room);
    console.log(`you've joined the ${room} room`);
    console.log('---payload is the room name in this example--', room);
    socket.join(room);
    console.log(`you've joined the ${room} room`);
    console.log('these are All the current rooms', socket.adapter.rooms);
    // how to emit to a room:  maybe useful later
    // socket.to(room).emit('some-event', some-payload);

  });


});


