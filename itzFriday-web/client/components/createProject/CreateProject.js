import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {grey400,cyan50,red500,grey500,grey100,blueGrey100,blueGrey50,pink800} from 'material-ui/styles/colors';
import {Grid, Row, Col} from 'react-flexbox-grid'
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Request from 'superagent';
import MediaQuery from 'react-responsive';

const styles ={
  paperStyle:{backgroundColor:blueGrey50,
    position:'absolute',
    left:'5%',
    right:'5%',
    top:'5%',
    bottom:'5%',
    width:'90%',
    height:'90%'
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
       Request.post('/user/storeConfirmCode')
          .send(data)
          .end((err, res) => {
              if(res.body.error===true){
                console.log(res.body.message)
              }
              else{
                this.props.router.push('confirmationCode/?email='+data.email+"&exist="+res.body.userexist);
             }
        });

 }

 redirectLogin()
 {
  this.props.router.push("login/");
 }

  render()
  {
    return(
    <div className="autofill">
     <Grid>
     <Paper style={styles.paperStyle}>
       <Row>
         <span style={{margin:'auto',paddingTop:'10px'}}>
         <MediaQuery query='(min-device-width: 1024px)'>
         <div className='logo'>
         <Avatar className="logo" style={{backgroundColor:"#004D40"}} src="./../../resources/images/buddy.png" alt="qwerty" size={150}/>
         </div>
         </MediaQuery>
         <MediaQuery query='(max-device-width: 1023px)' className="logo">
         <Avatar className="logo" style={{backgroundColor:"#004D40"}} src="./../../resources/images/buddy.png" alt="qwerty" size={100}/>
         </MediaQuery>
         </span>
       </Row>
       <Row center="xs">
       <Col lg={ 12 }
                md={ 12 }
                sm={ 12 }
                xs={ 12 }>
         <MediaQuery query='(min-device-width: 1024px)'>
         <div className="content">
         <h1 className="tagLine">ItzFriday!</h1>
         <h3 className="tagLine">Because together we can do so much. The idea needs to win!</h3>
         </div>
         </MediaQuery>
         <MediaQuery query='(max-device-width: 1023px)'>
         <div className="content">
         <h3 className="tagLine">ItzFriday!</h3>
         <h5 className="tagLine">Because together we can do so much. The idea needs to win!</h5>
         </div>
         </MediaQuery>
       </Col>
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
     </Grid>
     </div>
     );
 }
}
