import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Paper from 'material-ui/Paper';
import NotificationPriorityHigh from 'material-ui/svg-icons/notification/priority-high';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router';
import MediaQuery from 'react-responsive';
import Request from 'superagent';

const errorMessages = {
    numberError: "Please enter the correct six digits confirmation code"
}
const styles={
     paperStyle: {
        position:'absolute',
        top:'20%',
        right:'20%',
        left:'20%',
        bottom:'20%',
        width:'60%',
        height:'60%'
      },
    paperMobile: {
      position:'absolute',
      top:'10%',
      right:'10%',
      left:'10%',
      bottom:'10%',
      width:'80%',
      height:'80%'
    }
}

export default class ConfirmCode extends React.Component{
constructor(props){
  super(props);
  this.state={password: ''};
  this.enableButton= this.enableButton.bind(this);
  this.disableButton= this.disableButton.bind(this);
  this.submitForm = this.submitForm.bind(this);
  this.handleLinkEvent = this.handleLinkEvent.bind(this);
  this.state = {canSubmit:false,error:''};
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
    data.email=localStorage['email'];
    data.email=this.props.location.query.email;
    Request.post('/user/confirmCode')
           .send(data)
           .end((err,res)=>{
            if(res.body.error===true){
                  this.setState({
                    error:res.body.message
                  })
            }
            else{
                  this.props.router.replace("createProject/?email="+this.props.location.query.email+"&exist="+this.props.location.query.exist+"&role=Admin");
            }
       });
  }
  handleLinkEvent(){
    return this.state.canSubmit;
  }

render(){
    return(
      <div className="autofill">
      <Grid>
      <MediaQuery query='(min-device-width: 1024px)'>
      <Paper style={styles.paperStyle}>
      <Row center="xs">
      <Col xs={12} sm={12} md={12} lg={12}>
      <br/>
      <div style={{margin:'auto'}}>
      <NotificationPriorityHigh style={{color:'#004D40',width:'50px',height:'50px'}} />
      <h2 style={{color:'#004D40'}}>Verify it&#39;s you!</h2>
      <h5 style={{color:'#607D8B'}}>Just to make sure it&#39;s really you, we&#39;ve sent you an email with a passcode to enter.</h5>
    <strong><h4 style={{color:'#004D40'}}>Don&#39;t worry, it&#39;s super easy!</h4></strong>
        <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}>
          <FormsyText
              name="confirmCode"
              validations="isNumeric,maxLength:6,minLength:6"
              validationError={errorMessages.numberError}
              required
              floatingLabelText="Enter your confirmation code"
              updateImmediately/><br />
              <span style={{color:"red"}}>{this.state.error}</span><br/>
            <RaisedButton
                type="submit"
                label="Continue"
                primary={true}
                backgroundColor="#4CAF50"
                disabled={!this.state.canSubmit}/>
          <strong><h4 style={{color:'#004D40'}}>Thanks for helping us keep ItzFriday secure!</h4></strong>
        </Formsy.Form>
        </div>
        </Col>
        </Row>
        </Paper>
        </MediaQuery>

        <MediaQuery query='(max-device-width: 1023px)'>
        <Paper style={styles.paperMobile}>
        <Row center="xs">
        <Col xs={12} sm={12} md={12} lg={12}>
        <br/>
        <div style={{margin:'auto'}}>
        <NotificationPriorityHigh style={{color:'#004D40',width:'50px',height:'50px'}} />
        <h2 style={{color:'#004D40'}}>Verify it&#39;s you!</h2>
        <h5 style={{color:'#607D8B'}}>Just to make sure it&#39;s really you, we&#39;ve sent you an email with a passcode to enter.</h5>
      <strong><h4 style={{color:'#004D40'}}>Don&#39;t worry, it&#39;s super easy!</h4></strong>
          <Formsy.Form
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              onValidSubmit={this.submitForm}>
            <FormsyText
                name="confirmCode"
                validations="isNumeric,maxLength:6,minLength:6"
                validationError={errorMessages.numberError}
                required
                floatingLabelText="Enter your confirmation code"
                updateImmediately/><br />
                <span style={{color:"red"}}>{this.state.error}</span><br/>
              <RaisedButton
                  type="submit"
                  label="Continue"
                  primary={true}
                  backgroundColor="#4CAF50"
                  disabled={!this.state.canSubmit}/>
            <strong><h4 style={{color:'#004D40'}}>Thanks for helping us keep ItzFriday secure!</h4></strong>
          </Formsy.Form>
          </div>
          </Col>
          </Row>
          </Paper>
        </MediaQuery>
        </Grid>
        </div>

          );
  }
}
