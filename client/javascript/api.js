const auth = require('./auth.js')
module.exports = {
  logout: async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      }
    })

    if (response.status == 200) {
      return;
    } else {
      throw 'Logout failed';
    }
  },

  login: async (username, password) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          'username': username,
          'password': password
        })
      })

      const body = await response.json();

      if (body && body.username) {
        return body.username;
      } else {
        throw "Login failed!";
      }
    }
    catch (err) {
      throw "Login failed!";

    }

  },
  signUp: async (username, email, password) => {


    const response = (await (await (fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'email': email,
        'password': password
      })
    }))).json())

    if (response.status) {
      throw response.message;

    }
    else {
      const user = JSON.parse(response)

      if (user && user.username) {
        return response.username;

      } else {
      }
    }
  }
  ,




  getUser: async () => {
    const u = await (await fetch('/user')).json();

    return u.username;
  },

  groupAll: async () => {

    const resp = (await (await fetch('/group/all', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "user": auth.getCurrentUser
      })
    })).json());
    return resp;

  },

  checkUser: async (username) => {
    try {
      const resp = (await (await fetch(`/checkuser/${username}`)).json());
      return resp;
    }
    catch (err) {
      throw "User not found!"
    }




  },

  findGroup: async (groupid) => {

    const resp = (await (await fetch(`/group/find/${groupid}`)).json());
    return resp;

  },

  UpdateShared: async (id, shared, pending) => {

    return (await (await fetch(`/group/update/shared`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        {

          "id": id,
          "shared": shared,
          "pending": pending
        }
      )
    })).json())

  },



  by_rate: async (id, min, max) => {

    var res =  (await fetch(`/group/by_rate/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        {

          "min": min,
          "max": max,
        }
      )
    }))
    if(res.status ==200)
      return await res.json()
    else
      return res
  },
  getTvShow: async (tvshow) =>{
     
      const res = (await fetch(`http://localhost:8888/search/tv/${tvshow}`))
      if(res.status ==200)
        return await res.json()
      else return res

    
  }
  ,

  AddTVShow: async (TvShowID, gID) => {


    const result = (await fetch('/group/add/tvshow', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        {
          "id": gID.options[gID.selectedIndex].value,
          "name": TvShowID
        }
      )
    }))

    if(result.status== 200)
      return "TV Show added sucessfuly!"
    else if(result.status== 409)
      throw "TV Show already exists in this group"
    else
      throw "Error!"
    
    


    
  },

  AddGroup: async (GroupName, GroupDescription) => {

    const resp = (await (await fetch('/group/create', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "name": GroupName,
        "desc": GroupDescription,
        "user": auth.getCurrentUser,
      })
    })).json());




    if (resp.status == 'error') {

      throw ("Acess denied! You need to login first")
    }
    else
      return resp



  },

  DeleteGroup: async function (gId) {
    await fetch('group/delete/', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "id": gId,
      })
    })
  },

  DeleteTv: async function (gId, tvName) {

    return await fetch('group/delete/tvshow', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "id": gId,
        "name": tvName
      })
    })



  },
  EditGroup: async function (groupIc, nName, nDes) {
    return await fetch('/group/edit', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },

      body: JSON.stringify({
        "id": groupIc,
        "name": nName,
        "desc": nDes
      })
    })

  },

  GetMovieByID: async function(id){


    return await (await(await (fetch(`/searchid/tv/${id}`))).json());
  },

  GetPopulars: async function(page){

   return await (await fetch(`/tv/popular/${page}`)).json()
  }

}