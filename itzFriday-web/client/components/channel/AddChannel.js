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

var member = [
  'Apple', 'Apricot', 'Avocado',
  'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
  'Boysenberry', 'Blood Orange',
  'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
  'Coconut', 'Cranberry', 'Clementine',
  'Damson', 'Date', 'Dragonmember', 'Durian',
  'Elderberry',
  'Feijoa', 'Fig',
  'Goji berry', 'Gooseberry', 'Grape', 'Grapemember', 'Guava',
  'Honeydew', 'Huckleberry',
  'Jabouticaba', 'Jackmember', 'Jambul', 'Jujube', 'Juniper berry',
  'Kiwi member', 'Kumquat',
  'Lemon', 'Lime', 'Loquat', 'Lychee',
  'Nectarine',
  'Mango', 'Marion berry', 'Melon', 'Miracle member', 'Mulberry', 'Mandarine',
  'Olive', 'Orange',
  'Papaya', 'Passionmember', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
  'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
  'Quince',
  'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
  'Salal berry', 'Satsuma', 'Star member', 'Strawberry', 'Squash', 'Salmonberry',
  'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
  'Ugli member',
  'Watermelon',
];
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
              <Col xs={ 10 }
                   sm={ 10 }
                   md={ 10 }
                   lg={ 10 }>
        				<AutoComplete
          					  id="memberName"
          					  name="member"
                      ref="member"
        				      floatingLabelText="Add Members"
        				      filter={AutoComplete.fuzzyFilter}
        				      dataSource={member}
        				      maxSearchResults={5}
        				      hintText="Search Member Here"
                      errorText = {this.state.err}
                      searchText={this.state.searchText}
                      onNewRequest = {this.onNewRequest}
                      onUpdateInput = {this.onUpdateInput}
        				    />
                    </Col>
                    <IconButton type="button" onClick={this.addData}>
                 <AddCircleOutline/>
           </IconButton>
          </Row>

          <br />
    			<Row center="xs">
                <Col xs={ 12 }
                     sm={ 12 }
                     md={ 12 }
                     lg={ 12 }>
                     <RaisedButton type="submit" label="Create" backgroundColor='#4CAF50' labelColor='white' style={{paddingRight:'10px'}}/>
                     <RaisedButton type="submit" label="Cancel" backgroundColor='#F44336' labelColor='white'/>
            </Col>
    			</Row>
          </Formsy.Form>
        </Paper>
      </Grid>
      );
  }
}
