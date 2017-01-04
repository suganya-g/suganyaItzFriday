var redis = require("redis");
var help = require("../help/help.js");
var createIssue = require("../gitBot/createIssue");
var assignIssue = require("../gitBot/assignIssue");
var labelIssue = require("../gitBot/labelIssue");
var closeIssue = require("../gitBot/closeIssue");
var listIssues = require("../gitBot/listIssues");
var currentRepository = require("../gitBot/currentRepository");
var listCollaborators = require("../gitBot/listCollaborators");
var inviteCollaborators = require("../gitBot/inviteCollaborators");
var addCollaborators = require("../gitBot/addCollaborators");
var removeCollaborators = require("../gitBot/removeCollaborators");
var commentOnIssue = require("../gitBot/commentOnIssue");

const controller = require('../server/routes/git/git.controller.js');
const redisUrl = process.env.REDIS_URL || 'redis://localhost';
var gitBotPublisher = redis.createClient(redisUrl);

var contextMD = require("../metaData/contextMD.js");
var intentMD = require("../metaData/intentMD.js");
var valueMD = require("../metaData/valueMD.js");
var variableStoresObjectMD = require("../metaData/variableStoresObjectMD.js");
//subscribe --> Project:Channel/DM:GitBot
//publish --> Project:Channel/DM


	//create project owner/repo
	//create project "repo" under "owner"

	//create issue "title" in/under project @owner/repo with desc/detail/description "description" assign/give to @aptDroid, @ruchika with labels "bug, help wanted, duplicate"
	//add issue "title" with desc/detail/description "description" in/under project @owner/repo  with labels "bug, help wanted, duplicate" assign/give to @aptDroid, @ruchika
	//open issue "title" with desc/detail/description "description" in/under project @owner/repo  with tags "bug, help wanted, duplicate" assign/give to @aptDroid, @ruchika

	//label issue #101 with labels "help wanted, bug, duplicate, wontfix"
	//label issue #101 with "help wanted, bug, duplicate, wontfix"
	//tag issue #101 with labels/tags "help wanted, bug, duplicate, wontfix"

	//assign issue #101 to @qwerty
	//give issue #101 to @qwerty

	//edit issue #number

	//close issue #number

	//list issues
	//list issue #number
	//show issue #number
	//display issue #number

	//comment on issue #number comment "my comment"
	//on issue #number comment "my comment"

const publishChannel = 'delivery';
var intents = [];
var keyString = '';
var valueString = '';
var issueNumber = '';
var deliveryChannel = '';
var jsonData = '';
var projectMap = {};						//store {publishChannel : repo}
// var lastCommandWithoutProjectNameMap = {};		//store {publishChannel : last command}
// var isProjectCorrectMap = {};				//store {publishChannel : true/false}
// var isWaitingForConfrimationMap = {};		//store {publishChannel : true/false}

var jsonObject = {
	"authToken": "",
	"repo" : "",
	"number" : "",
	"title" : "",
	"body" : "",
	"labels" : "",
	"assignees" : "",
	"state" : "open"
}

function asyncDataHandler(error,result)
{ 
	//change Author to Droid
	jsonData.author = "Droid";
		
	if(error)
	{
		console.log(error);
		console.log(error.toString());	
		jsonData.message = error;

		if(error.withContent.match(/error: not found/gi))
		{
			projectMap[deliveryChannel] = null;
		}
		console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
		console.log(jsonData);
		gitBotPublisher.publish(publishChannel, JSON.stringify(jsonData));
	}
	else
	{
		console.log(result);
		console.log("My Status: Execution completed successfully!");
		jsonData.message = result;
		console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
		console.log(jsonData);
		gitBotPublisher.publish(publishChannel, JSON.stringify(jsonData));
	}
}

