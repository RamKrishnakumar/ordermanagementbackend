var express = require('express');
var router = express.Router();

const userModel = require('../models/users.model');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const userId = typeof(req.body.email) == 'string' && req.body.email.trim().length > 5 ? req.body.email : false;
  const userpwd = typeof(req.body.password) == 'string' && req.body.password.trim().length > 0 ? req.body.password : false;
  if(userId && userpwd){
    userModel.find({'email':userId , 'password':userpwd},(err,userDataResponse)=>{
      if(err){
        throw err;
      }
      else if(userDataResponse.length == 0){
         res.send({status:500,message:'Authentication Failed, Either Email or pasword is Wrong, Please Check again'});
      }
      else if(userDataResponse.length > 0){
        res.send({status:200, message:'User Authenticated Successfully', response:userDataResponse});
      }
    })
  }
  else{
    res.send({'Error':400,'message':'Bad Request Missing Required Fields'});
  }
});

/* Create new User */
router.post('/signup', function(req, res, next) {
  //const userId = typeof(req.body.email) == 'string' && req.body.email.trim().length > 5 ? req.body.email : false;
  //const userpwd = typeof(req.body.password) == 'string' && req.body.password.trim().length > 0 ? req.body.password : false;
  let userObj = new userModel({
    email: 'ram.krishana36@gmail.com',
    password: 'Hello@12345'
});

userObj.save(function(err, orderObj){
    if(err){
        res.send({status:500,message: 'unable to add users'})
    }
    else{
        res.send({status:200,message:'User added successfully', orderDetails: orderObj});
    }
    
});
});

/* Update Users. */
router.put('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Delete users. */
router.delete('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
