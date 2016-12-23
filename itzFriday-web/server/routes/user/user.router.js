var express = require('express');
var userRouter = express.Router();
var jwt = require('jsonwebtoken');
var appConst = require('../../config/config.js');
var sendMail=require('./../../service/sendmail');


var userAccount = require('./user.account.js');

userRouter.post('/login', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let authenticateToken = '';
  userAccount.findOne({ username: email}, function(err, user) {
  	if (err) {
  		res.status(401).json({
            message:"user/password not found"
        });
  	}
  	if(user) {
  		if(user.checkPassword(password)){
        console.log(user.fullName);
  			authenticateToken=jwt.sign({user:email,name:user.fullName,sub:'friday',admin:true}, appConst.jwtSecret);
  			res.status(200).json({
             	message:authenticateToken
        		});
  			}
  		}else {
  		// create a user a new user
			var testUser = new userAccount({
          fullName: 'Apurv',
    			username: 'apurv@gmail.com',
    			password: 'abcdefgh',
    			role: 'User',
          gitAccess: ''
			});
			testUser.save(function(err, user) {
				if(err){
					res.status(401).json({
            		message:"user/password not found",
                error: true
        		  });
				}
				authenticateToken=jwt.sign({user:email,name:user.fullName,sub:'friday',admin:true}, appConst.jwtSecret);
  				res.status(200).json({
             	message:authenticateToken,
              error: false
        		});
			});
  		}
  	});
});



module.exports = userRouter;
