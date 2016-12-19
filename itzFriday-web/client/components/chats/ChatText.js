import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';


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
                  <p style={styles.messageBody}>{message.message}</p>
                </div>
      </div> : ''
    }
    </div>
      )
  }

}

export default ChatText;