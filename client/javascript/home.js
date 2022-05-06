
const Handlebars = require('handlebars/dist/handlebars');
const auth = require('./auth.js');

const modContentsTemplate = Handlebars.compile(require('../views/modContentsTemplate.hbs'))
const modDropdown =
Handlebars.compile(require('../views/modDropdown.hbs'));
const homeView = require('../views/homeView.html');
const api = require('./api.js');
require('../images/Cota.png')
require('../images/procurar.png')




const tvshwoWEB =
	Handlebars.compile(require('../views/tvShowWeb.hbs'))


let currentPage;


	async function GetTvShow(img) {
		const response = (await (await fetch(`https://api.themoviedb.org/3/tv/${img.alt}?api_key=a5120868c0fed1d20f6a0119c77bcf15`)).json());
		
		searchPi.innerHTML = tvshwoWEB(response);

		const btnBack = document.getElementById('btnBack');

		btnBack.addEventListener('click', function(){

			searchPi.innerHTML = modContentsTemplate(currentPage);
				
			const tvshow_poster = document.querySelectorAll('img');
			tvshow_poster.forEach(elem=> elem.addEventListener('click',function(){
				GetTvShow(elem)
			}));
	
		})

		
		if(auth.getCurrentUser()){ 
			//Dropdown list
			const dropdown = document.querySelector('#dropdown');
			const answer = await api.groupAll();
			dropdown.innerHTML = modDropdown(answer);
			
			const addTVShowBtn =  document.getElementsByClassName('fa fa-check text-light');
			addTVShowBtn[0].addEventListener('click', function(){

				AddTVShow(addTVShowBtn[0].getAttribute('data-id'));})

		}

	}
		async function  AddTVShow(TVID){

			var elem = document.getElementById("groupId");  
			try{
				alert(await api.AddTVShow(TVID,elem));
			  }
			  catch(err){
				   alert(err);
			  }
			}
	

	
module.exports = {
	getView: (req) =>homeView,

	run: async() => {
		var bttSearch = document.querySelector('#search');
		
		bttSearch.onkeypress =	async function searchbtt(event) {
			if(	event.keyCode == 13){
				
				var tvshow = document.getElementById("search").value;
				const searchPi = document.querySelector('#searchPi');

				let response = await api.getTvShow(tvshow);
				

				if(response.status){
					var flag={};
					flag.status=true;
					searchPi.innerHTML = modContentsTemplate(flag);
				}
				else
				{
					currentPage = response;

					if(response.length==1){
					searchPi.innerHTML = tvshwoWEB(response[0]);
                    const btnBack = document.getElementById('btnBack');

					btnBack.addEventListener('click', function(){
						location.reload();
					})

		
				}else{
				searchPi.innerHTML = modContentsTemplate(response);
				
				const tvshow_poster = document.querySelectorAll('img');
				tvshow_poster.forEach(elem=> elem.addEventListener('click',function(){
					GetTvShow(elem)
				}));
			}}
			}
		}

       
		

	}
}
