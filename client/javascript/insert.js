const auth = require('./auth.js');
const InsertView = require('../views/InsertView.html');
const api = require('./api.js');
module.exports= {
	getView: (req) => InsertView,
	run: () => {
		const txtGroupName = document.querySelector('#groupName');
		const txtGroupDescription = document.querySelector('#groupDescription');
		const butInsert = document.querySelector('#butInsert');
		
		butInsert.onclick = async () => {
			     
			const GroupName = txtGroupName.value;
			const GroupDescription  = txtGroupDescription.value;
			
	

			if (GroupName.length == 0) {
				alert('Field Name is empty.');
				return;
			}
		    api.AddGroup(GroupName,GroupDescription)
            .then(res => { 
				alert(res)
				location.assign('#list');	
			})
			.catch((err)=>{})
		}
		



	}
};
