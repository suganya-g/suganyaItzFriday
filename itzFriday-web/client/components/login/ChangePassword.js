import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaiseButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Paper from 'material-ui/Paper';

const errorMessages = {
	passwordError:"please provide password"
}
export default class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.enableConfirmButton = this.enableConfirmButton.bind(this);
    this.disableConfirmButton= this.disableConfirmButton.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.submitPassword = this.submitPassword.bind(this);
    this.state={validData:false,open:true};
  }

  enableConfirmButton(){
  	this.setState({validData:true});
  }

  disableConfirmButton(){
   this.setState({validData:false});
  }

  submitPassword(data){
  	if(data.newPassword!==data.confirmPassword){
  		document.getElementById("mismatched").innerHTML = "confirm password should be same as new password";
  		return false;
  	}
  	alert(JSON.stringify(data, null, 4));
  }
  showErrorMessage(data){
  	alert(data);
  	console.error('Form Error:',data);
  }
  render() {
    const actions = [
      <FlatButton
                  label="cancel"
                  primary={ true }
                  onTouchTap={ this.handleClose }/>
    ];

    return(
        <Formsy.Form
        	onValid={this.enableConfirmButton}
        	onInvalid={this.disableConfirmButton}
        	onInvalidSubmit={this.showErrorMessage}
        	onValidSubmit={this.submitPassword}
        	>
          <Row center="xs">
            <Col
                 lg={ 12 }
                 md={ 12 }
                 sm={ 12 }
                 xs={ 12 }>
            <FormsyText
                        type="password"
                        name="currentPassword"
                        validationError={errorMessages.passwordError}
                        hintText="Enter Current Password"
                        floatingLabelText="current passsword"
                        updateImmediately
                        required>
                       	</FormsyText>
            </Col>
            <Col
                 lg={ 12 }
                 md={ 12 }
                 sm={ 12 }
                 xs={ 12 }>
            <FormsyText
                        type="password"
                        name="newPassword"
                        validationError={errorMessages.passwordError}
                        hintText="Enter New Password"
                        floatingLabelText="new password"
                        updateImmediately
                        required></FormsyText>
            </Col>
            <Col
                 lg={ 12 }
                 md={ 12 }
                 sm={ 12 }
                 xs={ 12 }>
            <FormsyText
                        type="password"
                        name="confirmPassword"
                        validationError={errorMessages.passwordError}
                        hintText="Confirm New Password"
                        floatingLabelText="confirm password"
                        updateImmediately
                        required></FormsyText><br/>
                        <span id="mismatched"></span>
            </Col>
            <Col lg={ 12 }
                 md={ 12 }
                 sm={ 12 }
                 xs={ 12 }>
                 <RaiseButton
                   type="submit"
                   label="confirm"
                   primary={ true }
                   onTouchTap={ this.submitNewPassword}/>
            </Col>
          </Row>
        </Formsy.Form>
	);
  }
}