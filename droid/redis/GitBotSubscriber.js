var redis = require("redis");
var createIssue = require("../gitBot/createIssue");
var assignIssue = require("../gitBot/assignIssue");
var labelIssue = require("../gitBot/labelIssue");
var closeIssue = require("../gitBot/closeIssue");
var listIssues = require("../gitBot/listIssues");
var commentOnIssue = require("../gitBot/commentOnIssue");

const redisUrl = process.env.REDIS_URL || 'redis://localhost';
var gitBotSubscriber = redis.createClient(redisUrl);
var gitBotPublisher = redis.createClient(redisUrl);
/*
droid:
    image: droid:0.1.0
    build: './droid'
    links:
      - redis
    environment:
      REDIS_URL: 'redis://localhost'
    networks:
      - back-tier
*/
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

//context metadata
var contextMD = {
	owner: 100,
	project: 200,
	issue: 300
};

//intent metadata
var intentMD = {
	createProject : 
	{
		context : 'owner',
		props : 
		{
			required : ['owner','repo'],
		},
		pattern :
		{
			oneOfThese : ['create', 'make'],
			required : ['project']
		}
	}
	,
	createIssue : 
	{
		context : 'project',
		props : 
		{
			required : ['owner','repo','title'],
			optional : ['body', 'labels', 'assignees']
		},
		pattern :
		{
			oneOfThese : ['create', 'open', 'add'],
			required : ['issue']
		}
	}
	,
	assignIssue : 
	{	
		context : 'project',
		props : 
		{
			required : ['owner','repo','number','assignees']
		},
		pattern : 
		{
			oneOfThese : ['assign', 'give'],
			required : ['issue']
		}
	}
	,
	labelIssue : 
	{	
		context : 'project',
		props : 
		{
			required : ['owner','repo','number','labels']
		},
		pattern : 
		{
			oneOfThese : ['label', 'tag'],
			required : ['issue']
		}
	}
	,
	closeIssue : 
	{					
		context : 'project',
		props : 
		{
			required : ['owner','repo','number']
		},
		pattern : 
		{
			required : ['close']
		}
	}
	,
	listIssues : 
	{
		context : 'project',
		props : 
		{
			required : ['owner','repo'],
			optional : ['number']
		},
		pattern :
		{
			oneOfThese : ['list', 'show', 'display'],
			required : ['issue']
		}
	}
	,
	commentOnIssue : 
	{
		context : 'issue',
		props : 
		{
			required : ['owner','repo','number']
		},
		pattern :
		{
			oneOfThese : ['on'],
			required : ['comment']
		}
	}	
}

var functionMD = {
	assignIssue : function (owner,repo,authToken,issueNumber,assignees)
	{
		if(owner === '' || owner.length<2)
			    {
			    	console.log("\nError: Project owner invalid/not specified!");
			    }
			    else if(repo === '')
			    {
			    	console.log("\nError: Repository name not specified!");
			    }
		    	else if(issueNumber === '')
				{
					console.log("\nError : Issue number not specified!");
				}
				else if(assignees === '')
				{
					console.log("\nError : Assignees not specified!");
				}
				else
				{
					assignIssue(owner,repo,authToken,issueNumber,assignees, (err, res) => {
						if(err)
						{
							console.log(err.toString());
						}
						else
						{
							console.log("Issue "+res.body.number +" has been assigned to : "+jsonObject.assignees);
						}
					});
				}
	},
	createIssue : function(owner,repo,authToken,title,body,labels,assignees)
	{
		createIssue(owner,repo,authToken,title,body,labels,assignees, (err, res) => {
					if(err)
					{
						console.log(err.toString());
					}
					else
					{
						console.log("Issue "+res.body.number +" has been assigned to : "+jsonObject.assignees);
					}
				});
	},
	createProject : function(owner,repo)
	{
		console.log("inside create project function");
	},
	labelIssue : function(owner,repo,authToken,issueNumber,labels)
	{
		labelIssue(owner,repo,authToken,issueNumber,labels, (err, res) => {
					if(err)
					{
						console.log(err.toString());
					}
					else
					{
						console.log("Issue "+jsonObject.number +" has been labelled as : "+jsonObject.labels);
					}
				});
	},
	closeIssue : function(owner,repo,authToken,issueNumber)
	{
		closeIssue(owner,repo,authToken,issueNumber, (err, res) => {
					if(err)
					{
						console.log(err.toString());
					}
					else
					{
						console.log("Issue "+jsonObject.number +" has been closed!");
					}
				});
	},
	listIssues : function(owner,repo,authToken,issueNumber)
	{
		listIssues(owner,repo,authToken,issueNumber, (err, res) => {
					if(err)
					{
						console.log(err.toString());
					}
					else
					{
						console.log(res);	//returns json of issues
					}
				});
	},
	commentOnIssue : function(owner,repo,authToken,issueNumber,comment)
	{
		commentOnIssue(owner,repo,authToken,issueNumber,comment, (err, res) => {
					if(err)
					{
						console.log(err.toString());
					}
					else
					{
						console.log("Comment has been posted successfully on issue " + jsonObject.number);
					}
				});
	}
}

