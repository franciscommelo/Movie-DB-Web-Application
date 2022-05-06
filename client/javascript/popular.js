

var Handlebars = require("handlebars");




const tvshwoWEB =
	Handlebars.compile(require('../views/tvShowWeb.hbs'))


const modPopularContentsTemplate =
	Handlebars.compile(require('../views/modContentsTemplate.hbs'));


const modDropdown =
	Handlebars.compile(require('../views/modDropdown.hbs'));


const api = require('./api.js');
const auth = require('./auth');

async function  AddTVShow(TVID){

	var elem = document.getElementById("groupId");
	   
	try{
	  alert(await api.AddTVShow(TVID,elem));
	}
	catch(err){
		 alert(err);
	}
	}
	

let currentPage ;

async function GetTvShow(img) {
	const btnNext = document.getElementById('btnNext');
	const currPage = Number(btnNext.getAttribute('data-page'))-1;

	const response = await api.GetMovieByID(img.alt);
	popularP.innerHTML = tvshwoWEB(response);

     if(auth.getCurrentUser()){ 
		//Dropdown list
		const dropdown = document.querySelector('#dropdown');
		const answer = await api.groupAll();

		dropdown.innerHTML = modDropdown(answer);

		const addTVShowBtn =  document.getElementsByClassName('fa fa-check text-light');
		addTVShowBtn[0].addEventListener('click', function(){
			AddTVShow(addTVShowBtn[0].getAttribute('data-id'));
		})
	}
	const btnBack = document.getElementById('btnBack');

	btnBack.addEventListener('click', function(){
	    ChangePage(currPage, currentPage)

	   })


}

async function ChangePage(page, currPage){
	
	const popularP = document.querySelector('#popularP');
	
	let response;
	if(!currPage){
	 response = await api.GetPopulars(page);
	 currentPage = response;	
	}
	else{
		response = currPage;

	}


	response.pageNext = Number(page)+1;
	response.pagePrev = Number(page)-1;

	response.title = "POPULAR TV SHOWS";

	popularP.innerHTML = modPopularContentsTemplate(response);
	
	const tvshow_poster = document.querySelectorAll('img');
          
	tvshow_poster.forEach(elem=> elem.addEventListener('click',function(){
		GetTvShow(elem)
	}));

	const btnNext = document.getElementById('btnNext');
		btnNext.addEventListener('click', function(){

			ChangePage(btnNext.getAttribute('data-page'))
			

		})
		if(page!=1){
			const btnPrev = document.getElementById('btnPrev');
			btnPrev.addEventListener('click', function(){
			ChangePage(btnPrev.getAttribute('data-page'))
		})
	}

	



}



module.exports= {
	getView: (req) => `
		<p id='popularP'></p>
	`,

	run: async (req) => {
	ChangePage(1)

},



}
