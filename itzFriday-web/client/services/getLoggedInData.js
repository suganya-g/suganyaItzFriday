import request from 'superagent';


export default {
  getChannelsDetails(projectID) {
  	return getChannels(projectID,(res)=>{
      let channels;
      if(res.values){
        console.log("in get channelDetails");
        console.log(projectID);
        var projectid = projectID;
        console.log("this is id");
        console.log(projectid);
       // channels.JSON.stringify(res.channels)
        localStorage[projectid]=JSON.stringify(res.channels)
      }
    })
  },

  getMembersDetails(projectID){
   getMembers(projectID,(res)=>{
    if(res.values){
      var projectid =projectID+"messages";
      localStorage[projectid]=JSON.stringify(res.members);
    }
  })
 },

 getProjects(userID,callback) {
  getProjects(userID,(res)=>{
    if(res.values){
      callback(res.projects);
      // return res.projects;
    }
  });
 //  request.post('/api/projects/')
 //  set('Content-Type','application/json')
 //  .send({userID:userID})
 //  .end((error,res)=>{
 //   console.log(res.body);
 // })
},
checkProjectInLocal(){

},
getProjectDetailsAfterLogin(){
    let projects = JSON.parse(localStorage.projectData);
    console.log(typeof projects);
    console.log(projects);
    return projects;
  },
getChannelsDetailsAfterLogin(projectID){
    let channels = JSON.parse(localStorage.projectID);
    return channels;
  },
getMembersDetailsAfterLogin(projectID){
  let members= JSON.parse(localStorage.projectID);
  return members;
}
}
function getProjects(userID,callback){
  request.post('/api/projects/')
  .set('Content-Type','application/json')
  .send({userID:userID})
  .end((error,res)=>{
      console.log(res.body);
      console.log("in service of projects");
      callback({
        values: true,
        projects: res.body
      });
  });
}
function getMembers(projectID,callback){
  request.post('/api/members/')
  .set('Content-Type','application/json')
  .send({projectID:projectID})
  .end((error,res)=>{
   callback({
    values: true,
    members: res.body.members
  })
 })
}
function getChannels (projectID,callback) {
//  let body = {email: email, password: pass}
request.post('/api/channelDetails/')
.set('Content-Type','application/json')
.send({projectID:projectID})
.end((error,res)=>{
  callback({
    values: true,
    channels: res.body.channels
  })
});
}
