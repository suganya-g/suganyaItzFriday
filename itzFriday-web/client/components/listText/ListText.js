import React from 'react';

export default class ListText extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		const styles = {
			labels:{
				color:'white',
				background:'#7986CB',
				borderRadius:'5px',
				padding:'2px',
				width: '*'
			},
			assigneess:{
				color:'white',
				background:'#EF5350',
				borderRadius:'5px',
				padding:'2px',
				width: '*'
			}
		};
		let issues = this.props.issues;
		let issueList = [];
        for(let issue in issues)
        {
        	console.log(issues[issue]);
        	issueList.push(<tr><td><strong>{issues[issue].number}</strong></td> <td>{issues[issue].title}</td> <td><div style={styles.labels}>{issues[issue].labels.toString()}</div></td> <td><div style={styles.assigneess}>{issues[issue].assignees.toString()}</div></td></tr>);
        }
        return (
        	<div>
        	<table>
        	<tr>
        		<td><strong>#</strong></td>
        		<td><strong>Title</strong></td>
        		<td><strong>Label</strong></td>
        		<td><strong>Assignees</strong></td>
        	</tr>
        	{issueList}
        	</table>
        	</div>
        	);
	}
}