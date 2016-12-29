import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Emoji} from 'emoji-mart';

const styles = {
  profilePic: {
    display: "table-cell",
    verticalAlign: "top",
    paddingRight: 10
  },
  imageStyle: {
    maxWidth: "inherit",
    height: 44,
    width: 44,
    borderRadius: "50%",
    display: "block",
    verticalAlign: "middle"
  },
  messageTextDisplay: {
    paddingTop: 0,
    fontWeight: 200,
    fontSize: 14,
    width: 10000,
    display: "table-cell",
    verticalAlign: "top"
  },
  messageData: {
    marginBottom: 5
  },
  author: {
    fontWeight: 400,
    color: "#89969c"
  },
  timestamp: {
    fontSize: 12,
    margin: "0 10px",
    color: "#8cb53f"
  },
  messageBody: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "sans-serif"
  }
}
class ChatText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const message = this.props.chatTextMessages;
    const avtar = "https://twitter.com/@"+message.author+"/profile_image?size=original";
      
      let finalmessage= [];
      if(message.author !== 'Droid') {
      let recievedMessage = message.message.split(':');
      for (let i = 0; i < recievedMessage. length; i = i + 1) {
        if(i%2 != 0)
        {
          finalmessage.push(<Emoji emoji={recievedMessage[i]} size={24}/>);
         }
         else if(recievedMessage[i].length !==0) {
          finalmessage.push(recievedMessage[i]);
         }
       }
     }
    else {
       finalmessage.push(message.message);
    }

    return(
      <div>
      { message !== undefined || message !== null ?
      <div>
        <div style = {styles.profilePic}>
                  <img src={avtar} style = {styles.imageStyle}/>
                </div>
                <div style={styles.messageTextDisplay}>
                  <div style={styles.messageData}>
                  <span style={styles.author}>{message.author}</span>
                  <span style={styles.timestamp}>{message.timeStamp}</span>
                </div>
                  <p style={styles.messageBody}>{finalmessage}</p>
                </div>
      </div> : ''
    }
    </div>
      )
  }

}

export default ChatText;