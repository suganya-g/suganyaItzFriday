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
import MediaQuery from 'react-responsive';
import { Grid, Row, Col } from 'react-flexbox-grid';
import request from 'superagent';
import Project from './../../../services/getLoggedInData.js';
import ProjectLayout from './ProjectLayout';
import SocketConnection from './../../../services/socket.service.js';

export default class LoggedInLayout extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			loggedIn: Auth.loggedIn(),
			projects:[]
		};
		this.signOut=this.signOut.bind(this);
		this.handleAccount = this.handleAccount.bind(this);
		this.closeMainMenu = this.closeMainMenu.bind(this);
		this.nameCompressor = this.nameCompressor.bind(this);
		this.setProjectState = this.setProjectState.bind(this);
		this.getProjects= this.getProjects.bind(this);
		//console.log(this.props);
	}

	getChildContext(){
		//console.log("get context method");
		//console.log(this.state.projects);
		return {
			projectList:this.state.projects,
			socket: SocketConnection.getSocketConnection()
		}
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



	componentDidMount(){
		//console.log("in componentDidMount of logged in layout");
		//console.log(localStorage['token']);
        let tokenarray = localStorage['token'].split(".");
        let userdetails = atob(tokenarray[1]);
        //console.log(userdetails);
        let userData=JSON.parse(userdetails);
        //console.log(typeof userData);
        console.log(userData);

          request.post('/api/projects/')
		  .set('Content-Type','application/json')
		  .send({userID:userData.userid})
		  .end((error,res)=>{
		      //console.log(res.body);
		     // console.log("in service of projects");
		      this.setProjectState(res.body);
		      this.context.router.push('/project/'+res.body[0]._id);
  		});
	}
	setProjectState(projects){
		console.log("in setting state method of Logged in layout");
		console.log(projects);
		this.setState({projects:projects})
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
	closeMainMenu ()
	{
		this.setState({mainMenuOpen: false});
	}
	signOut (e)
	{
		Auth.logout();
		localStorage.clear();
		this.props.router.replace('login/');
	}
	render() {
		//console.log("in render of Logged in layout");
		//console.log(this.state.projects);
		const isLogged = Auth.loggedIn();
		let projectList =[];
		return (
			<div>
				 {this.props.children}
			</div>
		);
	}
	// static get childContextTypes(){
	// 	return{
	// 			projectList:React.PropTypes.object.isRequired,
	// 			router:React.PropTypes.object.isRequired
	// 	}
	// }
}
LoggedInLayout.childContextTypes = {
	projectList:React.PropTypes.object.isRequired,
	socket: React.PropTypes.object.isRequired
}

LoggedInLayout.contextTypes = {
	router:React.PropTypes.object.isRequired
}
