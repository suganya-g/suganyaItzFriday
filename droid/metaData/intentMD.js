var intentMD = {
	createIssue : 
	{
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
	commentOnIssue : 
	{
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