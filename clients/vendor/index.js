// 'use strict';
const { io } = require('socket.io-client');

const socket = io('http://localhost:3000/caps');

const { orderHandler, thankDriver } = require('./handler');

setInterval(() => {
  orderHandler(socket);
}, 5000);

socket.on('delivered', (payload) => {
  setTimeout(() => {
    thankDriver(payload);
  }, 1000);
});
// const { orderHandler, deliveredMessage } = require('./handler');
// const eventEmitter = require('../eventPool');

// // starts the event cycle, note that the pickup emit is inside the orderHandler
// setInterval(() => {
//   orderHandler();
// }, 5000);

// eventEmitter.on('delivered', deliveredMessage);
