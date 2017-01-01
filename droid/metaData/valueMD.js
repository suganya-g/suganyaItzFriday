var valueMD = {
	repo : 						//repo
	{
		priority : 100,
		syntax : '"owner/repository"',
		keyPattern : [
			{
				keywords : 
				[
					{word : "in", want : true},
					{word : "project", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "under", want : true},
					{word : "project", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "in", want : true},
					{word : "repo", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "under", want : true},
					{word : "repo", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "set", want : true},		//when confirming project from user
					{word : "project", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "set", want : true},		//when confirming project from user
					{word : "repo", want : true}
				]
			},
		],
		valuePattern : /\s@[\w]{2}[\w-_/]+/,
		replace : 
		{
			replaceThis : '@',
			replaceWith : ''
		}
	},
	title : 					//title
	{
		priority : 200,
		syntax : '"title"',
		keyPattern : [
			{
				keywords : 
				[
					{word : "create", want : true},
					{word : "issue", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "open", want : true},
					{word : "issue", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "add", want : true},
					{word : "issue", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "title", want : true},
				]
			}
		],
		valuePattern : /\s"[.\w-_&@!?,'\/[\]\s(){}]+"/,
		replace : 
		{
			replaceThis : /"+/g,
			replaceWith : ''
		}
	},
	body : 						//body
	{
		priority : 300,
		syntax : '"description"',
		keyPattern : [
			{
				keywords : 
				[
					{word : "comment", want : true},
					{word : "on", want : false}
				]
			},
			{
				keywords : 
				[
					{word : "desc", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "description", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "detail", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "content", want : true}
				]
			}
		],
		valuePattern : /"[.\w-_&@!?,'\/[\]\s(){}]+"/,
		replace : 
		{
			replaceThis : /"+/g,
			replaceWith : ''
		}
	},
	collaborators : 				//assignees
	{
		priority : 100,
		syntax : '@github\'sUsename (separate multiple users by comma(,) or space',
		keyPattern : [
			{
				keywords : 
				[
					{word : "add", want : true},
					{word : "collaborator", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "add", want : true},
					{word : "contributor", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "add", want : true},
					{word : "member", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "invite", want : true},
					{word : "collaborator", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "invite", want : true},
					{word : "contributor", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "invite", want : true},
					{word : "member", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "remove", want : true},
					{word : "member", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "remove", want : true},
					{word : "collaborator", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "remove", want : true},
					{word : "contributor", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "delete", want : true},
					{word : "member", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "delete", want : true},
					{word : "collaborator", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "delete", want : true},
					{word : "contributor", want : true}
				]
			},
		],
		valuePattern : /[\w-_]+/g,
		replace : null
	},
	assignees : 				//assignees
	{
		priority : 300,
		syntax : '@github\'sUsename (separate multiple users by comma(,) or space',
		keyPattern : [
			{
				keywords : 
				[
					{word : "to", want : true},
					{word : "label", want : false}
				]
			},
			{
				keywords : 
				[
					{word : "to", want : true},
					{word : "assign", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "to", want : true},
					{word : "give", want : true}
				]
			},
		],
		valuePattern : /[\w-_]+/g,
		replace : null
	},
	labels : 				//labels
	{
		priority : 300,
		syntax : '"labels separated by comma(,)"',
		keyPattern : [
			{
				keywords : 
				[
					{word : "assign", want : true},
					{word : "label", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "give", want : true},
					{word : "label", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "assign", want : true},
					{word : "tag", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "give", want : true},
					{word : "tag", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "with", want : true},
					{word : "tag", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "add", want : true},
					{word : "label", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "add", want : true},
					{word : "tag", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "with", want : true},
					{word : "label", want : true}
				]
			},
		],
		valuePattern : /(help wanted)|([\w-_]+)/g,
		replace : null
	},
	number : 				//number
	{
		priority : 300,
		syntax : '#number example: #21',
		keyPattern : [
			{
				keywords : 
				[
					{word : "assign", want : true},
					{word : "issue", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "give", want : true},
					{word : "issue", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "label", want : true},
					{word : "issue", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "tag", want : true},
					{word : "issue", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "list", want : true},
					{word : "issue", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "display", want : true},
					{word : "issue", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "show", want : true},
					{word : "issue", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "close", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "on", want : true},
					{word : "issue", want : true}
				]
			},
			{
				keywords : 
				[
					{word : "comment", want : true},
					{word : "on", want : true}
				]
			}
		],
		valuePattern : /#[0-9]+/,
		replace : 
		{
			replaceThis : '#',
			replaceWith : ''
		}
	},
};
module.exports = valueMD;