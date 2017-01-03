var nodemailer = require('nodemailer');
function sendMail(mailId,code)
{
var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'itzzfriday@gmail.com', // Your email id
            pass: 'itzfriday@123' // Your password
        }
    });

  var mailOptions = {
    from: 'itzzfriday@gmail.com', // sender address
    to: mailId, // list of receivers
    subject: 'Confirmation Code', // Subject line
    // text: "Please enter the given confirmation code "+code //, // plaintext body
    html: '<div style="border:2px solid black;width:1000px;height:600px;text-align:center">'+'<img src="http://www.clipartkid.com/images/76/original-free-christian-clip-art-little-green-frog-1-so-happy-to-wdRepB-clipart.gif" style="text-align:center" width="300px" height="300px" />'+'<h4>Hello</h4>'+'<h4>Thank you for visiting</h4>'+'<h1 style="color:green">ItzFriday!</h1>'+'<h4>To help you get started with your team confirm your email address by entering the below code</h4><br />'+'<div style="padding-left:430px"><h1 style="border:1px solid black;width:150px;height:30px;text-align:center">'+code+'</h1></div></div>' // You can choose to send an HTML body instead
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent');
    };
});

}
module.exports=sendMail
