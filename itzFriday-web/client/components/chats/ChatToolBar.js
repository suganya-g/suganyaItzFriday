import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import ActionDescription from 'material-ui/svg-icons/action/description';
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books';
import ActionHelp from 'material-ui/svg-icons/action/help';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialGroup from 'material-ui/svg-icons/social/group';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import MapsDirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import ActionSpeakerNotesOff from 'material-ui/svg-icons/action/speaker-notes-off';
import ActionGroupWork from 'material-ui/svg-icons/action/group-work';
import ViewList from 'material-ui/svg-icons/action/view-list';
import IconMenu from 'material-ui/IconMenu';
import ActionChromeReaderMode from 'material-ui/svg-icons/action/chrome-reader-mode';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';
import Files from './../files/Files';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from './../../services/auth.service.js'


const styles = {
	toolbarStyle: {
		margin: '0px 0px 0px 0px',
		background: "white",
	},
	toolbarText: {
		color: "#004d40",
		textIndent:'20px'
	},
	showIcon: {
		marginBottom: '5px'
	}
}
var pageNewlyRendered = true;

class ChatToolBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name : this.props.name,
			project: this.props.project

		}
	}

	showFiles = (which) =>
	{
		ReactDOM.unmountComponentAtNode(document.getElementById('dialog'));
		ReactDOM.render(<MuiThemeProvider><Files open={true} title={which + ' Files'} /></MuiThemeProvider>
		,
		document.getElementById('dialog'));
	}


	render() {
		//const name = this.props.name;
		const identifier = this.props.identifier;
		const participants = this.props.participants;
		const muteText = "Mute "+this.state.name;
		const leaveText = "Leave "+this.state.name;
		const viewName = "View "+this.state.name+ "'s profile";
		const viewChanel = "View "+this.state.name+ "'s channels";
		return (
			<Paper zDepth={1} >
				<Toolbar style={styles.toolbarStyle}>
					<ToolbarGroup firstChild={true}>
						<ToolbarTitle text={this.props.name} style={styles.toolbarText}/>
					</ToolbarGroup>
					<ToolbarGroup>
						{this.props.identifier === 'channel' ?
							<IconMenu
    							iconButtonElement={<IconButton><SettingsIcon /></IconButton>}
    							anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    							targetOrigin={{horizontal: 'left', vertical: 'top'}}
  							>

								<MenuItem leftIcon={<SocialPersonAdd />} primaryText="Invite member to join" />
								<MenuItem leftIcon={<MapsDirectionsRun />} primaryText={leaveText} />
    						</IconMenu> :
    						<IconMenu
    							iconButtonElement={<IconButton><SettingsIcon /></IconButton>}
    							anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    							targetOrigin={{horizontal: 'left', vertical: 'top'}}
  							>

								<MenuItem leftIcon={<SocialPerson />} primaryText={viewName} />
								<MenuItem leftIcon={<SocialGroup />} primaryText={viewChanel} />
								<Divider />
								<MenuItem leftIcon={<ActionSpeakerNotesOff />} primaryText={muteText} />
    						</IconMenu>
    					}
    					{this.props.identifier === 'channel' ?
    						<IconMenu
    							iconButtonElement={<IconButton><ActionChromeReaderMode /></IconButton>}
    							anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    							targetOrigin={{horizontal: 'left', vertical: 'top'}}
  							>


								<MenuItem leftIcon={<ActionGroupWork />} primaryText="Channel Members" id="channelMembers" key="channelMembers"/>
								<Divider />
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
