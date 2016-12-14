import React, { Component } from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import LoggedInLayout from './layout/loggedIn/LoggedInLayout';
import NotLoggedInLayout from './layout/notloggedin/NotLoggedInLayout';
import Message from './message/Message';
import AddChannel from './channel/AddChannel';
import Profile from './account/Profile';
import Chat from './chats/ChatBox';
import Login from './login/Login';
import ForgotPassword from './login/ForgotPassword';
import CreateProject from './createProject/CreateProject';
import ConfirmCode from './createProject/ConfirmCode';
import ProjectCreator from './createProject/ProjectCreator';
import InvitedMemberDetails from './createProject/InvitedMemberDetails';
import InviteAccept from './createProject/InviteAccept';
import SendInvite from './sendInvite/SendInvite';
import BuddyAvatar from './buddyAvatar/BuddyAvatar';
import NotificationsBoard from './notificationsBoard/NotificationsBoard';
import Auth from './../services/auth.service.js'

class App extends Component {
	constructor(props)
	{
		super(props);
		this.state={invited: false};
		this.checkInvited = this.checkInvited.bind(this);
	}

	checkLoggedIn(value) {
		if(value !== undefined) {
			this.setState({loggedIn: value})
		}
	}
	requireAuth(nextState, replace) {
  		if (!Auth.loggedIn()) {
    		replace({
      			pathname: 'login/',
      			state: { nextPathname: nextState.location.pathname }
    		})
  		}
	}
	authenticatedUser(nextState, replace) {
  		if (Auth.loggedIn()) {
    		replace({
      			pathname: 'notifications/',
      			state: { nextPathname: nextState.location.pathname }
    		})
  		}
	}
	checkInvited(value) {
		if(value !== undefined) {
			this.setState({invited: value})
		}
	}


	render() {

		return (
				<Router history={hashHistory}>
					<Route path="/" component={LoggedInLayout}>
						<IndexRoute component={CreateProject} onEnter={this.authenticatedUser.bind(this)}></IndexRoute>
						<Route path="login/" component={Login} onEnter={this.authenticatedUser.bind(this)}></Route>
						<Route path="confirmationCode/" component={ConfirmCode}></Route>
						<Route path="projectDetails/" component={ProjectCreator}></Route>
						<Route path="sendInvite/" component={SendInvite}></Route>
						<Route path="ForgotPassword/" component={ForgotPassword}></Route>
						<Route path="inviteAccept/" component={InviteAccept}></Route>
						<Route path="memberDetails/" component={InvitedMemberDetails} onEnter={this.requireAuth.bind(this)}></Route>
						<Route path="notifications/" component={NotificationsBoard} onEnter={this.requireAuth.bind(this)}></Route>
						<Route path="chat/" component={Chat} onEnter={this.requireAuth.bind(this)}></Route>
						<Route path="addChannel/" component={AddChannel} onEnter={this.requireAuth.bind(this)}></Route>
						<Route path="profile/" component={Profile} onEnter={this.requireAuth.bind(this)}></Route>
						<Route path="buddy/" component={BuddyAvatar} onEnter={this.requireAuth.bind(this)}></Route>
					</Route>
				</Router>
			)

	}
}

export default App;
