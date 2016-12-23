var request = require('superagent');
const labelIssue = function (repo,authToken,number,labels,callback)
{
    var jsonObj = {
        'labels' : labels
    };

    if(!repo)
    {
        callback({type:"string", content: "Error: Repository Not Present"}, null);
        return
    }
    else if(!number)
    {
        callback({type:"string", content: "Error: Issue Number Not Present"}, null);
        return
    }
    else if(!labels)
    {
        callback({type:"string", content: "Error: Labels Not Present"}, null);
        return
    }

    let owner = repo.split('/');
    if(owner[0] !== undefined)
    {
        owner = owner[0].trim();
    }

    request.patch('https://api.github.com/repos/'+repo+'/issues/'+number+'?oauth_token='+authToken)
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
        return
    });
}
module.exports = labelIssue;