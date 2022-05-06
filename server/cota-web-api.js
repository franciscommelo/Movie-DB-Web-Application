'use strict'
var express = require('express')

function webapi(app, auth, service) {

    const theWebApi = {

        TV_Popular: function (req, res) {
                service.TV_Popular(req.params.page)
                    .then(json => res.json(json))
                    .catch(err => {
                        res.status(err.statusCode)
                        .send(err.message);
                    })
       
        },


        Search_TV: function (req, res) {
            service.Search_TV(req.params.name)
                .then(json => {
                    return res.json(json)
                })
                .catch(err => { 
                    res.status(err.statusCode)
                    .send(err.message);})
        },

        Search_TV_by_ID: function (req, res) {

            service.Search_id(req.params.id)
                .then(json => {
                    return res.json(json)
                })
                .catch(err =>res.status(err.statusCode)
                                .send(err.message))
        },

        Create_Group: function (req, res) {
            
            get_Body(req)
                .then(resp => {
                    let error = param_check(resp, "name");
                    if (error)  res.status(error.statusCode)
                                   .send(error.message)
                    
                    else {
                        service.Create_Group(resp.name, resp.desc, req.isAuthenticated() && req.user)
                            .then(group_ret => res.status(201).json("Group created sucessfully"))
                            
                    }
                })
                .catch(error => {
                    if (error.cause == 'unauthenticated') 
                        res.status(401).send('unauthenticated')    
                    res.status(404).send(); 
                }
                )

        },




        Edit_Group: function (req, res) {
            get_Body(req)
                .then(resp => {
                    let error = param_check(resp, "id");

                    if (error) res.status(error.statusCode).send(error.message)
                    else {
                        if (!resp.name && !resp.desc) 
                            res.status(401)
                               .send("No body to edit")
                      

                        service.Edit_Group(resp.id, resp.name, resp.desc)
                            .then(edited_Group => res.json(edited_Group))
                            .catch(error => res.status(error.statusCode)
                                               .send(error.message));
                    }
                })
                .catch(error => res.status(error.statusCode)
                                   .send(error.message))
        },


        List_All: function (req, res) {
  
            service.List_All(req.isAuthenticated() && req.user)
                .then(json => { res.json(json) })
                .catch(err =>  res.status(err.statusCode)
                                  .send(err.message))
        },


        Find_Group: function (req, res) {
            let error = param_check(req.params, "id");
            if (error)
                res.status(error.statusCode)
                   .send(error.message)
            service.Find_Group(req.params.id)
                .then(json => {
                    json.id = req.params.id;
                    res.json(json)

                })
                .catch(err => res.status(err.statusCode).send())
        },



        Add_TVShow: function (req, res) {
            get_Body(req)
                .then(resp => {

                    let error = param_check(resp, "id");
                    error = param_check(resp, "name");
                    if (error)res.status(error.statusCode)
                                 .send(error.message) 
                    else {
                        service.Add_TVShow(resp.id, resp.name)
                            .then(TV_Show => res.json(TV_Show))
                            .catch(err =>{ 
                                
                                res.status(err.statusCode).send()
                                             
                            });
                            
                    }
                })
                .catch(error => {res.status(error.statusCode).send()})
        },

        Delete_TVShow: function (req, res) {

            get_Body(req)
                .then(resp => {

                    let error = param_check(resp, "id")
                    error = param_check(resp, "name")
                    if (error)  res.status(error.statusCode).send(error.message)
                    else {
                        service.Delete_TVShow(resp.id, resp.name)
                            .then(TV_Show_Removed => res.json(TV_Show_Removed))
                            .catch(err => res.status(err.statusCode).send())
                    }
                })
                .catch(error => res.status(error.statusCode).send())
        },


        Delete_Group: function (req, res) {
            get_Body(req) 
                .then(resp => {
                    let error = param_check(resp, "id")
                    if (error)  res.status(error.statusCode).send(error.message)
                    else {
                        service.Delete_Group(resp.id)
                            .then(Group_Removed => res.json(Group_Removed))
                            .catch(err => res.status(err.statusCode).send())
                    }
                })
                .catch(error =>res.status(error.statusCode).send())
        },

        By_Rate: function (req, res) {

           
            let error = param_check(req.params, "id");
            if (error)
                res.status(err.statusCode).send(err.message)
            let id = req.params.id;

            get_Body(req)
                .then(resp => {
                   
                    let error = param_check(resp, "min");
                    error = param_check(resp, "max");




                    if (resp["min"] > resp["max"]) error = new Error('Params incorrect')
                    if (error)  res.status(error.statusCode).send(error.message)
                    else {
                        service.By_Rate(id, resp.min, resp.max)
                            .then(arr_TvShow => { res.json(arr_TvShow) })
                            .catch(err => res.status(err.statusCode).send(err.message))


                    }
                })
                .catch(error => res.status(error.statusCode).send())
        },


        UpdateShared: async function (req,res){
            get_Body(req) 
            .then(resp => {

                let error = param_check(resp, "shared");
                error = param_check(resp, "pending");
                error = param_check(resp, "id");
                if (error) return res.status(error.statusCode).send(error.message)
                    
                service.UpdateShared(resp.id,resp.shared,resp.pending)
                    .then(edited_Group => res.json(edited_Group))
                    .catch(error => res.status(error.statusCode).send());
            
            })
            .catch(error => res.status(error.statusCode).send())


        },


        signup:  async function (req, res) {
            const userinfo = req.body;
            const email = userinfo.email;
            const username = userinfo.username;
            const password = userinfo.password;
           
                try{
                const user = await auth.checkUser(username);
                if(user == "User not found"){
                    try{
                    const usercreated = await auth.createUser(email,username, password)

                    res.json(usercreated);
                    }
                    catch(err){
                        res.status(404)

                    }
                }
                else{
                    res.status(409)
                    res.send("User already exits")
                
                }
            }
        
            catch(err){
                 res.status(401)
                 res.send("User not valid")
            }


        },


        login: async function (req, res) {
          

            const userinfo = req.body;
            const username = userinfo.username;
            const password = userinfo.password;


            try {

                const user = await auth.getUser(username, password);
                
                await login(req, user);
                res.status(200).json(user);
                return;

            } catch (err) {
                res.status(401);
                res.send("Invalid user or password!");
             
            }

            function login(req, user) {
                return new Promise((resolve, reject) => {
                 

                    req.login(user, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            
                            resolve(result);
                        }
                    });
                });
            }
        },

        logout: function (req, res) {
            req.logout();
            res.send();
        },

        getUser: function (req, res) {
            const username = req.isAuthenticated() && req.user.username;
            
            if (username) {
                res.json({ username: username });
            } else {
                res.status(404).send();
                return;
            }
        },
        checkUser:async function (req,res){
           
            const resp =  await auth.checkUser(req.params.username);
            if(resp.username)
                res.json("User valid")
                else {
                    res.status(404).send();
                    return;
                }

           

        }

    }

    app.use(express.json());





    //get list of popular tv shows <<
    app.get('/tv/popular/:page', theWebApi.TV_Popular);

    //search tv show by name <<
    app.get('/search/tv/:name', theWebApi.Search_TV);


    app.get('/searchid/tv/:id', theWebApi.Search_TV_by_ID);


    //create new group of TV Shows<<
    app.post('/group/create', theWebApi.Create_Group);

    //edit group <<
    app.put('/group/edit', theWebApi.Edit_Group);

    //list all groups<<
    app.post('/group/all', theWebApi.List_All);

    //find group by id << 
    app.get('/group/find/:id', theWebApi.Find_Group);

    //add new tv show to a group<<
    app.put('/group/add/tvshow', theWebApi.Add_TVShow);

    //delete tv show  <<
    app.delete('/group/delete/tvshow', theWebApi.Delete_TVShow);

    //list tv shows with vote average between 2 params <<
    app.post('/group/by_rate/:id', theWebApi.By_Rate);

    //delete tv show  <<
    app.delete('/group/delete/', theWebApi.Delete_Group);

    app.put('/group/update/shared', theWebApi.UpdateShared);


    app.post('/login', theWebApi.login);

    app.post('/logout', theWebApi.logout);

    app.get('/user', theWebApi.getUser);

    app.get('/checkuser/:username',theWebApi.checkUser)

    app.post('/signup', theWebApi.signup);



    return theWebApi;
}

module.exports = webapi;








//----Funcoes auxiliares-----

//get response body
function get_Body(req) {

    return new Promise((resolve, reject) => {
        let body = '';


        if (Object.keys(req.body).length != 0) {
            resolve(req.body);

        }
        else {
            req.on('data', chunk => {
                body += chunk.toString();
            }).on('end', () => {
                try {
                    resolve(JSON.parse(body));
                }
                catch{
                    const error = new Error;
                    error.statusCode = 400;
                    error.message = "Bad Request!";

                    reject(error)
                };

            });
        }
    })
}


//parameter validation
function param_check(resp, param) {

    if (!resp[param])
        return new Error(`${param} not provided`);

}

