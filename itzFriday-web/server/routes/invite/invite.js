var express = require('express');
var inviteRouter = express.Router();
var nodemailer = require('nodemailer');
var userProfile= require('./../../model/userprofile/userprofile.schema.js');
var projectMemberShip=require('./../../model/project/projectmembership.schema.js');
var channelMemberShip=require('./../../model/channel/channelmembership.schema.js');
var channelDetails=require('./../../model/channel/channel.schema.js');
var projectDetails=require('./../../model/project/project.schema.js');
var userAccount=require('./../../model/useraccount/useraccount.schema.js');

inviteRouter.post('/sendInvite', function(req, res) {




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
    html: '<a href="http://itzfriday.blr.stackroute.in/#/inviteAccept/?owner='+req.body.owner+'&project='+req.body.project+'&email='+req.body.email+'"><b>Click to accept invite</b></a>' // You can choose to send an HTML body instead
	};


	transporter.sendMail(inviteOptions, function(error, info){
	    if(error)
        {
	        console.log(error);
	    }
        else
        {
            res.status(200).json({Message:'Message Delivered'});
	        console.log('Message sent');
	    };
	});

});

inviteRouter.post('/checkInvitation',function(req,res){

console.log("outside if");
    
        userProfile.findOne({email:req.body.email},function(err,profileData){
        if (err)
        {
          console.log("inside error")
            res.status(404).json({ message: err });
        }
        else if (profileData == null)
          {
            
            res.status(204).json({ idExist: false });
          }
          else
          {
         
            projectDetails.findOne({title:req.body.project},function(err,projectData){
                

                let projectMember=new projectMemberShip();
                projectMember.memberID=profileData._id;
                projectMember.projectID=projectData._id;
                projectMember.role="user";
                projectMember.save(function(err,data){
                    if(err)
                        res.status(404).json({message:"eror in one db"});
                    else
                    {
                        
                        channelDetails.findOne({title:'general',projectID:projectData._id},function(err,channelData){
                            if(err)
                                res.status(404).json({message:err});
                            else
                            {
                                let channelMember=new channelMemberShip();
                                channelMember.channelID=channelData._id;
                                channelMember.memberID=profileData._id;
                                channelMember.save(function(err,data){
                                    if(err)
                                        res.status(404).json({message:err});
                                    else
                                        res.status(206).json({message:"Data inserted in both"});
                                });
                            }
                        });
                    }
                });
            });

            }

        });
});


inviteRouter.post('/userdetails',function(req,res){

let useraccount=new userAccount();

let hashCode=useraccount.generateHash(req.body.data.Password);

  useraccount.username=req.body.data.Email;
  useraccount.password=hashCode;
  useraccount.role="user";

useraccount.save(function(err,accountData){
    
        if(err)
            res.status(404).json({message:"Account DB error"});
        else
        {
            console.log("inside useraccount callback");
           let profile=new userProfile();

               profile.firstname=req.body.data.FirstName;
              profile.lastname=req.body.data.LastName;
               profile.email=req.body.data.Email;

            profile.save(function(err,profileData){
                
                if(err)
                    res.status(404).json({message:"Profile Db error"});
                else
                {
                    console.log("inside profile callback");
                    
                    projectDetails.findOne({title:req.body.project},function(err,projectData){
                        if(err)
                            res.status(404).json({message:"project error"});
                        else
                        {
                            
                            let projectMember=new projectMemberShip();

                            projectMember.memberID=profileData._id;
                             projectMember.projectID=projectData._id;
                             projectMember.role="user";
                                projectMember.save(function(err,data){
                                    if(err)
                                        res.status(404).json({message:"Data not saved in membership"});
                                    else
                                    {
                                        console.log("inside projectmemver callback")
                                        
                                       channelDetails.findOne({title:"general",projectID:projectData._id},function(err,channeldata){
                                        if(err){
                                            console.log('err');
                                            res.status(404).json({message:"channel error"});
                                        }
                                        else
                                            {
                                                console.log("inside cahnnel memeber ship callbackl");
                                                

                                                let channelmember=new channelMemberShip();
                                                    channelmember.channelID=channeldata._id;
                                                    channelmember.memberID=profileData._id;
                                                    channelmember.save(function(err,data){
                                                        if(err)
                                                            res.status(404).json({message:"Channelmember error"})
                                                        else
                                                             res.status(200).json({message:"All data inserted"});
                                                    });

                                            }
                                       });
                                    }
                                });
                        }
                    });
                }
            });
        }
    });

});

module.exports=inviteRouter;
