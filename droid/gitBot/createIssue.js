var request = require('superagent');
const createIssue = function (json,callback)
{
    console.log(json);
    if(!json.repo)
    {
        callback({type:"string", content: "Error: Repository Not Present"}, null);
        return
    }
    else if(!json.title)
    {
        callback({type:"string", content: "Error: Issue Title Not Present"}, null);
        return
    }

    var jsonObj = {
        "title" : "",
        "state": "open"
    };

    let owner = json.repo.split('/');
    if(owner[0] !== undefined)
    {
        owner = owner[0].trim();
    }

    jsonObj.title = json.title;

    if(json.body !== '')
        jsonObj.body = json.body;
    if(json.labels !== '')
        jsonObj.labels = json.labels;
    if(json.assignees !== '')
        jsonObj.assignees = json.assignees;

    console.log("Sending the following JSON");
    console.log(jsonObj);

	request.post('https://api.github.com/repos/'+json.repo+'/issues?oauth_token='+json.authToken)
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