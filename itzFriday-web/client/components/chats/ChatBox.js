import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChatToolBar from './ChatToolBar';
import ChatWindow from './ChatWindow';
import Auth from './../../services/auth.service.js';
import SortService from './../../services/sort.service.js';
import ListText from './../others/ListText';
import LinkText from './../others/LinkText';
import ListItemsText from './../others/ListItemsText';
import HelpText from './../others/HelpText';


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
    this.filterHistory = this.filterHistory.bind(this);
  }
  componentDidMount() {
    this.context.socket.on('send:message', this._recieveMessage.bind(this));
    this.context.socket.on('init:data', this._getDataOnLoad.bind(this));
    this.context.socket.on('disconnect', this._disconnectSocket.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.location.query.identifier.match(/channel/i)) {
      var destination = nextProps.location.query.project + '#' + nextProps.location.query.name;
      this.context.socket.emit('init:data', destination);
    }else if(nextProps.location.query.identifier.match(/message/i)) {
      var sortedName = SortService.getSortedName(nextProps.location.query.name.split(' ')[0], Auth.getNameFromToken());
      var destination = nextProps.location.query.project + '@' + sortedName[0]+ '/' +sortedName[1];
      this.context.socket.emit('init:data', destination);
    }
    if(this.props.location.query.project !== nextProps.location.query.project) {
      this.context.socket.emit('user:join', nextProps.location.query.project);
    }
    //this.setState({chatMessages: []})
  }
  render() {
    return (
      <div>
              <div clasname="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                    <ChatToolBar project={this.props.location.query.project} name={this.props.location.query.name} identifier={this.props.location.query.identifier} participants={this.state.participants} joinUser={this.joinConversation.bind(this)}/>
              </div>
              <div clasname="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                    <ChatWindow project={this.props.location.query.project} identifierName={this.props.location.query.name} chatMessages={this.state.chatMessages} identifier={this.props.location.query.identifier} addMessage={this.addChatMessages.bind(this)} />
              </div>
      </div>
      )
  }

  _recieveMessage(message) {
    console.log('get message from socket', message);
    this._filterMessages(message);
  }
  joinConversation(userJoined) {
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

      }else {
        sendingMessage.destination = this.props.location.query.project+'#'+this.props.location.query.name
      }
    }
    this.context.socket.emit('send:message', sendingMessage);
  }

  _filterMessages(messages)
  {
    console.log(messages);
    if(messages && this.props.location.query.identifier === 'channel') {
      var names = messages.destination.split('#');
      if(names[1] && names[1].match(/Droid/) || messages.author === 'Droid') {
        var channelName = names[1].split('/');
        if(channelName && (channelName[0] === this.props.location.query.name) && (names[0] === this.props.location.query.project))
        {
          if(messages.message.ofType === 'string')
          {
            messages.message = messages.message.withContent;
          }else if(messages.message.ofType === 'json'){
            messages.message = <ListText issues={messages.message.withContent}/>;
          } else if(messages.message.ofType === 'link') {
            messages.message = <LinkText gitLink={messages.message.withContent}/>;
          }else if(messages.message.ofType === 'listItems') {
            messages.message = <ListItemsText items={messages.message.withContent}/>;
          }else if(messages.message.ofType === 'help') {
            messages.message = <HelpText commands={messages.message.withContent}/>;
          }
          this.state.chatMessages.push(messages);
          var unreadMessages = {
            destination: messages.destination,
            sender: this.props.location.query.name
          }
          this.context.socket.emit('chat:count', unreadMessages);
        }
      }else if(names[1] && (names[1] === this.props.location.query.name) && (names[0] === this.props.location.query.project))
      {
        this.state.chatMessages.push(messages);
        var unreadMessages = {
            destination: messages.destination,
            sender: this.props.location.query.name
          }
          this.context.socket.emit('chat:count', unreadMessages);
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
          if(messages.message.ofType === 'string')
          {
            messages.message = messages.message.withContent;
          }else if(messages.message.ofType === 'json'){
            messages.message = <ListText issues={messages.message.withContent}/>;
          }else if(messages.message.ofType === 'link') {
            messages.message = <LinkText gitLink={messages.message.withContent}/>;
          }else if(messages.message.ofType === 'listItems') {
            messages.message = <ListItemsText items={messages.message.withContent}/>;
          }else if(messages.message.ofType === 'help') {
            messages.message = <HelpText commands={messages.message.withContent}/>;
          }
          this.state.chatMessages.push(messages);
        }else if(names[1] && (users[0].split(' ')[0] === Auth.getNameFromToken()) && (users[1] === (this.props.location.query.name).split(' ')[0]) && (names[0] === this.props.location.query.project) && (users[1] !== 'Droid')){
          this.state.chatMessages.push(messages);
        }else if(names[1] && (users[0].split(' ')[0] === (this.props.location.query.name).split(' ')[0]) && (users[1] === Auth.getNameFromToken()) && (names[0] === this.props.location.query.project) && (users[1] !== 'Droid')){
          this.state.chatMessages.push(messages);
        }
      }
      //this.state.chatMessages.push(messages);
      this.setState({chatMessages:this.state.chatMessages});
      var unreadMessages = {
        destination: messages.destination,
        sender: messages.author
      }
      this.context.socket.emit('chat:count', unreadMessages);
    }
  }
  _getDataOnLoad(chatMessages) {
    this.filterHistory(chatMessages);
  }



filterHistory(arrayOfMessages)
{
 let chatMessages = [];
 for(let item in arrayOfMessages)
 {
   if(arrayOfMessages[item].author === "Droid" || arrayOfMessages[item].destination.match(/Droid/i))
   {
     let tempMsg = arrayOfMessages[item];
     if(tempMsg.message.ofType === 'string')
     {
       tempMsg.message = tempMsg.message.withContent;
     }
     else if(tempMsg.message.ofType === 'json')
     {
       tempMsg.message = <ListText issues={tempMsg.message.withContent}/>;
     }
     else if(tempMsg.message.ofType === 'link')
    {
       tempMsg.message = <LinkText gitLink={tempMsg.message.withContent}/>;
     }
     else if(tempMsg.message.ofType === 'listItems')
     {
       tempMsg.message = <ListItemsText items={tempMsg.message.withContent}/>;
     }
     else if(tempMsg.message.ofType === 'help')
     {
        tempMsg.message = <HelpText commands={tempMsg.message.withContent}/>;
     }
     chatMessages.push(tempMsg);
   }
   else
   {
     chatMessages.push(arrayOfMessages[item]);
   }
 }
 this.setState({chatMessages : chatMessages});
}



  _disconnectSocket(error) {
    console.log('socket is disconnected due to : '+ error);
    this.context.socket.disconnect();
  }
}

ChatBox.contextTypes = {
  socket: React.PropTypes.object.isRequired
};

export default ChatBox;
