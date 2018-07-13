import * as ACTIONS from '../config/actions';
import * as API from './API'
import * as Operator from '../config/operator'

export function a_changePassword(param, Me, callback) {
    return function (dispatch) {
        const str_api = API.CHANGE_PASSWORD.replace('userid', Me.userId)
        fetch (str_api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Me.token
            },
            body: JSON.stringify(param)
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.passwordchanged){
                callback('success')
            }
            else{
                callback(JSON.stringify(data))
            }
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

export function a_changePin(param, Me, callback) {
    return function (dispatch) {
        const str_api = API.CHANGE_PIN.replace('userid', Me.userId)
        fetch (str_api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Me.token
            },
            body: JSON.stringify(param)
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.pinChanged) callback('success')
            else callback('Server error!')
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

export function storeQRCode(param, Me, callback) {
    return function (dispatch) {
        const str_api = API.STORE_QR_TOKEN.replace('userid', Me.userId)
        fetch (str_api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Me.token
            },
            body: JSON.stringify(param)
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.error == undefined){
                callback('success')
            }
            else callback(JSON.stringify(data.error))
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

export const loadTermsHTML = (category) => {
    return (dispatch, getState) => {
        dispatch(setTermsHTML('<Text>Loading...</Text>'))
        let URL = ''
        if(category == 'faq') URL = ACTIONS.URL_FAQ
        else if(category == 'terms') URL = ACTIONS.URL_TERMS_OF_SERVICE
        else if(category == 'legal') URL = ACTIONS.URL_LEGAL_PRIVACY
        alert(URL)
        fetch (URL, {
            method: 'GET'
        })
        .then((termsJson) => {
            alert(JSON.stringify(termsJson));
            dispatch(setTermsHTML(termsJson._bodyInit))
        })
        .catch((e) => {
            dispatch(setTermsHTML('<Text>Error Page!</Text>'))
        });
    }
}

export const findStores = (zipcode, callback) => {
    return (dispatch, getState) => {
        const URL = API.FIND_STORE + '?zipcode=' + zipcode
        fetch (URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'None'
            }
        })
        .then((data) => data.json())
        .then((json) => {
            //alert(JSON.stringify(json));
            callback(json.stores)
        })
        .catch((e) => {
            console.log(e)
        });
    }
}

export const emailSupport = (param, callback) => {
    return (dispatch, getState) => {
        fetch (API.CONTACT_US, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
        .then((terms) => terms.json())
        .then((data) => {
            //alert(JSON.stringify(data))
            if(data.error == undefined){
                Operator.MyAlert('Contact Us', 'Sent successfully')
                callback('success')
            }
            else{
                callback(JSON.stringify(data.error))
            }
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

export const signOut = (callback) => {
    return dispatch => {
        dispatch(resetUserDataList())
        dispatch(resetMe())
        callback()
    }
}

export function resetUserDataList(data) {
    return {
        type: ACTIONS.SET_USERDATA_LIST,
        payload: {}
    };
}

export function resetMe(data) {
    return {
        type: ACTIONS.SET_USER_INFO,
        payload: {}
    };
}

export const setTermsHTML = (html) => {
    return {
        type: ACTIONS.TERMS_HTML,
        data: html
    }
}