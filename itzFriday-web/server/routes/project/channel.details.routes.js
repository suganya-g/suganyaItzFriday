var express = require('express');
var router = express.Router();
var async = require('async');
var ProjectDetails = require('./../../model/project/project.schema.js');
var UserAccounts = require('./../../model/useraccount/useraccount.schema.js');
var UserProfiles = require('./../../model/userprofile/userprofile.schema.js');
var ChannelDetails = require('./../../model/channel/channel.schema.js');
var projectMembership=require('./../../model/project/projectmembership.schema.js');
var channelMemberShip=require('./../../model/channel/channelmembership.schema.js');
var parallel = require('async/parallel');
var jwt = require('jsonwebtoken');
var appConst = require('../../config/config.js');
var parallel = require('async/parallel');
var each = require('async/');

router.post('/api/projects/',function(req,res){
	console.log(req.body);
	let projectIDs=[];
	async.waterfall([function(callback){
		projectMembership.find({memberID:req.body.userID},function(error,projectmembershiparray){
			if(error){
				console.log(error);
				callback(error,null)
			}
			else{
				if(projectmembershiparray){
					//console.log(projectmembershiparray);
					for(let index in projectmembershiparray){
						projectIDs[index]=projectmembershiparray[index].projectID;
					}
					callback(null,projectIDs);
				}
			}
		});
	},
	function(projectIDs,callback){
		ProjectDetails.find({_id:{$in:projectIDs}},function(error,projectsdata){
			if(error){
				callback(error,null)
			}
			else{
				//console.log(projectsdata);
				callback(null,projectsdata);
			}
		})
	}],function(error,finalprojectdata){
		//console.log(finalprojectdata);
		res.send(finalprojectdata);
	})
});

router.post('/api/channelDetails/',function(req,res){
	console.log("getting channels");
	console.log(req.body);
	let projectid = req.body.projectID;
	let userID = req.body.userID;
	let channelIDsByProjects = [];
	let channelIDsByMemberShip = [];
	// ChannelDetails.find({projectID:req.body.projectID}).forEach(function(mydoc){

	// 	console.log("channels"+mydoc.title)
	// });

	async.waterfall([function(callback){
		ChannelDetails.find({projectID:projectid},function(error,channels){
			if(error){
				console.log(error);
			}
			else{
				if(channels){
					console.log(channels);
					for ( let index in channels){
						channelIDsByProjects[index] = channels[index]._id; 
					}

					// res.json({channels:channels});
					console.log("in getting channels by  projects");
					console.log(channelIDsByProjects);
					callback(null,channelIDsByProjects);
				}
				else{
					callback(null)
				}
			}
		})
	},
	function(channelIDsByProjects,callback){
		channelMemberShip.find({channelID:{$in:channelIDsByProjects},memberID:userID},function(error,userchannelmembership){
			if(error){
				callback(error);
			}
			else{
				if(userchannelmembership){
					for(let index in userchannelmembership){
						console.log(userchannelmembership);
						channelIDsByMemberShip[index] = userchannelmembership[index].channelID;
					}
					callback(null,channelIDsByMemberShip)
				}
			}
		});
	},
	function(channelList,callback){
		console.log("getting into final callback");
		console.log(channelList);
		ChannelDetails.find({_id:{$in:channelList},projectID:projectid},function(error,finalChannelList){
			if(error){
				callback(error);
			}
			else{
				if(finalChannelList){
					callback(null,finalChannelList);
				}
				else{
					callback(null);
				}
			}
	});
	}],function(error,finalresults){
		console.log(finalresults);
		res.json({channels:finalresults});
	});
	// ChannelDetails.find({projectID:req.body.projectID},function(error,channels){
	// 	if(error){
	// 		console.log(error);
	// 	}
	// 	else{
	// 		if(channels){
	// 			console.log(channels);
	// 			res.json({channels:channels});
	// 		}
	// 		else{
	// 			res.json({channels:["general"]});
	// 		}
	// 	}
	// })
});

router.post('/api/members',function(req,res){
	console.log("in getting members routes");
	//console.log(req.body);
	let memberIDs=[];
	async.waterfall([function(callback){
		projectMembership.find({projectID:req.body.projectID},function(error,projectmembershiparray){
			if(error){
				console.log(error);
				callback(error,null)
			}
			else{
				console.log("in else part");
				//console.log(projectmembershiparray);
				if(projectmembershiparray){
					for(let index in projectmembershiparray){
						memberIDs[index]=projectmembershiparray[index].memberID;
					}
					callback(null,memberIDs);
				}
			}
		});
	},
	function(memberids,callback){
		//console.log(memberids);
		UserProfiles.find({_id:{$in:memberids}},function(error,membersdata){
			if(error){

			}
			else{
			//	console.log(membersdata);
				callback(null,membersdata);
			}
		})
	}],function(error,finalmemberdata){
		if(error){
			console.log(error)
		}
		else{
		//console.log(finalmemberdata);
		res.json({members:finalmemberdata});
		}

	})
});

router.post('/channel/createChannel',function(req,res){
	console.log("in add channel routes");
	console.log(req.body);
	let channelTitle= req.body.title;
	let members= req.body.chipData;
	let projectId=req.body.projectid;
	async.waterfall([
		function(callback){
			let channelItem = {
				title:channelTitle,
				projectID:projectId,
				messageType:"channel"
			}
			let channelData =  new ChannelDetails(channelItem);
			channelData.save(function(error,createdChannel){
				if(error){

				}
				else{
					if(createdChannel){
						callback(null,createdChannel._id);
					}
					else{

					}				}
			});
		},
		function(channelid,callback){
			console.log(channelid);
			let count =0;
			let channelMemberShipItem ={}
			for(let index in members){
				channelMemberShipItem.channelID=channelid;
				channelMemberShipItem.memberID=members[index].key;
				channelMemberShipData = new channelMemberShip(channelMemberShipItem);
				channelMemberShipItem={};
				channelMemberShipData.save(function(error,cmd){
					if(error){

					}
					else{
						if(cmd){
							count++;
						}
						else{
							console.log("error while creating membership");
						}
					}
				});
			}
			if(count === members.length){
				callback(null,'members are added');
			}
		}],
		function(error,results){
			console.log(results)
			res.json({error:false,message:"members are successfully added to created channel"});
	});
})
module.exports=router;