import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {grey400,cyan50,red500,grey500,grey100,blueGrey100,blueGrey50} from 'material-ui/styles/colors';
import {Grid, Row, Col} from 'react-flexbox-grid'
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Request from 'superagent';

const styles ={
  paperStyle:{backgroundColor:blueGrey50,
    height:window.innerHeight,
    padding:10,
    width:"100%"
  },
};

export default class CreateProject extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={canSubmit: false};
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm=this.submitForm.bind(this);
    this.redirectLogin=this.redirectLogin.bind(this);
  }

  enableButton()
  {
   this.setState({canSubmit: true});
 }
   disableButton()
  {
    this.setState({canSubmit: false});
  }

  submitForm(data)
  {
    localStorage['email']=data.email;
      console.log(data);
    Request.post('/db/profile/register')
    .send(data)
    .end((err, res) => {
      console.log(res)
      this.props.router.push("confirmationCode/");
    });

 }

 redirectLogin()
 {
  this.props.router.push("login/");
 }

  render()
  {
     return(
      <Grid>
      <Paper style={styles.paperStyle}>

        <Row>
          <span style={{marginTop:100,margin:'auto'}}>
          <Avatar style={{backgroundColor:"#004D40"}} src="./../../resources/images/buddy.png" alt="qwerty" size={150}/>
          </span>
        </Row>
        <Row center="xs">
          <h1>A messaging app for teams who see through the Earth</h1>
          <p>The IceCube Collaboration is one of tens of thousands of teams around the world using Slack to make their working lives simpler, more pleasant, and more productive.</p>
        </Row>
        <Row center="xs">
        <Col lg={ 12 }
                 md={ 12 }
                 sm={ 12 }
                 xs={ 12 }>
          <Formsy.Form
            onValid={ this.enableButton }
            onInvalid={ this.disableButton }
            onValidSubmit={ this.submitForm }
            onInvalidSubmit={ this.notifyFormError }>
          <FormsyText
             name="email"
             validations="isEmail"
             validationError="Please enter a valid email"
             required
             hintText="Enter your email"
             updateImmediately
             floatingLabelText="Email" />
            <div>
         <RaisedButton
              type="submit"
              style={{marginTop:20}}
            label="Create Project"
            disabled={!this.state.canSubmit}
            primary={true}/>
</div>
<h5 style={{color:'grey'}}>- OR -</h5>
<div>
<RaisedButton label="Sign In"
    labelPosition="before"
    primary={true}
    onClick={this.redirectLogin}
    icon={<ActionAccountCircle />}/>
    </div>
          </Formsy.Form>

        </Col>
        </Row>
      </Paper>
      </Grid>);
  }

}
