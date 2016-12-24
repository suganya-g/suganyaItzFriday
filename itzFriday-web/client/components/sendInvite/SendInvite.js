
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {Grid, Row, Col} from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton';
import {grey400,cyan50,red500,grey500,grey100,blueGrey100,blueGrey50,teal100} from 'material-ui/styles/colors';
import {Link} from 'react-router';
import MediaQuery from 'react-responsive';

var previous="blank";
var counter=0;
var validExpre=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

const styles = {
		button: {
			color: 'white',
		},
      chip: {
        margin: 4,
	      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      paperStyle:{
    	position:'absolute',
			top:'20%',
			bottom:'20%',
			left:'10%',
			right:'10%',
			width:'80%',
			height:'60%'
		}
    };
export default class SendInvite extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleAdd=this.handleAdd.bind(this);
		this.handleAddClick=this.handleAddClick.bind(this);
		this.state={email:'',addIconState:true,addbuttonState:true,errorMsg:'',chipData:[]}
		this.sendInvite=this.sendInvite.bind(this);
	}
	handleAdd(event)
	{
		this.setState({email:event.target.value})
		if(event.target.value!='')
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
					backgroundColor='#607D8B'
					labelColor='white'
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
	}
	sendInvite()
	{
		this.props.router.replace('login/');
		// this.props.route.checkLoggedIn(true);
		// console.log(this.props.route.checkLoggedIn(true));

	}
	render()
	{
		return(<Grid>
		<Paper style={styles.paperStyle}>
			<div style={{textAlign:'center',marginTop:'50px'}}>
			<Row center="xs">
			  <MediaQuery query='(min-device-width: 1024px)'>
			<SocialPersonAdd style={{color:'#004D40',width:'100px',height:'100px'}} />
			<h1 style={{color:'#004D40'}}>Join Us!</h1>
			</MediaQuery>

			 <MediaQuery query='(max-device-width: 1023px)'>
			          <SocialPersonAdd style={{color:'#004D40',width:'50px',height:'50px'}} />
			           <h3 style={{color:'#004D40'}}>Join Us!</h3>
			 </MediaQuery>
			</Row>
			<Row center="xs">
			   <MediaQuery query='(min-device-width: 1024px)'>
			        <h4 style={{color:'#004D40'}}>Add new members to your team!</h4>
				 </MediaQuery>

				 <MediaQuery query='(max-device-width: 1023px)'>
				      <h5 style={{color:'#004D40'}}>Add new members to your team!</h5>
				 </MediaQuery>
			</Row>
			<Row center="xs">
			 <MediaQuery query='(min-device-width: 1024px)'>
			<TextField type="email"
			floatingLabelText="Invite by Email"
			onChange={this.handleAdd}
			errorText={this.state.errorMsg}/>
			</MediaQuery>

			<MediaQuery query='(max-device-width: 1023px)'>
			<TextField type="email"
			floatingLabelText="Invite by Email"
			style={{width:'150px'}}
			onChange={this.handleAdd}
			errorText={this.state.errorMsg}/>
			</MediaQuery>
			<IconButton tooltip="Add" style={{marginTop: '20px'}}
				disabled={this.state.addIconState}
				onClick={this.handleAddClick}>
				<ContentAddCircleOutline/>
			</IconButton>
			</Row>
      <br />
			<Row center="xs">
			{
			(this.state.chipData.length)>=3?
			<div id="chipArea" style={{width:'50%',height:'150px',overflowY: 'auto'}}></div>
			:
			<div id="chipArea"></div>
			}
			</Row>
			<br />
			<Row center="xs">
			<RaisedButton
                          label="Skip"
                          backgroundColor='#D32F2F'
   						style={{marginRight:20}}
   						labelColor="white"
   						onClick={this.sendInvite}/>

            <RaisedButton
                          label="Send Invite"
                          backgroundColor='#4CAF50'
                          labelColor="white"
                          onClick={this.sendInvite}
                          disabled={this.state.addbuttonState}/>

			</Row>
			</div>
        </Paper>
				</Grid>);
	}
}
