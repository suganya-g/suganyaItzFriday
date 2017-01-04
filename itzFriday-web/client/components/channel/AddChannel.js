import React from 'react';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';
import { Link } from 'react-router';
import { Grid, Col, Row } from 'react-flexbox-grid';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import SocialPeople from 'material-ui/svg-icons/social/people';
import request from 'superagent';

const error="";
var myArray=[];
var counter=0;

var member = [];
var counter=0;
var isError = false;
export default class AddChannel extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.addData = this.addData.bind(this);
    this.enableCreate = this.enableCreate.bind(this);
    this.disableCreate = this.disableCreate.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.state = {error:'',chipData:[],canSubmit:true,err:"",searchText:"",member:{memberid:[],membername:[]}};
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',

      }
    }
  }
  componentDidMount()
  {
    let projectID= this.props.params.projectid;;
    request.post('/api/members/')
              .set('Content-Type','application/json')
              .send({projectID:projectID})
              .end((error,res)=>{
                  this.setDataSource(res.body.members);
   });
  }

  componentWillReceiveProps(nextProps)
  {
  if(this.props.params.projectid!==nextProps.params.projectid){
      let projectID= nextProps.props.params.projectid;;
      request.post('/api/members/')
                .set('Content-Type','application/json')
                .send({projectID:projectID})
                .end((error,res)=>{
                    this.setDataSource(res.body.members);
     });
  }
}
  setDataSource(members){
    console.log(members);
    let obj ={};
    let memberid=[];
    let membername=[];
    for (let index in members){
      memberid[index]=members[index]._id;
      membername[index]=members[index].firstname + " " + members[index].lastname;
    }
    console.log(memberid);
    console.log(membername);
    obj.memberid = memberid;
    obj.membername=membername;
    this.setState({member:obj});
  }

   enableCreate() {
    this.setState({
      canSubmit: true
    });
  }

  disableCreate() {
    this.setState({
      canSubmit: false
    });
  }

  submitForm(data) {
    let projectID = this.props.params.projectid;
    let tokenarray = localStorage['token'].split(".");
    let userdetails = atob(tokenarray[1]);
    let userData=JSON.parse(userdetails);
    let obj = {};
    obj.key = userData.userid,
    obj.label = userData.name;
  	data.chipData=this.state.chipData;
    data.chipData.push(obj);
    data.projectid= this.props.params.projectid;
    this.state.chipData=[];
    request.post('/channel/createChannel')
                .set('Content-Type','application/json')
                .send(data)
                .end((error,res)=>{;
                  console.log(res.body)
                  if(res.body.error===false){
                    this.setState({chipData:[],member:{memberid:[],membername:[]}});
                    console.log('###################################################');
                    this.context.router.replace('/project/'+this.props.params.projectid);
                    this.setState({error:''});
                  }
                  else{
                    this.setState({error:res.body.error});
                  }
     });
    data.title='';  
  }
  componentWillUnmount(){
    console.log('componentWillUnmount in add channenl is called');
    this.setState({chipData:[],member:{memberid:[],membername:[]}}); 
  }
  onNewRequest(data){
      this.setState({err:''});
  }
  onUpdateInput(data){
    this.setState({err:''})
  }
  addData(){
  	const value = document.getElementById('memberName').value;
    myArray.forEach(function(val){
      if(val.label === value){
        isError = true;
      }
    });
    if(isError === true)
    {
      this.setState({err:'User already added!'});
      isError = false;
      return ;
    }
    if(value===""){
     this.setState({err:'Please select a member to add!'});
    }
  	else if(this.state.member.membername.indexOf(value) === -1){
  		this.setState({err:'This member does not belong to project please select from search box suggestion!'});
  	}
  	else{
  	this.setState({err:''});
    let memberid=this.state.member.memberid;
    let membername= this.state.member.membername;
    for(let index in membername){
      if(membername[index]===value){
        counter= memberid[index];
      }
    }
  	myArray.push({key:counter,label:value});
  	this.setState ({chipData:myArray});
  	this.state.member.membername = this.state.member.membername.filter(item => item !== value);
    this.state.member.memberid= this.state.member.memberid.filter(item=> item!==counter);
  	}
  }
  notifyFormError(data) {
  	this.state.err=data;
    console.error('Form error:', data);
  }
  handleRequestDelete = (key,label) => {
    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.state.member.membername.push(label);
    this.chipData.splice(chipToDelete, 1);
    this.setState({chipData: this.chipData});
  }
  renderChip(data) {
    return (
      <Chip
        key={data.key}
        label={data.label}
        onRequestDelete={() => this.handleRequestDelete(data.key,data.label)}
        style={this.styles.chip}>
        {data.label}
      </Chip>
    );
  }
  render() {
    return (
       <div className="autofill">
      <Paper style={{width:'100%'}}>
          <Formsy.Form
                       onValid={ this.enableCreate }
                       onInvalid={ this.disableCreate }
                       onValidSubmit={ this.submitForm }
                       onInvalidSubmit={ this.notifyFormError }>

            	<Row center='xs'>
            		<Col
                     xs={ 12 }
                     sm={ 12 }
                     md={ 12 }
                     lg={ 12 }>
                <SocialPeople style={{margin:'auto',color:'#004D40',width:'100px',height:'100px'}} />
            		<h2 style={{color:'#004D40'}}>Create Channel</h2>
                <h4 style={{color:'#004D40'}}>Create a shared group for you and some of your team members.</h4>
            		</Col>
           	   </Row>
               <Row center='xs'>
                <FormsyText
                            type="text"
                            name="title"
                            validations="isWords"
                            validationError={this.state.error}
                            required
                            hintText="Enter a name for Channel"
                            floatingLabelText="Title"
                            updateImmediately
                            />
              </Row>
              <Row center="xs">
              		<div id="chipContainer" style={this.styles.wrapper}>
                		{this.state.chipData.map(this.renderChip, this)}
                	</div>
              </Row>
              <Row center="xs">
              <Col xs={ 12 }
                   sm={ 12 }
                   md={ 12 }
                   lg={ 12 }>
        				<AutoComplete
          					  id="memberName"
          					  name="member"
                      ref="member"
        				      floatingLabelText="Add Members"
        				      filter={AutoComplete.fuzzyFilter}
        				      dataSource={this.state.member['membername']}
        				      maxSearchResults={5}
                      style={{paddingLeft:'50px'}}
        				      hintText="Search Member Here"
                      errorText = {this.state.err}
                      searchText={this.state.searchText}
                      onNewRequest = {this.onNewRequest}
                      onUpdateInput = {this.onUpdateInput}
        				    />
                    <IconButton type="button" onClick={this.addData}>
                 <AddCircleOutline/>
           </IconButton>
                    </Col>

          </Row>

          <br />
    			<Row end="xs">
                <Col xs={ 12 }
                     sm={ 12 }
                     md={ 12 }
                     lg={ 12 }>
                     <div style={{paddingBottom:'20px',paddingRight:'40px'}}>
                     <RaisedButton type="submit" label="Create" backgroundColor='#4CAF50' labelColor='white'/>
                     </div>
            </Col>
    			</Row>
          </Formsy.Form>
        </Paper>
        </div>
      );
  }
}
AddChannel.contextTypes = {
  router:React.PropTypes.object.isRequired
}
