'strict'

const DEFAULT_PORT = 8888;

const PORT = process.argv[2] || DEFAULT_PORT;


const express = require('express');
const webapiCreator = require('./cota-web-api.js');
const serviceCreator = require('./cota-services.js');
//const storage = require('./cota-db.js');
const mdd = require('./movie-database-data.js');
const hbs = require('hbs');

const cookieParser = require('cookie-parser') 
const morgan = require('morgan') 

const app = express();
//app.use(morgan('dev'))


const storageCreator = require('./cota-storage-ES.js');

const storage_ES = storageCreator('http://localhost:9200/', 'cota/group');
const auth = require('./cota-auth.js');


auth.initialize(app);
app.use(cookieParser())


//**service created with Mocka storage
//const service = serviceCreator(storage, mdd);

//**service created with ElasticSearch storage
const service = serviceCreator(storage_ES, mdd);


webapiCreator(app, auth,service);


// //ERROR HANDLING
// app.use((err, req, res, next) => {
//   if(err){
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';

//   //return error status and message
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message
//   });
// }});



app.use(express.static('../client/dist'));



app.listen(PORT); 

