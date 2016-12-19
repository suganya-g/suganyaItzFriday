var request = require('superagent');
const labelIssue = function (owner,repo,authToken,issueNumber,labels, callback)
{
    var jsonObj = {
        'labels' : labels
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
    else if(!issueNumber)
    {
        callback({type:"string", content: "Error: Issue Number Not Present"}, null);
        return
    }
    else if(!labels)
    {
        callback({type:"string", content: "Error: Labels Not Present"}, null);
        return
    }

    request.patch('https://api.github.com/repos/'+owner+'/'+repo+'/issues/'+issueNumber+'?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            callback({type:"string", content: error.toString()}, null);
            return
        }
        callback(null, {type:"string", content: "Issue "+response.body.number+" has been tagged the following : "+labels});
    });
    return
}
module.exports = labelIssue;