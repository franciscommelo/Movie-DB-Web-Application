



const api = require('./api.js');
const Handlebars = require('handlebars/dist/handlebars');
const loggedOut = require('../views/loggedOut.html');
const loginView = require('../views/loginView.html')
const signinView = require('../views/signinView.html')
const navbarView = Handlebars.compile(require('../views/loggedInTemplate.hbs'))


let currUsername = null;


function setCurrentUser(username) {
    currUsername = username;
    loginBar.innerHTML = username ?
        navbarView(username) :
        loggedOut;
}


module.exports = {

    initialize: async (userinfo) => {

        userInfoBox = userinfo;

        try {
            setCurrentUser(await api.getUser());
        } catch (err) {
            setCurrentUser(null);
        }

    },

    getCurrentUser: () => {
        return currUsername
    },



    login: {
        getView: (req) => loginView,



        run: () => {

            const txtUsername = document.querySelector('#Username');
            const txtPassword = document.querySelector('#txtPassword');
            const btnSubmit = document.querySelector('#btnSubmit');

            btnSubmit.onclick = async () => {
                const username = txtUsername.value;
                if (username.length == 0) {
                    alert('Username is empty.');
                    return;
                }

                const password = txtPassword.value;
                if (password.length == 0) {
                    alert('Password is empty.');
                    return;
                }

                try {
                    const user = await api.login(username, password);

                    setCurrentUser(user);
                    location.assign('#home');
                } catch (err) {
                    alert(err)
                    txtUsername.value = "";
                    txtPassword.value = "";
                }
            }

        }
    },

    logout: {

        getView: (req) => {

        },


        run: async () => {
            try {
                await api.logout();
            } catch (err) {

                alert(err);
            }
            setCurrentUser(null);
            location.assign('#home');
        }
    },


    signUp: {
        getView: (req) => signinView,



        run: () => {

            const txtUsername = document.querySelector('#txtUsername');
            const txtEmail = document.querySelector('#txtEmail');

            const txtPassword = document.querySelector('#txtPassword');
            const btnSubmit = document.querySelector('#btnSubmit');

            btnSubmit.onclick = async () => {
                const username = txtUsername.value;
                if (username.length == 0) {
                    alert('Username is empty.');
                    return;
                }
                const email = txtEmail.value;
                const password = txtPassword.value;
                if (password.length == 0) {
                    alert('Password is empty.');
                    return;
                }

                try {
                    await api.signUp(username, email, password);
                    alert("User sucessfully created!")
                    location.assign('#login');

                }


                catch (err) {
                    alert(err);
                    txtUsername.value = "";
                    txtPassword.value = "";
                }
            }

        }

    }

}