import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChatToolBar from './ChatToolBar';
import ChatWindow from './ChatWindow';
import sockets from './../../services/socket.service.js'
import Auth from './../../services/auth.service.js'

var name = ''; 
var chatMessages = [];
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
    this._filterMessages = this._filterMessages.bind(this);
  }
  componentDidMount() {
    socket = sockets.getSocketConnection();
    socket.on('error', this._socketConnectionError.bind(this));
    socket.on('connected', this._getConnectedUser.bind(this));
    socket.on('user:join',this._getJoinedUser.bind(this));
    socket.on('send:message', this._recieveMessage.bind(this));
    socket.on('notify', this._notifyUser.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      chatMessages=[];
      this.setState({chatMessages});
    }
    if(this.props.location.query.project !== nextProps.location.query.project) {
      socket.emit('user:join', nextProps.location.query.project);
    }
  }
	render() {
		return (
				<Grid>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                        <ChatToolBar project={this.props.location.query.project} name={this.props.location.query.name} identifier={this.props.location.query.identifier} participants={this.state.participants} joinUser={this.joinConversation.bind(this)}/> 
                  </Col>
        			</Row>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                    <ChatWindow project={this.props.location.query.project} identifierName={this.props.location.query.name} chatMessages={this.state.chatMessages} identifier={this.props.location.query.identifier} addMessage={this.addChatMessages.bind(this)} userTyped={this.state.userTyping} notifyTypingUser={this.notifyTyping.bind(this)}/>
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
    this._filterMessages(message);
  }
  notifyTyping() {
    if(this.props.location.query.identifier === "message") {
      var typingUser = {
        destination:this.props.location.query.project+'@'+this.props.location.query.name+'/'+Auth.getNameFromToken(), 
        author: Auth.getNameFromToken()
      }
    }else if(this.props.location.query.identifier === "channel") {
      var typingUser = {
        destination:this.props.location.query.project+'@'+this.props.location.query.name, 
        author: Auth.getNameFromToken()
      }
    }
    socket.emit('notify', typingUser);
  }
  joinConversation(userJoined) {
    //this.setState({chatMessages:[]});
    //socket.emit('user:join', userJoined);
  }
  //source = project@author/receiver
  //destination = project@receiver/source
  addChatMessages(message) {
    if(this.props.location.query.identifier === "message") {
      var sendingMessage = {
        author: Auth.getNameFromToken(),
        //source: this.props.location.query.project+'@'+this.props.location.query.name+'/'+Auth.getNameFromToken(),
        message: message.chatText,
        timeStamp: message.chatTime,
        destination: this.props.location.query.project+'@'+this.props.location.query.name+'/'+Auth.getNameFromToken()
      }
    }else if(this.props.location.query.identifier === "channel") {
      var sendingMessage = {
        author: Auth.getNameFromToken(),
        //source: this.props.location.query.project+'#'+this.props.location.query.name,
        message: message.chatText,
        timeStamp: message.chatTime,
        destination: this.props.location.query.project+'#'+this.props.location.query.name
      }
    }
    //chatMessages.push(sendingMessage);
    socket.emit('send:message', sendingMessage);
    this.setState({chatMessages});
  }

  _filterMessages(messages) {
    if(messages && this.props.location.query.identifier === 'channel' && this.props.location.query.name !== 'Droid') {
      var names = messages.destination.split('#');
      if(names[1] && (names[1] === this.props.location.query.name) && (names[0] === this.props.location.query.project)){
        chatMessages.push(messages);
      }
    }else if(messages && this.props.location.query.identifier === 'message' && this.props.location.query.name !== 'Droid') {
      var names = messages.destination.split('@');
      if(names[1]) {
        var users = names[1].split('/');
        if(names[1] && (users[0].split(' ')[0] === Auth.getNameFromToken()) && (users[1] === (this.props.location.query.name).split(' ')[0]) && (names[0] === this.props.location.query.project)){
          chatMessages.push(messages);
        }else if(names[1] && (users[0].split(' ')[0] === (this.props.location.query.name).split(' ')[0]) && (users[1] === Auth.getNameFromToken()) && (names[0] === this.props.location.query.project)){
          chatMessages.push(messages);
        }
      }
    }
    this.setState({chatMessages});
  }

  _getConnectedUser(user) {
    socket.emit('user:join', this.props.location.query.project);
  }
  _getJoinedUser(joinedUser) {
    console.log(joinedUser.user+' has joined to '+joinedUser.destination);
  }
  _socketConnectionError(err) {
    console.log(err)
  }
}

export default ChatBox;