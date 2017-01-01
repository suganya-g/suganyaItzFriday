var intentMD = {
	setRepository : 
	{
		api : 'github',
		context : 'owner',
		props : 
		{
			required : ['repo']
		},
		pattern :
		{
			oneOfThese : ['set'],
			required : ['repo', 'project']
		}
	}
	,
	createIssue : 
	{
		api : 'github',
		context : 'project',
		props : 
		{
			required : ['repo','authToken','title'],
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
		api : 'github',
		context : 'project',
		props : 
		{
			required : ['repo','authToken','number','assignees']
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
		api : 'github',
		context : 'project',
		props : 
		{
			required : ['repo','authToken','number','labels']
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
		api : 'github',		
		context : 'project',
		props : 
		{
			required : ['repo','authToken','number']
		},
		pattern : 
		{
			required : ['close']
		}
	}
	,
	listIssues : 
	{
		api : 'github',
		context : 'project',
		props : 
		{
			required : ['repo'],
			optional : ['number']
		},
		pattern :
		{
			oneOfThese : ['list', 'show', 'display'],
			required : ['issue']
		}
	}
	,
	listCollaborators : 
	{
		api : 'github',
		context : 'owner',
		props : 
		{
			required : ['repo', 'authToken'],
		},
		pattern :
		{
			oneOfThese : ['list', 'show', 'display'],
			required : ['collaborator', 'contributor', 'member']
		}
	}
	,

	addCollaborators : //add without sending invite
	{
		api : 'github',
		context : 'owner',
		props : 
		{
			required : ['repo', 'authToken', 'collaborators'],
		},
		pattern :
		{
			oneOfThese : ['add'],
			required : ['collaborator', 'contributor', 'member']
		}
	}
	,
	inviteCollaborators : //send invitation
	{
		api : 'github',
		context : 'owner',
		props : 
		{
			required : ['repo', 'authToken', 'collaborators'],
		},
		pattern :
		{
			oneOfThese : ['invite'],
			required : ['collaborator', 'contributor', 'member']
		}
	}
	,
	removeCollaborators : //send invitation
	{
		api : 'github',
		context : 'owner',
		props : 
		{
			required : ['repo', 'authToken', 'collaborators'],
		},
		pattern :
		{
			oneOfThese : ['remove', 'delete'],
			required : ['collaborator', 'contributor', 'member']
		}
	}
	,	
	commentOnIssue : 
	{
		api : 'github',
		context : 'issue',
		props : 
		{
			required : ['repo','authToken','number','body']
		},
		pattern :
		{
			oneOfThese : ['on'],
			required : ['comment']
		}
	},
	// createProject : 
	// {
	// 	context : 'owner',
	// 	props : 
	// 	{
	// 		required : ['repo','authToken'],
	// 	},
	// 	pattern :
	// 	{
	// 		oneOfThese : ['create', 'make'],
	// 		required : ['project']
	// 	}
	// }	
};
module.exports = intentMD;