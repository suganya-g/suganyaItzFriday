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
import Request from 'superagent';
import { Router, Route, Link, browserHistory } from 'react-router';

const styles = {

  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',

    width: '100%',
    opacity: '0',
  },
  paperStyle: {
    margin: 'auto',
    width:'100%',
    textAlign: 'center',
    display: 'inline-block',
    paddingBottom:'5px',
    paddingTop:'5px'
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
      open: false,
      avatarUrl:'./../../resources/images/userAvatar.jpg'
    };
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.changeStateDialogue = this.changeStateDialogue.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.previewFile=this.previewFile.bind(this);
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
    this.props.router.replace('/project/'+this.props.params.projectid);
  }
  previewFile(event) {
    var reader  = new FileReader();
     var file    = event.target.files[0];
     reader.onload = (upload) => {
           this.setState({
             avatarUrl: upload.target.result,
             filename: file.name,
             filetype: file.type
           });
         };

reader.readAsDataURL(file);
}
  render() {
    const actions = [
      <FlatButton
                  label="cancel"
                  primary={ true }
                  onTouchTap={ this.handleClose } />
    ];
    return (
      <div className="autofill">
      <div clasname="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <Paper style={ styles.paperStyle }>
              <div>
                <Avatar
                        id='output'
                        size={ 150 }
                        src={this.state.avatarUrl} />

                <div>
                  <FlatButton
                              primary={ true }
                              icon={<ImageAddAPhoto/>}>
                    <label><input type="file" style={ styles.exampleImageInput } onChange={this.previewFile}/>Choose a picture</label>
                  </FlatButton>
                </div>
                <Formsy.Form
                             onValid={ this.enableButton }
                             onInvalid={ this.disableButton }
                             onValidSubmit={ this.submitForm }
                             onInvalidSubmit={ this.notifyFormError }>
                  <FormsyText
                              label="First Name"
                              name="fname"
                              validations="isWords"
                              validationError="Please use letters"
                              required
                              hintText="First Name"
                              updateImmediately
                              floatingLabelText="First Name" />
                  <br />
                  <FormsyText
                              label="Last Name"
                              name="lname"
                              validations="isWords"
                              validationError="Please use letters"
                              required
                              hintText="Last Name"
                              updateImmediately
                              floatingLabelText="Last Name" />
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
                              defaultValue={localStorage['email']}
                				      disabled={true}
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
            </div>
      );
  }
}
