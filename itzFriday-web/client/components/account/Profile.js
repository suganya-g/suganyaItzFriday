import React from 'react';
import Formsy from 'formsy-react';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';
import ChangePassword from './../login/ChangePassword';

const styles = {

  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',

    width: '100%',
    opacity: '0',
  },
  paperStyle: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    padding: '10px',
  },

  styleButtonSubmit: {
    marginLeft: '10px',
  },
  styleTitle: {
    backgroundColor: '#004D40',
    color: 'white'
  },
  stylePage: {
    margin: 'auto',
  },
  stylePassword: {
    color: 'white'
  }
};
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      open: false
    };
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.changeStateDialogue = this.changeStateDialogue.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }
  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }
  submitForm(data) {
    alert(JSON.stringify(data, null, 4));
  }
  notifyFormError(data) {
    console.error('Form error:', data);
  }
  changeStateDialogue() {
    this.setState({
      open: true
    });

  }
  handleClose() {
    this.setState({
      open: false
    });
  }

  render() {
    const actions = [
      <FlatButton
                  label="cancel"
                  primary={ true }
                  onTouchTap={ this.handleClose } />
    ];
    return (
      <Grid>
        <Row>
          <Col
               xs={ 12 }
               sm={ 12 }
               md={ 12 }
               lg={ 12 }>
          <div style={ styles.stylePage }>
            <Paper style={ styles.paperStyle }>
              <div>
                <Avatar
                        size={ 150 }
                        src="./../../resources/images/userAvatar.jpg" />

                <div>
                  <FlatButton
                              primary={ true }
                              icon={<ImageAddAPhoto/>}>
                    <label><input type="file" style={ styles.exampleImageInput }/>Choose a picture</label>
                  </FlatButton>
                </div>
                <Formsy.Form
                             onValid={ this.enableButton }
                             onInvalid={ this.disableButton }
                             onValidSubmit={ this.submitForm }
                             onInvalidSubmit={ this.notifyFormError }>
                  <FormsyText
                              label="Full Name"
                              name="name"
                              validations="isWords"
                              validationError="Please use letters"
                              required
                              hintText="Full Name"
                              updateImmediately
                              floatingLabelText="Full Name" />
                  <br/>
                  <FormsyText
                              name="contact"
                              validations="isNumeric,isLength:10"
                              validationError="Please use 10 digit number"
                              hintText="Contact Number"
                              required
                              floatingLabelText="Contact Number"
                              updateImmediately />
                  <br />
                  <FormsyText
                              name="email"
                              validations="isEmail"
                              validationError="Please enter a valid email"
                              required
                              hintText="Enter your email"
                              updateImmediately
                              floatingLabelText="Email" />
                  <br />
                  <br />
                  <FlatButton
                              label="Change Password"
                              backgroundColor="#4CAF50"
                              labelStyle={ styles.stylePassword }
                              hoverColor="#1B5E20"
                              secondary={ true }
                              onClick={ this.changeStateDialogue } />
                  <br />
                  <Dialog
                          title="Change Password Here"
                          actions={ actions }
                          modal={ false }
                          open={ this.state.open }
                          onRequestClose={ this.handleClose }>
                    <ChangePassword/>
                  </Dialog>
                  <br/>
                  <RaisedButton
                                label="cancel"
                                labelColor="white"
                                backgroundColor="#F44336"
                                onClick={ this.handleClose } />
                  <RaisedButton
                                type="submit"
                                labelColor="white"
                                label="Save Changes"
                                disabled={ !this.state.canSubmit }
                                style={ styles.styleButtonSubmit }
                                backgroundColor="#4CAF50" />
                </Formsy.Form>
              </div>
            </Paper>
          </div>
          </Col>
        </Row>
      </Grid>
      );
  }
}