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
	constructor(props,context){
		super(props,context);

		let messages = [];
		let channels = [];

		let currentProject = 'Friday';
		let project=[];
		project=this.props.projectDetails;
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
			currentProject : '',	//stores current project ID only
			manageTeam : false,

		};
		let projectss = this.context.projectList;
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
		console.log("printing state in constructor project layout");
		console.log(JSON.stringify(this.state));
    	this.signOut=this.signOut.bind(this);
		this.handleChannelChange = this.handleChannelChange.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.closeMainMenu = this.closeMainMenu.bind(this);
		this.changeChannelState = this.changeChannelState.bind(this);
		this.changeMessageState = this.changeMessageState.bind(this);
		this.nameCompressor = this.nameCompressor.bind(this);
		this.handleOpenList=this.handleOpenList.bind(this);
		this.setChannelsState=this.setChannelsState.bind(this);
		this.setCurrentProject = this.setCurrentProject.bind(this);
		this.changeState = this.changeState.bind(this);
		this.setProjectDetailsState = this.setProjectDetailsState.bind(this);
		this.allowManageTeam = this.allowManageTeam.bind(this);

		console.log(this.props);

		if(this.props.params.projectid!==null && this.props.params.projectid!=='' && this.props.params.projectid!==undefined)
		{
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
						console.log('project id ' +projectID);
				})
		}
	}
	componentWillMount()
	{
		this.context.router.replace("project/"+this.props.params.projectid+"/droid");
	}

	componentDidMount(){
		this.context.socket.on('error', this._socketConnectionError.bind(this));
    	this.context.socket.on('connected', this._getConnectedUser.bind(this));
    	this.context.socket.on('user:join',this._getJoinedUser.bind(this));
		console.log("in componentDidMount of ProjectLayout");
       console.log(this.props.params.projectid);
        console.log(this.context);
        let projectID = this.props.params.projectid;
        //console.log("this is componentDidMount Method");
       // console.log(projectID);
       let tokenarray = localStorage['token'].split(".");
       let userdetails = atob(tokenarray[1]);
       //console.log(userdetails);
       let userData=JSON.parse(userdetails);
       //console.log(typeof userData);
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
                         console.log("in get memebers");
                         console.log(res.body.members);
                         callback(null,res.body.members);
                });
            }
        },(error,results)=>{
            console.log("Did mount of project Layout is called here");
            console.log(results);
            this.setProjectDetailsState(results,projectID);
        });
		
	}
	allowManageTeam(projectID)
	{
		console.log(".....................");
		let payload=JSON.parse(atob(localStorage['token'].split('.')[1]));
		let getRoles=payload['role'];
		console.log("payload ",payload);
		console.log("getroles ",getRoles);
		for(let project in getRoles)
		{
			console.log("??????????????????????");
			console.log(getRoles['projectID']);
				
			if(getRoles[project]['projectID'] === projectID)
			{
				console.log("Inside if?????????????????/");
				if(getRoles[project]['role'] === "admin")
					this.setState({manageTeam : true});
				else
					this.setState({manageTeam : false});
				console.log("+++++++++++++++",this.state.manageTeam);
			}
		}
	}
	componentWillReceiveProps(nextProps)
	{
		console.log('in will receive props');
		console.log(nextProps);

		if(this.props.params.projectid!==nextProps.params.projectid)
		{
			let projectID = nextProps.params.projectid;
			console.log("this is componentWillReceiveProps Method");
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
							callback(null,res.body.channels);
					});
				},
				members:function(callback){
						request.post('/api/members/')
						  .set('Content-Type','application/json')
						  .send({projectID:projectID})
						  .end((error,res)=>{
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
		const obj = this.state.projectDetails || {};
		obj[projectid] = {channels:results.channels,members:results.members};
		console.log("in setting state");
		console.log(obj);
		this.setState({projectDetails:obj});
		this.setMemberState(results.members);
		this.setChannelsState(results.channels);
	}

	setChannelsState(channels){
		this.setState({channels:channels});
	}

	setMemberState(members){
		this.setState({
			members:members
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
		this.context.socket.emit('user:join', projectName);
		this.allowManageTeam(projectID);
		let currentProject = projectID ;
		localStorage['project']=projectName;
		
		this.setState({appBarTitle: projectName});
		console.log("in openThisProject");
		console.log(projectID);		
		this.setCurrentProject(projectID);
		this.context.router.replace("project/"+currentProject+"/chat/?project="+projectName+"&name=general&identifier=channel");
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

	handleChannelChange(name,id)
	{
		this.props.router.replace('project/'+this.props.params.projectid+'/chat/?project='+this.state.appBarTitle+'&name='+name+'&identifier=channel&channelid='+id);
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
	render()
	{		console.log("getting the context here");
			console.log(this.context);
			console.log(this.context.projectList);
			console.log("in render of projectlayout");
			let projects = this.context.projectList;
			console.log(projects);
			let projectList=[];

			for (let index in projects)
			{	
				projectList.push(
					<ListItem id={index} leftIcon={<FileFolder />} rightIcon={<span />}  primaryText={projects[index].title}

					onNestedListToggle={this.handleNestedListToggle.bind(this,index)}
					value={index+1}
					open={this.state.openIndex===index}
					primaryTogglesNestedList={true}
					style={{backgroundColor: this.state.openIndex === index ? '#00695C':'',color:'white',textDecoration: this.state.openIndex === index ? 'underline':'none',fontWeight: this.state.openIndex === index ? 'bold':''}}
					onClick={this.openThisProject.bind(this,projects[index]._id,projects[index].title)}
					nestedItems={[
							<div style={{backgroundColor:'white'}}>
									<ChannelList projectid={projects[index]._id} nameCompressor={this.nameCompressor} channels={this.state.projectDetails[projects[index]._id].channels} changeChannel={this.handleChannelChange} appBarTitle={this.state.appBarTitle}/>
									<MessageList nameCompressor={this.nameCompressor} messages={this.state.projectDetails[projects[index]._id].members} changeMessage={this.handleMessageChange} appBarTitle={this.state.appBarTitle}/>

							 </div>
							]} />);

			}
			return (
					<MuiThemeProvider>
					    <div className="wrap container-fluid">
					            <MediaQuery query='(min-device-width: 769px)'>
					                <div className="row">
					                    <div className="row"  style={{width:'100% of viewport width'}}>
					                        <AppBar id='appbar' title={this.state.appBarTitle} titleStyle={{textAlign:'center'}} style={styles.appBar}
					                            zDepth={2}
					                            iconElementLeft ={<span/>}
					                            iconElementRight={
						                        <span id="toggleMainMenu">
						                            <IconMenu iconButtonElement={<IconButton onTouchTap={this.toggleMainMenu}>	<ImageDehaze color={grey50} /></IconButton>}
						                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						                                targetOrigin={{horizontal: 'left', vertical: 'top'}}>
						                                <List>
							                                        <Link to={"profile/"} style={{textDecoration:"none"}}>
							                                            <ListItem
							                                               key={1}
																														 style={styles.listItem}
							                                               primaryText={localStorage['userName']}
							                                               leftIcon={<ActionAccountBox color="#004D40" />} />
							                                        </Link>
																											<Divider/>
							                                        <Link to={"buddy/"} style={{textDecoration:"none"}}>
							                                            <ListItem
							                                               key={2}
																														 style={styles.listItem}
							                                               primaryText="Droid settings"
							                                               leftAvatar={<Avatar style={{backgroundColor:'transparent',width:'30px'}} src='./../../resources/images/buddy.png' alt="Friday" />} />
							                                        </Link>
							                                {(this.state.manageTeam) 
							                                ? (<ListItem leftIcon={<FileFolderShared color="#004D40"/>} primaryText="Manage Project Team" id="manageTeam" key="manageTeam" style={styles.listItem} onTouchTap={this.closeMainMenu} primaryTogglesNestedList={true} nestedItems={[
								                              <Link to={'/project/'+this.props.params.projectid+'/invitePeople'} style={{textDecoration:'none'}}>
																							 <ListItem
								                                   key={1}
								                                   primaryText="Invite People"
								                                   leftIcon={<ContentDrafts color="#004D40"/>} />
																									 </Link>,
								                                <Link to={'/project/'+this.props.params.projectid+"/manageTeam"} style={{textDecoration:'none'}}>
								                                   <ListItem key={2} primaryText="Remove People" leftIcon={<ContentRemoveCircle color="#004D40"/>} />
								                                </Link>
								                                          ]}/>)
								                                          :
								                                          <span/>

								                            }
								                           <ListItem leftIcon={<ActionPowerSettingsNew color="#004D40"/>} primaryText="Sign Out" id="signOut" key="signOut" style={styles.listItem} onTouchTap={this.signOut} />
								                        </List>
								                    </IconMenu>
								                </span>}
							                    iconStyleLeft={{cursor: 'pointer'}}/>
																	</div>
																	<div className="row" style={{width:'100% of viewport width'}}>
																	     <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{minWidth:'200px'}}>
																			 <Drawer open={true} docked={true} id="projectList" containerStyle={styles.drawer} zDepth={2}>
										                           <List>
											                           {projectList}
										                           </List>
									                     </Drawer>
																			 </div>
																			 <div clasname="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{marginLeft:'260px',marginTop:'5px'}} >
							                              {this.props.children}
																			 </div>
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
																			            <Link to={"profile/"} style={{textDecoration:"none"}}>
																			                    <ListItem
																			                    key={1}
																													style={styles.listItem}
																			                    primaryText={localStorage['userName']}
																			                    leftIcon={<ActionAccountBox color="#004D40" />} />
																			            </Link>
																									<Divider/>
							    		                            <Link to={"buddy/"} style={{textDecoration:"none"}}>
							    		                                <ListItem key={2} style={styles.listItem} primaryText="Droid settings" leftAvatar={<Avatar style={{backgroundColor:'transparent',width:'30px'}} src='./../../resources/images/buddy.png' alt="Friday" />} />
							    		                            </Link>

							    		                        {this.state.manageTeam ? 
							                                	<ListItem leftIcon={<FileFolderShared color="#004D40"/>} primaryText="Manage Project Team" id="manageTeam" key="manageTeam" style={styles.listItem} onTouchTap={this.closeMainMenu} primaryTogglesNestedList={true} nestedItems={[
							    			                        <Link to={'/project/'+this.props.params.projectid+'/invitePeople/'} style={{textDecoration:'none'}}>
																								<ListItem key={1} primaryText="Invite People" leftIcon={<ContentDrafts color="#004D40"/>} />
																								</Link>,
							    			                        <Link to={'/project/'+this.props.params.projectid+"/manageTeam/"} style={{textDecoration:'none'}}>
							    			                            <ListItem key={2} primaryText="Remove People" leftIcon={<ContentRemoveCircle color="#004D40"/>} />
							    			                        </Link> ]}/>
							    			                        :
							    			                        <span/>
							    			                    }	
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

	_socketConnectionError(err){
    	console.log(err)
  	}
  	_getConnectedUser(user) {
    	console.log('user join', user);
  	}
  	_getJoinedUser(joinedUser){
    	console.log(joinedUser.user+' has joined to '+joinedUser.destination);
  	}
}

ProjectLayout.contextTypes = {
	projectList:React.PropTypes.object.isRequired,
	socket: React.PropTypes.object.isRequired,
	router:React.PropTypes.object.isRequired

}