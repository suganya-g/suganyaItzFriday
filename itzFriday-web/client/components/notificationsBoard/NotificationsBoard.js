import React from 'react';
import {Link} from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

export default class NotificationsBoard extends React.Component
{
	constructor(props) {
		super(props);
		}

	render()
	{
		return (
			<Grid>
				<Row center='xs'>
				<Col
						 xs={ 12 }
						 sm={ 12 }
						 md={ 12 }
						 lg={ 12 }>
						 <div style={{margin:'auto',position:'absolute',left:'50%',top:'20%'}}>
				  <Avatar className="logo" style={{backgroundColor:"#004D40"}} src="./../../resources/images/buddy.png" alt="qwerty" size={150}/>
					<h1>Hello {localStorage['userName']}!</h1>
					<h5>Droid is your assistant. You can call it by typing<h3> @droid </h3>for any help!</h5>
					<h5>Type <h3>@droid help</h3> for any doubts</h5>
					</div>
					</Col>
				</Row>
			</Grid>
			);
	}
}
