import {Env} from "./Env";

export const Auth = {
    isAuthenticated: false,

    login(email, password, cb) {


        fetch(Env.API_URL + '/login',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
        })
        .then(data => data.json())
        .then(response => {
            if(response.error) {
                cb(response.error)
            } else {
                this.isAuthenticated = true;
                cb(null);
            }
        })
        .catch(error => cb(error))
    },

    register(email, password, cb) {

        fetch(Env.API_URL + '/register',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            })
            .then(data => data.json())
            .then(response => {
                if(response.error) {
                    console.log(response.error);
                    cb(response.error);
                }
                else {
                    cb(null)
                }
            })
            .catch(error => {
                console.log('Error: ' + JSON.stringify(error));
                cb(error);
            })
    },

    logout(cb) {
        fetch(Env.API_URL + '/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include"
        })
        .then(data => data.json())
        .then(response => {
            if(response.error)
                cb(response.error)
            else if(response.message === 'success') {
                this.isAuthenticated = false;
                cb();
            }
        })
        .catch(error => {
            console.log(error);
            cb(error);
        });

    },

    check(cb) {
        // eslint-disable-next-line no-undef
        fetch(Env.API_URL + '/authenticationcheck',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        .then(data => data.json())
        .then(response => {
            this.isAuthenticated = response.message
            cb(response.message)
        })
        .catch(err => {
            console.log(err.message)
            cb(false)
        })
    }
};
