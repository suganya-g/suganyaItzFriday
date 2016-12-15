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
    socket = sockets.getSocketConnection();
    socket.on('error', this._socketConnectionError.bind(this));
    socket.on('connected', this._getConnectedUser.bind(this));
    socket.on('user:join',this._getJoinedUser.bind(this));
    socket.on('send:message', this._recieveMessage.bind(this));
    socket.on('notify', this._notifyUser.bind(this));
  }
	render() {
		return (
				<Grid>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                        <ChatToolBar name={this.props.location.query.name} identifier={this.props.location.query.identifier} participants={this.state.participants} joinUser={this.joinConversation.bind(this)}/> 
                  </Col>
        			</Row>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                    <ChatWindow chatMessages={this.state.chatMessages} addMessage={this.addChatMessages.bind(this)} userTyped={this.state.userTyping} notifyTypingUser={this.notifyTyping.bind(this)}/>
                  </Col>
        			</Row>
      			</Grid>
			)
	}

  _notifyUser(userTyping) {
    if(userTyping !== undefined) {
      this.setState({userTyping: userTyping});
    }
  }
  _recieveMessage(message) {
    console.log(message);
    chatMessages.push(message);
    this.setState({chatMessages});
  }
  notifyTyping() {
    var typingUser = {
      destination:'Friday#'+this.props.location.query.name, 
      author: Auth.getNameFromToken()
    }
    socket.emit('notify', typingUser);
  }
  joinConversation(userJoined) {
    this.setState({chatMessages:''});
    //socket.emit('user:join', userJoined);
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
    //chatMessages.push(sendingMessage);
    socket.emit('send:message', sendingMessage);
    this.setState({chatMessages});
  }
  _getConnectedUser(user) {
    socket.emit('user:join', "Friday");
    console.log(user);
  }
  _getJoinedUser(joinedUser) {
    console.log(joinedUser.user+' has joined to '+joinedUser.destination);
  }
  _socketConnectionError(err) {
    console.log(err)
  }
}

export default ChatBox;