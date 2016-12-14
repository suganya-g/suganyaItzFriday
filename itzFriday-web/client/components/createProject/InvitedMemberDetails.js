import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router';
import TextField from 'material-ui/TextField';

const errorMessages = {
    wordsError: "Please only use letters",
    emailError: "Please enter valid emailID(someone@example.com)",
    passwordError: "Password should be of minimum 8 characters(including special and numeric characters)",
    confirmPasswordError: "Password and confirm password do not match",
 }
  const styles={
    	paperStyle: {
      	width: '100%',
      	margin: 'auto',
      	padding: '10px',	
      	height: window.innerHeight,
    	}
    }
export default class InvitedMemberDetails extends React.Component
{
	constructor(props)
	{
	super(props);
	this.state={password: ''};
	this.enableButton= this.enableButton.bind(this);
	this.disableButton= this.disableButton.bind(this);
	this.notifyFormError = this.notifyFormError.bind(this);
  this.submitForm=this.submitForm.bind(this);
	this.state = {canSubmit:false,errorMsg:''};
	}

	enableButton() 
	{
 	this.setState({canSubmit:true});
  	}

   disableButton() 
   {
    this.setState({canSubmit:false});
  	}
 notifyFormError(data) {
    console.error('Form error:', data);
  }
   submitForm(data) {
   this.props.route.checkInvited(false);
   this.props.router.replace('/login/');
 }
  	render()
	{
   		return(	
		  <Grid>
		  <Paper style={styles.paperStyle}>
		  <Row>
		  <div  style={{margin:'auto'}}>
		  <Col xs={12} sm={12} md={12} lg={12}>
		    <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}>
            <div>
			<div>
			<strong><h3 style={{color:'#607D8B'}}>Enter your details</h3></strong>
			</div>
    		<FormsyText
              		  name="First Name"
    			      hintText="First Name"
    			      validations="isWords"
                      validationError={errorMessages.wordsError}
              		  required
				      floatingLabelText="First Name"
				      updateImmediately/><br />
			<FormsyText
					  name="Last Name"
				      hintText="Last Name"
				      validations="isWords"
				      validationError={errorMessages.wordsError}
				      required
				      floatingLabelText="Last Name"
				      updateImmediately/><br />
			<TextField
    					hintText="Project Title"
    					disabled={true}
     					value={this.props.location.query.title}/><br />
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
				      hintText="Same as password"
				      validations="equalsField:Password"
				      type="password"
				      validationError={errorMessages.confirmPasswordError}
				      required
				      floatingLabelText="Confirm Password"	
				      updateImmediately/><br />
	
			 {
            
            <RaisedButton 
                type="submit"
                label="Continue"
                primary={true}
                labelColor="white"
                disabled={!this.state.canSubmit}/>
                
          }   
              </div>
         </Formsy.Form>
        </Col>
        </div>
        </Row>
        </Paper>
        </Grid>
      );
	}
}