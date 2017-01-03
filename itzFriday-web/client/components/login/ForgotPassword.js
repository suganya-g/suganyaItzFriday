import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { red500 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-box';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import MediaQuery from 'react-responsive';

const errorMessages = {
  emailError: "Please enter valid email",
  numericError: "Please provide a password"
};

const styles = {
  forgotStyle: {
    marginTop: window.innerHeight/4.5,
    marginLeft: "auto",
    marginRight: "auto"
  }
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.state = {
      canSubmit: false
    };
  }
  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  submitForm(data) {
    console.log(JSON.stringify(data, null, 4));
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }
  render() {
  const styles = {
      paper: {
        padding: '30px',
        margin:10
      },
        cardStyle: {
        position:'absolute',
        top:'20%',
        bottom:'20%',
        right:'20%',
        left:'20%',
        width:'60%',
        height:'60%'
      },
      gridAlign: {
        margin:'auto',
        marginTop: window.innerHeight/3.4,
        width:window.innerWidth
      }
    };
    return (
        <div className="autofill">

        <Grid>
          <Col xs={12}>
              <Card
                     zDepth={ 2 }
                     style={ styles.cardStyle }>
                <Formsy.Form
                             onValid={ this.enableButton }
                             onInvalid={ this.disableButton }
                             onValidSubmit={ this.submitForm }
                             onInvalidSubmit={ this.notifyFormError }>
                  <CardText>
                  <Row center="xs">
                    <Col
                         lg={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         xs={ 12 }>
                         <h1 style={{color:'#004D40'}}>Reset Password</h1>
                         </Col>
                         </Row>
                  <Row center="xs">
                    <Col
                         lg={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         xs={ 12 }>
                         <MediaQuery query='(min-device-width: 1024px)'>
                    <FormsyText
                                type="email"
                                name="email"
                                validations="isEmail"
                                validationError={ errorMessages.emailError }
                                required
                                hintText="Enter your Email"
                                floatingLabelText="Email"
                                updateImmediately />
                                </MediaQuery>

                            <MediaQuery query='(max-device-width: 1023px)'>
                            <FormsyText
                                        type="email"
                                        name="email"
                                        validations="isEmail"
                                        validationError={ errorMessages.emailError }
                                        required
                                        hintText="Enter your Email"
                                        style={{width:'200px'}}
                                        floatingLabelText="Email"
                                        updateImmediately />
                                        </MediaQuery>
                    </Col>
                  </Row>
                  <Row center="xs">
                    <Col
                         lg={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         xs={ 12 }>
                    <RaisedButton
                                  type="submit"
                                  label="Reset Password"
                                  primary={ true }
                                  disabled={ !this.state.canSubmit } />
                    </Col>
                  </Row>
                  </CardText>
                </Formsy.Form>
              </Card>
              </Col>
             </Grid>
             </div>
      );
  }
}
