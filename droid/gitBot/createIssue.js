var request = require('superagent');
const createIssue = function (owner,repo,authToken,title,body,labels,assignees,callback)
{
	var jsonObj = {
        "title" : "",
        "state": "open"
    };

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
            callback(error,response);
            return
        }
         callback(null, response.body.number);
    });
    return 
}
module.exports = createIssue;