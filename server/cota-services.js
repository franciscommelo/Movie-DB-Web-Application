'use strict'

const STORAGE_KEY = 'items';



function service(storage, mdd) {

	const theService = {

   
    TV_Popular: (page) => mdd.getPopularTv(page).then(  response=> response.results),

    Search_TV:  (params)=> mdd.getSearchTV(params)
    .then(response=>{
      if(response.total_results==0){
        throw {statusCode:404, message: "No TV Show found" };

      } 
      return response.results}),


      


     

      Search_id:  (params)=>
      mdd.getSearchTVid(params)
      .then(response=>{

        if(response.total_results==0){
          throw {statusCode:404, cause: 'unauthenticated', message: "No TV Show found" };
         
        }
          
        var body = {
          "name": response.name,
          'id': response.id,
          "overview": response.overview,
          "poster_path:": response.poster_path,
          "vote_average": response.vote_average,
          "poster_path": response.poster_path
        };

        return body;
      }),




    Create_Group:  (name, desc,user)=>  {
      if (!user) {
				throw { cause: 'unauthenticated', message: 'User unauthenticated.' };
			}
      return storage.add(name,desc,user.username)},

    Edit_Group: (id,name, desc) => storage.edit(id, name, desc),      
    

    List_All: function (user) {

      if (!user) {
				throw {statusCode:401, cause: 'unauthenticated', message: 'User unauthenticated.' };
			}

        return storage.retAll(user.username)
          .then(response=>  
            
            response.hits.hits.map(object => {
           
            // _source contem apenas o grupo sem ID
            let object_w_ID = object._source
            object_w_ID.id = object._id
            //apagar a proriedade TV SHOWS
            delete object_w_ID.TV_Shows
            return object_w_ID;

          }))
          
    },

    Find_Group: function (id) {
        return storage.Find_Group(id)
          .then(response=> response._source)
    
    },
    Delete_Group:(id) => storage.Delete_Group(id),


    Add_TVShow: function (id,name) {
            
            
         return new Promise ((resolve,reject)=>{
            this.Search_id(name)
            
            .then(json=>{  
                storage.Add_TVShow(id, json)
                .then(TV_Show =>resolve(TV_Show))
                .catch(err=>reject(err))

            })
              .catch(err=>reject(err))
            })         
         

},

    UpdateShared: (id,shared,pending) => storage.UpdateShared(id,shared,pending),


    Delete_TVShow:  (id,name) => storage.Delete_TVShow(id, name),
    By_Rate:  (id,min,max) => storage.By_Rate(id, min, max)

}


return theService;
}

module.exports = service;


