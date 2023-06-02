'use strict';

var Chance = require('chance');
// const eventEmitter = require('../../eventPool');
var chance = new Chance();

const orderHandler = (socket, payload = null) => {
  if (!payload) {
    payload = {
      store: '1-206-flowers',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  console.log('VENDOR: ORDER ready for pickup:', payload);
 socket.emit('pickup', payload);
};

const thankDriver = (payload) => console.log('VENDOR: Thank you for your order', payload.customer);


module.exports = { orderHandler, thankDriver };








