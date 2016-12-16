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
import {grey400,cyan50,red500,grey500,grey100,blueGrey100,blueGrey50,teal100} from 'material-ui/styles/colors';
import AutoComplete from 'material-ui/AutoComplete';


var previous="blank";
var counter=0;
var c=0;
var mydata=[];
var validExpre=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

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
      },
      paperStyle:{
    	height:window.innerHeight,
    	padding:10,
    	width:"100%"
      }
    };
 const members=['Govind@gmail.com','Ruchika@gmail.com','Vikram@gmail.com','Apurv@gmail.com','suganya@gmail.com','kirti@gmail.com','nitin@gmail.com','prerna@gmail.com','shipra@gmail.com'];
export default class ManageTeam extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleAdd=this.handleAdd.bind(this);
		this.handleAddClick=this.handleAddClick.bind(this);
		this.state={email:'',addIconState:true,addbuttonState:true,errorMsg:'',chipData:[],checkbox:true,searchText:''}
		this.sendInvite=this.sendInvite.bind(this);
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
		if(validExpre.test(this.state.email))
	    {	
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
	    }
	    else if(!validExpre.test(this.state.email))
	    	this.setState({errorMsg:"Invalid Email Address"})
	    else
	    	this.setState({errorMsg:"Email already Entered"})
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
		return(<Grid>
		<Paper style={styles.paperStyle}>
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
          backgroundColor='#4CAF50'
          labelColor="white"/>
          
      <RaisedButton 
          label="Remove"
          backgroundColor='#4CAF50'
          labelColor="white"
          onClick={this.sendInvite}/>
          
      </Row>
			
        </Paper>
				</Grid>);
	}
}