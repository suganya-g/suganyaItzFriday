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
			groups: this.props.channels,
			badgeContent:0,
			currentChannel: '',
			notify: {},
			channels: []
		};
		this.displayChannel = this.displayChannel.bind(this);
		this.changeState = this.changeState.bind(this);
		this.compressName = this.compressName.bind(this);
		this.handleUnreadMessageCount = this.handleUnreadMessageCount.bind(this);
		this.renderChannels = this.renderChannels.bind(this);

		this.renderChannels();
		let notify = this.state.notify;
		for(let index in this.state.groups) {
			notify[this.state.groups[index].title] = 0;
		}
		this.setState({notify});
	}

	renderChannels()
	{
		let channels=[];
		for( let index in this.state.groups)
		{
			channels.push(<ListItem key={index} style={styles.linkItem} onTouchTap={() => this.displayChannel(this.state.groups[index].title,this.state.groups[index]._id)} rightIcon={<Badge badgeContent={this.state.notify[this.state.groups[index].title]} badgeStyle={{backgroundColor:'#004D40',color:'white',visibility: this.state.notify[this.state.groups[index].title] === 0 ? 'hidden' : 'visible'}} />} leftIcon={<SocialGroup color='#004D40'/>}>{this.compressName(this.state.groups[index].title)}</ListItem>);
		}
		channels.push(<Divider />);
		channels.push(<Link to={"project/"+this.props.projectid+"/addChannel"} style={styles.linkItem} ><ListItem key={-1} style={styles.linkItem} leftIcon={<ContentAddCircle color='#004D40'/>}>Create channel</ListItem></Link>);
		channels.push(<Divider />);
		this.setState({channels});
	}

	compressName(name)
	{
		return this.props.nameCompressor(name);
	}

	componentWillReceiveProps(nextProps)
	{

		this.changeState(nextProps.channels);
		let notify = this.state.notify;
		this.renderChannels();
		for(let index in this.state.groups) {
			notify[this.state.groups[index].title] = 0;
		}
		this.setState({notify})

	}

	displayChannel(name,id)
	{
		this.setState({currentChannel: name});
		this.props.changeChannel(name,id);

	}

	changeState (groups)
	{
		this.setState({groups: groups});
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
			<ListItem primaryText="Channels" id="channels" key="channels" style={styles.listItem} initiallyOpen={true} primaryTogglesNestedList={true}
			nestedItems={this.state.channels}>
			</ListItem>
			);
	}

	handleUnreadMessageCount(data)
	{
		console.log("Handling socket data change: ", data);
		let count = 0;
		let notify = this.state.notify;
		if(this.state.notify)
		{
			console.log('qwerr');
			for(let index in this.state.groups)
			{
				count = this.state.notify[data.sender];
				console.log(this.state.currentChannel+'::'+data.sender+'::'+count);
				if(this.state.currentChannel !== undefined && data.sender && count !== undefined) {

					if(this.state.currentChannel !== data.sender) {
						if(this.state.groups[index].title === data.sender) {
						//notify = this.state.notify;
							notify[data.sender] = (++count);
							console.log(notify[data.sender]);
						}
					} else {
						if(this.state.groups[index].title === data.sender) {
						//notify = this.state.notify;
							count = 0;
							notify[data.sender] = count;
							console.log(notify[data.sender]);
						}
					}

				}
			}
			this.setState({notify: notify});
			this.renderChannels();
			}
		}
}

ChannelList.contextTypes = {
  socket: React.PropTypes.object.isRequired
};
