import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {amber100,green100,orange100,grey50} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import SocialNotifications from 'material-ui/svg-icons/social/notifications';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ImageDehaze from 'material-ui/svg-icons/image/dehaze';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import FileFolder from 'material-ui/svg-icons/file/folder';
import HardwareTv from 'material-ui/svg-icons/hardware/tv';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ImageTagFaces from 'material-ui/svg-icons/image/tag-faces';
import ChannelList from './../../conversation/ChannelList';
import MessageList from './../../conversation/MessageList';
import Auth from '../../../services/auth.service.js';
//styling
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
		padding: '5px 5px 5px 5px',
		background: "#e0f2f1",
		float:'left'
	},
	drawer : {
		backgroundColor: "#004D40",
		width:"250px",
		position: "relative",
		height:window.innerHeight,
		overflowY : 'auto',
	},
	leftPane : {
		width:"250px",
		float:'left',
		margin: '0px 0px 0px 0px',
		padding: '0px 0px 0px 0px',
		clear: 'left'
	},
	appBar : {
		color: 'white',
		width: (window.innerWidth-250),
		backgroundColor: '#004D40',
		float: 'left'
	},
	listItem : {
		color: '#004D40',
		backgroundColor:'white',
		textDecoration: 'none',
	},
	linkItem : {
		textDecoration: 'none',
		color: '#424242'
	},
	projectNameListItem : {
		color: '#607D8B'
	},
};

var messages= [];
var channels= [];
var projects = [];
var projectList = [];
var currentProject = '';
var members = [];
var groups = [];
var listKey = 0;
var isFirst = true;

export default class LoggedInLayout extends React.Component
{
	constructor(props)
	{
		super(props);

		listKey = 0;
		messages = [];
		channels = [];
		projects = [
				{
					name:'Friday',
					channels:["General","Acolyte"],
					messages:["Gobinda Thakur","Apurv Tiwari","Ruchika Saklani","Suganya Gopal","Ankit Aggarwal","Vikram Marshmallow"]
				},
				{
					name:'Samarth',
					channels:["General","Developers"],
					messages:["Amol Tiwari","Ankit Kumar Vashisht","Shinder Pal Singh","Ritesh","Kumari Devi","Hari Prasad","Prerna Kukreti"]
				},
				{
					name:'Quiztack',
					channels:["General","Backend"],
					messages:["Vishant Sharma","Kirti Jalan","Dhivya Lakshmi","Lal Jose","Srinivasan","Nitin Verma"]
				},
				{
					name:'Oxygen',
					channels:['General','Designers'],
					messages:["Sreenidhi","Toolika Srivastava","Nanda","Shipra Joshi","Bala","Divyanshu Sharma"]
				},
		];


		currentProject = 'Friday';

		this.state = {
			mainMenuOpen: false,
			appBarTitle: 'Notifications',
			imageLogoUrl: './../../resources/images/buddy.png',
			channels: '',
			messages: '',
			open: true,
			openIndex:0,
			loggedIn: Auth.loggedIn()
		};

		this.handleChannelChange = this.handleChannelChange.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.openThisProject=this.openThisProject.bind(this);
		this.handleState=this.handleState.bind(this);
		this.handleAccount = this.handleAccount.bind(this);
		this.signOut = this.signOut.bind(this);
		this.toggleMainMenu = this.toggleMainMenu.bind(this);
		this.closeMainMenu = this.closeMainMenu.bind(this);
		this.changeLogo = this.changeLogo.bind(this);
		this.changeChannelState = this.changeChannelState.bind(this);
		this.changeMessageState = this.changeMessageState.bind(this);
		this.openNotificationBoard = this.openNotificationBoard.bind(this);
		this.setTitleToNotifications = this.setTitleToNotifications.bind(this);
		this.nameCompressor = this.nameCompressor.bind(this);
	}

	nameCompressor(name)
	{
		let temp = name.split(' ');
		let compressedName = temp[0] + ' ';
		for( let index in temp)
		{
			if(index > 0)
				compressedName += temp[index][0] + '.';
		}
		return compressedName.trim();
	}

  handleNestedListToggle(index)
	{
		this.setState({openIndex:index});
	}
	openNotificationBoard ()
	{
		console.log("in  openNotificationBoards");
		this.setTitleToNotifications();
		this.props.router.replace('notifications/');
	}

	setTitleToNotifications () {
		this.setState({appBarTitle: 'Notifications'});
	}

	componentWillMount() {
		this.setState({loggedIn: Auth.loggedIn()})
	}
  handleState(newState)
	{
		console.log(newState.activeItems);
	}

