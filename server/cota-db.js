'use strict';


const db = [];
let count = 0;


	
module.exports = {


    add: function (group) {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                group.id = ++count;
                db.push(group);
                resolve( db.find(obj => obj.id == count));
            }, 200);

    })
},



    edit: function (id, group_edit) {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                if (db.findIndex(obj => obj.id == id) == -1) {
                    const error = new Error('Group not found')
                    reject(error);
                }
                else {
                    const index = db.findIndex(obj => obj.id == id);
                    db[index].name = group_edit.name;
                    db[index].description = group_edit.description;

                    resolve(db[index]);

                }
            })
        })
    },


   

    retAll: function () {
        return new Promise((resolve,reject)=>{
            if (db.length == 0) {
                const error = new Error('DB empty')
                reject(error);
            }
            else {
                resolve( db.map(obj => {
                    return {
                        'id': obj.id,
                        'name': obj.name,
                        'description': obj.description,   
                    }

                }));
            }
    })
},
    



    Find_Group: function (id) {

        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                const index = db.findIndex(obj => obj.id == id);
                if (index != -1) {

                    let group = Object.assign({}, db[index]);
                    group["TV Shows"] = group["TV Shows"].map(group => { return { 'TV Show name': group.name } })
                    resolve(group);


                }
                else {
                    const error = new Error('Group not found')
                    reject(error);
                }
            })

    })
},

    Add_TVShow: function (id, movie) {

        return new Promise((resolve,reject)=>{
            setTimeout(() => {

                const group = db.find(obj => obj.id == id);
                if (!group) {
                    const error = new Error('Group not found')
                    reject(error)
                } else {                
                    group['TV Shows'].push(movie);
                    console.log(movie);
                    resolve( movie);
                }
                

            })
    })
},


    Delete_TVShow: function (id, name) {
        return new Promise((resolve,reject)=>{
            setImmediate(() => {
                const group = db.find(obj => obj.id == id);
                if (!group) {
                    const error = new Error('Group not found')
                    reject(error)
                }
                else {
                    const arr_TVShow = group['TV Shows'];

                    const index = arr_TVShow.findIndex(m => m.name == name);
                    if (index != -1) {
                        let movie = arr_TVShow[index];
                        arr_TVShow.splice(index, 1);
                        resolve( movie);
                    }
                    else {
                        const error = new Error('TV Show not found')
                        reject(error)
                    }

                }
        })

    })
},

    By_Rate: function (id, min, max, done) {

        return new Promise((resolve,reject)=>{
            setImmediate(() => {

                const group = db.find(obj => obj.id == id);

                if (!group) {
                    const error = new Error('Group not found')
                    reject(error);

                }
                else {

                    const arr_TVShow = group['TV Shows'];
                    const ret_arr = []
                    arr_TVShow.forEach(element => {
                        if (element.vote_average >= min && element.vote_average <= max)
                            ret_arr.push(Object.assign({}, element));

                    });

                    if (ret_arr.size == 0) {
                        const error = new Error('No tv show found')
                        reject(error)
                    }
                    else
                        //order decr by voting 
                        resolve(ret_arr.sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1));

                }
            })
    })
    }


};