'strict'

var expect = require('chai').expect;
var should = require('chai').should();
const fetch = require('node-fetch');

const storageCreator = require('../cota-storage-ES.js');
const storage_ES = storageCreator('http://localhost:9200/', 'cota/group');




describe('Return All Test', function () {

    //RET ALL TEST


    it('retAll should return ', async function () {
        // Arrange
        const All = await storage_ES.retAll();
        should.exist(All)

    });

    it('retAll should return an array with length above 1', async function () {
        const All = await storage_ES.retAll();
        expect(All.hits.hits).to.be.have.length.above(0)
    })



});


describe('Add Group Test', function () {

    it('add should return an string (Group ID)', async function () {
        group_ID = await storage_ES.add('name', 'Desc');
        expect(group_ID).to.be.a('string')
        await fetch("http://localhost:9200/cota/group/" + group_ID, { method: "delete" })

    })






});

describe('Find Group Test', function () {


    it('Find_Group(5345) should return error', async function () {
        try {
            await storage_ES.Find_Group(423)
        }
        catch (err) {
            expect(err).to.be.an('Error')
            expect(err.message).to.be.equal('Group not found')

        }
    })




    it('Find_Group("valid ID") should return a valid Group Object', async function () {


        const group_ID = await storage_ES.add("Test Group2", "Test Description");

        const group_found = await storage_ES.Find_Group(group_ID);

        should.exist(group_found)
        //alterar
        expect(group_found._source.name).to.be.equal("Test Group2")


        await fetch("http://localhost:9200/cota/group/" + group_ID, {
            method: "delete"
        })

    })


});



describe('Edit Group Test', function () {


    it('edit("invalid ID should return error")', async function () {
        try {
            await storage_ES.edit(423, "Name ", "Desc")
        }
        catch (err) {
            expect(err).to.be.an('Error')
            expect(err.message).to.be.equal('Group not found')

        }
    })

    it('edit("valid ID") should return sucess message', async function () {

        const group_ID = await storage_ES.add("Test Group3", "Test Description");

        const message = await storage_ES.edit(group_ID, "New Name", "New Desc");

        expect(message).to.be.equal("Group updated successfully");


        await fetch("http://localhost:9200/cota/group/" + group_ID, { method: "delete" })
    })

});

describe('Add Tv Show Test', function () {


    it('Add_TVShow("Invalid ID Group should return Resource Error")', async function () {
        try {
            await storage_ES.Add_TVShow(423, {})
            done();
        }
        catch {
            (err => {

                expect(err).to.be.an('Error')
                expect(err.message).to.be.equal('Group not found')
            })

        }

    })

    it('Add_TVShow("valid ID, Valid TV Show should return sucess message")', async function () {



        const group_ID = await storage_ES.add("Test Group4", "Test Description");

        const Tv_Show = {
            name: 'Da Feng Ge',
            popularity: 1.164,
            overview: "Da Feng Ge, also known as Da Han Shengshi and Wind Song, is a Chinese television series based on historical events in the early Han Dynasty, beginning with the founding of the dynasty by Emperor Gaozu after his triumph over Xiang Yu, and the events leading to the reign of Emperor Wen. Directed by Huang Jianzhong, the " +
                +"series starred Ray Lui, Wang Ji, Liu Mu, Zhang Guangbei, Chen Wei and Li Qingxiang in the leading roles. It was first broadcast on CCTV-8 in China on 17 December 2011.",
            vote_average: 0
        }


        const response = await storage_ES.Add_TVShow(group_ID, Tv_Show);
        expect(response).to.be.equal("Sucessfully added")

        await fetch("http://localhost:9200/cota/group/" + group_ID, { method: "delete" })

    })

    it('Add_TVShow("Same TV Show") 2X should return Error', async function () {



        const group_ID = await storage_ES.add("Test Group5", "Test Description");

        const Tv_Show = {
            name: 'Da Feng Ge',
            popularity: 1.164,
            overview: "Da Feng Ge, also known as Da Han Shengshi and Wind Song, is a Chinese television series based on historical events in the early Han Dynasty, beginning with the founding of the dynasty by Emperor Gaozu after his triumph over Xiang Yu, and the events leading to the reign of Emperor Wen. Directed by Huang Jianzhong, the " +
                +"series starred Ray Lui, Wang Ji, Liu Mu, Zhang Guangbei, Chen Wei and Li Qingxiang in the leading roles. It was first broadcast on CCTV-8 in China on 17 December 2011.",
            vote_average: 0
        }


        const response = await storage_ES.Add_TVShow(group_ID, Tv_Show);
        expect(response).to.be.equal("Sucessfully added")

        try {
            const response = await storage_ES.Add_TVShow(group_ID, Tv_Show);
        }
        catch (err) {
            expect(err).to.be.an('Error')
            expect(err.message).to.be.equal('Tv Show already exists in this group')
            await fetch("http://localhost:9200/cota/group/" + group_ID, { method: "delete" })

        }

    }

    )
});

