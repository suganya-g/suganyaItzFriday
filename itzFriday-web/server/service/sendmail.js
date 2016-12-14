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
    text: "Please enter the given confirmation code "+code //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
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