var API_BASE_PATH = 'http://api.v4test.simplesite.io';

class api {

    constructor() {
        this.message = 'I\'m an api';
    }

    login(username, password) {

        let promise = new Promise((resolve, reject) => {
            fetch(API_BASE_PATH + '/account/login', {
                method: 'post',
                body: 'grant_type=password&username=' + username + '%2FUS&password=' + password,
                headers: {
                    'Authorization': 'Basic cHVibGljc2l0ZTpwYlN0VDBlb2p0UThYQnUydDYyTmdtQjJsd216Q1pRR0lPOE9Hb0hmZkNjN0Z5YzgwclBrMjNPTVNtWVJrQXpF',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(json => {
                        this.token = json.access_token;
                        resolve(json);
                    });
                } else {
                    response.json().then(error => {
                        reject(error);
                    });
                }
            }).catch(error => {
                reject(error);
            });
        });
        return promise;
    }

    getCustomer() {
        let promise = new Promise((resolve, reject) => {
            fetch(API_BASE_PATH + '/customer', {
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + this.token
                },
            }).then(response => {
                response.json().then(customer => {
                    this.customer = customer;
                    resolve(customer);
                });
            }).catch(error => {
                reject(error);
            });
        });

        return promise;
    }
}

module.exports = api;
