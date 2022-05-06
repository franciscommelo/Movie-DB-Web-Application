
const api = require('./api.js');
const auth = require('./auth.js');
const { getCurrentUser } = require('./auth.js');
var Handlebars = require("handlebars");
const modListContentsTemplate =Handlebars.compile(require('../views/modListContentsTemplate.hbs'));
const groupPage = Handlebars.compile(require('../views/groupPage.hbs'));
const tvshwoWEB = Handlebars.compile(require('../views/tvShowWeb.hbs'));


let currentGroup;

async function GroupPage(txt, currGroup) {
  let response;
  if (!currGroup) {
    response = (await (await fetch(`/group/find/${txt}`)).json());
    currentGroup = response;
  }
  else {
    response = currGroup;
  }
  if (response.TV_Shows.length == 0) response.status = true;
  list.innerHTML = groupPage(response);
  document.querySelectorAll('img').forEach(elem => elem.addEventListener('click', function () {
    GetTvShow(elem)
  }))
  if(response.TV_Shows.length != 0){
    document.getElementById('butInsert').addEventListener('click', () => RefreshRange())
  // Delete button
  var btnDelete = document.getElementsByClassName('btn btn-danger');
  Array.prototype.forEach.call(btnDelete, elem => elem.addEventListener('click', function () {
    deleteTv(elem.getAttribute('data-name'));
  }))
}



}
// Group delete
async function deleteGroup(gId) {
  api.DeleteGroup(gId)
    .then(response => {
      setTimeout(() => {
        location.reload();
      }, 500);
    })

}
// Delete TVShow
async function deleteTv(tvName) {
  var gId = document.getElementById("container")
                    .getAttribute("data-id");

  api.DeleteTv(gId, tvName)
    .then(response => {
      setTimeout(() => {
        location.reload();
      }, 500);
    })

}


async function RefreshRange() {
  var max = parseInt(document.getElementById("max").value);
  var min = parseInt(document.getElementById("min").value);

  var id = document.getElementById("container").getAttribute("data-id");
  var name = document.getElementById("container").getAttribute("data-name");
  if (min > max) alert("Minimum can't be greater than maximum");
  else {

    const answer = await api.by_rate(id, min, max);

    if (answer.status)
      alert("No movie found for this range!");
    else {

      const group = {
        "TV_Shows": answer,
        "id": id,
        "name": name
      }

      currentGroup = group;

      list.innerHTML = groupPage(group);
      document.getElementById('butInsert').addEventListener('click', () => RefreshRange())

      document.querySelectorAll('img').forEach(elem => elem.addEventListener('click', function () {
        GetTvShow(elem)
      }))


      // Delete button
      var btnDelete = document.getElementsByClassName('btn btn-danger');
      Array.prototype.forEach.call(btnDelete, elem => elem.addEventListener('click', function () {
        deleteTv(elem.getAttribute('data-name'));
      }))



    }

  }

}



/// Edit group
async function editGroup(groupIc) {

  var nDes = document.getElementById("message-text").value;
  var nName = document.getElementById("recipient-name").value;
 
   api.EditGroup(groupIc,nName,nDes)
    .then(res => {
      setTimeout(() => {
        location.reload();
      }, 1000);
    })
}




async function GetTvShow(img) {
  const response = await api.GetMovieByID(img.alt);
  list.innerHTML = tvshwoWEB(response);

  const btnBack = document.getElementById('btnBack');

  btnBack.addEventListener('click', function () {
    GroupPage(null, currentGroup)

  })


}


async function shareGroup(groupid) {

  var username = document.getElementById("recipient-username").value;
  
  //check if is a valid user 
  try{
    await api.checkUser(username);
  }
  catch(err){
    alert(err)
    return
  }
  //get group
  var group = await api.findGroup(groupid);

  //check if user is already in peding/sharing lists 
  var indexP = group.pending.indexOf(username);
  var indexS = group.shared.indexOf(username);

  if (group.username == username)
    alert("The user is the owner of this group")
  else if (indexP != -1)
    alert("Invitation pending")
  else if (indexS != -1)
    alert("The user is already sharing this group")
  else {
    group.pending.push(username);
    await api.UpdateShared(groupid, group.shared, group.pending);
    alert("Ivitation Sent")
  }
 

}



async function GroupAccepted(accepted, GroupId) {

  var group = await api.findGroup(GroupId);

  const user = await auth.getCurrentUser();

  var index = group.pending.indexOf(user);
  if (index !== -1) group.pending.splice(index, 1);

  if (accepted)
    group.shared.push(user);

  api.UpdateShared(GroupId, group.shared, group.pending)
  setTimeout(() => {
    location.reload();

  }, 1000);
}







module.exports = {
  getView: (req) => `
  <p id='list'></p>
  `,

  run: async (req) => {

    const list = document.querySelector('#list');
    const answer = await api.groupAll();

    if (answer.status) {
      alert(answer.message)
      if (answer.message == 'User unauthenticated.') location.assign('#login')

    }
    else {
      
      if (answer.length == 0) answer.status = true;

      //adding flag for each group
      
      let user = await api.getUser();

      answer.forEach(elem => {    
        if (elem.username == user) elem.owner = true; //group owner
        else if (elem.pending && elem.pending.includes(user)) elem.isPending = true; //invitation pending
        else if (elem.shared && elem.shared.includes(user)) elem.isShared = true; //group shared
      })


      
      list.innerHTML = modListContentsTemplate(answer);
     

      //Visit group Button EventListners
      const groups = document.getElementsByClassName('btn btn-primary text-light');
      Array.prototype.forEach.call(groups, elem => elem.addEventListener('click', function () {
        if (elem.getAttribute('data-id'))
        GroupPage(elem.getAttribute('data-id'));
      }))
     
     
     
    
      //Get element that trigged the share modal
      var triggerElementShare;
      $('#sharemodal').on('shown.bs.modal', function (event) {
        triggerElementShare = ($(event.relatedTarget))[0]; 
      });

      // Share Button EventListner
      var btnShared = document.getElementById('btnShare');
      btnShared.addEventListener('click', function () {
        shareGroup(triggerElementShare.getAttribute('data-id'));
      })

      //Get element that trigged the edit modal
      var triggerElementEdit;
      $('#editModal').on('shown.bs.modal', function (event) {
        triggerElementEdit = ($(event.relatedTarget))[0];  
        triggerElementEdit.getAttribute('data-id');
      });

      // Edit Button EventListners
      var btnEdit = document.getElementById('btnEdit');
      btnEdit.addEventListener('click', function () {
        editGroup(triggerElementEdit.getAttribute('data-id'));
      })


      /// Delete group EventListners
      var dGroup = document.getElementsByClassName('fa fa-window-close');
      Array.prototype.forEach.call(dGroup, elem => elem.addEventListener('click', function () {
        deleteGroup(elem.getAttribute('data-gId'));
      }))


      //Accepted Btn EventListners
      var acceptBtns = document.getElementsByClassName('fa fa-check');
      Array.prototype.forEach.call(acceptBtns, elem => elem.addEventListener('click', function () {
        GroupAccepted(true, elem.getAttribute('data-id'));
      }))



      //Rejected Btn EventListners
      var rejectBtns = document.getElementsByClassName('fa fa-times');
      Array.prototype.forEach.call(rejectBtns, elem => elem.addEventListener('click', function () {
        GroupAccepted(false, elem.getAttribute('data-id'));
      }))


    }
  }
}
