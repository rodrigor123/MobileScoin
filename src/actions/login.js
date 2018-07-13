import { Alert } from 'react-native'
import * as ACTIONS from '../config/actions';
import * as API from './API'
import scoinApi from '../api/scoinApi';
import * as Storage from '../config/storage'
import * as Operator from '../config/operator'

export function setUserData(user) {
    return {
        type: ACTIONS.SET_USER_DATA,
        payload: user
    };
}

export function setPhoneNumber(pNumber) {
    return {
        type: ACTIONS.SET_PHONE,
        payload: pNumber
    };
}

export function saveUserDetail(userDetail) {
    return {
        type: ACTIONS.SET_USER_DETAIL,
        payload: userDetail
    };
}

export function saveUserMore(userMore) {
    return {
        type: ACTIONS.SET_USER_MORE,
        payload: userMore
    };
}

export function setUserInfo(param) {
    return {
        type: ACTIONS.SET_USER_INFO,
        payload: param
    };
}

export function setLoading(state) {
    return {
        type: ACTIONS.SET_LOADING,
        payload: state
    };
}

export function saveUserDataList(data) {
    return {
        type: ACTIONS.SET_USERDATA_LIST,
        payload: data
    };
}

export function setTouchIDValue(value) {
    return {
        type: ACTIONS.SET_TOUCHID_VALUE,
        payload: value
    };
}

export function setProspectStatus(status) {
    return {
        type: ACTIONS.SET_PROSPECT,
        payload: status
    }
}

export function a_login(email, password, callback) {
    return function (dispatch) {
        const param = {
            email, password
        }
        fetch (API.LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.error == undefined){
                const param = {
                    token: data.id,
                    ttl: data.ttl,
                    userId: data.userId
                }
                dispatch(setUserInfo(param))
                //alert(JSON.stringify(data))
                dispatch(setUserDataList(data.userId, data.id))
                //dispatch(startLiveTimeTracker())
                callback('success')
            }
            else{
                callback('Login Failed!')
            }
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

function startLiveTimeTracker() {
    return function (dispatch) {
        setTimeout(function() {
            Storage.setToStorage('live', new Date().getTime(), () => {})
            dispatch(startLiveTimeTracker())
        }, 60000)
    }
}

export function setUserDataList(userId, token) {
    return function (dispatch) {
        const str_api = API.USER_DATA.replace('userid', userId)
        fetch (str_api, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
                'Accept-Encoding': 'None'
            }
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.error == undefined){
                //alert('User Data List: ' + JSON.stringify(data))
                dispatch(saveUserDataList(data))                
            }
            else{
                Operator.MyAlert('API', "Error occured in API /listAll ")
            }            
        })
        .catch((e) => {
            Operator.MyAlert('API', e.toString())
        });
    }
}

export function a_register(user, callback) {
    return function (dispatch) {
        const param = {
            email: user.email,
            password: user.password,
            phoneNumber: user.phone,
            pin: user.pin
        }
        fetch (API.REGISTER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.error == undefined){
                dispatch(a_login(user.email, user.password, () => {}))
                dispatch(setProspectStatus(data.isProspect))
                callback('success')
            }
            else{
                callback(data.error.message)
            }            
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

export function a_updateProfile(param, Method, Me, callback) {
    return function (dispatch) {
        const str_api = API.USER_PROFILE.replace('userid', Me.userId)
        fetch (str_api, {
            method: Method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Me.token
            },
            body: JSON.stringify(param)
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.error == undefined){
                dispatch(setUserDataList(Me.userId, Me.token))
                callback('success')
            }
            else{
                callback(data.error.message)
            }      
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

export function sendOTP(param, callback) {
    return function (dispatch) {
        fetch (API.SEND_OTP, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.error == undefined){
                callback('success')
            }
            else{
                callback(data.error.message)
            }      
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

export function verifyOTP(param, callback) {
    return function (dispatch) {
        fetch (API.VERIFY_OTP, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.error == undefined && data.pinverified){
                callback('success')
            }
            else if(data.error == undefined && !data.pinverified){
                callback('invalid')
            }
            else{
                callback(data.error.message)
            }      
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}

export function forgotPassword(param, callback) {
    return function (dispatch) {
        fetch (API.FOROGT_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.passwordreset){
                callback('success')
            }
            else callback(JSON.stringify(data))
        })
        .catch((e) => {
            callback(e.toString())
        });
    }
}



