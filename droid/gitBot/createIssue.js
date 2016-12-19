var request = require('superagent');
const createIssue = function (owner,repo,authToken,title,body,labels,assignees,callback)
{
	var jsonObj = {
        "title" : "",
        "state": "open"
    };

    if(!owner)
    {
        callback({type:"string", content: "Error: Owner Not Present"}, null);
        return
    }
    else if(!repo)
    {
        callback({type:"string", content: "Error: Repository Not Present"}, null);
        return
    }
    else if(!title)
    {
        callback({type:"string", content: "Error: Issue Title Not Present"}, null);
        return
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

	request.post('https://api.github.com/repos/'+owner+'/'+repo+'/issues?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            callback({type:"string", content: error.toString()}, null);
            return
        }
         callback(null, {type:"string", content: "Issue has been opened with number "+response.body.number+'.'});
    });
    return 
}
module.exports = createIssue;