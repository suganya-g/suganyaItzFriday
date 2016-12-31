var request = require('superagent');
const createIssue = function (repo,authToken,title,body,labels,assignees,callback)
{
    var jsonObj = {
        "title" : "",
        "state": "open"
    };
    
    if(!repo)
    {
        callback({ofType:"string", withContent: "Error: Repository Not Present"}, null);
        return
    }
    else if(!title)
    {
        callback({ofType:"string", withContent: "Error: Issue Title Not Present"}, null);
        return
    }

    let owner = repo.split('/');
    if(owner[0] !== undefined)
    {
        owner = owner[0].trim();
    }

    jsonObj.title = title;

    if(body !== '')
        jsonObj.body = body;
    if(labels !== '')
        jsonObj.labels = labels;
    if(assignees !== '')
        jsonObj.assignees = assignees;

    console.log("Sending the following JSON");
    console.log(jsonObj);

	request.post('https://api.github.com/repos/'+repo+'/issues?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            callback({ofType:"string", withContent: error.toString()}, null);
            return
        }
         callback(null, {ofType:"string", withContent: "Issue has been opened with number "+response.body.number+'.'});
        return 
    });
}
module.exports = createIssue;