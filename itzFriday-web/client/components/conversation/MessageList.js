import React from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {amber100,green100,orange100,grey50} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
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
import Auth from './../../services/auth.service.js';

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
			groups: this.props.messages,
			badgeContent:0,
			currentUser: '',
			notify: {},
			messages: []
		};

		this.displayMessage = this.displayMessage.bind(this);
		this.changeState = this.changeState.bind(this);
		this.compressName = this.compressName.bind(this);
		this.handleUnreadMessageCount = this.handleUnreadMessageCount.bind(this);
		this.renderConversation = this.renderConversation.bind(this);

		this.renderConversation();
		let notify = this.state.notify;
		for(let index in this.state.groups) {
			notify[this.state.groups[index].firstname.split(' ')[0]] = 0;
		}
		this.setState({notify});
	}

	renderConversation()
	{
		let messages=[];
		for( let index in this.state.groups)
		{
			messages.push(<ListItem key={index} style={styles.linkItem} onTouchTap={() => this.displayMessage(this.state.groups[index].firstname)} leftAvatar={<Avatar size={30} style={{backgroundColor:'#004D40'}}>{this.state.groups[index].firstname.substring(0,1)}</Avatar>} rightIcon={<Badge badgeContent={this.state.notify[this.state.groups[index].firstname.split(' ')[0]]} badgeStyle={{backgroundColor:'#004D40',color:'white',visibility: this.state.notify[this.state.groups[index].firstname.split(' ')[0]] === 0 ? 'hidden' : 'visible'}} />}>{this.compressName(this.state.groups[index].firstname)}</ListItem>);
		}
		this.setState({messages})
	}

	compressName(name)
	{
		return this.props.nameCompressor(name);
	}

	componentWillReceiveProps(nextProps) {

		this.changeState(nextProps.messages);
		let notify = this.state.notify;
		this.renderConversation();
		for(let index in this.state.groups) {
			notify[this.state.groups[index].firstname.split(' ')[0]] = 0;
		}
		this.setState({notify})

	}

	displayMessage(name)
	{
		this.setState({currentUser: name.split(' ')[0]});
		this.props.changeMessage(name);
	}

	changeState (messages)
	{
		this.setState({messages: messages});
	}

	componentDidMount() {
		this.context.socket.on('chat:count', this.handleUnreadMessageCount);
	}

	render()
	{
		if(this.props.appBarTitle === 'Dashboard')
		{
			return (<span />);
		}
		return(
				<ListItem primaryText="Conversations" id="messages" key="messages" style={styles.listItem} initiallyOpen={false} primaryTogglesNestedList={true}
				nestedItems={this.state.messages}>
				</ListItem>
			);
	}

	handleUnreadMessageCount(data)
	{
		let notify = this.state.notify;
		console.log('In message list notify:::', notify);
		if(this.state.notify)
		{
			for(let index in this.state.groups)
			{
				let count = 0;
				console.log(this.state.currentUser+'::'+data.sender+'::'+count);
				if(this.state.currentUser !== undefined && data.sender && count !== undefined){
					if(this.state.currentUser !== data.sender.split(' ')[0] && Auth.getNameFromToken() !== data.sender.split(' ')[0]) {
						if(this.state.groups[index].firstname.split(' ')[0] === data.sender.split(' ')[0]) {
							count = this.state.notify[data.sender.split(' ')[0]];
							notify[this.state.groups[index].firstname.split(' ')[0]] = count + 1;
							//console.log(notify[data.sender].split(' ')[0]);
						}
					} else {
						if(this.state.groups[index].firstname.split(' ')[0] === data.sender.split(' ')[0]) {
							count = 0;
							notify[this.state.groups[index].firstname.split(' ')[0]] = 0;
							//console.log(notify[data.sender].split(' ')[0]);
						}
					}
				}
			}
			this.setState({notify: notify});
			this.renderConversation();
			}
		}
}

MessageList.contextTypes = {
  socket: React.PropTypes.object.isRequired
};
