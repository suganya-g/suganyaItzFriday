var express = require('express');
var invite = express.Router();
var nodemailer = require('nodemailer');

invite.post('/sendInvite', function(req, res) {

console.log(req);
console.log(req.body.project);
console.log(req.body.email);

var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'itzzfriday@gmail.com', // Your email id
            pass: 'itzfriday@123' // Your password
        }
    });

	var inviteOptions = {
    from: 'itzzfriday@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'Welcome!!!!! to Itzzfriday ', // Subject line
    text: "You have been invited to the project "+req.body.project,//, // plaintext body
    html: '<a href="http://172.23.238.175/#/acceptInvite/?owner='+req.body.owner+'&project='+req.body.project+'&email='+req.body.email+'"><b>Click to accept invite</b></a>' // You can choose to send an HTML body instead
	};


	transporter.sendMail(inviteOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }
        else
        {
            res.status(200).json({Message:'Message Delivered'});
	        console.log('Message sent');
	    };
	});


});

module.exports=invite;