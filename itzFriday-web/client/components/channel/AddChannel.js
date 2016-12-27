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
    this.state = {chipData:[],canSubmit:true,err:"",searchText:""};
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',

      }
    }
  }
  componentWillMount()
  {
 	 if(localStorage['project']==='Friday')
 		{
 			member=["Gobinda Thakur","Apurv Tiwari","Ruchika Saklani","Suganya Gopal","Ankit Aggarwal","Vikram Marshmallow"];
 		}
 		else if(localStorage['project']==='Samarth')
 		{
 			member=["Amol Tiwari","Ankit Kumar Vashisht","Shinder Pal Singh","Ritesh","Kumari Devi","Hari Prasad","Prerna Kukreti"];
 		}
 		else if(localStorage['project']==='Quiztack')
 		{
 			member=["Vishant Sharma","Kirti Jalan","Dhivya Lakshmi","Lal Jose","Srinivasan","Nitin Verma"];
 		}
 		else
 			{
 			member=["Sreenidhi","Toolika Srivastava","Nanda","Shipra Joshi","Bala","Divyanshu Sharma"];
 			}
 			console.log("members are "+member+" from "+localStorage['project']);
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
  	data.chipData=this.state.chipData;
    console.log(JSON.stringify(data));
    this.props.router.replace("/");
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
  	else if(member.indexOf(value) === -1){
  		this.setState({err:'This member does not belong to project please select from search box suggestion!'});
  	}
  	else{
  	this.setState({err:''});
  	myArray.push({key:counter,label:value})
  	this.setState ({chipData:myArray})
  	counter++;
  	member = member.filter(item => item !== value);
  	}
  }
  notifyFormError(data) {
  	this.state.err=data;
    console.error('Form error:', data);
  }
  handleRequestDelete = (key,label) => {
    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    member.push(label);
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
      <Grid>
      <Paper>


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
                            validationError={ error.messages }
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
        				      dataSource={member}
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
      </Grid>
      );
  }
}
