var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

const orderModel = require('../models/orders.model');

/* GET order listing. */
router.get('/list', function(req, res, next) {
    orderModel.find(function(err,orderListResponse){
        if(err){
            res.send({status:500,message: 'unable to Find orders'})
        }
        else{
            const orderRecordCount = orderListResponse.length;
            res.send({status:200,recordCount: orderRecordCount, data: orderListResponse});
        }
    })
//   res.send('respond with a resource');
});

/* GET Specific Order Detail */
router.get('/view', function(req, res, next) {
    const orderId = typeof(req.query.orderId) == 'string' && req.query.orderId.trim().length > 0 ? req.query.orderId : false;
    if(orderId){
        orderModel.findById(orderId,function(err,orderData){
            if(err){
                res.send({status:500,message: `Unable to find any order with order Number: ${orderId}`});
            }
            else{
                //const orderRecordCount = orderListResponse.length;
                res.send({status:200,message:'Order Found Successfully', data: orderData});
            }
        })
    }
    else{
        res.send({status:403,message:'Bad Request, Required parameter missing'});
    }
    

});

/* Create new Order */
router.post('/add', function(req, res, next) {

    const orderNumber = typeof(req.body.orderNumber)=='string' && req.body.orderNumber.trim().length > 2 ? req.body.orderNumber:false;
    const orderDueDate = typeof(req.body.orderDueDate)=='string' && req.body.orderDueDate.trim().length > 2 ? req.body.orderDueDate:false;
    const customerName = typeof(req.body.customerName)=='string' && req.body.customerName.trim().length > 2 ? req.body.customerName:false;
    const customerAddress = typeof(req.body.customerAddress)=='string' && req.body.customerAddress.trim().length > 2 ? req.body.orderNumber:false;
    const customerPhone = typeof(req.body.customerPhone)=='string' && req.body.customerPhone.trim().length == 10 ? req.body.customerPhone:false;
    const orderTotalAmt = typeof(req.body.orderNumber)=='string' && req.body.orderTotalAmt.trim().length > 2 ? req.body.orderTotalAmt:false;

    if(orderNumber && orderDueDate && customerName && customerAddress && customerPhone && orderTotalAmt){
        let orderObj = new orderModel({
            orderNumber: orderNumber,
            orderDueDate: orderDueDate,
            customerName: customerName,
            customerAddress: customerAddress,
            customerPhone: customerPhone,
            orderTotalAmt: orderTotalAmt,
        });

        orderObj.save(function(err, orderObj){
            if(err){
                res.send({status:500,message: 'unable to add orders'})
            }
            else{
                res.send({status:200,message:'order added successfully', orderDetails: orderObj});
            }
        });
    }
    else{
        res.send({status:403,message:'Bad Request, Required parameter missing'});
    }

  });

/* Update orders listing. */
router.put('/updateorder', function(req, res, next) {
    const orderId = typeof(req.query.orderId) == 'string' && req.query.orderId.trim().length > 0 ? req.query.orderId : false;

    const orderNumber = typeof(req.body.orderNumber)=='string' && req.body.orderNumber.trim().length > 2 ? req.body.orderNumber:false;
    const orderDueDate = typeof(req.body.orderDueDate)=='string' && req.body.orderDueDate.trim().length > 2 ? req.body.orderDueDate:false;
    const customerName = typeof(req.body.customerName)=='string' && req.body.customerName.trim().length > 2 ? req.body.customerName:false;
    const customerAddress = typeof(req.body.customerAddress)=='string' && req.body.customerAddress.trim().length > 2 ? req.body.orderNumber:false;
    const customerPhone = typeof(req.body.customerPhone)=='string' && req.body.customerPhone.trim().length == 10 ? req.body.customerPhone:false;
    const orderTotalAmt = typeof(req.body.orderNumber)=='string' && req.body.orderTotalAmt.trim().length > 2 ? req.body.orderTotalAmt:false;

    if(orderId){
        if(orderNumber && orderDueDate && customerName && customerAddress && customerPhone && orderTotalAmt){
            let orderObj = {
                orderNumber: orderNumber,
                orderDueDate: orderDueDate,
                customerName: customerName,
                customerAddress: customerAddress,
                customerPhone: customerPhone,
                orderTotalAmt: orderTotalAmt,
            };

            orderModel.findByIdAndUpdate(orderId,orderObj,(err,orderResponse)=>{
                if(err){
                    res.send({status:500,message: `Unable to update order Number: ${orderId}`,error:err});
                }
                else{
                    //const orderRecordCount = orderListResponse.length;
                    res.send({status:200,message:'Order Updated Successfully',data:orderResponse});
                }
            })
        }
        else{
            res.send({status:403,message:'Bad Request, Required parameter missing'});
        }
       
    }
    else{
        res.send({status:403,message:'Bad Request, Required parameter missing'});
    }

    
   
  });

/* Delete orders listing. */
router.delete('/deleteorder', function(req, res, next) {
    const orderId = typeof(req.query.orderId) == 'string' && req.query.orderId.trim().length > 0 ? req.query.orderId : false;
    if(orderId){
       orderModel.findByIdAndDelete(orderId,(err,response)=>{
        if(err){
            res.send({status:500,message: `Unable to Delete order Number: ${orderId}`});
        }
        else{
            res.send({status:200,message:'Order Deleted Successfully',data:response});
        }
       })
    }
    else{
        res.send({status:403,message:'Bad Request, Required parameter missing'});
    }
});

module.exports = router;
