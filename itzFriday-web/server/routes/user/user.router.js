var express = require('express');
var userRouter = express.Router();
var jwt = require('jsonwebtoken');
var appConst = require('../../config/config.js');
var sendMail=require('./../../service/sendmail');
var userProfile = require('./../../model/userprofile/userprofile.schema.js');
var userAccount = require('./../../model/useraccount/useraccount.schema.js');

userRouter.post('/login', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let authenticateToken = '';
  userAccount.findOne({ username: email}, function(err, user) {
  	if (err) {
      console.log(err);
  		res.status(401).json({
        message:"user/password not found",
        error:true
      });
  	}
  	if(user){
      console.log(user);
  		if(user.validatePassword(password)){
        userProfile.findOne({email:email},function(error,userdetails){
          if(error){
            console.log(error);
            console.log("error found while getting profile in authentication");
          }
          else{
            if(userdetails){
              console.log(userdetails);
              authenticateToken=jwt.sign({user:email,name:userdetails.firstname,userid:userdetails._id,role:user.role}, appConst.jwtSecret);
              res.status(200).json({
                message:authenticateToken,
                error:false
              });
            }
          }
        })
      }
      else {
      res.status(401).json({message:"username/password is incorrect",error:true});
   }
    }
    else {
      res.status(401).json({message:"username/password is incorrect",error:true});
   }
 });
});



module.exports = userRouter;
