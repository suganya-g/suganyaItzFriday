var express= require('express')
var router= express.Router();
let CodeDetails = require('./../../model/confirmcode/confirmCode.details.js');
var sendMail=require('./../../service/sendmail.js');
var UserProfile = require('./../../model/userprofile/userprofile.schema.js');
var async = require('async');
router.post('/user/storeConfirmCode/',function(req, res){
	var email =  req.body.email;
	
	let userexist=false;
	async.waterfall([
		function(callback){
			UserProfile.findOne({email:email},function(err,data){
				if(err){
					console.log(err);
					console.log("query failed")
					callback(err,userexist);
				}
				else{
					if(data){
						userexist=true;
						callback(null,userexist);
					}
					else{
						callback(null,userexist);
					}
				}

			})
		}
		,
		function(userexist,callback){
			CodeDetails.findOne( {email: email}, function(err, codeData){
				if(err){
					console.log(err);
				}
				else{
					if(codeData)
					{	
						//if(codeData.verified===true){
							
							var randomNum=Math.floor(Math.random() * 10);
							for(var i=1;i<=5;i++)
							{
								num=Math.floor(Math.random() * 10);
								randomNum=randomNum+""+num;
							}
							

							sendMail(email,randomNum);
							console.log("After send email");
							var code = randomNum;
							codeData.code=code;
							codeData.save(function(err,data) {
								if (err) {
									res.status(400).json({message:"please enter a valid email address or email address is inactive",
										userexist:userexist,
										error:true});
									callback(err);

								}
								else{
									res.status(200).json({message:"token is successfully created and sent to mail",
										userexist:userexist,
										error:false
									})
								}
							});

					} 
					else{
						var randomNum=Math.floor(Math.random() * 10);
						for(var i=1;i<=5;i++)
						{
							num=Math.floor(Math.random() * 10);
							randomNum=randomNum+""+num;
						}
						
						let code=randomNum;

						sendMail(email,randomNum);
						console.log("After send email");
						var insertCode = {
							email:email,
							code:code,
							verified:false
						}
						var codeData = new CodeDetails(insertCode);
						codeData.save(function(err,data){
							console.log("code saving to Data base");
							if(err){
								res.status(400).json({message:"please enter a valid email address or email address is inactive",
									userexist:userexist,
									error:true})
								callback(err);
							}
							else{
								res.status(200).json({message:"token is successfully created and sent to mail",
									userexist:userexist,
									error:false
								});
								callback(null);
							}
						}); 
					}
				}

			});
		}],function(error,result){
			console.log(result);
		});	
});

router.post('/user/confirmCode',function(req,res){
		let confirmationCode = req.body.confirmCode;
		
		
		let userstatus=false;
		CodeDetails.findOne({email:req.body.email},function(err,data){
			
			if(err){
				console.log("database error");
				throw err;
			}
			else{
				
				if(data.compareCode(confirmationCode)){
					if(data.verified===true){
						console.log("getting verified");
						userstatus=true;
					}
					else{
						data.verified=true;
					}
					console.log("getting verified");
					
					data.save(function(err,result){
						if(err){
							console.log(err);
						}
						else{
							console.log("Abc");
							res.status(200).json({message:"Thank you for confirmation",
								userexist:userstatus,
								error:false});
							console.log("code matches");
						}
					});			
				}
				else{
					res.status(404).json({message:"please enter a valid code",error:true});
				}
			}
		});
	});
	module.exports = router;
