import React, { Component } from 'react';
import moment from 'moment';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';

const styles = {
	inputArea: {
		width: "100%"
	}
}
class ChatInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canSubmit: false,
      userTyping: ''
		}
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
      var localTime  = moment.utc(new Date()).toDate();
    	var newMessage = {
      		chatTime: moment(localTime).format('llll'),
      		chatText: data.messages,
      		authorAvtar: "https://twitter.com/@"+this.props.userName+"/profile_image?size=original"
    	}
    	this.props.addChat(newMessage);
		  this.refs.chat.setState({value: ''});
  	}
    notifyTypingUser() {
      if(this.props.userName !== this.props.userTyped) {
        console.log(this.props.userTyped);
        this.props.notifyTyping();
        this.setState({userTyping: this.props.userTyped});
      }else{
        this.setState({userTyping: ''});
      }
    }                                         
  	notifyFormError(data) {
    	console.error('Form error:', data);
  	}

	render() {
		return(
			<Formsy.Form
                    onValid={this.enableButton.bind(this)}
                    onInvalid={this.disableButton.bind(this)}
                    onValidSubmit={this.submitForm.bind(this)}
                    onInvalidSubmit={this.notifyFormError.bind(this)}
                  >
            <Grid>
            {this.state.userTyping !== '' ?
            <Row>
              <Col xs={12}><h5>{this.state.userTyping} is typing...</h5></Col>
            </Row>: ''
          }
              <Row>
                <Col xs={12}>
                <Row center="xs">
                <Col xs={10} sm={10} md={10} lg={10}>
                <FormsyText
                  name="messages"
                  validations="minLength:1"
                  validationError="Type your message"
                  required
                  hintText="Type your message"
                  ref="chat"
                  autoComplete="off"
                  updateImmediately
                  style = {styles.inputArea}
                  onChange = {this.notifyTypingUser.bind(this)}
                />
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                  <IconButton
                    type="submit"
                    disabled={!this.state.canSubmit}
                  ><ContentSend/></IconButton>
                </Col>
                </Row>
                </Col>
              </Row>
            </Grid>
            </Formsy.Form>
			)
	}

}

export default ChatInput;