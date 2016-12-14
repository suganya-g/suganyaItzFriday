import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChatToolBar from './ChatToolBar';
import ChatWindow from './ChatWindow';
import sockets from './../../services/socket.service.js'
import Auth from './../../services/auth.service.js'

var name = ''; 
const chatMessages = [];
var socket = '';
class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
      chatRooms: [],
      participants: [],
      userTyping: '',
    }
  }
  componentDidMount() {
    var userJoined = '';
    if(this.props.location.query.identifier === "message") {
      userJoined = {
        user: Auth.getNameFromToken(),
        destination: 'Friday@'+this.props.location.query.name
      }
    }else if(this.props.location.query.identifier === "channel") {
      userJoined = {
        user: Auth.getNameFromToken(),
        destination: 'Friday#'+this.props.location.query.name
      }
    }
    socket = sockets.getSocketConnection();
    socket.on('error', this._socketConnectionError.bind(this));
    socket.on('connected', this._getConnectedUser.bind(this));
    socket.on('user:join',this._getJoinedUser.bind(this));
    socket.on('send:message', this._recieveMessage.bind(this));
    socket.on('notify', this._notifyUser.bind(this));
  }
  componentWillMount() {

  }
	render() {
		return (
				<Grid>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                        <ChatToolBar name={this.props.location.query.name} identifier={this.props.location.query.identifier} participants={this.state.participants}/> 
                  </Col>
        			</Row>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                    <ChatWindow name={Auth.getNameFromToken()} chatMessages={this.state.chatMessages} addMessage={this.addChatMessages.bind(this)} userTyped={this.state.userTyping} notifyTypingUser={this.notifyTyping.bind(this)}/>
                  </Col>
        			</Row>
      			</Grid>
			)
	}

  _notifyUser(user) {
    if(user !== undefined) {
      this.setState({userTyping: user});
    }
  }
  _recieveMessage(message) {
    console.log(message);
    chatMessages.push(message);
    this.setState({chatMessages});
  }
  notifyTyping() {
    console.log(Auth.getNameFromToken());
    socket.emit('notify', Auth.getNameFromToken());
  }
  addChatMessages(message) {
    if(this.props.location.query.identifier === "message") {
      var sendingMessage = {
        author: Auth.getNameFromToken(),
        message: message.chatText,
        timeStamp: message.chatTime,
        destination: 'Friday@'+this.props.location.query.name
      }
    }else if(this.props.location.query.identifier === "channel") {
      var sendingMessage = {
        author: Auth.getNameFromToken(),
        message: message.chatText,
        timeStamp: message.chatTime,
        destination: 'Friday#'+this.props.location.query.name
      }
    }
    socket.emit('send:message', sendingMessage);
    chatMessages.push(sendingMessage);
    this.setState({chatMessages});
  }
  _getConnectedUser(user) {
    //socket.emit('user:join', userJoined);
    console.log(user);
  }
  _getJoinedUser(userJoined) {
    console.log(userJoined.user+' has subscibed to '+userJoined.destination);
  }
  _socketConnectionError(err) {
    console.log(err)
  }
}

export default ChatBox;