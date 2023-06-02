'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const Queue = require('./lib/queue');
//TODO: Create a Message Queue that can store payloads for specific Client
let messageQueue = new Queue();
// socket server singleton
const server = new Server();

// create a namespace
const caps = server.of('/caps');


// create / allow for connections to the caps namespace
caps.on('connection', (socket) => {
  // confirmation that a client is connected
  console.log('connection to the caps namespace', socket.id);

  // any event emitted will be logged (from socket docs)
  socket.onAny((event, payload) => {
    let timestamp = new Date();
    // will log everything as required by lab
    console.log('EVENT:', { event, timestamp, payload });
  });
  // socket listeners
  socket.on('pickup', (payload) => {
    socket.broadcast.emit('pickup', payload);
  });

  // is this necessary since onAny is logging? may good to have?
  socket.on('in-transit', (payload) => {
    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    socket.broadcast.emit('delivered', payload);
  });
  socket.on('received', (payload) => {
    // Here we're retrieving the current queue from messagequeue using the read() method, which is taking payload.queueId as an arguement. This return is then storeed in currentQueue
    let currentQueue = messageQueue.read(payload.queueId);
    if (!currentQueue) {
      throw new Error('we have messages but no queue');
    }
    // this line removes a message from the currentQueue using the remove method, taking in payload.messageid as an arguement to identify the specific message
    let order = currentQueue.remove(payload.orderId);
    socket.broadcast.emit('received', order);
  });

  socket.on('getAll', (payload) => {
    console.log('trying to get messages');
    let currentQueue = messageQueue.read(payload.queueId);
    if (currentQueue && currentQueue.data) {
      // getting list of all the messages
      Object.keys(currentQueue.data).forEach(orderId => {
        // sending messages that were missed
        socket.emit('pickup', currentQueue.read(orderId));
      });
    }
  });
});

console.log('listening on PORT:', PORT);
server.listen(PORT);
// making system aware of vendor and driver
// require('./vendor/index');
// require('./driver/index');


// listeners: listen to all events and log expected content
// eventPool.on('in-transit', (payload) => logger('in-transit', payload));
// eventPool.on('delivered', (payload) => logger('delivered', payload));

// logs the event , a timestamp and the payload
// function logger(event, payload) {
//   const timestamp = new Date();
//   console.log('EVENT:', { event, timestamp, payload });
// }

