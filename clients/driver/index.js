'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3000/caps');
// const eventEmitter = require('../eventPool');
// const { handlePickupAndDelivery } = require('./handler');

// eventEmitter.on('pickup', handlePickupAndDelivery);
const { pickupOccurred, packageDelivered } = require('./handler');


// how will we handle socket when modularized?
socket.on('pickup', (payload) => {
  setTimeout(() => {
    pickupOccurred(payload, socket);
  }, 1000);
  setTimeout(() => {
    packageDelivered(payload, socket);
  }, 2000);
});