	openThisProject (event)
	{
		currentProject = event.target.innerText ;
		this.setState({appBarTitle: currentProject});
		this.props.router.replace('chat/?project='+currentProject+'&name=Droid&identifier=message');
	};
	changeChannelState (channels)
	{
		this.setState({channels});
	}

	changeMessageState (messages)
	{
		this.setState({messages});
	}

	handleChannelChange(name)
	{
		this.props.router.replace('/chat/?project='+this.state.appBarTitle+'&name='+name+'&identifier=channel');
		this.closeMainMenu();
	}

	handleMessageChange(name)
	{
		this.props.router.replace('/chat/?project='+this.state.appBarTitle+'&name='+name+'&identifier=message');
		this.closeMainMenu();
	}

	handleAccount (e)
	{
		this.closeMainMenu();
	}

	signOut (e)
	{
		Auth.logout();
		this.props.router.replace('/login/');
	}

	changeLogo (url)
	{
		this.setState({imageLogoUrl : url});
	}

	toggleMainMenu ()
	{
		this.setState({mainMenuOpen: !this.state.mainMenuOpen});
	}

	closeMainMenu ()
	{
		this.setState({mainMenuOpen: false});
	}

	render() {
		const isLogged = Auth.loggedIn();
		projectList =[];
		for (let index in projects)
		 {
			 projectList.push(<ListItem leftIcon={<FileFolder />} style={{color:'white'}} primaryText={projects[index].name}
							 onNestedListToggle={this.handleNestedListToggle.bind(this,index)}
							 open={this.state.openIndex===index}
							 primaryTogglesNestedList={true}
							 onClick={()=>this.openThisProject(event)}
							 nestedItems={[
								 <div style={{backgroundColor:'white'}}>
								 <Link to={'chat/?project='+this.state.appBarTitle+'&name=Droid&identifier=message'} style={styles.listItem} onTouchTap={() => this.handleMessageChange('Droid')}><ListItem key="friday" id="friday" style={styles.listItem} leftAvatar={<Avatar style={{height:'30', backgroundColor:'transparent'}} src={this.state.imageLogoUrl} alt="Friday" />}><strong>Droid</strong></ListItem></Link>
								 <Divider />
								<ChannelList nameCompressor={this.nameCompressor} channels={projects[index].channels} changeChannel={this.handleChannelChange} appBarTitle={this.state.appBarTitle}/>
								<Divider />
								 <MessageList nameCompressor={this.nameCompressor} messages={projects[index].messages} changeMessage={this.handleMessageChange} appBarTitle={this.state.appBarTitle}/>
							 <Divider />
							 </div>
						 ]} />);
		}

		return (
			<MuiThemeProvider>
			<div style={styles.rootContainer}>

			<div className="leftPane" style={styles.leftPane}>
			{isLogged ?
			<Paper id="projectList" style={styles.drawer} zDepth={2}>
		  <List>
			{projectList}
			</List>
			</Paper>: ''}
			</div>

			{isLogged ?
			<div>
			<AppBar id='appbar' title={this.state.appBarTitle} titleStyle={{textAlign:'center'}} style={styles.appBar}
			zDepth={2}
			iconElementLeft ={<span/>}
				iconElementRight={
					<span id="toggleMainMenu">
					<IconMenu
      iconButtonElement={<IconButton onTouchTap={this.toggleMainMenu}>	<SettingsIcon color={grey50} /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}>
      <List>
			<ListItem primaryText="Account Settings" id="accountSettings" key="accountSettings" primaryTogglesNestedList={true} style={styles.listItem}
			nestedItems={[
				<Link to={"profile/"} style={{textDecoration:"none"}}>
				<ListItem
							key={1}
							primaryText="Profile"
							leftIcon={<ActionAccountBox />} />
        </Link>,
				<Link to={"buddy/"} style={{textDecoration:"none"}}>
				<ListItem
              key={2}
              primaryText="Droid settings"
							leftAvatar={<Avatar style={{backgroundColor:'transparent',width:'30px'}} src={this.state.imageLogoUrl} alt="Friday" />} />
				</Link>
			]} />

				<ListItem primaryText="Notification Settings" id="notificationSettings" key="notificationSettings" style={styles.listItem} onTouchTap={this.closeMainMenu}/>
				<ListItem primaryText="Sign Out" id="signOut" key="signOut" style={styles.listItem} onTouchTap={this.signOut} />
				</List>
					</IconMenu>
					</span>
				}
				iconStyleLeft={{cursor: 'pointer'}}/>
				</div>: ''}

					<div id="content" style={styles.container}>
					{this.props.children}
					</div>
					</div>

					</MuiThemeProvider>
					);
}
}
