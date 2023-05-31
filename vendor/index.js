'use strict';

let eventPool = require('../eventPool');




const orderHandler = (payload) => {
  setTimeout(()=>{
    console.log(`Thank you for your order ${payload.orderId}`)
  },1000);
}



module.exports = orderHandler;
