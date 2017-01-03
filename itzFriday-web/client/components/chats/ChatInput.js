import React, { Component } from 'react';
import moment from 'moment';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import Auth from './../../services/auth.service.js'
import {Emoji, Picker} from 'emoji-mart';

const styles = {
	inputArea: {
	}
}
class ChatInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canSubmit: false,
      showEmoji: false,
      userTyped: ''
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

    toggleEmojiPicker = () => {
      this.setState({showEmoji: !this.state.showEmoji});
    }

    selectedEmoji = (emoji) => {
      this.setState({userTyped: this.state.userTyped + ':' +emoji.id + ':'});
    }

    handleChangeText = (event) => {
        this.setState({userTyped: event.target.value});
    }

  	submitForm(data) {
      var localTime  = moment.utc(new Date()).toDate();
    	var newMessage = {
          author: this.props.userName,
      		chatTime: moment(localTime).format('llll'),
      		chatText: data.messages,
      		authorAvtar: "https://twitter.com/@"+this.props.userName+"/profile_image?size=original"
    	}
      this.setState({userTyped: ''});
    	this.props.addChat(newMessage);
  	}

  	notifyFormError(data) {
    	console.error('Form error:', data);
  	}

	render() {
		return(
				<div clasname="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
			<Formsy.Form
                    onValid={this.enableButton.bind(this)}
                    onInvalid={this.disableButton.bind(this)}
                    onValidSubmit={this.submitForm.bind(this)}
                    onInvalidSubmit={this.notifyFormError.bind(this)}
                  >


                <FormsyText
                  name="messages"
                  validations="minLength:1"
                  validationError="Type your message"
                  required
                  hintText="Type your message"
                  autoComplete="off"
                  updateImmediately
                  style={{width:'80%',textIndent: '20px'}}
                  value = {this.state.userTyped}
                  onChange = {this.handleChangeText}
                />
              <Emoji
                size = {24}
                emoji = ':blush:'
                onClick = {this.toggleEmojiPicker}/>
                {
                  this.state.showEmoji ?
                  <Picker
                  style={{float:'left', right: '25px', bottom: '100px', position: 'fixed', cursor: 'pointer'}}
                  emojiSize = {24}
                  perLine = {9}
                  set = 'apple'
                  
                  onClick = {this.selectedEmoji}
                  /> :<span />
                }
                  <IconButton
                    type="submit"
                    disabled={!this.state.canSubmit}
                  ><ContentSend/></IconButton>

            </Formsy.Form>
						  </div>
			)
	}

}

export default ChatInput;
