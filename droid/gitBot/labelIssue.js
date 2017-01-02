var request = require('superagent');
const labelIssue = function (repo,authToken,number,labels,callback)
{
    var jsonObj = {
        'labels' : labels
    };

    if(!repo)
    {
        callback({ofType:"string", withContent: "Error: Repository Not Present"}, null);
        return
    }
    else if(!number)
    {
        callback({ofType:"string", withContent: "Error: Issue Number Not Present"}, null);
        return
    }
    else if(!labels)
    {
        callback({ofType:"string", withContent: "Error: Labels Not Present"}, null);
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
            callback({ofType:"string", withContent: error.toString()}, null);
            return
        }
        callback(null, {ofType:"string", withContent: "Issue "+response.body.number+" has been tagged the following : "+labels});
        return
    });
}
module.exports = labelIssue;