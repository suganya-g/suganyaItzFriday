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
import SocialPerson from 'material-ui/svg-icons/social/person';
import ImageDehaze from 'material-ui/svg-icons/image/dehaze';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import HardwareTv from 'material-ui/svg-icons/hardware/tv';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ImageTagFaces from 'material-ui/svg-icons/image/tag-faces';

var groups=[];
var channels =[];

const styles = {
	rootContainer : {
		margin: '0px 0px 0px 0px',
		padding: '0px 0px 0px 0px',
	},
	iconButton : {
		color: 'white'
	},
	container : {
		margin: '0px 0px 0px 0px',
		padding: '10px',
		background: "#e0f2f1",
	},
	appBar : {
		color: 'white',
		backgroundColor: '#004D40',
		width: '*',
	},
	projectList : {
		color: 'white',
		float: 'left',
		width: '150px',
		height: window.innerHeight,
		margin: '0px 0px 0px 0px',
		padding: '2px 2px 2px 2px',
	},
	projectListItem : {
		marginTop: '2px',
		color: '#424242',
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
	projectNameListItem : {
		color: '#607D8B'
	},
};

export default class ChannelList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			channels: this.props.channels,
		};
		this.displayChannel = this.displayChannel.bind(this);
		this.changeState = this.changeState.bind(this);
		this.compressName = this.compressName.bind(this);
		groups = this.props.channels;
		channels=[];
		for( let index in groups)
		{
			channels.push(<ListItem style={styles.linkItem} onTouchTap={() => this.displayChannel(groups[index])} leftIcon={<SocialPerson />}>{this.compressName(groups[index])}</ListItem>);
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
			channels.push(<ListItem style={styles.linkItem} onTouchTap={() => this.displayChannel(groups[index])} leftIcon={<SocialPerson />}>{this.compressName(groups[index])}</ListItem>);
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
			<ListItem primaryText="Channels" id="channels" key="channels" style={styles.listItem} initiallyOpen={false} primaryTogglesNestedList={true}
			nestedItems={channels}>
			</ListItem>
			);
	}
}
