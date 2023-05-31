'use strict';

let eventPool = require('../eventPool');

const pickupHandler = (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    eventPool.emit('IN-TRANSIT', payload);
  }, 1000);
};


const deliveredHandler = (payload) => {

  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderId}`);
  }, 1000);
  eventPool.emit('DELIVERED', payload);


};


module.exports = { pickupHandler, deliveredHandler };
