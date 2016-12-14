import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import ChatInput from './ChatInput';
import ChatText from './ChatText';

const styles = {
  chatBoxStyle: {
    position: "relative",
      height: "100%",
    margin: "0 auto"
  },
  actionBar: {
      position: "relative",
      width: "100%",
      borderTop: "1px solid #dae2e3"
  },
   messageList: {
    height: 420,
    listStyle: "none",
    overflowY: "scroll"
  },
  listMargin: {
    marginTop: 20,
    marginLeft: -20
  }
}

class ChatWindow extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Scroll to the bottom on initialization
    if(this.props.chatMessages.length > 1) {
        var len = this.props.chatMessages.length - 1;
        const node = ReactDOM.findDOMNode(this['_div' + len]);
        if (node) {
            node.scrollIntoView();
        }
      }
  }
  componentDidUpdate() {
      // Scroll as new elements come along
      if(this.props.chatMessages.length > 1){
        var len = this.props.chatMessages.length - 1;
        const node = ReactDOM.findDOMNode(this['_div' + len]);
        if (node) {
            node.scrollIntoView();
        }
      }
  }

  render() {
    const userName = this.props.name;
    const chats = this.props.chatMessages;
    let listView = []
      for(let i=0; i < chats.length; i ++) {
           listView.push(<li key={i} style={styles.listMargin} ref={(ref) => this['_div'+i] = ref}>
              <ChatText chatTextMessages = {chats[i]}/>
            </li>);
          }
           
    return(
        <Paper zDepth={5} style={styles.chatBoxStyle}>
          <ul style= {styles.messageList}>
                {listView}
          </ul>
          <div style={styles.actionBar}>
            <ChatInput addChat={this.props.addMessage} userName={userName} notifyTyping={this.props.notifyTypingUser} userTyped={this.props.userTyped}/>
          </div>
        </Paper>
      )
  }
}

export default ChatWindow;