var intents = [];
var keyString = '';
var valueString = '';
var issueNumber = '';

var jsonObject = {
	"owner": "",
	"repo" : "",
	"number" : "",
	"title" : "",
	"body" : "",
	"labels" : "",
	"assignees" : "",
	"state" : "open"
}

function fetchJsonObject(message)
{
	let json = {
	"owner": "",
	"repo" : "",
	"number" : "",
	"title" : "",
	"body" : "",
	"labels" : "",
	"assignees" : "",
	"state" : "open"
	}

	let project = '';
	let owner = '';
	let repo = '';
	let temp = '';

	if(keyString.length === 0)
	{
		if(message === "")
		{
			intents.push("call GitBot");
			return "Invalid string";
		}
		else
		{
			intents.push("random input");	//default
			return "Invalid string";	
		}
	}
	else if(keyString.length === 1 && valueString === null)	//atleast one intent (list all issues)
	{
		return "List all issues";
	}
	else
	{	
		//fetch the values
		valueString = message.match(/(\s"[.\w-_&@!?,'\/[\]\s(){}]+")|((\s*@[\w-_/,]+)+)|(\s#[0-9]+)/gi);

		// FETCH MANDATORY DETAILS //

		// fetch project details if creating project //
		project = valueString[0].match(/\s@[\w]{2}[\w-_/]+/);
		if( project !== null)
		{
			project = project.toString().split('/');
			owner = project[0].replace('@','').trim();
			repo = project[1].trim();
		}

		json.owner = owner;
		json.repo = repo;
		
		//FETCH OPTIONAL DETAILS //
		for(let index in keyString)
		{
			//check for project if it already exists
			//patterns [in, under, in project, under project]
			if((keyString[index].match(/in/gi) || keyString[index].match(/under/gi)) && keyString[index].match(/project/gi))
			{
				project = valueString[index].match(/\s@[\w]{2}[\w-_/]+/);
				if( project !== null)
				{
				project = project.toString().trim().split('/');
				owner = project[0].replace('@','').trim();
				repo = project[1].trim();
				json.owner = owner;
				json.repo = repo;

				}
			}
			//check for title
			//patterns [create issue, open issue, add issue]
			else if((keyString[index].match(/create/gi) || keyString[index].match(/open/gi) || keyString[index].match(/add/gi)) && keyString[index].match(/issue/gi))
			{
				json.title = valueString[index].match(/\s"[.\w-_&@!?,'\/[\]\s(){}]+"/).toString().replace(/"+/g,'').trim();
			}
			//check for description
			//patterns [description, desc, details, content, comment]
			if((keyString[index].match(/comment/gi) && !keyString[index].match(/on/gi)) || (keyString[index].match(/description/gi) || keyString[index].match(/desc/gi) || keyString[index].match(/detail/gi) || keyString[index].match(/content/gi) && !(keyString[index].match(/create/gi)&&keyString[index].match(/issue/gi))))
			{
				json.body = valueString[index].match(/"[.\w-_&@!?,'\/[\]\s(){}]+"/).toString().replace(/"+/g,'').trim();
			}
			//check for assignees
			//patterns [to, assign to, give to,]	//eg. [assign issue to, assign to, give issue to, give to]
			else if(!keyString[index].match(/label/gi) && keyString[index].match(/to/gi))// || keyString[index].match(/give/gi)) && keyString[index].match(/to/gi))
			{
				json.assignees = valueString[index].match(/[\w-_]+/g);
			}
			//check for labels
			//patterns [label, with, tag, assign label, add label, assign tag, add tag]
			else if(!keyString[index].match(/issue/gi) && (keyString[index].match(/label/gi) || keyString[index].match(/with/gi) || keyString[index].match(/tag/gi) || (keyString[index].match(/assign/gi) && keyString[index].match(/label/gi)) || (keyString[index].match(/add/gi) && keyString[index].match(/label/gi))))
			{
				json.labels = valueString[index].match(/(help wanted)|([\w-_]+)/g);
			}
			//check for issue number
			//patterns [assign issue #number, give issue #number, label issue #number, tag issue #number, list issue #number, edit issue #number, close issue #number, on issue #number, comment on #number]
			else if(((keyString[index].match(/assign/gi) || keyString[index].match(/give/gi) || keyString[index].match(/label/gi) || keyString[index].match(/tag/gi) || keyString[index].match(/close/gi) || keyString[index].match(/list/gi) || keyString[index].match(/show/gi) || keyString[index].match(/display	/gi) || keyString[index].match(/edit/gi)) && keyString[index].match(/issue/gi)) || keyString[index].match(/close/gi) ||(keyString[index].match(/comment/gi) && (keyString[index].match(/on/gi) || keyString[index].match(/issue/gi))))
			{
				temp = valueString[index].match(/#[0-9]+/)
				if(temp !== null)
				{
					temp = temp.toString().replace('#','').trim();
					json.number = Number(temp);
				}
			}
		}
		return json;
	}
}

function getUserIntent(message)
{
	let intent = [];

	keyString = message.replace(/(\s"[.\w-_&@!?,'\/[\]\s(){}]+")|((\s*@[\w-_/,]+)+)|(\s#[0-9]+)/gi,'~').trim();
	
	if(keyString.search(/[~]+/g) > 0)
	{
		keyString = keyString.replace(/[~]+/g,'~');
	}
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
	return intent;
}

gitBotSubscriber.on("message",function( channel, message)
{
	intents = '';
	let strArr = '';
	keyString = '';
	valueString = '';

	//FETCH USER INTENT
	intents = getUserIntent(message);	//will generate keyString
	keyString = keyString.split('~');
	keyString.pop();	//remove the trailing ~

	//FETCH JSON DATA
	jsonObject = fetchJsonObject(message);	//set processFurther to false on error
	jsonObject.authToken = 'a47f907e06d867cf49600d318e02878cdaaac871';

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

	if(!jsonObject.toString().match(/(invalid)|(list all)/gi))
	{
		console.log("\njson :");
		console.log(jsonObject);
	}

	for(let intent in intents)
	{
		switch(intents[intent].intent)
		{
			case "assignIssue":
				console.log("\ncommand to assign issue ");//NOTE:	//not working cuz of asyn
				if(jsonObject.owner === '' || jsonObject.owner.length<2)
			    {
			    	console.log("\nError: Project owner invalid/not specified!");
			    }
			    else if(jsonObject.repo === '')
			    {
			    	console.log("\nError: Repository name not specified!");
			    }
		    	else if(jsonObject.number === '')
				{
					console.log("\nError : Issue number not specified!");
				}
				else if(jsonObject.assignees === '')
				{
					console.log("\nError : Assignees not specified!");
				}
				else
				{
					assignIssue(jsonObject.owner,jsonObject.repo,jsonObject.authToken,jsonObject.number,jsonObject.assignees, (err, res) => {
					if(err)
					{
						console.log(err.toString());
					}
					else
					{
						console.log("Issue "+res.body.number +" has been assigned to : "+jsonObject.assignees);
					}
				});
			}
			break;

			case "commentOnIssue":
				console.log("\ncommand to comment on issue ");
				if(jsonObject.owner === '' || jsonObject.owner.length<2)
			    {
			    	console.log("Error: Project owner invalid/not specified!");
			    }
			    else if(jsonObject.repo === '')
			    {
			    	console.log("Error: Repository name not specified!");
			    }
		    	else if(jsonObject.number === '')
				{
					console.log("\nError : Issue number not specified!");
				}
				else if(jsonObject.body === '')
				{
					console.log("\nError : Comment not specified!");
				}
				else
				{
					commentOnIssue(jsonObject.owner,jsonObject.repo,jsonObject.authToken,jsonObject.number,jsonObject.body, (err, res) => {
					if(err)
					{
						console.log(err.toString());
					}
					else
					{
						console.log("Comment has been posted successfully on issue " + jsonObject.number);
					}
				});
			}
			break;

			case "closeIssue":
				console.log("\ncommand to close issue ");
				if(jsonObject.owner === '' || jsonObject.owner.length<2)
			    {
			    	console.log("Error: Project owner invalid/not specified!");
			    }
			    else if(jsonObject.repo === '')
			    {
			    	console.log("Error: Repository name not specified!");
			    }
		    	else if(jsonObject.number === '')
				{
					console.log("\nError : Issue number not specified!");
				}
				else
				{
					closeIssue(jsonObject.owner,jsonObject.repo,jsonObject.authToken,jsonObject.number, (err, res) => {
					if(err)
					{
						console.log(err.toString());
					}
					else
					{
						console.log("Issue "+jsonObject.number +" has been closed!");
					}
				});
			}
			break;

			case "createIssue":
			console.log("\ncommand to create issue ");
			if(jsonObject.owner === '' || jsonObject.owner.length<2)
		    {
		    	console.log("Error: Project owner invalid/not specified!");
		    }
		    else if(jsonObject.repo === '')
		    {
		    	console.log("Error: Repository name not specified!");
		    }
		    else if(jsonObject.title === '')
		    {
		    	console.log("Error: Title not present in the information!")
		    }
		    else
		    {
				createIssue( jsonObject.owner, jsonObject.repo, jsonObject.authToken, jsonObject.title, jsonObject.body, jsonObject.labels, jsonObject.assignees, (err, res) => {
					if(isNaN(res))
					{
						if(res.toString().match(/not found/gi))
						{
							console.log("Error : Project not found!");
						}
						else if(res.toString().match(/unprocessable entity/gi))
						{	
							console.log("Error : Input string is not in the correct format!");
						}
						else
						{
							console.log(err.toString());
						}
					}
					else
					{
						console.log("Issue has been created with id : "+res);
						gitBotPublisher.publish("delivery2","Issue has been created with id : "+res);
					}
				});
			}	
			break;

			case "createProject":
				if(jsonObject.owner === '' )
					console.log("Error : Owner name invalid/not present");
				else if(jsonObject.repo === '' )
					console.log("Error : Project information not present");
				else
				{
					console.log("\nCommand to Create Project");
				}	
			break;

			case "labelIssue":
				console.log("\ncommand to label issue ");
				if(jsonObject.owner === '' || jsonObject.owner.length<2)
			    {
			    	console.log("Error: Project owner invalid/not specified!");
			    }
			    else if(jsonObject.repo === '')
			    {
			    	console.log("Error: Repository name not specified!");
			    }
			   	else if(jsonObject.number === '')
				{
					console.log("\nError : Issue number not specified!");
				}
				else if(jsonObject.labels === '')
				{
					console.log("\nError : Labels not specified!");
				}
				else
				{
					labelIssue(jsonObject.owner,jsonObject.repo,jsonObject.authToken,jsonObject.number,jsonObject.labels, (err, res) => {
					if(err)
					{
						console.log(err.toString());
					}
					else
					{
						console.log("Issue "+jsonObject.number +" has been labelled as : "+jsonObject.labels);
					}
				});
			}
			break;
			
			case "listIssues":
				console.log("\ncommand to list issues ");
				if(jsonObject.owner === '' || jsonObject.owner.length<2)
			    {
			    	console.log("Error: Project owner invalid/not specified!");
			    }
			    else if(jsonObject.repo === '')
			    {
			    	console.log("Error: Repository name not specified!");r
			    }
				else
				{
					listIssues(jsonObject.owner,jsonObject.repo,jsonObject.authToken,jsonObject.number, (err, res) => {
					if(err)
					{
						console.log(err.toString());
					}
					else
					{
						console.log(res);	//returns json of issues
					}
				});
			}
			break;
			
			case "call GitBot":
				console.log("\nHello! How can I help you?");
			break;
		
			case "random":
				console.log("\nSorry, but I am unable to understand you.");
		}
	}
});

gitBotSubscriber.subscribe("GitBot");