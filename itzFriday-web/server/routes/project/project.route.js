var express = require('express');
var projectRouter = express.Router();
var async = require('async');
var ProjectDetails = require('./../../model/project/project.schema.js');
var UserAccounts = require('./../../model/useraccount/useraccount.schema.js');
var UserProfiles = require('./../../model/userprofile/userprofile.schema.js');
var ChannelDetails = require('./../../model/channel/channel.schema.js');
var projectMemberShip=require('./../../model/project/projectmembership.schema.js');
var channelMemberShip=require('./../../model/channel/channelmembership.schema.js');
var parallel = require('async/parallel');
var jwt = require('jsonwebtoken');
var appConst = require('../../config/config.js');
var parallel = require('async/parallel');
var each = require('async/')
var userID = '';
var channelID = '';
var channelIDs = [];
var userIDs = [];
var projectIDs = [];
projectRouter.post('/checkProject/',function(req,res){
	
	console.log("in checkProject");
	ProjectDetails.findOne({title:req.body.projectTitle},function(error,projectResult){
		if(error){
			res.status(404).json({message:"Sorry some database error occured ! we will correct is shortly",
				error:true});
		}
		else{
			if(projectResult){
				res.status(200).json({message:'project already exist,please enter another name',error:true})
			}
			else{
				res.status(200).json({message:'',error:false})
			}
		}
	});

});

projectRouter.post('/createProject/',function(req,res){
	
	let userID='',firstName='';
	UserProfiles.findOne({email:req.body.Email},function(error,userprofiledata){
		if(error){

		}
		else{
			if(userprofiledata){
				userID = userprofiledata._id;
				firstName = userprofiledata.firstname;
				async.parallel(
					{
					projectID:function(callback){
					let projectItem = {
						title:req.body.ProjectTitle,
						owner:req.body.Email
					}
					let projectData = new ProjectDetails(projectItem);
					projectData.save(function(error,createdProjectDetails){
						if(error){
							callback(error,null);
						}
						else{
							if(createdProjectDetails){

								callback(null,createdProjectDetails._id);
							}
							else{
								callback(null,null);
							}
						}
					});
				},
				channelID:function(callback){
					let channelItem ={
						title:'general',
						owner:req.body.Email,
						messageType:'channel'

					}
					let channelData = new ChannelDetails(channelItem);
					channelData.save(function(error,createdChannelDetails){
						if(error){
							callback(error, null);
						}
						else{
							if(createdChannelDetails){
								
								callback(null,createdChannelDetails._id);
							}
							else{
								callback(null, null);
							}
						}
					});
				}
			},function(error,results){
					
					async.parallel({
						projectmembership:function(callback){
							let projectMemberShipItem={
								projectID:results.projectID,
								memberID:userID,
								role:'admin'
							}
							let projectMembershipData = new projectMemberShip(projectMemberShipItem);
							projectMembershipData.save(function(error,createdprojectmembership){
								if(error){
									callback(error, null);
								}
								else{
									if(createdprojectmembership){
										callback(null,'projectmembershipcreated');
									}
									else{
										callback(null, null);
									}
								}
							})
						},
						channelmemebership:function(callback){
							let channelMemberShipItem ={
								channelID:results.channelID,
								memberID:userID
							}
							let channelMemberShipData = new channelMemberShip(channelMemberShipItem);
							channelMemberShipData.save(function(error,createdchannelmembership){
								if(error){
									callback(error, null);
								}
								else{
									if(createdchannelmembership){
										callback(null,'channelmemebershipcreated');
									}
									else{
										callback(null, null);
									}
								}
							})
						},
						generalchannelupdate:function(callback){
							ChannelDetails.findOneAndUpdate({_id:results.channelID},{$set:{projectID:results.projectID}},{new:true},function(error,upatedChannel){
								if(error){
									callback(error, null);
								}
								else{
									if(upatedChannel){
										callback(null,'channel is created');
									}
									else{
										callback(null, null);
									}
								}
							})
						}
					},function(error,results){
						
						if(error){
							res.status(404).json({message:'failed to create data',error:true});
						}
						else{
							res.status(200).json({firstName:firstName,message:'everything is added to databse',error:false});

						}
					});
				}
			);
			}
			else{

			}
		}
	})
});

