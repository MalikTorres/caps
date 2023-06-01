'use strict';

// let eventEmitter = require('../../eventPool');
const { io } = require('socket.io-client');
const socket = io('http://localhost:3000');


// socket.on(pickup)


const pickupOccurred = (payload) => {
  console.log('DRIVER: picked up', payload.orderId);
  eventEmitter.emit('in-transit', payload);
};

const packageDelivered = (payload) => {
  console.log('DRIVER: delivered', payload.orderId);
  eventEmitter.emit('delivered', payload);
};

const handlePickupAndDelivery = (payload) => {
  setTimeout(() => {
    pickupOccurred(payload);
  }, 1000);
  setTimeout(() => {
    packageDelivered(payload);
  }, 2000);
};

module.exports = { pickupOccurred, packageDelivered, handlePickupAndDelivery };
