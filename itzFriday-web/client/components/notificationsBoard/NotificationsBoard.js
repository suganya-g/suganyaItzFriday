import React from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import SocialPerson from 'material-ui/svg-icons/social/person';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
	paper: {
		height:'90%',
		width:'100%',
		background: "white",
		textIndent: '20px'
	},
	listItem : {
		color: '#607D8B',
		textDecoration: 'none',
	},
	linkItem : {
		textDecoration: 'none',
		color: '#424242',
	},
}
 var notifications = ["note1", "note2", "note3", "note4"];

var note=[];

export default class NotificationsBoard extends React.Component
{
	constructor(props) {
		super(props);
		note = [];
		let lastIndexOfNotifications = notifications.length - 1;
		for(let index in notifications)
		{
			note.push(<ListItem style={{'width':'100%'}} onTouchTap={() => this.displayNotification(notifications[index])}>{notifications[index]}</ListItem>);
			if(index < lastIndexOfNotifications)
				note.push(<ListItem disabled = {true} style={{cursor:'default'}}><Divider style={{'width':'100%'}}/></ListItem>);

		}
	}
	displayNotification(name)
	{
		// this.props.changeNotification(name);


	}

	render()
	{

		return (
			<Grid>
			<Paper id="notificationsBoard" style={styles.paper}>
				<Row>
				<List style={{'width':'100%'}}>
				{note}
				</List>
				</Row>
			</Paper>
			</Grid>
			);
	}
}
