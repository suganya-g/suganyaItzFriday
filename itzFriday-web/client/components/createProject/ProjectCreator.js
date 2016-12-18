import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import {blue500} from 'material-ui/styles/colors';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router';
import Request from 'superagent';

 const errorMessages = {
    wordsError: "Please only use letters",
    emailError: "Please enter valid emailID(someone@example.com)",
    passwordError: "Password should be of minimum 8 characters(including special and numeric characters)",
    confirmPasswordError: "Password and confirm password do not match",
    projectTitleError: "Project title should be alphanumeric"

 }
  const styles={
    	paperStyle: {
        position:'absolute',
        top:'5%',
        right:'20%',
        left:'20%',
        bottom:'5%',
        width:'60%',
        height:'90%'
    	}
}
 var pass={};
var title;
var email;

export default class ProjectCreator extends React.Component{
	constructor(props){
	super(props);
	this.state={password: ''};
	this.enableButton= this.enableButton.bind(this);
	this.disableButton= this.disableButton.bind(this);
	this.submitForm = this.submitForm.bind(this);
	this.notifyFormError = this.notifyFormError.bind(this);
	this.state = {canSubmit:false,errorMsg:''};
	this.handleChange=this.handleChange.bind(this);
	}

	handleChange()
	{
		this.setState({errorMsg:''})
	}

	enableButton() {
    this.setState({
      canSubmit:true
    });
  }

   disableButton() {
    this.setState({
      canSubmit:false
    });
  }
  submitForm(data) {
console.log(data)
   	localStorage['projecttitle']=data.ProjectTitle;
 Request.post('/db/profile/profileDetails')
    .send(data)
    .end((err, res) => {
      console.log(res)
      this.props.router.replace("sendInvite/");
    });

  }


  notifyFormError(data) {
    console.error('Form error:', data);
  }

	render(){
   		return(
		  <Grid>
		  <Paper style={styles.paperStyle}>
		  <Row>
		  <Col xs={12} sm={12} md={12} lg={12}>
		    <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}>
            <div style={{textAlign:'center'}}>
            <br />

      <MapsPersonPin style={{color:'#004D40',width:'80px',height:'80px'}} />
			<strong><h2 style={{color:'#004D40'}}>Personal Info</h2></strong>

    		<FormsyText
              		  name="FirstName"
              		  onChange={this.handleChange}
    			      hintText="First Name"
    			      validations="isWords"
                      validationError={errorMessages.wordsError}
              		  required
				      floatingLabelText="First Name"
				      updateImmediately/><br />
              <FormsyText
                          name="LastName"
                          onChange={this.handleChange}
                      hintText="Last Name"
                      validations="isWords"
                            validationError={errorMessages.wordsError}
                    floatingLabelText="Last Name(Optional)"
                    updateImmediately/><br />

			<FormsyText
					  name="Email"
				      hintText="Email"
				      defaultValue={localStorage['email']}
				      disabled={true}
				      floatingLabelText="Email ID"/><br />
			<FormsyText
				      name="ProjectTitle"
				      onChange={this.handleChange}
				      hintText="Project Title"
				      validations="isAlphanumeric"
				      validationError={errorMessages.projectTitleError}
				      required
				      floatingLabelText="Project Title"
				      updateImmediately/><br />
			<FormsyText
				      name="Password"
				      hintText="Password"
				      validations="minLength:8"
				      type="password"
				      validationError={errorMessages.passwordError}
				      required
				      floatingLabelText="Password"
				      updateImmediately/><br />
			<FormsyText
				      name="ConfirmPassword"
				      onChange={this.handleChange}
				      hintText="Same as password"
				      validations="equalsField:Password"
				      type="password"
				      validationError={errorMessages.confirmPasswordError}
				      required
				      floatingLabelText="Confirm Password"
				      updateImmediately/><br />
           <br />
            <RaisedButton
                type="submit"
                label="Continue"
                primary={true}
                labelColor="white"
                disabled={!this.state.canSubmit}/>

              </div>
         </Formsy.Form>
        </Col>
        </Row>
        </Paper>
        </Grid>
      );
	}
}
