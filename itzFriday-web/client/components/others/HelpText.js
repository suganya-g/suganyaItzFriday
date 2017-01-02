import React from 'react';
import ListItemsText from './../others/ListItemsText';

export default class HelpText extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		let commands = this.props.commands;
		let commandList = [];
		console.log(this.props.commands);
		
        for(let command in commands)
        {
        	commandList.push(
        		<div>
        			<strong><u>{commands[command].name}:</u></strong><br/>
        			{commands[command].required !== null ? <div><strong>Required properties -</strong> {commands[command].required}</div> : <span />}
        			{commands[command].optional !== null ? <div><strong>Optional properties -</strong> {commands[command].optional}</div> : <span />}
        			{commands[command].patterns !== null ? <div><strong>Pattern -</strong> <br/><ListItemsText items={commands[command].patterns}/></div> : <span />}
        			{commands[command].comments !== null ? <div><strong>Comments -</strong> <br/><ListItemsText items={commands[command].comments}/></div> : <span />}
        			<br/>
        		</div>
        		);
        }
        return (
        	<div>
        	{commandList}
        	</div>
        	);
	}
}