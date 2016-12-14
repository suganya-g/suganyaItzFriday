import React from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router';

export default class Message extends React.Component
{
	constructor(props)
	{
		super(props);


	}

	render()
	{
		return(
			<div>
				You can now chat with {this.props.location.query.name=='undefined'?'Buddy':this.props.location.query.name}.
			</div>
			);
	}
}