function fetchJsonObject(message)
{
	let json = {
	"authToken": "",
	"repo" : "",
	"number" : "",
	"title" : "",
	"body" : "",
	"labels" : "",
	"collaborators" : "",
	"assignees" : "",
	"state" : "open",
	"text" : ""			//use it for commands other than git commands
	}

	let project = '';
	let owner = '';
	let repo = '';
	
		valueString = message.match(/(\s"[.\w-_&@!?,'\/[\]\s(){}]+")|((\s*@[\w-_/,]+)+)|(\s#[0-9]+)/gi);

		if(valueString !== '' && valueString !== null && valueString !== undefined)
		{
			for(let indexKeyString in keyString)	//access string segment one by one
			{
				let found = false;					// did you find value in the segment?
				for(let value in valueMD)	//access which value
				{
					if( !found )
					{
						for(let pattern in valueMD[value].keyPattern)
						{
							if( !found )
							{
								let count = 0;
								for(let keyword in valueMD[value].keyPattern[pattern].keywords)
								{
									//accessing {word : "", want : ""}
									let patt = new RegExp(valueMD[value].keyPattern[pattern].keywords[keyword].word);

									//console.log("checking ----> "+keyString[indexKeyString]+" ----Found: "+ patt.test(keyString[indexKeyString]));
									
									if( patt.test(keyString[indexKeyString]) === valueMD[value].keyPattern[pattern].keywords[keyword].want)
										count++;
									
								}
								if(count === valueMD[value].keyPattern[pattern].keywords.length)
								{
									found = true;

									//remove this
									console.log("matched keywords : ");
									console.log(valueMD[value].keyPattern[pattern].keywords);
									//fetch the value from valueString
									let temp = valueString[indexKeyString].match(valueMD[value].valuePattern);
									if(variableStoresObjectMD.indexOf(value)>=0)	//object stores array/object
									{
										json[value] = temp;
									}
									else
									{
										if(temp != null && temp != '')
										{
											temp = temp.toString();
											if(valueMD[value].replace !== undefined && valueMD[value].replace !== null && valueMD[value].replace !== '')
											{
												json[value] = temp.replace(valueMD[value].replace.replaceThis, valueMD[value].replace.replaceWith).trim();
											}
											console.log("found ----> "+value);
											console.log(json[value]);
										}	
									}
								}
							}
						}
					}
				}	
			}
		}
		else if(valueString === null)
		{
			if(message.match(/help/gi))
			{
				if(message.match(/-[\w]+/i))
					json.api = message.match(/-[\w]+/i).toString().replace('-','').trim();
				else
					json.api = '';
			}
			else if(message === "" || message.match(/hello/gi) || message.match(/hi/gi) || message.match(/hey/gi) || message.match(/whats up/gi) || message.match(/sup/gi) || message.match(/wassup/gi))
			{
				json.text=message;
			}
			else if(message.match(/how/) && message.match(/are/) && message.match(/you/))
			{
				json.text=message;
			}
			else if(keyString.length === 1 && valueString === null)	//atleast one intent (list all issues)
			{
				json.text=message;
			}
			else if(intents.toString().match(/randomInput/gi))
			{
				json.text = "random input";
			}
		}
	return json;
}

function getKeyString(message)
{
	let keyString = message.replace(/(\s"[.\w-_&@!?,'\/[\]\s(){}]+")|((\s*@[\w-_/,]+)+)|(\s#[0-9]+)/gi,'~').trim();
	
	if(keyString.search(/[~]+/g) > 0)
	{
		keyString = keyString.replace(/[~]+/g,'~');
	}
	return keyString;
}

function getUserIntent(message, keyString)
{
	let intent = [];
	let segments = keyString.split('~');

	console.log(keyString);
	console.log(" ");
	console.log("Dynamic check for intents");
	console.log(" ");

	console.log("segments :")
	console.log(segments);

	for(let indexSegment in segments)
	{
		for(let indexIntentMD in intentMD)
		{
			for(let indexPatternRequired in intentMD[indexIntentMD].pattern.required)	//check required pattern
			{
				if(intentMD[indexIntentMD].pattern.oneOfThese !== undefined)	//if optional oneOfThese exists then execute this
				{
				for(let indexPatternOneOfThese in intentMD[indexIntentMD].pattern.oneOfThese)
					{
						if(segments[indexSegment].match(new RegExp(intentMD[indexIntentMD].pattern.required[indexPatternRequired],'gi')) && segments[indexSegment].match(new RegExp(intentMD[indexIntentMD].pattern.oneOfThese[indexPatternOneOfThese],'gi')))
						{
							console.log('defined');
							console.log(segments[indexSegment]);
							intent.push({
								"intent":indexIntentMD,
								"priority":contextMD[intentMD[indexIntentMD].context]
							});
						}
					}
				}
				else 	//if optional oneOfThese do not exist then execute this
				{
					if(segments[indexSegment].match(new RegExp(intentMD[indexIntentMD].pattern.required[indexPatternRequired],'gi')))
					{
						console.log('undefined');
						intent.push({
							"intent":indexIntentMD,
							"priority":contextMD[intentMD[indexIntentMD].context]
						});
					}
				}
			}
		}
	}
	//check for conversation
	if(intent.length === 0)
	{
		if(message.match(/help/gi))
		{
			intent.push({"intent":"help", "priority":-1});
		}
		else if(message === "" || message.match(/hello/gi) || message.match(/hey/gi) || message.match(/hi/gi) || message.match(/whats up/gi) || message.match(/sup/gi) || message.match(/wassup/gi))
		{
			intent.push({"intent":"greetings", "priority":0});
		}
		else if((message.match(/show/gi) || message.match(/current/gi)) && (message.match(/project/gi) || message.match(/repo/gi)))
		{
			intent.push({"intent":"currentRepository", "priority":0});
		}
		else if((message.match(/how/) || message.match(/what/)) && message.match(/are/) && message.match(/you/))
		{
			intent.push({"intent":"howAreYou", "priority":1});
		}
		else
		{
			intent = [];	//reset intents if any random input is found
			intent.push({"intent":"randomInput", "priority":Number.NEGATIVE_INFINITY});	//default	
		}
	}
	return intent;
}

function getDeliveryChannel(source)	//channel name will only consist of alphabet and numbers,-,_
{
	let destination = '';
	let temp = '';
	if(source.match(/#Droid\//i))	//its a channel
	{

		temp = source.substr(source.lastIndexOf("#"));	//Frid@y@Droid/xyz
		temp = temp.split('/');
		destination = source.substr(0,source.lastIndexOf("#")) +"#"+ temp[1]+"/"+temp[0].replace('#','');
		return destination;
	}
	else 													//its a direct message
	{
		temp = source.substr(source.lastIndexOf("@"));	//Frid@y@Droid/xyz
		temp = temp.split('/');
		destination = source.substr(0,source.lastIndexOf("@")) +"@"+ temp[1]+"/"+temp[0].replace('@','');
		return destination;
	}
}

var receiveMessage = function(count, channel, message)
{
	intents = '';
	let strArr = '';
	keyString = [];
	valueString = [];
	deliveryChannel = '';
	let authToken = '';
	let name = '';
	console.log("message received ---------------->>on channel ===>>>>>"+channel+" ############processing ::::::");

	//fetch the json
	jsonData = JSON.parse(message);
	console.log("RECEIVED MESSAGE : ",jsonData);
	
	//name = jsonData.author;
	//fetch the message
	message = jsonData.message;

	console.log("message is $$$$$$$$$$$$$$$$$");
	console.log(message);
	console.log("type-----++++++++++++++++++++++++++++++-----------");
	console.log(typeof(message));

	if(message !== undefined && typeof(message)==="string")
	{
		if(message.match(/Hey Droid,/gi))
		{
			// console.log("message before replace : "+message);
			message = message.replace('Hey Droid, ','');
			// console.log("message after replace : "+message);
		}
		message = message.trim();
		//fetch the keyString
		keyString = getKeyString(message);
		//fetch Channel to publish on
		deliveryChannel = getDeliveryChannel(jsonData.destination);	//or use jsonData.destination
		console.log("delivering at : "+deliveryChannel);
		jsonData.destination = deliveryChannel;	//set the destination as publish channel

		if(deliveryChannel.match(/#/)) 
		{
			jsonData.message={ofType:"string", withContent:jsonData.message};
			console.log("publishing at : ");
			console.log(publishChannel);
			gitBotPublisher.publish(publishChannel,JSON.stringify(jsonData));
			console.log(jsonData);
		}
		
		controller.access(jsonData.user, (err, res) => 
		{
			if(err)
			{
				console.log(err);
			}
			else 
			{
				console.log(res);
				if(res.exist)
				{
					console.log(res.message);
					authToken = res.message;
					
					//FETCH USER INTENT
					intents = getUserIntent(message, keyString);	//will generate keyString
					keyString = keyString.split('~');
					keyString.pop();	//remove the trailing ~

					//FETCH JSON DATA
					jsonObject = fetchJsonObject(message);	//set processFurther to false on error

					// if(message.accessToken !== undefined && message.accessToken !== '')
					// {
					jsonObject.authToken = authToken;
					// }

					//SORT EXECUTION SEQUENCE IN THE ORDER OF CONTEXT
					intents.sort(function(a,b){
						return a.priority - b.priority;
					});

					console.log("intent :");
					console.log(intents);

					console.log("\nkeys :");
					console.log(keyString);

					console.log("\nvalues :");
					console.log(valueString);

					console.log("\njson :");
					console.log(jsonObject);

					console.log("repo : "+jsonObject.repo);
					console.log("project : "+deliveryChannel);
					console.log("projectMap : "+projectMap[deliveryChannel]);
					console.log(projectMap[deliveryChannel]);

					let intentString = '';

					for(let intent in intents)
					{
						intentString += intents[intent].intent + " ";
						if(intentString.match(/listIssues/gi))
						{
							jsonData.text = '';
						}
					}
					
					if(jsonObject.repo === '')
					{
						if(projectMap[deliveryChannel] !== null && projectMap[deliveryChannel] !== undefined && projectMap[deliveryChannel] !== '')
						{
							jsonObject.repo = projectMap[deliveryChannel];
							console.log("updated json : ");
							console.log(jsonObject);
							if(jsonObject.text === '' && !intentString.match(/currentRepository/gi))
							{
								jsonData.author = "Droid";
								jsonData.message = {ofType:"string", withContent:"Operating on project " + projectMap[deliveryChannel]};
								console.log(jsonData.message.withContent);
								gitBotPublisher.publish(publishChannel,JSON.stringify(jsonData));
							}
						}	
					}
					projectMap[deliveryChannel] = jsonObject.repo;
					jsonData.author = "Droid";
					for(let intent in intents)
					{
						console.log("inside for, intent : " + intents[intent].intent);
						// let fn = window[intents[intent].intent];
						// fn.apply(null, jsonObject, asyncDataHandler);
						switch(intents[intent].intent)
						{
							case "currentRepository":
								console.log("\ncommand to show current repository");
								currentRepository(jsonObject.repo, asyncDataHandler);
							
							break;
							
							case "addCollaborators":
								console.log("\ncommand to add contributors");
								addCollaborators(jsonObject.repo, jsonObject.authToken, jsonObject.collaborators, asyncDataHandler);
							
							break;
							
							case "assignIssue":
								console.log("\ncommand to assign issue ");//NOTE:	//not working cuz of asyn
								assignIssue(jsonObject.repo, jsonObject.authToken, jsonObject.number, jsonObject.assignees, asyncDataHandler);
								
							break;

							case "commentOnIssue":
								console.log("\ncommand to comment on issue ");
								commentOnIssue(jsonObject.repo, jsonObject.authToken, jsonObject.number, jsonObject.comment, asyncDataHandler);
							
							break;

							case "closeIssue":
								console.log("\ncommand to close issue ");
								closeIssue(jsonObject.repo, jsonObject.authToken, jsonObject.number, asyncDataHandler);
							
							break;

							case "createIssue":
								console.log("\ncommand to create issue ");
								createIssue(jsonObject.repo, jsonObject.authToken, jsonObject.title, jsonObject.body, jsonObject.labels, jsonObject.assignees, asyncDataHandler);
								
							break;

							// case "createProject":
							// 	console.log("Create Project : not yet implemented")	
							// break;

							case "inviteCollaborators":
								console.log("\ncommand to invite contributors");
								inviteCollaborators(jsonObject.repo, jsonObject.authToken, jsonObject.collaborators, asyncDataHandler);
							
							break;

							case "labelIssue":
								console.log("\ncommand to label issue");
								labelIssue(jsonObject.repo, jsonObject.authToken, jsonObject.number, jsonObject.labels, asyncDataHandler);
							
							break;
							
							case "listIssues":
								console.log("\ncommand to list issues");
								listIssues(jsonObject.repo, jsonObject.number, asyncDataHandler);
							
							break;
							
							case "listCollaborators":
								console.log("\ncommand to list collaborators");
								listCollaborators(jsonObject.repo, jsonObject.authToken, asyncDataHandler);
							
							break;
							
							case "removeCollaborators":
								console.log("\ncommand to remove collaborators");
								removeCollaborators(jsonObject.repo, jsonObject.authToken, jsonObject.collaborators, asyncDataHandler);
							
							break;
							
							case "setRepository":
								console.log("\ncommand to set current repository");
								projectMap[deliveryChannel] = jsonObject.repo;
								jsonData.message = {ofType:"string", withContent: "Current repository is set to "+projectMap[deliveryChannel]};
								console.log("Current repository is set to "+projectMap[deliveryChannel]);
								//change Author to Droid
								jsonData.author = "Droid";
								console.log(jsonData);
								gitBotPublisher.publish(publishChannel,JSON.stringify(jsonData));
								//setRepository(jsonObject.repo, asyncDataHandler);
							break;

							case "greetings":

								console.log("Hello! How can I help you?");
								jsonData.message = {ofType:"string", withContent: "Hello! How can I help you?"};
								//change Author to Droid
								jsonData.author = "Droid";
								console.log(jsonData);
								gitBotPublisher.publish(publishChannel,JSON.stringify(jsonData));
							break;

							case "howAreYou":
								console.log("Waiting for your text");

								jsonData.message = {ofType:"string", withContent: "Waiting for your text"};
								//change Author to Droid
								jsonData.author = "Droid";
								console.log(jsonData);
								gitBotPublisher.publish(publishChannel,JSON.stringify(jsonData));
							break;
						
							case "help":
								console.log("help");
								help(jsonObject.api, asyncDataHandler);

							break;
						
							case "randomInput":
								if(deliveryChannel.match(/#/))
								{
									console.log("Sorry, but I am unable to understand you");
									//change Author to Droid
									jsonData.author = "Droid";
									console.log(jsonData);
									jsonData.message = {ofType:"string", withContent: "Sorry, I am unable to understand you"};
								}
								else
								{
									console.log("Sorry, but I am unable to understand you");
									//change Author to Droid
									jsonData.author = "Droid";
									console.log(jsonData);
									jsonData.message = {ofType:"string", withContent: "Sorry, I am unable to understand you"};
								}
								//change Author to Droid
								jsonData.author = "Droid";
								gitBotPublisher.publish(publishChannel,JSON.stringify(jsonData));
								break;

						}
					}
				}
				else
				{
					jsonData.message = {ofType:"string", withContent: "Your account is not linked with GitHub. Please link it with GitHub to avail the droid facilities."};
					//change Author to Droid
					jsonData.author = "Droid";
					console.log(jsonData);
					gitBotPublisher.publish(publishChannel, JSON.stringify(jsonData));

					jsonData.message = {ofType:"link", withContent: res.message};
					console.log(jsonData);
					gitBotPublisher.publish(publishChannel, JSON.stringify(jsonData));
				}
			}
		});
	}
};

module.exports = receiveMessage;