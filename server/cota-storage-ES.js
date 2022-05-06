
'strict'


const fetch = require('node-fetch');

function storage(host, index) {
    
    
    const URI = host+index;   
    const searchURI = host+ index.split('/')[0]
    
	const theStorage = {


     add: async function (name,description,user) {

      var body = JSON.stringify({
        "name": name,
        "description": description,
        "username":user,
        "shared":[],
        "pending":[],
        "TV_Shows": []
      });
      

      var response = await   fetch(URI , {
            method: "post", headers: { 'Content-Type': 'application/json' }, body:body})
      
      

      const group_created = await response.json();
      return group_created._id; 

      },
      


      UpdateShared: async (id,shared,pending)=>{
       
        
        var body = JSON.stringify({
          "doc" : {
              "shared": shared,
              "pending": pending
            }})  
          
          //UPDATE ELASTICSEARCH
          //POST http://localhost:9200/cota/_update/:id
          
        var response = await   fetch(searchURI+ "/_update/"+id, {
          method: "post", headers: { 'Content-Type': 'application/json' }, body:body})
        
        const group_created =  await response.json();
          
        return new  Promise((resolve, reject)=>{
            if(group_created.error)
              reject({ statusCode:404, message: "Group not found" });
            
  
            resolve( "Group updated successfully")
          })


      },

        retAll: async (user)=> {
          var body = JSON.stringify({
            "query" : {
              "bool" : {
                "should": [{
                  "match": {
                    "username": user
                  }
                }, {
                  "match": {
                    "shared": user 
                  }
                  
                },
                , {
                  "match": {
                    "pending": user 
                  }
                }
              
               ]
              }
            }
          }
          );
         
       

      
   const response = await(await fetch(searchURI+'/_search', {
        method: "post", headers: { 'Content-Type': 'application/json' },body:body})).json();
    

   return response;
     
      }          
    ,

  
    Find_Group: (id) =>
       fetch(URI+'/'+id)
        .then(response=>{
          if(response.status>200)throw { statusCode:404, message: "Group found" }
          else
            return response.json()
        }
        )   
             
,
    
    edit:async function (id,name, description) {
      var body = JSON.stringify({
        "doc" : {
            "name": name,
            "description": description
          }})  
        
        //UPDATE ELASTICSEARCH
        //POST http://localhost:9200/cota/_update/:id
        

      var response = await   fetch(searchURI+ "/_update/"+id, {
        method: "post", headers: { 'Content-Type': 'application/json' }, body:body})
      
      const group_created =  await response.json();
        
      return new  Promise((resolve, reject)=>{
          if(group_created.error)
            reject({ statusCode:404, message: "Group not found" });
          

          resolve( "Group updated successfully")
        })
  },

    

  Add_TVShow:async function (id, TV_Show) {
      var body = JSON.stringify({
        "script": {
          "inline": "ctx._source.TV_Shows.add(params.TV_Show)",
          "lang": "painless",
          "params": {
            "TV_Show": TV_Show
          }
        }
      })

      

      return new Promise(async (resolve, reject)=>{ 
       


       let error = null;
       try{var group  = await this.Find_Group(id)}
       catch(err){error = err; reject(err)}

        
       
        
         
        if(error==null){
        const index = group._source.TV_Shows.findIndex(m => m.id == TV_Show.id);
        if(index != -1){
          reject({ statusCode:409, message: "TV Show already exists in this group" });
        }else{


        var response = await   fetch(URI+'/'+id +'/_update', {
          method: "post", headers: { 'Content-Type': 'application/json' }, body:body})
          const group_created = await response.json();

          if(group_created.error) 
              reject(group_created) 
          resolve("Sucessfully added") 

        }}})
      },


  
      Delete_TVShow: async function (id, name) {
       
              
            return   this.Find_Group(id)
              .then(async response => {
                if(!response.found) throw { statusCode:404, message: "Group not found" }
                 
                

                const index = response._source.TV_Shows.findIndex(m => m.name == name);
                if(index == -1)
                  throw { statusCode:404, message: "TV Show found" };
            

                //remove tv Show from the list
                response._source.TV_Shows.splice(index, 1);
                

                var body = JSON.stringify({
                  "doc" : {"TV_Shows": response._source.TV_Shows}
                 })

                 const Update_Response =   await fetch(searchURI+ "/_update/"+id, {
                  method: "post", headers: { 'Content-Type': 'application/json' }, body:body})

                  
                 if(Update_Response.status==200) return("TV Show deleted sucessfully!")        
              })
      },
      Delete_Group: async function (id) {

    
         const Update_Response =   await fetch(URI+ "/"+id, {
          method: "delete", headers: { 'Content-Type': 'application/json' }})
          
         
          if(Update_Response.status==200) return("Group Deleted!")          
        },







      By_Rate: async function (id, min, max) {
        return this.Find_Group(id)
          .then(response => {
            if(!response.found)throw { statusCode:404, message: "Group not found" };
         

                const ret_arr = []
                response._source.TV_Shows.forEach (  element   =>  {
                  
                    if (element.vote_average >= min && element.vote_average <= max){
                        
                      ret_arr.push(Object.assign({}, element));
                    }
                })
                if(ret_arr.length==0)
                  throw { statusCode:404, message: "TV Show not found" }
           
                


                return ret_arr;

    })
    }

}



return theStorage;
}

module.exports = storage;


