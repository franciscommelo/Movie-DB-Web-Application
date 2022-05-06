
require('./style.css');
const auth = require('./auth.js');



const mainTemplate= require('./../views/navbar.html')
		
//const navbarTemplate = Handlebars.compile(require('./../views/navbar.hbs'))

window.onload = () => {


	const [mainContainer, userinfo] = setBaseTemplate();
	
	auth.initialize(userinfo);


	
	window.onhashchange = onHashChange;
	

	

	
	if (location.hash) {
		auth.initialize(userinfo);
		onHashChange();
	} else {
		location.hash = '#home';
	}
	
	function onHashChange() {
		const [modName, ...args] = location.hash.substring(1).split('/');
	
		const mod = getMod(modName);
		
		const request = { 'name': modName, 'args': args };
		
		mainContainer.innerHTML = mod.getView(request);
		
		mod.run(request);
	}
		function setBaseTemplate() {
	
		const userinfo = document.querySelector('#userinfo');


		
		 	document.body.innerHTML =  mainTemplate;
		
			 const mainContainer= document.querySelector('#mainContainer');
			 return  [mainContainer, userinfo];
	}
	
	function getMod(name) {
		const routes = {
			
			 home   : require('./home.js'),
			 popular  : require('./popular.js'),
			 insert : require('./insert.js'),
			 list   : require('./list.js'),
			 login  : auth.login,
			 logout : auth.logout,
			 signUp : auth.signUp
			

		};

		const modDefault = {
			getView: (req) => '<h1>' + req.name + '</h1>',
			run: () => {}
		};

		return routes[name] || modDefault;
	}
	
}





