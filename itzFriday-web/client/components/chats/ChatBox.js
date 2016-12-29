import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChatToolBar from './ChatToolBar';
import ChatWindow from './ChatWindow';
import sockets from './../../services/socket.service.js';
import Auth from './../../services/auth.service.js';
import ListText from './../others/ListText';
import LinkText from './../others/LinkText';

//var name = ''; 
//var chatMessages = [];
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
    socket.on('init:data', this._getDataOnLoad.bind(this))
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.location.query.identifier.match(/channel/i)) {
      var destination = nextProps.location.query.project + '#' + nextProps.location.query.name;
      socket.emit('init:data', destination);
    }else if(nextProps.location.query.identifier.match(/message/i)) {
      var sortedName = SortService.getSortedName(nextProps.location.query.name.split(' ')[0], Auth.getNameFromToken());
      var destination = nextProps.location.query.project + '@' + sortedName[0]+ '/' +sortedName[1];
      socket.emit('init:data', destination);
    }
    if(this.props !== nextProps) {
      //chatMessages=[];
      //socket.on('init:data', this._getDataOnLoad.bind(this))
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
                    <ChatWindow project={this.props.location.query.project} identifierName={this.props.location.query.name} chatMessages={this.state.chatMessages} identifier={this.props.location.query.identifier} addMessage={this.addChatMessages.bind(this)} />
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
        user: Auth.getEmailFromToken(),
        //source: this.props.location.query.project+'@'+this.props.location.query.name+'/'+Auth.getNameFromToken(),
        message: message.chatText,
        timeStamp: message.chatTime,
        destination: this.props.location.query.project+'@'+this.props.location.query.name+'/'+Auth.getNameFromToken()
      }
    }else if(this.props.location.query.identifier === "channel") {
      var sendingMessage = {
        author: Auth.getNameFromToken(),
        user: Auth.getEmailFromToken(),
        message: message.chatText,
        timeStamp: message.chatTime,
        destination: '',
      }
      if(message.chatText.match(/@Droid/i)) {
         sendingMessage.destination = this.props.location.query.project+'#Droid'+'/'+this.props.location.query.name;
         sendingMessage.message = message.chatText.replace(/@droid/i, 'Hey Droid, ');
         //chatMessages.push(sendingMessage);
          
      }else {
        sendingMessage.destination = this.props.location.query.project+'#'+this.props.location.query.name
      }
    }
    //chatMessages.push(sendingMessage);
    //
    socket.emit('send:message', sendingMessage);
    //this.setState({chatMessages});
  }

  _filterMessages(messages) 
  {
    console.log(messages);
    if(messages && this.props.location.query.identifier === 'channel') {
      var names = messages.destination.split('#');
      if(names[1] && names[1].match(/Droid/)) {
        var channelName = names[1].split('/');
        if(channelName && (channelName[0] === this.props.location.query.name) && (names[0] === this.props.location.query.project)) 
        {
          if(messages.message.type === 'string') 
          {
            messages.message = messages.message.content;
          }else if(messages.message.type === 'json'){
            messages.message = <ListText issues={messages.message.content}/>;
          } else if(messages.message.type === 'link') {
            messages.message = <LinkText link={messages.message.content}/>;
          }
          this.state.chatMessages.push(messages);
        }
      }else if(names[1] && (names[1] === this.props.location.query.name) && (names[0] === this.props.location.query.project))
      {
        this.state.chatMessages.push(messages);
      }
      this.setState({chatMessages: this.state.chatMessages});
    }
    else if(messages && this.props.location.query.identifier === 'message') 
    {
      var names = messages.destination.split('@');
      if(names[1]) {
        var users = names[1].split('/');
        if(users && names[1] && (users[0].split(' ')[0] === Auth.getNameFromToken()) && (names[0] === this.props.location.query.project) && (users[1] === 'Droid')) 
        {
          if(messages.message.type === 'string') 
          {
            messages.message = messages.message.content;
          }else if(messages.message.type === 'json'){
            messages.message = <ListText issues={messages.message.content}/>;
          }else if(messages.message.type === 'link') {
            messages.message = <LinkText link={messages.message.content}/>;
          }
          this.state.chatMessages.push(messages);
        }else if(names[1] && (users[0].split(' ')[0] === Auth.getNameFromToken()) && (users[1] === (this.props.location.query.name).split(' ')[0]) && (names[0] === this.props.location.query.project) && (users[1] !== 'Droid')){
          this.state.chatMessages.push(messages);
        }else if(names[1] && (users[0].split(' ')[0] === (this.props.location.query.name).split(' ')[0]) && (users[1] === Auth.getNameFromToken()) && (names[0] === this.props.location.query.project) && (users[1] !== 'Droid')){
          this.state.chatMessages.push(messages);
        }
      }
      this.setState({chatMessages:this.state.chatMessages});
    }
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
  _getDataOnLoad(chatMessages) {
    this.setState({chatMessages: chatMessages});
  }
}

export default ChatBox;