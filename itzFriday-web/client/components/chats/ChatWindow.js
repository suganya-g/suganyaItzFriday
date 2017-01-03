import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import ChatInput from './ChatInput';
import ChatText from './ChatText';
import MediaQuery from 'react-responsive';

const styles = {
  chatBoxStyle: {

  },
  actionBar: {
      borderTop: "1px solid #dae2e3"
  },
   messageList: {
    height: 560,
    listStyle: "none",overflowY: "scroll"
  },
  messageListPhone: {
   height:'100%',
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
    const chats = this.props.chatMessages;
    let listView = []
      for(let i=0; i < chats.length; i ++) {
           listView.push(<li key={i} style={styles.listMargin} ref={(ref) => this['_div'+i] = ref}>
              <ChatText key={i} chatTextMessages = {chats[i]}/>
            </li>);
          }

    return(
        <Paper zDepth={5} style={styles.chatBoxStyle}>
        <div>

        <MediaQuery minDeviceWidth={1024}>
          <ul style={{height:'590px',listStyle: "none",overflowY: "scroll"}}>
                {listView}
          </ul>
        </MediaQuery>

        <MediaQuery maxDeviceWidth={320}>
          <ul style={{height:'380px',listStyle: "none",overflowY: "scroll"}}>
                {listView}
          </ul>
        </MediaQuery>

        <MediaQuery minDeviceWidth={321} maxDeviceWidth={360}>
          <ul style={{height:'450px',listStyle: "none",overflowY: "scroll"}}>
                {listView}
          </ul>
        </MediaQuery>

        <MediaQuery minDeviceWidth={361} maxDeviceWidth={375}>
          <ul style={{height:'480px',listStyle: "none",overflowY: "scroll"}}>
                {listView}
          </ul>
        </MediaQuery>

        <MediaQuery minDeviceWidth={376} maxDeviceWidth={414}>
          <ul style={{height:'550px',listStyle: "none",overflowY: "scroll"}}>
                {listView}
          </ul>
        </MediaQuery>

        <MediaQuery minDeviceWidth={415} maxDeviceWidth={1023}>
          <ul style={{height:'800px',listStyle: "none",overflowY: "scroll"}}>
                {listView}
          </ul>
        </MediaQuery>
          <div style={styles.actionBar}>
            <ChatInput addChat={this.props.addMessage} identifier={this.props.identifier} identifierName={this.props.identifierName} userTyped={this.props.userTyped}/>
          </div>
          </div>
        </Paper>
      )
  }
}

export default ChatWindow;
