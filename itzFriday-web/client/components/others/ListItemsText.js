import React from 'react';

export default class ListItemsText extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		let items = this.props.items;
		console.log(this.props.items);
		let list = [];
        for(let item in items)
        {
        	list.push(<div>{items[item]}<br/></div>);
        }
        return (
        	<div>
        	{list}
        	</div>
        	);
	}
}