import React from 'react';

export default class LinkText extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		
		let link = this.props.gitLink;
        return (
        	<div>
        		<p>Please  click <a href={link} target="_blank">here</a> to authenticate to your git account.</p>
        	</div>
        	);
	}
}