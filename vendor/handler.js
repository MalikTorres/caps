'use strict';


let eventPool = require('./eventPool');
let Chance = require('chance');
let chance = new Chance();



module.exports = (payload) => {
  let payload = {
    store: chance.company(),
    orderId: chance.orderId(),
    customer: chance.customer(),
    address: chance.address(),
  };                                        //object shorthand
  eventPool.emit('PICKUP', payload);
}







