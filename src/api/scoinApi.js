import axios from 'axios';

const baseUrl = 'https://apitest.grabscoin.net/v2';

//const apiKey = 'dQToMKymf4WidZyfeIsP8pZPGl9kuDq4BZHBq9Rh';

const config = {
    headers: { common: { 'x-api-key': '' } }
};

const endpoints = {
    createUser: 'scoinusers',
    sendphone: 'scoinusers/phone',
    login: 'scoinusers/userlogin',
    savedetails: 'scoinusers/userprofileid/userProfile',
    userProfile: 'scoinusers/userprofileid/userProfile'
};

const headers = {
    login: "Accept: application/json\nContent-Type: application/json\n"
}

const axiosService = axios.create({
    baseURL: baseUrl,
    timeout: 10000
    //headers: {'x-api-key': apiKey}
});

export default scoinApi = {
    get(name, data, userId = null) {
        if(name === 'dummy') {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve("Success!");
                }, 250);
            });
        }

        let newUrl = data.id ? endpoints[name].replace('userprofileid', data.id) : endpoints[name];

        //if(data.id) config.headers.Authorization = data.userId;

        return axiosService.get(newUrl, {headers: headers[name]});
    },

    post(name, data, userId = null) {
        if(name === 'dummy') {
            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    resolve("Success!");
                }, 250);
            });
        }

        let newUrl = userId ? endpoints[name].replace('userprofileid', data.userId) : endpoints[name];

        //if(data.id) config.headers.Authorization = data.id;
        alert(newUrl)
        return axiosService.post(newUrl,
            data,
            {headers: headers[name]}
        )
    }
}