projectRouter.post('/addProjectDetails/',function(req,res){
	
	console.log("in addProjectDetails");
	async.parallel(
	{
		projectID:function(callback){		
			let projectItem = {
				title:req.body.ProjectTitle,
				owner:req.body.Email,
				status:'active'
			}
			let projectData = new ProjectDetails(projectItem);
			projectData.save(function(error,createdProjectDetails){
				if(error){
					callback(error);
				}
				else{
					if(createdProjectDetails){
						callback(null,createdProjectDetails._id);
					}
					else{
						callback(null);
					}
				}
			});
		},
		userID:function(callback){
			let userProfileItem = {
				firstname:req.body.FirstName,
				lastname:req.body.LastName,
				email:req.body.Email,
			}
			let userProfileData = new UserProfiles(userProfileItem);
			userProfileData.save(function(error,createdProfileDetails){
				if(error){
					callback(error);
				}
				else{
					if(createdProfileDetails){
						callback(null,createdProfileDetails._id);
					}
					else{
						callback(null);
					}
				}
			});
		},
		useraccount:function(callback){
			let userAccountData = new UserAccounts();

			let hashCode=userAccountData.generateHash(req.body.Password);

			    userAccountData.username=req.body.Email;
				userAccountData.password=hashCode;
				userAccountData.role='admin';
			
			userAccountData.save(function(error,createdAccountDetails){
				if(error){
					callback(error);
				}
				else{
					if(createdAccountDetails){
						callback(null,"account is created");
					}
					else{
						callback(null);
					}
				}
			})
		},
		channelID:function(callback){
			let channelItem ={
				title:'general',
				owner:req.body.Email,
				messageType:'channel'

			}
			let channelData = new ChannelDetails(channelItem);
			channelData.save(function(error,createdChannelDetails){
				if(error){
					callback(error);
				}
				else{
					if(createdChannelDetails){
						callback(null,createdChannelDetails._id);
					}
					else{
						callback(null);
					}
				}
			});
		}},function(error,results){
			console.log("results");
			
			async.parallel({
				projectmembership:function(callback){
					let projectMemberShipItem={
						projectID:results.projectID,
						memberID:results.userID,
						role:'admin'
					}
					let projectMembershipData = new projectMemberShip(projectMemberShipItem);
					projectMembershipData.save(function(error,createdprojectmembership){
						if(error){
							callback(error);
						}
						else{
							if(createdprojectmembership){
								callback(null,'projectmembershipcreated');
							}
							else{
								callback(null);
							}
						}
					})
				},
				channelmemebership:function(callback){
					let channelMemberShipItem ={
						channelID:results.channelID,
						memberID:results.userID
					}
					let channelMemberShipData = new channelMemberShip(channelMemberShipItem);
					channelMemberShipData.save(function(error,createdchannelmembership){
						if(error){
							callback(error);
						}
						else{
							if(createdchannelmembership){
								callback(null,'channelmemebershipcreated');
							}
							else{
								callback(null);
							}
						}
					})
				},
				generalchannelupdate:function(callback){
					ChannelDetails.findOneAndUpdate({_id:results.channelID},{$set:{projectID:results.projectID}},{new:true},function(error,upatedChannel){
						if(error){
							callback(error);
						}
						else{
							if(upatedChannel){
								callback(null,'channel is created');
							}
							else{
								callback(null);
							}
						}
					})
				}
			},function(error,results){
				
				if(error){
					res.status(404).json({message:'failed to create data',error:true});
				}
				else{
					res.status(200).json({message:'everything is added to databse',error:false});

				}
			});

		});

});
// projectRouter.post('/getProjectDetails/',function(req,res){
// 	console.log("getProjectDetails");
// 	console.log(req.body);
// 	async.waterfall([
// 		function(callback){
// 			UserProfiles.findOne({email:req.body.email},function(error,userprofiledata){
// 				if(error){
// 					callback(error,null);
// 				}
// 				else{
// 					if(userprofiledata){
// 						console.log(userprofiledata);
// 						callback(null,userprofiledata);
// 					}
// 					else{
// 						callback(null);
// 					}
// 				}
// 			});
// 		},
// 		function(userprofiledata,callback){
// 			var projectids=[];
// 			projectMemberShip.find({memberID:userprofiledata._id},function(error,allprojectdata){
// 				if(error){
// 					callback(error,null);
// 				}
// 				else{
// 					if(allprojectdata){
// 						console.log(allprojectdata);
// 						for(let index in allprojectdata){
// 							projectids[index] =allprojectdata[index].projectID;
// 						}
// 						callback(null,projectids);
// 					}
// 					else{
// 						callback(null,null);
// 					}
// 				}
// 			});
// 		},
// 		function(allprojectids,callback){
// 			console.log('in next callback');
// 			console.log(allprojectids);
// 			projectMemberShip.find({projectID:{$in:allprojectids}},function(error,data){
// 				console.log("gettingall members together");
// 				console.log(data);
// 			});

// 		},
// 		function(data,callback){

// 		}],function(error,results){

// 	});
// });
module.exports = projectRouter;