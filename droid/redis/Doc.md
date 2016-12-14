#GitBot
The following document describes the design of bot's functionality and specs.

##User Intent
* Create an issue
* List all issues
* Comment on in issue
* Close an issue

##Input format
* Key "value"
* JSON

##Create an issue
###Context: 
* project owner
* project repo
* authentication token

###Props:
* Required:
	- Title
* Optional:
	- Body
	- Labels
	- Assignees
* Coded:
	- State

###Keywords:
* (create/ new/ open) + issue + (title)?	--> get the title from following " "
* project					--> get the owner & repo from following @owner/repo
* (desc/description/detail)			--> get the body of the content from following " "
* (label/type)					--> get the label from following "label1/label2/.../n"
* (assign/give/to)				--> get the assignees list from assignee1/assignee2/..../assigneeN

###Pattern:

Format-1
'create issue "title of the issue"
under project "aptDroid/HTML5" 
having description "Somebody describe the issue!!" 
with label "bug, help wanted"
and assign it to "aptDroid,suganya-g"'

Format-2
'in project "aptDroid/HTML5" 
create issue "my issue" 
assigned to "aptDroid, suganya-g" 
with description "content of the issue" 
with label "bug, help Wanted" '

Format-JSON 
publish GitBot 'issue create {"username":"aptDroid","repo":"HTML5","authToken":"4aff7267295cc1c030ee62c13ce82e3ffc205656","title":"new issue","body":"first comment","labels":["bug","help wanted"],"assignees":["aptDroid","suganya-g"],"state":"open"}'


