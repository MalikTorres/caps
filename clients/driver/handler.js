'use strict';

const { io } = require('socket.io-client');

// we establish ourself as a socket client, and connect
const socket = io('http://localhost:3000/caps');


const pickupOccurred = (payload) => {
  console.log('DRIVER: picked up', payload.orderId);
  socket.emit('in-transit', payload);
};

const packageDelivered = (payload) => {
  console.log('DRIVER: delivered', payload.orderId);
  socket.emit('delivered', payload);
};

// const handlePickupAndDelivery = (payload) => {
//   setTimeout(() => {
//     pickupOccurred(payload);
//   }, 1000);
//   setTimeout(() => {
//     packageDelivered(payload);
//   }, 2000);
// };

module.exports = { pickupOccurred, packageDelivered };
