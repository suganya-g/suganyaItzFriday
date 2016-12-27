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
import SocialGroup from 'material-ui/svg-icons/social/group';
import ImageDehaze from 'material-ui/svg-icons/image/dehaze';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import HardwareTv from 'material-ui/svg-icons/hardware/tv';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ImageTagFaces from 'material-ui/svg-icons/image/tag-faces';

var groups=[];
var channels =[];

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
		backgroundColor:'white',
		textDecoration: 'none',
		color: '#004D40'
	},
};

export default class ChannelList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			channels: this.props.channels,
			badgeContent:0
		};
		this.displayChannel = this.displayChannel.bind(this);
		this.changeState = this.changeState.bind(this);
		this.compressName = this.compressName.bind(this);
		groups = this.props.channels;
		channels=[];
		for( let index in groups)
		{
			channels.push(<ListItem style={styles.linkItem} onTouchTap={() => this.displayChannel(groups[index].name)} rightIcon={<Badge badgeContent={this.state.badgeContent} badgeStyle={{backgroundColor:'#004D40',color:'white',visibility: this.state.badgeContent === 0 ? 'hidden' : 'visible'}} />} leftIcon={<SocialGroup />}>{this.compressName(groups[index].name)}</ListItem>);
		}
		channels.push(<Divider />);
		channels.push(<Link to={"addChannel/"} style={styles.linkItem} ><ListItem key={-1} leftIcon={<ContentAddCircle />}>Create channel</ListItem></Link>);
		channels.push(<Divider />);
	}

	compressName(name)
	{
		return this.props.nameCompressor(name);
	}

	componentWillReceiveProps(nextProps)
	{
		this.changeState(nextProps.channels);
		groups = this.state.channels;
		channels=[];
		for( let index in groups)
		{
			channels.push(<ListItem style={styles.linkItem} onTouchTap={() => this.displayChannel(groups[index].name)} rightIcon={<Badge badgeContent={this.state.badgeContent} badgeStyle={{backgroundColor:'#004D40',color:'white',visibility: this.state.badgeContent === 0 ? 'hidden' : 'visible'}} />} leftIcon={<SocialGroup />}>{this.compressName(groups[index].name)}</ListItem>);
		}
		channels.push(<Divider />);
		channels.push(<Link to={"addChannel/"} style={styles.linkItem} ><ListItem key={-1} style={styles.linkItem} leftIcon={<ContentAddCircle />}>Create channel</ListItem></Link>);
		channels.push(<Divider />);
	}

	displayChannel(name)
	{
		this.props.changeChannel(name);
	}

	changeState (channels)
	{
		this.setState({channels});
	}

	render()
	{
		if(this.props.appBarTitle === 'Dashboard')
		{
			return (<span />);
		}
		return(
			<ListItem primaryText="Channels" id="channels" key="channels" style={styles.listItem} initiallyOpen={true} primaryTogglesNestedList={true}
			nestedItems={channels}>
			</ListItem>
			);
	}
}
