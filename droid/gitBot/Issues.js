var express = require('express');
var request = require('superagent');
var bodyParser = require('body-parser');
var app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

var username = "aptDroid";
var repo = "HTML5";
var title = "issue of the day";
var body = "functional call to create issue";
var labels = ["bug"];
var authToken = "8e6261838f01ae79002286b086c96a87240e7797";
var assignees = ["aptDroid","suganya-g"];
var state = "open";
var issueNumber = 64;
var comment = "testing commenT";
var postData = JSON.stringify({'title': title,'body':body, 'labels': labels, 'assignees': assignees, 'state' : state});
var flag=0;
//create an issue
app.use("/CreateIssue",function(req,res,next){
    request.post('https://api.github.com/repos/'+username+'/'+repo+'/issues?oauth_token='+authToken)
    .set('User-Agent',username)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify({'title': title,'body':body, 'labels': labels, 'assignees': assignees, 'state' : state}))
    .end(function(error,response){
        if(error)
        {
            return res.send(error);
        }
        console.log(response.body);
        return res.send("New issue has been opened with number "+response.body.number+"<br/>");
        //return res.send(response.body);
    });
});
//edit an issue, use the same to tag and assign
app.use("/EditIssue",function(req,res,next){
    request.patch('https://api.github.com/repos/'+username+'/'+repo+'/issues/'+issueNumber+'?oauth_token='+authToken)
    .set('User-Agent',username)
    .set('Content-Type','application/json')
    .send(JSON.stringify({'title': 'edited issue','body':body, 'labels': labels, 'assignees': assignees, 'state' : state}))
    .end(function(error, response){
        if(error)
            res.send(error);
        res.send("Issue "+response.body.number+" has been updated successfully!");
        //res.send(response.body);
    });
});
//close the issue
app.use("/CloseIssue",function(req,res,next){
    issueNumber = req.body.issue;
    request.patch('https://api.github.com/repos/'+username+'/'+repo+'/issues/'+issueNumber+'?oauth_token='+authToken)
    .set('User-Agent',username)
    .set('Content-Type','application/json')
    .send(JSON.stringify({'state':'closed'}))
    .end(function(error, response){
        if(error)
            res.send(error);
        flag="Issue "+response.body.number+" has been closed!";
        res
        .redirect('/ListAllIssues');
    });
});
//list all issues of a repository
app.use("/ListAllIssues",function(req,res,next){
    var data = '';
    request.get('https://api.github.com/repos/'+username+'/'+repo+'/issues?')
    .set('User-Agent',username)
    .set('Content-Type','application/json')
    .end(function(error,response)
    {
        if(error)
            res.send(error);
        var issuesList = '';
        var str='';
        for(var index in response.body)
        {
            issuesList = issuesList + "<input type='checkbox' name='issue' value='"+response.body[index]['number']+"' onClick='handleCheck(this)'/>"+
            response.body[index]['number']+" : "+response.body[index]['title']+"<br/>";
        }
        if(flag !== 0)
        {
          str=flag;
          flag=0;
        }
        return res.send("<div><form action='/CloseIssue' method='POST'><div style='height: 300px; min-width:400px; overflow-y: scroll;'>"+
            issuesList +
            "</div><input type='submit' id='submitBtn' value='Close &times;' disabled='true' style='cursor:not-allowed;color:grey;border: none;padding: 5px 5px 5px 5px; font-size: 14px; background-color: transparent; text-decoration: underline'/>"+
            "</form></div>"+
            "<script>"+
            "const handleCheck = function (target)"+
            "{ var children = target.parentElement.children;"+
                "for(let index in children)"+
                "{"+
                    "if(children[index].value !== target.value)"+
                        "children[index].checked=false"+
                "}"+
                "if(!target.checked)"+
                "{"+
                    "document.getElementById('submitBtn').disabled = true;"+
                    "document.getElementById('submitBtn').style.color='grey';"+
                    "document.getElementById('submitBtn').style.cursor='not-allowed';"+
                    "}"+
                "else "+
                "{"+
                    "document.getElementById('submitBtn').disabled = false;"+
                    "document.getElementById('submitBtn').style.color='blue';"+
                    "document.getElementById('submitBtn').style.cursor='pointer';"+
                    "}"+
            "}"+
            "</script><br/>"+
            "<span>"+str+"</span>"
                      );
    });
});
//comment on an issue
app.use("/CommentOnAnIssue",function(req,res,next){
    request.post('https://api.github.com/repos/'+username+'/'+repo+'/issues/'+issueNumber+'/comments?oauth_token='+authToken)
    .set('User-Agent',username)
    .set('Content-Type','application/json')
    .send(JSON.stringify({'body':comment}))
    .end(function(error,response)
    {
        if(error)
            res.send(error);
        res.send('Comment posted successfully! <br/>Your comment id is '+response.body.id);
    });
});
//list comments on an issue
app.use("/ListCommentsOnAnIssue",function(req,res,next){
    request.get('https://api.github.com/repos/'+username+'/'+repo+'/issues/'+issueNumber+'/comments')
    .set('User-Agent',username)
    .set('Content-Type','application/json')
    .end(function(error,response){
        if(error)
            res.send(error);
        var commentList = '';
        for(var index in response.body)
        {
            commentList = commentList + (Number(index)+1)+"<label value='"+response.body[index]['id']+"'> : "+response.body[index]['body']+"</label> <sub>~"+response.body[index]['user']['login']+"</sub><br/>";
        }
        return res.send(commentList);
    });
});
app.listen(3001);