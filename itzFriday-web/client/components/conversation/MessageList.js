import React from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {amber100,green100,orange100,grey50} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import SocialNotifications from 'material-ui/svg-icons/social/notifications';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ImageDehaze from 'material-ui/svg-icons/image/dehaze';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import HardwareTv from 'material-ui/svg-icons/hardware/tv';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ImageTagFaces from 'material-ui/svg-icons/image/tag-faces';

var groups=[];
var messages =[];

const styles = {
	iconButton : {
		color: 'white'
	},
	appBar : {
		color: 'white',
		backgroundColor: '#004D40',
		width: '*',
	},
	listItem : {
		color: '#004D40',
		backgroundColor:'white',
		textDecoration: 'none',
	},
	linkItem : {
		textDecoration: 'none',
		backgroundColor:'white',
		color: '#004D40'
	},
};

export default class MessageList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			messages: this.props.messages,
		};

		this.displayMessage = this.displayMessage.bind(this);
		this.changeState = this.changeState.bind(this);
		this.compressName = this.compressName.bind(this);

		groups = this.props.messages;
		messages=[];
		for( let index in groups)
		{
			messages.push(<ListItem style={styles.linkItem} onTouchTap={() => this.displayMessage(groups[index].name)} leftAvatar={<Avatar>{groups[index].name.substring(0,1)}</Avatar>} rightIcon={<CommunicationChat />}>{this.compressName(groups[index].name)}</ListItem>);
		}
	}

	compressName(name)
	{
		return this.props.nameCompressor(name);
	}

	componentWillReceiveProps(nextProps) {

		this.changeState(nextProps.messages);

		groups = this.state.messages;
		messages=[];
		for( let index in groups)
		{
			messages.push(<ListItem style={styles.linkItem} onTouchTap={() => this.displayMessage(groups[index].name)} leftAvatar={<Avatar>{groups[index].name.substring(0,1)}</Avatar>} rightIcon={<CommunicationChat />}>{this.compressName(groups[index].name)}</ListItem>);
		}
		messages.push(<Divider/>);
	}

	displayMessage(name)
	{
		this.props.changeMessage(name);
	}

	changeState (messages)
	{
		this.setState({messages});
	}

	render()
	{
		if(this.props.appBarTitle === 'Dashboard')
		{
			return (<span />);
		}
		return(
				<ListItem primaryText="Conversations" id="messages" key="messages" style={styles.listItem} initiallyOpen={false} primaryTogglesNestedList={true}
				nestedItems={messages}>
				</ListItem>
			);
	}
}
