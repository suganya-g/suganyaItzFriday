import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import { red500 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-flexbox-grid';
import HardwareKeyboardBackspace from 'material-ui/svg-icons/hardware/keyboard-backspace';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-box';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import ChangePassword from './ChangePassword';
import Dialog from 'material-ui/Dialog';
import Auth from '../../services/auth.service.js';
import MediaQuery from 'react-responsive';
import Request from 'superagent';

const errorMessages = {
  projectName: "Please enter only characters and number",
  emailError: "Please enter valid email",
  numericError: "Please provide a password"
};

const styles = {
  cardStyle: {
    position:'absolute',
    top:'20%',
    left:'20%',
    right:'20%',
    bottom:'20%',
    width:'60%',
    height:'60%'
  },
  errorStyle: {
    color: 'red'
  }
}
var flag = false;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.state = {
      canSubmit: false,
      open: false,
      err: ''
    };
  }
  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  handleClose() {
    this.props.router.replace('/');
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  submitForm(data) {
    console.log("in login js");
    Auth.login(data.email, data.password, (loggedIn) => {
        if (!loggedIn)
          this.setState({ err: 'Incorrect username/password' })

        const { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          var userName=Auth.getNameFromToken();
          localStorage['userName']=userName;
          this.props.router.push('project/')
        }
      })
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }
  render() {
    const imageSize = {
      mystyle: {
        height: 100,
        width: 100
      }
    };
    return (
      <div className="autofill">
      <Grid >
        <Col xs={ 12 }>
        <Card
              style={styles.cardStyle}
              zDepth={ 2 }>
          <Row center="xs">
            <Formsy.Form
                         onValid={ this.enableButton }
                         onInvalid={ this.disableButton }
                         onValidSubmit={ this.submitForm }
                         onInvalidSubmit={ this.notifyFormError }>
              <ActionAccountCircle style={ imageSize.mystyle } />
              <CardText>
              <div>
              <MediaQuery query='(min-device-width: 1024px)'>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>

                  <FormsyText
                              type="email"
                              name="email"
                              validations="isEmail"
                              validationError={ errorMessages.emailError }
                              required
                              hintText="Enter your Email"
                              floatingLabelText="Email"
                              updateImmediately />
                  </Col>
                </Row>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>
                  <FormsyText
                              type="password"
                              name="password"
                              required
                              hintText="Enter Password"
                              floatingLabelText="Password"
                              updateImmediately />
                  </Col>
                </Row>
                </MediaQuery>

                <MediaQuery query='(max-device-width: 1023px)'>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>
                <FormsyText
                            type="email"
                            name="email"
                            validations="isEmail"
                            validationError={ errorMessages.emailError }
                            required
                            hintText="Enter your Email"
                            style={{width:'150px'}}
                            floatingLabelText="Email"
                            updateImmediately />
                </Col>
              </Row>
              <Row>
                <Col
                     xs={ 12 }
                     sm={ 12 }
                     md={ 12 }
                     lg={ 12 }>
                <FormsyText
                            type="password"
                            name="password"
                            required
                            hintText="Enter Password"
                            style={{width:'150px'}}
                            floatingLabelText="Password"
                            updateImmediately />
                </Col>
              </Row>
                </MediaQuery>
                </div>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>
                  <span style={ styles.errorStyle }>{ this.state.err }</span>
                  </Col>
                </Row>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>
                  <Link to={ "ForgotPassword/" }>
                  <FlatButton
                              label="Forgot Password?"
                              secondary={ true }></FlatButton>
                  </Link>
                  </Col>
                </Row>
                <Row>
                  <Col
                       xs={ 12 }
                       sm={ 12 }
                       md={ 12 }
                       lg={ 12 }>
                  <RaisedButton
                                type="submit"
                                label="Login"
                                primary={ true }
                                disabled={ !this.state.canSubmit } />
                  </Col>
                </Row>

              </CardText>
            </Formsy.Form>
          </Row>
          <Row end='xs'>
          <Col
               xs={ 12 }
               sm={ 12 }
               md={ 12 }
               lg={ 12 }>
          <FlatButton label="Back To Home" primary={true} icon={<HardwareKeyboardBackspace />} onClick={this.handleClose} style={{paddingTop:'10px'}} />
             </Col>
          </Row>
        </Card>
        </Col>
      </Grid>
      </div>
      );
  }
}
