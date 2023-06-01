'use strict';

var Chance = require('chance');
const eventEmitter = require('../../eventPool');

var chance = new Chance();
const { io } = require('socket.io-client');
const socket = io('http://localhost:3000');


const orderHandler = (payload = null) => {
  if (!payload) {
    payload = {
      store: '1-206-flowers',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  console.log('VENDOR: ORDER ready for pickup:', payload);
  eventEmitter.emit('pickup', payload);
};

const thankDriver = (payload) => console.log('VENDOR: Thank you for your order', payload.customer);


const deliveredMessage = (payload) => {
  setTimeout(() => {
    thankDriver(payload);
  }, 1000);
};

module.exports = { orderHandler, deliveredMessage, thankDriver };