describe('Delete_TVShow Test', function () {


    it('Delete_TVShow("Invalid ID Group should return Resource Error")', async function () {
        try {
            await storage_ES.Delete_TVShow(423)

        }
        catch {
            (err => {
                expect(err).to.be.an('Error')
                expect(err.message).to.be.equal('Group not found')
            })

        }

    })


    it('Delete_TVShow("Invalid ID Group should return Resource Error")', async function () {

        const group_ID = await storage_ES.add("Test Group6", "Test Description");

        try {

            await storage_ES.Delete_TVShow(group_ID, "Invalid Name")

        }
        catch {
            (err => {
                expect(err).to.be.an('Error')
                expect(err.message).to.be.equal('TV Show not found')

            })
            await fetch("http://localhost:9200/cota/group/" + group_ID, { method: "delete" })


        }

    })


    it('Delete_TVShow("Invalid ID Group should return Resource Error")', async function () {


        const group_ID = await storage_ES.add("Test Group7", "Test Description");



        const Tv_Show = {
            name: 'Da Feng Ge',
            popularity: 1.164,
            overview: "Da Feng Ge, also known as Da Han Shengshi and Wind Song, is a Chinese television series based on historical events in the early Han Dynasty, beginning with the founding of the dynasty by Emperor Gaozu after his triumph over Xiang Yu, and the events leading to the reign of Emperor Wen. Directed by Huang Jianzhong, the " +
                +"series starred Ray Lui, Wang Ji, Liu Mu, Zhang Guangbei, Chen Wei and Li Qingxiang in the leading roles. It was first broadcast on CCTV-8 in China on 17 December 2011.",
            vote_average: 0
        }


        await storage_ES.Add_TVShow(group_ID, Tv_Show);



        const response = await storage_ES.Delete_TVShow(group_ID, "Da Feng Ge")


        expect(response).to.be.equal("TV Show deleted sucessfully!")
        await fetch("http://localhost:9200/cota/group/" + group_ID, { method: "delete" })


    })
});

