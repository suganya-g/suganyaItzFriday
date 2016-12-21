var request = require('superagent');
const listIssues = function (json,callback)
{
    if(!json.repo)
    {
        callback({error: true, type:"string", content: "Error: Repository Not Present"}, null);
        return
    }

    console.log(json.number);
    var uri = 'https://api.github.com/repos/'+json.repo+'/issues';
    if(json.number !== '')
        uri = uri + '/'+json.number;

    let intent = '';
    let issues = [];
    let labels = [];
    let assignees = [];

    let owner = json.repo.split('/');
    if(owner[0] !== undefined)
    {
        owner = owner[0].trim();
    }

	request.get(uri + '?oauth_token='+json.authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .end(function(error,response){
        if(error)
        {
            callback({type:"string", content: error.toString()}, null);
        }
        else
        {
            if(json.number !== '')
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