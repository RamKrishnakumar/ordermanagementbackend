const mongoose = require('mongoose');


const ordersSchema = mongoose.Schema({
    orderNumber: String,
    orderDueDate: String,
    customerName: String,
    customerAddress: String,
    customerPhone: String,
    orderTotalAmt: Number,
});

const orderModel = mongoose.model('Orders',ordersSchema);

module.exports = orderModel