import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem,makeSelectable} from 'material-ui/List';
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
import SocialPerson from 'material-ui/svg-icons/social/person';
import MediaQuery from 'react-responsive';
import { Grid, Row, Col } from 'react-flexbox-grid';
import request from 'superagent';
import Project from './../../../services/getLoggedInData.js';
import async from 'async';
import SocketConnection from './../../../services/socket.service.js';

const styles = {
	rootContainer : {
		margin: '0px 0px 0px 0px',
		padding: '0px 0px 0px 0px',
	},
	container : {
		margin: '0px 0px 0px 0px',
		padding: '0px 0px 0px 0px',
		background: "#C8E6C9",
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


export default class ProjectLayout extends React.Component{
	constructor(props,context)
	{
		super(props,context);

		let messages = [];
		let channels = [];
		let projects = [
		{
			title:'Friday',
			_id:"21908309238209381",
			channels:[{title:"General",_id: 0},{title:"Acolyte",_id:1}],
			messages:[{firstname:"Gobinda Thakur",id:0},{firstname:"Apurv Tiwari",id:1},{firstname:"Ruchika Saklani",id:2},{firstname:"Suganya Gopal",id:3},{firstname:"Ankit Aggarwal",id:4},{firstname:"Vikram Marshmallow",id:5}]
		},
		{
			title:'Samarth',
			_id:"219083092382093248",
			channels:[{title:"General",id:0},{title:"Developers",id:1}],
			messages:[{firstname:"Amol Tiwari",id:0},{firstname:"Ankit Kumar Vashisht",id:1},{firstname:"Shinder Pal Singh",id:2},{firstname:"Ritesh",id:3},{firstname:"Kumari Devi",id:4},{firstname:"Hari Prasad",id:5},{firstname:"Prerna Kukreti",id:6}]
		},
		{
			title:'Quiztack',
			_id:"21908309238209538",
			channels:[{title:"General",id:0},{title:"Backend",id:1}],
			messages:[{firstname:"Vishant Sharma",id:0},{firstname:"Kirti Jalan",id:1},{firstname:"Dhivya Lakshmi",id:2},{firstname:"Lal Jose",id:3},{firstname:"Srinivasan",id:4},{firstname:"Nitin Verma",id:5}]
		},
		{
			title:'Oxygen',
			_id:"21908309238204938",
			channels:[{title:'General',id:0},{title:'Designers',id:1}],
			messages:[{firstname:"Sreenidhi",id:0},{firstname:"Toolika Srivastava",id:1},{firstname:"Nanda",id:2},{firstname:"Shipra Joshi",id:3},{firstname:"Bala",id:4},{firstname:"Divyanshu Sharma",id:5}]
		},
		];
		let currentProject = 'Friday';
		let project=[];
		project=this.props.projectDetails;
		console.log(project);
		this.state = {
			projectDetails:{},
			abc: {projectName:'', projectId:'', channels: [], members: []},
			xyz: {channels: [], messages: []},
			mainMenuOpen: false,
			appBarTitle: 'Notifications',
			imageLogoUrl: './../../resources/images/buddy.png',
			channels: '',
			messages: '',
			open: false,
			openIndex:0,
			badgeContent:0,
			loggedIn: Auth.loggedIn(),
			projects:this.props.projectDetails,
			projectID:[{channels:[],members:[]}],
			channels:[],
			members:[],
			currentProject : ''		//stores current project ID only

		};
		let projectss = this.context.projectList;
		console.log(projectss);
		let obj ={};
		for (let index in projectss){
			let id=projectss[index]._id;
			obj[id]=
				{
					channels:[{title:''}],
				    members:[{firstname:''}]
				}

			this.state={
				projectDetails:obj
			}
		}
		console.log("printing state in constructor");
		console.log(JSON.stringify(this.state));
		console.log("in constructor of project layout");
		console.log(JSON.stringify(this.state.projects));
    this.signOut=this.signOut.bind(this);
		this.handleChannelChange = this.handleChannelChange.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.closeMainMenu = this.closeMainMenu.bind(this);
		this.changeChannelState = this.changeChannelState.bind(this);
		this.changeMessageState = this.changeMessageState.bind(this);
		this.nameCompressor = this.nameCompressor.bind(this);
		this.handleOpenList=this.handleOpenList.bind(this);
		//this.getProjects= this.getProjects.bind(this);
		//this.getChannels = this.getChannels.bind(this);
		this.setChannelsState=this.setChannelsState.bind(this);
		this.setCurrentProject = this.setCurrentProject.bind(this);
		this.changeState = this.changeState.bind(this);
		this.setProjectDetailsState = this.setProjectDetailsState.bind(this);

		console.log(this.props);
	}
	getChildContext() {
  		return {
    		socket: SocketConnection.getSocketConnection()
  		}
	}
/*	static get childContextTypes(){
		return{
			projectList:React.PropTypes.object.isRequired

		}
	}*/
	/*static get contextTypes() {
		return {
			router:React.PropTypes.object.isRequired
		}

	}*/
	// static get contextTypes(){
	// 	return {
	// 		projectList:React.PropTypes.object.isRequired
	// 	}
	// }
	// getChannelsMembers(projectID){
	// 	async.parallel({
	// 		channels:function(callback){
	// 				request.post(config.resturl+'/api/channelDetails/')
	// 				.set('Content-Type','application/json')
	// 				.send({projectID:projectID})
	// 				.end((error,res)=>{
	// 					console.log("in get channels");
	// 					console.log(res.body.channels)
	// 					callback(null,res.body.channels);
	// 	});
	// 		},
	// 		members:function(callback){
	// 				request.post(config.resturl+'/api/members/')
	// 				  .set('Content-Type','application/json')
	// 				  .send({projectID:projectID})
	// 				  .end((error,res)=>{
	// 				 	//this.setMemberState(res.body.members);
	// 				 	callback(null,res.body.members);
 // 				});
	// 		}
	// 	},(error,results)=>{
	// 		console.log(results);
	// 		this.setProjectDetailsState(results);
	// 	})
	// }
	componentDidMount(){
		console.log("in componentDidMount of ProjectLayout");
        console.log(this.props.params.projectid);
        console.log(this.context);
        let projectID = this.props.params.projectid;
        console.log("this is componentDidMount Method");
        console.log(projectID);
        let tokenarray = localStorage['token'].split(".");
       let userdetails = atob(tokenarray[1]);
       console.log(userdetails);
       let userData=JSON.parse(userdetails);
       console.log(typeof userData);
       console.log(userData);
        async.parallel({
            channels:function(callback){
                    request.post('/api/channelDetails/')
                    .set('Content-Type','application/json')
                    .send({projectID:projectID,userID:userData.userid})
                    .end((error,res)=>{
                        console.log("in get channels");
                        console.log(res.body.channels)
                        callback(null,res.body.channels);
                });
            },
            members:function(callback){
                    request.post('/api/members/')
                      .set('Content-Type','application/json')
                      .send({projectID:projectID})
                      .end((error,res)=>{
                         //this.setMemberState(res.body.members);
                         callback(null,res.body.members);
                });
            }
        },(error,results)=>{
            console.log("Did mount of project Layout is called here");
            console.log(results);
            this.setProjectDetailsState(results,projectID);
        })
	}
	componentWillReceiveProps(nextProps)
	{
		console.log('in will receive props');
		console.log(nextProps);

		if(this.props.params.projectid!==nextProps.params.projectid)
		{
			let projectID = nextProps.params.projectid;
			console.log("this is componentDidMount Method");
			console.log(projectID);
			console.log("this is componentDidMount Method");
			console.log(projectID);
			let tokenarray = localStorage['token'].split(".");
	        let userdetails = atob(tokenarray[1]);
	        console.log(userdetails);
	        let userData=JSON.parse(userdetails);
	        console.log(typeof userData);
	        console.log(userData);
			async.parallel({
				channels:function(callback)
				{
						request.post('/api/channelDetails/')
						.set('Content-Type','application/json')
						.send({projectID:projectID,userID:userData.userid})
						.end((error,res)=>{
							console.log("in get channels");
							console.log(res.body.channels)
							callback(null,res.body.channels);
					});
				},
				members:function(callback){
						request.post('/api/members/')
						  .set('Content-Type','application/json')
						  .send({projectID:projectID})
						  .end((error,res)=>{
						 	//this.setMemberState(res.body.members);
						 	callback(null,res.body.members);
	 				});
				}
			},(error,results)=>{
				console.log("Did mount of project Layout is called here");
				console.log(results);
				this.setProjectDetailsState(results,projectID);
			})
		}

	}
	setProjectDetailsState(results,projectID){
		let projectid = projectID;
		console.log(projectID);
		console.log(results);
		console.log(results.channels);
		console.log(results.members);
		const obj = this.state.projectDetails || {};
		obj[projectid] = {channels:results.channels,members:results.members}
		console.log(obj);
		console.log("in setting state");
		console.log(obj);
		this.setState({projectDetails:obj});
	}
	getChannels(projectID) {
		console.log("in get Channels" + projectID);
		request.post('/api/channelDetails/')
		.set('Content-Type','application/json')
		.send({projectID:projectID})
		.end((error,res)=>{
			console.log("in get channels");
			console.log(res.body.channels)
		   this.setChannelsState(res.body.channels);
		});
	}
	setChannelsState(channels){
		this.setState({channels:channels});
	}

	getMembers(projectID){;
		console.log("in get members"+ projectID);
		request.post('/api/members/')
		  .set('Content-Type','application/json')
		  .send({projectID:projectID})
		  .end((error,res)=>{
		   this.setMemberState(res.body.members);
 		})
	}
	setMemberState(members){
		this.setState({
			members:members
		})
	}

	getProjects(userID) {
		request.post('/api/projects/')
		.set('Content-Type','application/json')
		.send({userID:userID})
		.end((error,res)=>{
			console.log(res.body);
			projects=res.body;
			this.setState({projects:res.body})
		})
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

	signOut (e)
	{
		Auth.logout();
		localStorage.clear();
		this.props.router.replace('/');
	}
	handleNestedListToggle(index)
	{
		this.handleOpenList(index);
	}

	handleOpenList(index)
	{
		this.setState({openIndex:index});
	}
	openThisProject (projectID,projectName)
	{
		console.log("in openThisProject");
		let currentProject = projectID ;
		console.log(currentProject);
		localStorage['project']=projectName;
		this.setState({appBarTitle: projectName});
		console.log("in openThisProject");
		console.log(projectID);
		this.setCurrentProject(projectID);
		this.context.router.push('/project/'+currentProject);
	}

	setCurrentProject(projectID)
	{

		this.setState({currentProject : projectID});
	}

	changeChannelState (projectID)
	{	let channels=JSON.parse(localStorage[projectID]);
		console.log("in channel state change method");
		console.log(channels);
		this.setState({channels:channels});
	}

	changeMessageState (projectID)
	{
		let messages=JSON.parse(localStorage[projectID+"messages"]);
		console.log("in messages state change method");
		console.log(messages);
		this.setState({messageskey: "value", messages});
	}

	handleChannelChange(name)
	{
		this.props.router.replace('project/'+this.props.params.projectid+'/chat/?project='+this.state.appBarTitle+'&name='+name+'&identifier=channel');
		this.closeMainMenu();
	}
  handleToggle = () => this.setState({open: !this.state.open});


	handleMessageChange(name)
	{
		this.props.router.replace('project/'+this.props.params.projectid+'/chat/?project='+this.state.appBarTitle+'&name='+name+'&identifier=message');
		this.closeMainMenu();
	}

	closeMainMenu ()
	{
		this.setState({mainMenuOpen: false});
	}
	changeState(projects){
		this.setState({projects:projects});
	}
	// getChildContext() {
	// 	return {
	// 		projectDetails: this.state
	// 	}
	// }
	// getChildContextTypes() {
	// 	return {
	// 		projectDetails: React.PropTypes.object.isRequired
	// 	}
	// }
	render()
	{		console.log("getting the context here");
			console.log(this.context);
			console.log(this.context.projectList);
			console.log("in render of projectlayout");
			let projects = this.context.projectList;
			console.log(projects);
			let projectList=[];

			for (let index in projects)
			{	console.log(projects[index].title)
				projectList.push(
					<ListItem id={index} leftIcon={<FileFolder />} rightIcon={ <Badge badgeStyle={{visibility: this.state.badgeContent === 0 ? 'hidden' : 'visible'}} badgeContent={this.state.badgeContent} />}  primaryText={projects[index].title}
					onNestedListToggle={this.handleNestedListToggle.bind(this,index)}
					value={index+1}
					open={this.state.openIndex===index}
					primaryTogglesNestedList={true}
					style={{backgroundColor: this.state.openIndex === index ? '#00695C':'',color:'white',textDecoration: this.state.openIndex === index ? 'underline':'none',fontWeight: this.state.openIndex === index ? 'bold':''}}
					onClick={this.openThisProject.bind(this,projects[index]._id,projects[index].title)}
					nestedItems={[
							<div style={{backgroundColor:'white'}}>
								<Link to={'project/'+this.props.params.projectid+'/chat/?project='+this.state.appBarTitle+'&name=Droid&identifier=message'} style={styles.listItem} onTouchTap={() => this.handleMessageChange('Droid')}><ListItem key="friday" id="friday" style={styles.listItem} leftAvatar={<Avatar style={{height:'30', backgroundColor:'transparent'}} src='./../../resources/images/buddy.png' alt="Friday" />}><strong>Droid</strong></ListItem></Link>
								<Divider />
									<ChannelList projectid={projects[index]._id} nameCompressor={this.nameCompressor} channels={this.state.projectDetails[projects[index]._id].channels} changeChannel={this.handleChannelChange} appBarTitle={this.state.appBarTitle}/>
									<MessageList nameCompressor={this.nameCompressor} messages={this.state.projectDetails[projects[index]._id].members} changeMessage={this.handleMessageChange} appBarTitle={this.state.appBarTitle}/>

							 </div>
							]} />);

			}
			return (
					<MuiThemeProvider>
					    <div className="wrap container-fluid">
					            <MediaQuery query='(min-device-width: 769px)'>
					                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{width:'100%'}}>
					                    <div className="row">
					                        <AppBar id='appbar' title={this.state.appBarTitle} titleStyle={{textAlign:'center'}} style={styles.appBar}
					                            zDepth={2}
					                            iconElementLeft ={<span/>}
					                            iconElementRight={
						                        <span id="toggleMainMenu">
						                            <IconMenu iconButtonElement={<IconButton onTouchTap={this.toggleMainMenu}>	<ImageDehaze color={grey50} /></IconButton>}
						                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						                                targetOrigin={{horizontal: 'left', vertical: 'top'}}>
						                                <List>
																						   <ListItem leftIcon={<SocialPerson color="#004D40" />} primaryText={localStorage['userName']} style={{fontWeight:'bold',color:'#004D40'}} />
																							 <Divider />
						                                    <ListItem leftIcon={<AVRecentActors color="#004D40"/>} primaryText="Account Settings" id="accountSettings" key="accountSettings" primaryTogglesNestedList={true} style={styles.listItem}
						                                       nestedItems={[
							                                        <Link to={"profile/"} style={{textDecoration:"none"}}>
							                                            <ListItem
							                                               key={1}
							                                               primaryText="Profile"
							                                               leftIcon={<ActionAccountBox color="#004D40" />} />
							                                        </Link>,
							                                        <Link to={"buddy/"} style={{textDecoration:"none"}}>
							                                            <ListItem
							                                               key={2}
							                                               primaryText="Droid settings"
							                                               leftAvatar={<Avatar style={{backgroundColor:'transparent',width:'30px'}} src='./../../resources/images/buddy.png' alt="Friday" />} />
							                                        </Link>
							                                               ]} />

							                                <ListItem leftIcon={<FileFolderShared color="#004D40"/>} primaryText="Manage Project Team" id="manageTeam" key="manageTeam" style={styles.listItem} onTouchTap={this.closeMainMenu} primaryTogglesNestedList={true} nestedItems={[
								                              <Link to={'/project/'+this.props.params.projectid+'/invitePeople'} style={{textDecoration:'none'}}>
																							 <ListItem
								                                   key={1}
								                                   primaryText="Invite People"
								                                   leftIcon={<ContentDrafts color="#004D40"/>} />
																									 </Link>,
								                                <Link to={'/project/'+this.props.params.projectid+"/manageTeam"} style={{textDecoration:'none'}}>
								                                   <ListItem key={2} primaryText="Remove People" leftIcon={<ContentRemoveCircle color="#004D40"/>} />
								                                </Link>
								                                          ]}/>
								                           <ListItem leftIcon={<ActionPowerSettingsNew color="#004D40"/>} primaryText="Sign Out" id="signOut" key="signOut" style={styles.listItem} onTouchTap={this.signOut} />
								                        </List>
								                    </IconMenu>
								                </span>}
							                    iconStyleLeft={{cursor: 'pointer'}}/>
																	<div style={{paddingLeft:'180px',width:'100%'}}>
							                   {this.props.children}
																 </div>
							            </div>
							        </div>
											<div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{height:'100%'}}>
 								 <div className="leftPane" style={styles.leftPane}>
 									 <Drawer open={true} docked={true} id="projectList" containerStyle={styles.drawer} zDepth={2}>
 										 <List>
 											 {projectList}
 										 </List>
 									 </Drawer>
 								 </div>
 							 </div>
							    </MediaQuery>

							    <MediaQuery query='(max-device-width: 768px)' className="leftPane">
							        <div className='row'>
							            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							                <AppBar style={{backgroundColor:'#00695C'}} title={this.state.appBarTitle}
							                    iconElementLeft={
							                    	<span>
							    	                    <IconButton  onTouchTap={this.handleToggle}><NavigationApps color={grey50} /> </IconButton>
																				<Drawer
														                docked={false}
														                width={200}
														                containerStyle={{backgroundColor: "#004D40"}}
														                open={this.state.open}
														                onRequestChange={(open) => this.setState({open})}>
													                        <List>
													                           {projectList}
													                        </List>
													               </Drawer>
							    	                </span>}
							    	            iconElementRight={
							    	            	<span id="toggleMainMenu">
							    	                    <IconMenu iconButtonElement={<IconButton onTouchTap={this.toggleMainMenu}>	<ImageDehaze color={grey50} /></IconButton>}
							    	                                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
							    	                                                targetOrigin={{horizontal: 'left', vertical: 'top'}}>
							    	                        <List>
																						    <ListItem leftIcon={<SocialPerson color="#004D40" />} primaryText={localStorage['userName']} style={{fontWeight:'bold',color:'#004D40'}} />
																					      <Divider />
							    	                            <ListItem leftIcon={<AVRecentActors color="#004D40"/>} primaryText="Account Settings" id="accountSettings" key="accountSettings" primaryTogglesNestedList={true} style={styles.listItem}
							    	                                nestedItems={[
							    		                            <Link to={"profile/"} style={{textDecoration:"none"}}>
							    		                                <ListItem key={1} primaryText="Profile" leftIcon={<ActionAccountBox color="#004D40"/>} />
							    		                            </Link>,
							    		                            <Link to={"buddy/"} style={{textDecoration:"none"}}>
							    		                                <ListItem key={2} primaryText="Droid settings" leftAvatar={<Avatar style={{backgroundColor:'transparent',width:'30px'}} src='./../../resources/images/buddy.png' alt="Friday" />} />
							    		                            </Link>
							    		                                        ]} />

							    		                        <ListItem leftIcon={<FileFolderShared color="#004D40"/>} primaryText="Manage Project Team" id="manageTeam" key="manageTeam" style={styles.listItem} onTouchTap={this.closeMainMenu} primaryTogglesNestedList={true} nestedItems={[
							    			                        <Link to={'/project/'+this.props.params.projectid+'/invitePeople/'} style={{textDecoration:'none'}}>
																								<ListItem key={1} primaryText="Invite People" leftIcon={<ContentDrafts color="#004D40"/>} />
																								</Link>,
							    			                        <Link to={'/project/'+this.props.params.projectid+"/manageTeam/"} style={{textDecoration:'none'}}>
							    			                            <ListItem key={2} primaryText="Remove People" leftIcon={<ContentRemoveCircle color="#004D40"/>} />
							    			                        </Link> ]}/>
							    			                    <ListItem leftIcon={<ActionPowerSettingsNew color="#004D40"/>} primaryText="Sign Out" id="signOut" key="signOut" style={styles.listItem} onTouchTap={this.signOut} />
							    			                </List>
							    			            </IconMenu>
							    			        </span>}>
							    			</AppBar>
												{this.props.children}
							    		</div>
							    	</div>
							    </MediaQuery>
						</div>
					</MuiThemeProvider>
			);
	}
}
ProjectLayout.childContextTypes = {
	socket: React.PropTypes.object.isRequired
};

ProjectLayout.contextTypes = {
	projectList:React.PropTypes.object.isRequired,
	router:React.PropTypes.object.isRequired
}
