import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import Paper from 'material-ui/Paper';
import {grey400,cyan50,red500,grey500,grey100,blueGrey100,blueGrey50} from 'material-ui/styles/colors';
import {Grid, Row, Col} from 'react-flexbox-grid'
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';
import {Card} from 'material-ui/Card';
const styles ={
  cardStyle:{backgroundColor:blueGrey50,
    height:window.innerHeight,
    padding:10,
    width:"100%"
  },
};

export default class InviteAccept extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={canSubmit: false};
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  enableButton() 
  {
   this.setState({canSubmit: true});
 }
   disableButton() 
   {
    this.setState({canSubmit: false});
  }
  submitForm(data) {
   alert(JSON.stringify(data, null, 4));
 }

  redirectInvitedMemberDetails(email,title)
  {
    this.props.router.replace('/memberDetails/?email='+email+'&title='+title);
  }

  render()
  { 
     return(
      
      <Grid>
      <Paper>
      <Card style={styles.cardStyle}>
      <Row center='xs'>
          <span style={{marginTop:'15px'}}>
          <Avatar style={{backgroundColor:"#004D40"}} src="./../../resources/images/buddy.png" alt="qwerty" size={150}/>
          </span> 
        </Row>
         <Row center="xs">
          <h1>ItzFriday</h1>
        </Row>
          <Row center="xs">
          <p>You have been invited to join a project named "Buddy"</p>
        </Row>
        <Row center="xs">
           <RaisedButton 
            style={{
              marginTop:"25px"
           }}
            type="submit"
            label="Accept Invitation"
            labelColor="white"
            backgroundColor="#4CAF50" 
            onClick={() => this.redirectInvitedMemberDetails("abc@gmail.com","Friday")}>
            </RaisedButton> 
          </Row>
          <Row center="xs">
          <p style={{marginTop:"125px", width:"600px"}}><strong>"ItzFriday"</strong> has been created for the people working in collabration to create ,code and manage their projects at one platform with a friendly environment.</p>
         </Row>
         </Card>
      </Paper>
      
      </Grid>
      
      );
  }

}