describe('By_Rate Test', function () {



    it('By_Rate("Invalid ID Group should return Resource Error")', async function () {
        try {
            await storage_ES.By_Rate(423)

        }
        catch {
            (err => {
                expect(err).to.be.an('Error')
                expect(err.message).to.be.equal('Group not found')
            })

        }

    })

    it('By_Rate("Valid ID Group without Tv Show should return error")', async function () {

        const group_ID = await storage_ES.add("Test Group9", "Test Description");
        try {


            await storage_ES.By_Rate(group_ID, 3, 2)

        }
        catch (err) {
            expect(err).to.be.an('Error')
            expect(err.message).to.be.equal('TV Show not found')

        }

        await fetch("http://localhost:9200/cota/group/" + group_ID, { method: "delete" })

    }



    )

    it('By_Rate("With 2 Tv Show in the range should return an array with length = 2")', async function () {


        const group_ID = await storage_ES.add("Test Group10", "Test Description");


        const Tv_Show2 = {
            name: 'Test 1',
            popularity: 1.164,
            overview: "Da Feng Ge, also known as Da Han Shengshi and Wind Song, is a Chinese television series based on historical events in the early Han Dynasty, beginning with the founding of the dynasty by Emperor Gaozu after his triumph over Xiang Yu, and the events leading to the reign of Emperor Wen. Directed by Huang Jianzhong, the " +
                +"series starred Ray Lui, Wang Ji, Liu Mu, Zhang Guangbei, Chen Wei and Li Qingxiang in the leading roles. It was first broadcast on CCTV-8 in China on 17 December 2011.",
            vote_average: 8
        }
        const Tv_Show1 = {
            name: 'Test 2',
            popularity: 1.164,
            overview: "Da Feng Ge, also known as Da Han Shengshi and Wind Song, is a Chinese television series based on historical events in the early Han Dynasty, beginning with the founding of the dynasty by Emperor Gaozu after his triumph over Xiang Yu, and the events leading to the reign of Emperor Wen. Directed by Huang Jianzhong, the " +
                +"series starred Ray Lui, Wang Ji, Liu Mu, Zhang Guangbei, Chen Wei and Li Qingxiang in the leading roles. It was first broadcast on CCTV-8 in China on 17 December 2011.",
            vote_average: 5
        }


        await storage_ES.Add_TVShow(group_ID, Tv_Show1);


        await storage_ES.Add_TVShow(group_ID, Tv_Show2);


        const response = await storage_ES.By_Rate(group_ID, 4, 9)


        response.should.have.lengthOf(2);
        await fetch("http://localhost:9200/cota/group/" + group_ID, { method: "delete" })








    })


    it('By_Rate("With 1 Tv Show in the range should return an array with length = 1")', async function () {


        const group_ID = await storage_ES.add("Test Group11", "Test Description");


        const Tv_Show2 = {
            name: 'Test 1',
            popularity: 1.164,
            overview: "Da Feng Ge, also known as Da Han Shengshi and Wind Song, is a Chinese television series based on historical events in the early Han Dynasty, beginning with the founding of the dynasty by Emperor Gaozu after his triumph over Xiang Yu, and the events leading to the reign of Emperor Wen. Directed by Huang Jianzhong, the " +
                +"series starred Ray Lui, Wang Ji, Liu Mu, Zhang Guangbei, Chen Wei and Li Qingxiang in the leading roles. It was first broadcast on CCTV-8 in China on 17 December 2011.",
            vote_average: 8
        }
        const Tv_Show1 = {
            name: 'Test 2',
            popularity: 1.164,
            overview: "Da Feng Ge, also known as Da Han Shengshi and Wind Song, is a Chinese television series based on historical events in the early Han Dynasty, beginning with the founding of the dynasty by Emperor Gaozu after his triumph over Xiang Yu, and the events leading to the reign of Emperor Wen. Directed by Huang Jianzhong, the " +
                +"series starred Ray Lui, Wang Ji, Liu Mu, Zhang Guangbei, Chen Wei and Li Qingxiang in the leading roles. It was first broadcast on CCTV-8 in China on 17 December 2011.",
            vote_average: 5
        }


        await storage_ES.Add_TVShow(group_ID, Tv_Show1);


        await storage_ES.Add_TVShow(group_ID, Tv_Show2);


        const response = await storage_ES.By_Rate(group_ID, 6, 8)

        response.should.have.lengthOf(1);
        await fetch("http://localhost:9200/cota/group/" + group_ID, { method: "delete" })


    })


    it('By_Rate("With 0 Tv Show in the range should return Error")', async function () {


        const group_ID = await storage_ES.add("Test Group12", "Test Description");


        const Tv_Show2 = {
            name: 'Test 1',
            popularity: 1.164,
            overview: "Da Feng Ge, also known as Da Han Shengshi and Wind Song, is a Chinese television series based on historical events in the early Han Dynasty, beginning with the founding of the dynasty by Emperor Gaozu after his triumph over Xiang Yu, and the events leading to the reign of Emperor Wen. Directed by Huang Jianzhong, the " +
                +"series starred Ray Lui, Wang Ji, Liu Mu, Zhang Guangbei, Chen Wei and Li Qingxiang in the leading roles. It was first broadcast on CCTV-8 in China on 17 December 2011.",
            vote_average: 8
        }
        const Tv_Show1 = {
            name: 'Test 2',
            popularity: 1.164,
            overview: "Da Feng Ge, also known as Da Han Shengshi and Wind Song, is a Chinese television series based on historical events in the early Han Dynasty, beginning with the founding of the dynasty by Emperor Gaozu after his triumph over Xiang Yu, and the events leading to the reign of Emperor Wen. Directed by Huang Jianzhong, the " +
                +"series starred Ray Lui, Wang Ji, Liu Mu, Zhang Guangbei, Chen Wei and Li Qingxiang in the leading roles. It was first broadcast on CCTV-8 in China on 17 December 2011.",
            vote_average: 5
        }


        await storage_ES.Add_TVShow(group_ID, Tv_Show1);


        await storage_ES.Add_TVShow(group_ID, Tv_Show2);

        try {
            await storage_ES.By_Rate(group_ID, 6, 8)

        }
        catch (err) {
            expect(err).to.be.an('Error')
            expect(err.message).to.be.equal('TV Show not found')
        }
        await fetch("http://localhost:9200/cota/group/" + group_ID, { method: "delete" })



    })


});


     ///////////////////////////////////
    ///                             ///
   ///       Tests Results         ///
  ///          17/04/2020         ///
 ///                             ///
///////////////////////////////////

// Return All Test
// √ retAll should return 
// √ retAll should return an array with length above 1

// Add Group Test
// √ add should return an string (Group ID)

// Find Group Test
// √ Find_Group(5345) should return error
// √ Find_Group("valid ID") should return a valid Group Object (40ms)

// Edit Group Test
// √ edit("invalid ID should return error")
// √ edit("valid ID") should return sucess message (61ms)

// Add Tv Show Test
// √ Add_TVShow("Invalid ID Group should return Resource Error")
// √ Add_TVShow("valid ID, Valid TV Show should return sucess message") (57ms)
// √ Add_TVShow("Same TV Show") 2X should return Error (60ms)

// Delete_TVShow Test
// √ Delete_TVShow("Invalid ID Group should return Resource Error")
// √ Delete_TVShow("Invalid ID Group should return Resource Error")
// √ Delete_TVShow("Invalid ID Group should return Resource Error") (88ms)

// By_Rate Test
// √ By_Rate("Invalid ID Group should return Resource Error")
// √ By_Rate("Valid ID Group without TV Shows should return error") (38ms)
// √ By_Rate("With 2 Tv Show in the range should return an array with length = 2") (84ms)
// √ By_Rate("With 1 Tv Show in the range should return an array with length = 1") (87ms)
// √ By_Rate("With 0 Tv Show in the range should return Error") (84ms)


// 18/18passing (793ms)














