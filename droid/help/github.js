const github = function ()
{
    let commandList = 
    [
        {
            name: "set repository",
            required: '@owner/repository',
            optional: null,
            patterns: 
            [
            'set project @owner/repository ',
            'set repo @owner/repository ',
            ],
            comments: null,
        }
        ,
        {
            name: "current repository",
            required: null,
            optional: null,
            patterns: 
            [
            'show current project',
            ],
            comments: null,
        }
        ,
        {
            name: "create issue",
            required: '@owner/repository, "title"',
            optional: '@githubUsername, "labels", "description"',
            patterns: 
            [
            'create issue "title" in/under project @owner/repository [with desc/detail/description "description" assign/give to @githubUsername, @githubUsername with labels/tags "labels"]',
            'add issue "title" in/under project @owner/repository [with desc/detail/description "description" with labels/tags "labels" assign/give to @githubUsername, @githubUsername]',
            'open issue "title" in/under project @owner/repository [assign/give to @githubUsername, @githubUsername with desc/detail/description "description"  with labels/tags "labels"]'
            ],
            comments: 
            [
            'Project is optional once a command is issued with project name',
            'Content in [ ] is optional'
            ]
        }
        ,
        {
            name: "list issue",
            required: '@owner/repository,',
            optional: '#issueNumber',
            patterns: 
            [
            'list/show/display issues in/under project @owner/repository',
            'list/show/display issue #number in/under project @owner/repository',
            ],
            comments: 
            [
            'Project is optional once a command is issued with project name',
            ]
        }
        ,
        {
            name: "list collaborators",
            required: '@owner/repository,',
            optional: null,
            patterns: 
            [
            'list/show/display collaborators/contributors/members in/under project @owner/repository',
            ],
            comments: 
            [
            'Project is optional once a command is issued with project name',
            ]
        }
        ,
        {
            name: "add collaborators",
            required: '@owner/repository, @githubUsername',
            optional: null,
            patterns: 
            [
            'add collaborators/contributors/members @githubUsername1, @githubUsername2 in/under project @owner/repository',
            ],
            comments: 
            [
            'Project is optional once a command is issued with project name',
            'User will be added directly, invitation will not be sent',
            ]
        }
        ,
        {
            name: "invite collaborators",
            required: '@owner/repository, @githubUsername',
            optional: null,
            patterns: 
            [
            'invite collaborators/contributors/members @githubUsername1, @githubUsername2 in/under project @owner/repository',
            ],
            comments: 
            [
            'Project is optional once a command is issued with project name',
            'Invitation will be sent to the user',
            ]
        }
        ,
        {
            name: "remove collaborators",
            required: '@owner/repository, @githubUsername',
            optional: null,
            patterns: 
            [
            'remove/delete collaborators/contributors/members @githubUsername1, @githubUsername2 in/under project @owner/repository',
            ],
            comments: 
            [
            'Project is optional once a command is issued with project name',
            ]
        }
        ,
        {
            name: "assign issue",
            required: '@owner/repository, "title", #issueNumber, @githubUsername',
            optional: null,
            patterns: 
            [
            'assign issue #issueNumber in/under project @owner/repository assign/give to @githubUsername, @githubUsername',
            'give issue #issueNumber in/under project @owner/repository assign/give to @githubUsername, @githubUsername',
            ],
            comments: 
            [
            'Project is optional once a command is issued with project name',
            ]
        }
        ,
        {
            name: "label issue",
            required: '@owner/repository, "title", #issueNumber, "labels"',
            optional: null,
            patterns: 
            [
            'label issue #issueNumber in/under project @owner/repository add/assign/give/with label/tag "label1, label2"',
            'tag issue #issueNumber in/under project @owner/repository add/assign/give/with label/tag "label1, label2"',
            ],
            comments: 
            [
            'Project is optional once a command is issued with project name',
            ]
        }
        ,
        {
            name: "close issue",
            required: '@owner/repository, #issueNumber',
            optional: null,
            patterns: 
            [
            'close issue #issueNumber in/under project @owner/repository',
            ],
            comments: 
            [
            'Project is optional once a command is issued with project name',
            ]
        }
    ];
    return commandList;
}
module.exports = github;