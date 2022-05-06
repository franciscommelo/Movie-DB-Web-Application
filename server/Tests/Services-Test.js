'strict'

var expect = require('chai').expect;
var should = require('chai').should();

const serviceCreator = require('../cota-services.js');

const storageCreator = require('../cota-storage-ES.js');

const storage_ES = storageCreator('http://localhost:9200/', 'cota/group');

const mdd = require('../mock-movie-database-data.js')


const service = serviceCreator(storage_ES, mdd);


describe('Popular Tv Show Test',  function () {
    
	it('TV_Popular should return an Array with 20 Tv Shows', async function () {
        const response  = await   service.TV_Popular( );
        expect(response).to.be.an('array');
        response.should.have.lengthOf(20);
    })
   



    
});


describe('Search Tv Show Test',  function () {
    
	it('Search Valid Tv Show', async function () {
        const response  = await   service.Search_TV("The Flash");
        response.should.exist
        expect(response.name).to.be.equal("The Flash");
    })
   
      
	it('Search Invalid Tv Show should return Error', async function () {
        try{
            const response  = await   service.Search_TV("Invalid TV Show");
        }
        catch(err){
            expect(err).to.be.an('Error')
            expect(err.message).to.be.equal("No TV Show found")
        }
    })
   



    
});

