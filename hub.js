'use strict';

let eventPool = require('./eventPool');

// let event = 'pickup';
// let time = '2020-03-06T18:27:17.732Z';


require('./vendor');
require('./driver');
// handlers
const orderHandler = require('./vendor');
const pickupHandler = require('./driver');
const deliveredHandler = require('./driver');
//listeners

eventPool.on('DELIVERED', orderHandler);
eventPool.on('PICKUP', pickupHandler);
eventPool.on('IN-TRANSIT',deliveredHandler);
