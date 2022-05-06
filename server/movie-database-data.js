'use strict';

const fs = require('fs')
const apiKey = fs.readFileSync('API_KEY.txt').toString()




const fetch = require('node-fetch');


module.exports = {

    getPopularTv: (page)=>
         fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${page}`)
                .then(response=>response.json() ),



     getSearchTVid: async function (params) {

        console.log(`https://api.themoviedb.org/3/tv/${params}?api_key=${apiKey}`)
     let response = await(await fetch(`https://api.themoviedb.org/3/tv/${params}?api_key=${apiKey}`)).json()
        return response
    },

    

    getSearchTV:  (params) =>
            fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${params}&page=1`)
            .then(response=>{
                              return response.json()
                
            }
            ),

    }





    