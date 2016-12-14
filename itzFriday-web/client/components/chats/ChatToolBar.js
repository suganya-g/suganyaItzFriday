import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton'
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import ActionDescription from 'material-ui/svg-icons/action/description';
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books';
import ActionHelp from 'material-ui/svg-icons/action/help';
import ViewList from 'material-ui/svg-icons/action/view-list';
import IconMenu from 'material-ui/IconMenu';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';
import Files from './../files/Files';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
	toolbarStyle: {
		margin: '0px 0px 0px 0px',
		background: "white",
		width: "100%",
		textIndent: '20px',	
	},
	toolbarText: {
		color: "#004d40"
	},
	showIcon: {
		marginBottom: '5px'
	}
}
var pageNewlyRendered = true;

class ChatToolBar extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.participants);
	}

	showFiles = (which) =>
	{
		ReactDOM.unmountComponentAtNode(document.getElementById('dialog'));
		ReactDOM.render(<MuiThemeProvider><Files open={true} title={which + ' Files'} /></MuiThemeProvider>
		,
		document.getElementById('dialog'));
	}

	render() {
		const name = this.props.name;
		const identifier = this.props.identifier;
		const participants = this.props.participants;
		const muteText = "Mute "+name;
		const leaveText = "Leave "+name;
		const viewName = "View "+name+ "'s profile";
		const viewChanel = "View "+name+ "'s channels";
		return (
			<Paper zDepth={1}>
				<Toolbar style={styles.toolbarStyle}>
					<ToolbarGroup firstChild={true}>
						<ToolbarTitle text={name} style={styles.toolbarText}/>
					</ToolbarGroup>
					<ToolbarGroup>
						{this.props.identifier === 'channel' ? 
							<IconMenu
    							iconButtonElement={<IconButton><SettingsIcon /></IconButton>}
    							anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    							targetOrigin={{horizontal: 'left', vertical: 'top'}}
  							>

								<MenuItem primaryText="Invite member to join" />
								<MenuItem primaryText="View channel details" />
								<Divider />
								<MenuItem primaryText={muteText} />
								<Divider />
								<MenuItem primaryText={leaveText} />
    						</IconMenu> : 
    						<IconMenu
    							iconButtonElement={<IconButton><SettingsIcon /></IconButton>}
    							anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    							targetOrigin={{horizontal: 'left', vertical: 'top'}}
  							>

								<MenuItem primaryText={viewName} />
								<MenuItem primaryText={viewChanel} />
								<Divider />
								<MenuItem primaryText={muteText} />
    						</IconMenu>
    					}
    					{this.props.identifier === 'channel' ? 
    						<IconMenu
    							iconButtonElement={<IconButton><i className="material-icons">chrome_reader_mode</i></IconButton>}
    							anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    							targetOrigin={{horizontal: 'left', vertical: 'top'}}
  							>
  								<MenuItem primaryText="Team Members"/>
								<MenuItem primaryText="Ankit" rightIcon={<CommunicationChatBubble />}/>
								<MenuItem primaryText="Apurv" rightIcon={<CommunicationChatBubble />}/>
								<MenuItem primaryText="Gobinda" rightIcon={<CommunicationChatBubble />}/>
								<MenuItem primaryText="Suganya" rightIcon={<CommunicationChatBubble />}/>
								<MenuItem primaryText="Ruchika" rightIcon={<CommunicationChatBubble />}/>
								<MenuItem primaryText="Vikram" rightIcon={<CommunicationChatBubble />}/>
    						</IconMenu> : 
    						''
    					}
    					<ToolbarSeparator />
    					<IconMenu
    						iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    						targetOrigin={{horizontal: 'left', vertical: 'top'}}
  						>

							<MenuItem primaryText="Your Files" leftIcon={<ActionDescription/>} onTouchTap={() => this.showFiles('Your')}/>
							<MenuItem primaryText="All Files" leftIcon={<AvLibraryBooks/>} onTouchTap={() => this.showFiles('All')}/>
							<Divider />
							<MenuItem primaryText="Help"  leftIcon={<ActionHelp/>}/>
    					</IconMenu>
					</ToolbarGroup>
				</Toolbar>
				<div id="dialog">
				</div>
				</Paper>
			)
	}
}

export default ChatToolBar;
