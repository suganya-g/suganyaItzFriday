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
import UserDetails from './createProject/UserDetails';
import InviteAccept from './createProject/InviteAccept';
import SendInvite from './sendInvite/SendInvite';
import BuddyAvatar from './buddyAvatar/BuddyAvatar';
import NotificationsBoard from './notificationsBoard/NotificationsBoard';
import Auth from './../services/auth.service.js';
import ManageTeam from './team/ManageTeam';
import InvitePeople from './team/InvitePeople';
import ProjectLayout from './layout/loggedIn/ProjectLayout';


class App extends Component {
	constructor(props)
	{
		super(props);
		this.state={
			invited: false,
			isLoggedIn: Auth.loggedIn()
		};
		this.checkInvited = this.checkInvited.bind(this);
		this.setLoginStatus = this.setLoginStatus.bind(this);
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
      			pathname: 'project/',
      			state: { nextPathname: nextState.location.pathname }
    		})
  		}
  		console.log("authenticatedUser");
  		this.setLoginStatus();
	}

	setLoginStatus()
	{
		console.log("inside setLoginStatus");
    	this.setState({isLoggedIn: Auth.loggedIn()});
	}

	checkInvited(value) {
		if(value !== undefined) {
			this.setState({invited: value})
		}
	}


	render() {

		return (
			<Router history={hashHistory}>
                    <Route path="/" component={NotLoggedInLayout} style={{height: '100vh'}}>
                        <IndexRoute component={CreateProject} onEnter={this.authenticatedUser.bind(this)}></IndexRoute>
                        <Route path="/login" component={Login} onEnter={this.authenticatedUser.bind(this)}></Route>
                        <Route path="/confirmationCode" component={ConfirmCode}></Route>
                        <Route path="/createProject" component={ProjectCreator}></Route>
                        <Route path="/sendInvite" component={SendInvite}></Route>
                        <Route path="/forgotPassword" component={ForgotPassword}></Route>
                        <Route path="/inviteAccept" component={InviteAccept}></Route>
                        <Route path="/userDetails" component={UserDetails}></Route>
                        <Route path="/project" isLoggedIn={this.state.isLoggedIn} component={LoggedInLayout} style={{height: '100%'}}>
                            <Route path=':projectid' component={ProjectLayout} style={{height: '100%'}} onEnter={this.requireAuth.bind(this)}>
                                <Route path="/project/:projectid/chat" component={Chat} onEnter={this.requireAuth.bind(this)} style={{height: '100%'}}></Route>
                                <Route path="/project/:projectid/addChannel" component={AddChannel} onEnter={this.requireAuth.bind(this)} style={{height: '100%'}}></Route>
                                <Route path="/profile" component={Profile} onEnter={this.requireAuth.bind(this)} style={{height: '100%'}}></Route>
																<Route path="/droid" component={NotificationsBoard} onEnter={this.requireAuth.bind(this)} style={{height: '100%'}}></Route>
																<Route path="/project/:projectid/droid" component={NotificationsBoard} onEnter={this.requireAuth.bind(this)} style={{height: '100%'}}></Route>
                                <Route path="/buddy" component={BuddyAvatar} onEnter={this.requireAuth.bind(this)} style={{height: '100%'}}></Route>
                                <Route path="/project/:projectid/manageTeam" component={ManageTeam} onEnter={this.requireAuth.bind(this)} style={{height: '100%'}}></Route>
                                <Route path="/project/:projectid/invitePeople" component={InvitePeople} onEnter={this.requireAuth.bind(this)} style={{height: '100%'}}></Route>
                            </Route>
                        </Route>
                    </Route>
                </Router>
			)

	}
}

export default App;
