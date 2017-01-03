import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {Grid, Row, Col} from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton';
import SocialPeopleOutline from 'material-ui/svg-icons/social/people-outline';
import {grey400,cyan50,red500,grey500,grey100,blueGrey100,blueGrey50,teal100} from 'material-ui/styles/colors';
import AutoComplete from 'material-ui/AutoComplete';
import { Router, Route, Link, browserHistory } from 'react-router';

var previous="blank";
var counter=0;
var c=0;
var mydata=[];

const styles = {
		button: {
			color: 'white',
		},
      chip: {
        margin: 4 ,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    };
 var members=[];


export default class ManageTeam extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleAdd=this.handleAdd.bind(this);
		this.handleAddClick=this.handleAddClick.bind(this);
		this.handleClose=this.handleClose.bind(this);
		this.state={email:'',addIconState:true,addbuttonState:true,errorMsg:'',chipData:[],checkbox:true,searchText:''}
		this.sendInvite=this.sendInvite.bind(this);
	}
	componentWillMount()
  {
 	 if(localStorage['project']==='Friday')
 		{
 			members=["Gobinda Thakur","Apurv Tiwari","Ruchika Saklani","Suganya Gopal","Ankit Aggarwal","Vikram Marshmallow"];
 		}
 		else if(localStorage['project']==='Samarth')
 		{
 			members=["Amol Tiwari","Ankit Kumar Vashisht","Shinder Pal Singh","Ritesh","Kumari Devi","Hari Prasad","Prerna Kukreti"];
 		}
 		else if(localStorage['project']==='Quiztack')
 		{
 			members=["Vishant Sharma","Kirti Jalan","Dhivya Lakshmi","Lal Jose","Srinivasan","Nitin Verma"];
 		}
 		else
 			{
 			members=["Sreenidhi","Toolika Srivastava","Nanda","Shipra Joshi","Bala","Divyanshu Sharma"];
 			}
 			console.log("members are "+members+" from "+localStorage['project']);
  }
	handleClose()
	{
		this.props.router.replace('/project/'+this.props.params.projectid);
	}
	handleAdd(event)
	{
		var search=document.getElementById('searchtext').value
		this.setState({email:search})
		if(search!='')
			this.setState({addIconState:false})
		else
		{
			this.setState({addIconState:true})
			this.setState({errorMsg:''})
		}

	}
	handleRequestDelete = (key) =>
	{
	    this.chipData = this.state.chipData;
	    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
	    this.chipData.splice(chipToDelete, 1);
	    this.setState({chipData: this.chipData});
	    if(this.state.chipData.length==0)
	    		this.setState({addbuttonState:true})

	    ReactDOM.render(<MuiThemeProvider>
							<div style={styles.wrapper}>
								{this.state.chipData.map(this.renderChip, this)}
							</div>
						</MuiThemeProvider>,document.getElementById('chipArea'));
	};
	renderChip=(data)=>
	{
	    return (
	  	<Chip
	        key={data.key}
	        onRequestDelete={() => this.handleRequestDelete(data.key)}
	        style={styles.chip}>
	        <Avatar icon={<ActionAccountCircle/>}/>
	        {data.label}
	    </Chip>);
	  };
	handleAddClick()
	{
		var exists=false;
	    	for(var j=0;j<this.state.chipData.length;j++)
	    	{
	    		if(this.state.chipData[j].label==this.state.email)
	    		{
	    			exists=true;
	    			break;
	    		}
	    	}
	    	console.log(this.state.chipData.length);
	    	if(this.state.chipData.length>=0)
	    		this.setState({addbuttonState:false})
	    	if(!exists)
	    	{
	       	this.state.chipData.push({key:counter++,label:this.state.email});
	       	this.setState({errorMsg:''})
	    	ReactDOM.render(<MuiThemeProvider>
		    					<div style={styles.wrapper}>
	        						{this.state.chipData.map(this.renderChip, this)}
	      						</div>
      						</MuiThemeProvider>,document.getElementById('chipArea'));
      		}
      		 else
      		{
      			this.setState({errorMsg:"Email already Entered"});
      		}

	    this.refs['autocomplete'].setState({searchText:''});

	}
	sendInvite()
	{
		mydata=this.state.chipData;
		console.log(mydata);


			console.log(members);
		var len=members.length;
		for(var i=0;i<len;i++)
		{

			for(var j=0;j<mydata.length;j++)
			{
				if(members[i]==mydata[j].label)
				{
					members.splice(i,1);
				}

			}
			len=members.length;
		}
		console.log(mydata);
		console.log(members);
		this.setState({chipData:[]});
		document.getElementById('chipArea').innerHTML = '';
		// this.props.router.replace('login/');
	}
	render()
	{
		return(
		<Paper style={{width:'100%'}}>
		<br />
		<Row center="xs">
	<SocialPeopleOutline style={{color:'#607D8B',width:'100px',height:'100px'}} />
		</Row>
			<Row center="xs">
			<h3 style={{color:'#607D8B'}}>ManageTeam</h3>
			</Row>

			<Row center="xs">
			<AutoComplete
						id="searchtext"
						ref={'autocomplete'}
      					floatingLabelText="Type fuzzy search"
      					filter={AutoComplete.fuzzyFilter}
      					dataSource={members}
      					maxSearchResults={5}
      					onUpdateInput={this.handleAdd}
      					searchText={this.state.searchText}
						errorText={this.state.errorMsg}/>
      		<IconButton tooltip="Add" style={{marginTop: '20px'}}
				disabled={this.state.addIconState}
				onClick={this.handleAddClick}>
				<ContentAddCircleOutline/>
			</IconButton>

			</Row>
			<br/>
			<Row center="xs">
			{
			(this.state.chipData.length)>=3?
			 <div id="chipArea" style={{width:300, height:100, overflowY: 'scroll', paddingTop:10, paddingBottom:10}}></div>
			:<div id="chipArea" style={{width:300,paddingTop:10,paddingBottom:10}}></div>
			}
			</Row>
			<br/>

      <Row center="xs">
      <RaisedButton
          label="Close"
          backgroundColor='#F44336'
					onClick={this.handleClose}
          labelColor="white"/>

      <RaisedButton
          label="Remove"
          backgroundColor='#4CAF50'
          labelColor="white"
					style={{marginLeft:'10px'}}
          onClick={this.sendInvite}/>

      </Row>
  <br />
        </Paper>);
	}
}
