const passport = require('passport');

//const express = require('express');
const session = require('express-session');

const fetch = require('node-fetch');
//const { response } = require('express');
const FileStore = require('session-file-store')(session);








function userToRef(user, done) {
	done(null, user.username);
}

async function  refToUser(userRef, done) {
     
//	const user = users[userRef]; 

     try{
		
	 const user =await module.exports.checkUser(userRef)
	 if(user == "User not found")
	 	done('User unknown');
	
	if (user.username) {
		done(null, user);
	} 
	
  }
  catch(err)    {
	  console.log(err)
	  done('Error');

	
		
	}
}

module.exports = {
	initialize: app => {
		app.use(session({
			resave: false,
			saveUninitialized: true,
			secret: 'iselleic',
			store: new FileStore(),
			cookie  : { maxAge  : (60*60 * 1000 *30 *60) }

			
		}));
		app.use(passport.initialize()); 
		app.use(passport.session()); 
		
		passport.serializeUser(userToRef);
		passport.deserializeUser(refToUser);		
	},
	
	getUser: async (username, password) => {
		var body = JSON.stringify({
        
			"size": 10000,
			"query": {
			  "constant_score": {
				"filter": {
				  "term": {
					"username": username
				  }
				}
			  }
			}
		  }
		  );
		 
		//  return users[username]

		const response = await(await fetch('http://localhost:9200/user/_search', {
			method: "post", headers: { 'Content-Type': 'application/json' },body:body})).json();
		 

		 try{
		 
		  const user = response.hits.hits[0]._source;
		 if(user.password == password)
			  return user	
		 throw 'Invalid username or password.';
 
		 } 
		 catch(err){
			 
		throw 'Invalid username or password.';
		 }
	
	},
	checkUser: async function(username){
		
		
		var body = JSON.stringify({
        
			"query": {
			  "constant_score": {
				"filter": {
				  "term": {
					"username": username
				  }
				}
			  }
			}
		  }
		  );

		  
		try{
		const response = await(await fetch('http://localhost:9200/user/_search', {
			method: "post", headers: { 'Content-Type': 'application/json' },body:body})).json();
				if(response.hits.hits.length!=0)	
				  return response.hits.hits[0]._source
				else{
					return "User not found"
				}
		}
		catch(err){
			throw err			
		}

	},
	createUser: async function (email, username, password) {
		var body = JSON.stringify( {
			'email': email,
			'username': username,
			'password': password
			
		})
		try{
	
	 //****PARAMETERIZAR O URI */
		const response = await(await fetch('http://localhost:9200/user/user', {
			method: "post", headers: { 'Content-Type': 'application/json' },body:body})).json();
		
		
		return body
		}
		
		catch(err){
			console.log(err)
		}
	}
}
