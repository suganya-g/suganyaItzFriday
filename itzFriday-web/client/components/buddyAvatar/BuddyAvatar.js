import React from 'react';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import Paper from 'material-ui/Paper';
import {Grid,Row,Col} from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
const styles={
	styleButton: {
    color:'white'
  },
  styleImage: {
  	width: 150,
  	height: 150
  },
  stylePaper: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    padding: 10
  },
  styleAvatar: {
  	margin: 'auto'
  },
  styleSubmit: {
    width: '50%',
    margin: 'auto'
  },
  styleCancel: {
    width: '50%',
   margin: 'auto'
  }
}
export default class BuddyAvatar extends React.Component {
  constructor(props)
  {
    super(props);
  }
	state = {
    open: false,
  };
  handleClose =() => {
    this.setState({open: false});
  };
  handleOpen = () => {
    this.setState({open: true});
  };
  handleUrl = (event) => {
    console.log(event.target.src);
  };
  
render()
	{
		return(
			<div>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Paper style={styles.stylePaper}>
                <Avatar size={150} src="./../../resources/images/buddy.png" style={styles.styleAvatar} />
                <br /><br/>
                <FlatButton label="Change Avatar" backgroundColor="#4CAF50" icon={<ImageAddAPhoto/>} labelStyle={styles.styleButton} hoverColor="#1B5E20" onClick={this.handleOpen} />
              </Paper>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Dialog
               title="Choose Avatar"
               modal={true}
               autoScrollBodyContent={true}
               open={this.state.open}>
                <br/>
                <img id="buddy1" src="./../../resources/images/buddy.png" style={styles.styleImage}  onClick={this.handleUrl} />
                <img id="buddy2" src="./../../resources/images/pandaBot.png" style={styles.styleImage} onClick={this.handleUrl}/>
                <img id="buddy3" src="./../../resources/images/buddy5.png" style={styles.styleImage} onClick={this.handleUrl}/>
                <img id="buddy4" src="./../../resources/images/buddy1.jpg" style={styles.styleImage} onClick={this.handleUrl}/>
                <img id="buddy5" src="./../../resources/images/buddy2.jpg" style={styles.styleImage} onClick={this.handleUrl} />
                <img id="buddy6" src="./../../resources/images/buddy3.jpg" style={styles.styleImage} onClick={this.handleUrl} />
                <img id="buddy7" src="./../../resources/images/buddy4.jpg" style={styles.styleImage} onClick={this.handleUrl}/>
                <img id="buddy8" src="./../../resources/images/buddy6.jpg" style={styles.styleImage} onClick={this.handleUrl}/>
                <img id="buddy9" src="./../../resources/images/buddy7.jpg" style={styles.styleImage} onClick={this.handleUrl} />
                <img id="buddy10" src="./../../resources/images/buddy8.jpg" style={styles.styleImage} onClick={this.handleUrl}/>
                <br/><br/>
                <RaisedButton
                 label="Cancel"
                 labelColor="white"
                 backgroundColor="#D32F2F"
                 style={styles.styleCancel}
                 onClick={this.handleClose} />
                <RaisedButton
                 labelColor="white"
                 label="Change"
                 style={styles.styleSubmit}
                 backgroundColor="#4CAF50" />
              </Dialog>
            </Col>
          </Row>
        </Grid>
      </div> 
		);
	}
}