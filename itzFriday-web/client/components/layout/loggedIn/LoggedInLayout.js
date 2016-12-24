import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import {grey50} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ChannelList from './../../conversation/ChannelList';
import MessageList from './../../conversation/MessageList';
import Drawer from 'material-ui/Drawer';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ImageDehaze from 'material-ui/svg-icons/image/dehaze';
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AVRecentActors from 'material-ui/svg-icons/av/recent-actors';
import FileFolderShared from 'material-ui/svg-icons/file/folder-shared';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ManageTeam from './../../sendInvite/SendInvite';
import Auth from '../../../services/auth.service.js';
import MediaQuery from 'react-responsive';
import { Grid, Row, Col } from 'react-flexbox-grid';
//styling
const styles = {
	rootContainer : {
		margin: '0px 0px 0px 0px',
		padding: '0px 0px 0px 0px',
	},
	container : {
		margin: '0px 0px 0px 0px',
		padding: '0px 0px 0px 0px',
		background: "#e0f2f1",
	},
	drawer : {
		backgroundColor: "#004D40",
		overflowY : 'auto',
		width:'250px',
		margin: '0px 0px 0px 0px'
	},
	appBar : {
		color: 'white',
		backgroundColor: '#00695C',
	},
	leftPane : {
		margin: '0px 0px 0px 0px',
		padding: '0px 0px 0px 0px',
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
					channels:[{name:"General",id: 0},{name:"Acolyte",id:1}],
					messages:[{name:"Gobinda Thakur",id:0},{name:"Apurv Tiwari",id:1},{name:"Ruchika Saklani",id:2},{name:"Suganya Gopal",id:3},{name:"Ankit Aggarwal",id:4},{name:"Vikram Marshmallow",id:5}]
				},
				{
					name:'Samarth',
					channels:[{name:"General",id:0},{name:"Developers",id:1}],
					messages:[{name:"Amol Tiwari",id:0},{name:"Ankit Kumar Vashisht",id:1},{name:"Shinder Pal Singh",id:2},{name:"Ritesh",id:3},{name:"Kumari Devi",id:4},{name:"Hari Prasad",id:5},{name:"Prerna Kukreti",id:6}]
				},
				{
					name:'Quiztack',
					channels:[{name:"General",id:0},{name:"Backend",id:1}],
					messages:[{name:"Vishant Sharma",id:0},{name:"Kirti Jalan",id:1},{name:"Dhivya Lakshmi",id:2},{name:"Lal Jose",id:3},{name:"Srinivasan",id:4},{name:"Nitin Verma",id:5}]
				},
				{
					name:'Oxygen',
					channels:[{name:'General',id:0},{name:'Designers',id:1}],
					messages:[{name:"Sreenidhi",id:0},{name:"Toolika Srivastava",id:1},{name:"Nanda",id:2},{name:"Shipra Joshi",id:3},{name:"Bala",id:4},{name:"Divyanshu Sharma",id:5}]
				},
		];
		currentProject = 'Friday';
		this.state = {
			mainMenuOpen: false,
			appBarTitle: 'Notifications',
			imageLogoUrl: './../../resources/images/buddy.png',
			channels: '',
			messages: '',
			open: false,
			openIndex:0,
			loggedIn: Auth.loggedIn()
		};

		this.handleChannelChange = this.handleChannelChange.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.openThisProject=this.openThisProject.bind(this);
		this.signOut=this.signOut.bind(this);
		this.handleAccount = this.handleAccount.bind(this);
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
	openThisProject (projectName)
	{
		currentProject = projectName ;
		console.log(currentProject);
		localStorage['project']=currentProject;
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

  handleToggle = () => this.setState({open: !this.state.open});

	handleMessageChange(name)
	{
		this.props.router.replace('/chat/?project='+this.state.appBarTitle+'&name='+name+'&identifier=message');
		this.closeMainMenu();
	}

	handleAccount (e)
	{
		this.closeMainMenu();
	}
	changeLogo (url)
	{
		this.setState({imageLogoUrl : url});
	}
	closeMainMenu ()
	{
		this.setState({mainMenuOpen: false});
	}
	signOut (e)
	{
		Auth.logout();
		this.props.router.replace('login/');
	}
	 render() {
		const isLogged = Auth.loggedIn();
		projectList =[];
		for (let index in projects)
		 {
			 projectList.push(
			      <ListItem leftIcon={<FileFolder />} rightIcon={ <Badge badgeContent={10} />} style={{color:'white'}} primaryText={projects[index].name}
							 onNestedListToggle={this.handleNestedListToggle.bind(this,index)}
							 open={this.state.openIndex===index}
							 primaryTogglesNestedList={true}
							 onClick={()=>this.openThisProject(projects[index].name)}
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
			<div className="wrap container-fluid">
			<div style={styles.rootContainer}>
			{isLogged ?
			<div>
			    <MediaQuery query='(min-device-width: 1024px)'>
					<div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
						<div className="leftPane" style={styles.leftPane}>
								<Drawer open={true} docked={true} id="projectList" containerStyle={styles.drawer} zDepth={2}>
											 <List>
														{projectList}
											 </List>
								</Drawer>
							</div>
					 </div>
			         <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{width:'100%'}}>
							      <div className="row">
										<AppBar id='appbar' title={this.state.appBarTitle} titleStyle={{textAlign:'center'}} style={styles.appBar}
										zDepth={2}
										iconElementLeft ={<span/>}
											iconElementRight={
												<span id="toggleMainMenu">
												<IconMenu
										iconButtonElement={<IconButton onTouchTap={this.toggleMainMenu}>	<ImageDehaze color={grey50} /></IconButton>}
										anchorOrigin={{horizontal: 'left', vertical: 'top'}}
										targetOrigin={{horizontal: 'left', vertical: 'top'}}>
										<List>
										<ListItem leftIcon={<AVRecentActors/>} primaryText="Account Settings" id="accountSettings" key="accountSettings" primaryTogglesNestedList={true} style={styles.listItem}
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

										<ListItem leftIcon={<FileFolderShared/>} primaryText="Manage Project Team" id="manageTeam" key="manageTeam" style={styles.listItem} onTouchTap={this.closeMainMenu} primaryTogglesNestedList={true} nestedItems={[
												<ListItem
															key={1}
															primaryText="Invite People"
															leftIcon={<ContentDrafts />} />,
												<Link to={"manageTeam/"} style={{textDecoration:'none'}}>
												<ListItem
															 key={2}
															 primaryText="Remove People"
															leftIcon={<ContentRemoveCircle />} />
												</Link>
											]}/>
											<ListItem leftIcon={<ActionPowerSettingsNew />} primaryText="Sign Out" id="signOut" key="signOut" style={styles.listItem} onTouchTap={this.signOut} />
											</List>
												</IconMenu>
												</span>
											}
											iconStyleLeft={{cursor: 'pointer'}}/>
										</div>
			         </div>
			     </MediaQuery>

			     <MediaQuery query='(max-device-width: 1023px)' className="leftPane">
					 <div className='row'>
			           <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								 <AppBar style={{backgroundColor:'#00695C'}} title={this.state.appBarTitle} iconElementLeft={<span>
									 <IconButton  onTouchTap={this.handleToggle}><NavigationApps color={grey50} /></IconButton>
									 <Drawer
														 docked={false}
														 width={200}
														 containerStyle={{backgroundColor: "#004D40"}}
														 open={this.state.open}
														 onRequestChange={(open) => this.setState({open})}
													 >
													 <List>
													 {projectList}
													 </List>
													 </Drawer>
												 </span>}
				 iconElementRight={<span id="toggleMainMenu">
				 <IconMenu
				 iconButtonElement={<IconButton onTouchTap={this.toggleMainMenu}>	<ImageDehaze color={grey50} /></IconButton>}
				 anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				 targetOrigin={{horizontal: 'left', vertical: 'top'}}>
				 <List>
				 <ListItem leftIcon={<AVRecentActors/>} primaryText="Account Settings" id="accountSettings" key="accountSettings" primaryTogglesNestedList={true} style={styles.listItem}
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

				 <ListItem leftIcon={<FileFolderShared/>} primaryText="Manage Project Team" id="manageTeam" key="manageTeam" style={styles.listItem} onTouchTap={this.closeMainMenu} primaryTogglesNestedList={true} nestedItems={[
				 <ListItem
							 key={1}
							 primaryText="Invite People"
							 leftIcon={<ContentDrafts />} />,
				 <Link to={"manageTeam/"} style={{textDecoration:'none'}}>
				 <ListItem
								key={2}
								primaryText="Remove People"
							 leftIcon={<ContentRemoveCircle />} />
				 </Link>
				 ]}/>
				 <ListItem leftIcon={<ActionPowerSettingsNew />} primaryText="Sign Out" id="signOut" key="signOut" style={styles.listItem} onTouchTap={this.signOut} />
				 </List>
				 </IconMenu>
				 </span>}>
								 </AppBar>
			           </div>
						</div>
			     </MediaQuery>
					 </div>: ''}
					 <MediaQuery query='(min-device-width: 1024px)'>
					 <div className="row" style={{width:'100%'}}>
								<div id="content" style={{backgroundColor: "#e0f2f1",margin: '0px 0px 0px 0px',padding: '0px 0px 0px 0px',marginLeft:'200px'}}>
										 {this.props.children}
								</div>
					 </div>
					 </MediaQuery>
					  <MediaQuery query='(max-device-width: 1023px)'>
						<div className="row">
 								<div id="content" style={styles.container}>
 										 {this.props.children}
 								</div>
 					 </div>
						</MediaQuery>
					</div>
         </div>
					</MuiThemeProvider>
					);
}
}
