var request = require('superagent');
const listIssues = function (repo,number,callback)
{
    if(!repo)
    {

        callback({ofType:"string", withContent: "Error: Repository Not Present"}, null);
        return
    }

    console.log(number);
    var uri = 'https://api.github.com/repos/'+repo+'/issues';
    if(number !== '')
        uri = uri + '/'+number;

    let intent = '';
    let issues = [];
    let labels = [];
    let assignees = [];

    let owner = repo.split('/');
    if(owner[0] !== undefined)
    {
        owner = owner[0].trim();
    }

	request.get(uri)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .end(function(error,response){
        if(error)
        {
            callback({ofType:"string", withContent: error.toString()}, null);
            return
        }
        else
        {
            if(number !== '')
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
        callback(null, {ofType:"json", withContent: issues});
        return
    });
}
module.exports = listIssues;