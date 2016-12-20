var request = require('superagent');
const listIssues = function (owner,repo,authToken,issueNumber,callback)
{
    if(!owner)
    {
        callback({error: true, type:"string", content: "Error: Owner Not Present"}, null);
        return
    }
    else if(!repo)
    {
        callback({error: true, type:"string", content: "Error: Repository Not Present"}, null);
        return
    }

    console.log(issueNumber);
    var uri = 'https://api.github.com/repos/'+owner+'/'+repo+'/issues';
    if(issueNumber !== '')
        uri = uri + '/'+issueNumber;

    let intent = '';
    let issues = [];
    let labels = [];
    let assignees = [];

	request.get(uri + '?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .end(function(error,response){
        if(error)
        {
            callback({type:"string", content: error.toString()}, null);
        }
        else
        {
            if(issueNumber !== '')
            {
                //fetch labels
                for(let label in response.body.labels)
                {
                    labels.push(response.body.labels[label].name);
                }
                //fetch assignees
                for(let assignee in response.body.assignees)
                {
                    assignees.push(response.body.assignees[assignee].login);
                }
                issues.push(
                    {
                        number: response.body.number,
                        title: response.body.title,
                        labels: labels,
                        assignees: assignees
                    });
            }
            else
            {
                for(let index in response.body)
                {
                    //fetch labels
                    labels = [];
                    for(let label in response.body[index].labels)
                    {
                        labels.push(response.body[index].labels[label].name);
                    }
                    //fetch assignees
                    assignees = [];
                    for(let assignee in response.body[index].assignees)
                    {
                        assignees.push(response.body[index].assignees[assignee].login);
                    }
                    issues.push(
                        {
                            number: response.body[index].number,
                            title: response.body[index].title,
                            labels: labels,
                            assignees: assignees
                        });
                }
            }

        }
        callback(null, {type:"json", content: issues});
    });
}
module.exports = listIssues;