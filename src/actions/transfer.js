import * as types from '../config/actions';
import * as API from './API'


export function findScoinUser (phone, Me, callback) {
    return function (dispatch) {
        fetch (API.FIND_USER + '?phonenumber=' + phone, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': Me.token,
                'Accept-Encoding': 'None'
            }
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.error){
                callback(data.error.message)
            }
            else{
                dispatch(setFoundUserInfo(data))
                callback('success')
            }
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

export function userTransfer (param, Me, callback) {
    return function (dispatch) {
        const str_api = API.USER_TRANSFER.replace('userid', Me.userId)
        fetch (str_api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Me.token,
                'Accept-Encoding': 'None'
            },
            body: JSON.stringify(param)
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.error){
                callback(JSON.stringify(data.error))
            }
            else{
                callback('success')
            }
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

export const verifyPin = (param, Me, callback) => {
    return function (dispatch) {
        const str_api = API.VERIFY_PIN.replace('userid', Me.userId)
        fetch (str_api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.verified){
                callback('success')
            }
            else{
                callback('failed')
            }
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

export function setFoundUserInfo(data) {
    return{
        type: types.SET_FOUND_USERINFO,
        payload: data
    }
}

export function setTransferAmount(data) {
    return{
        type: types.SET_TRANSFER_AMOUNT,
        payload: data
    }
}

export function setTransferMsg(data) {
    return{
        type: types.SET_TRANSFER_MSG,
        payload: data
    }
}