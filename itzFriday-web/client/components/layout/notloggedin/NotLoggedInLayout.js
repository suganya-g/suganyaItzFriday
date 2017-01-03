import React from 'react';
import {Link} from 'react-router';
import {teal400} from 'material-ui/styles/colors';
		const styles ={
			rootContainer :{
				margin:'0',
				padding:'0',
				backgroundColor:'teal400'
			}
		};
export default class NotLoggedInLayout extends React.Component{
	getChildContext(){
//console.log(this.props.router);
return{
	router:this.props.router
}
}

	render(){
		return(
			<div id="notLoggedInContainer" style={styles.rootContainer}>
				{this.props.children}
			</div>
		);
	}
}

NotLoggedInLayout.childContextTypes = {
	router:React.PropTypes.object.isRequired
}
