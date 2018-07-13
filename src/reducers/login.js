import createReducer from '../config/createReducer'
import * as types from '../config/actions'

//phone, email, password, pin
export const userInfo = createReducer({},{
    [types.SET_USER_DATA](state, action){
        return action.payload;
    }
})

//phone(string)
export const pNumber = createReducer('',{
    [types.SET_PHONE](state, action){
        return action.payload;
    }
})

//firstName, lastName, day, month, year, gender, country
export const userDetail = createReducer({},{
    [types.SET_USER_DETAIL](state, action){
        return action.payload;
    }
})

//address1, address2, city, state, zip
export const userMore = createReducer({},{
    [types.SET_USER_MORE](state, action){
        return action.payload;
    }
})

//token, userId, ttl
export const me = createReducer({},{
    [types.SET_USER_INFO](state, action){
        return action.payload;
    }
})

//phoneNumber, email, id, fundingsources, balances, userProfile(firstName, lastName, ssn, dateofbirth, id, address, notificatoin...)
export const userDataList = createReducer({},{
    [types.SET_USERDATA_LIST](state, action){
        return action.payload;
    }
})

export const loading = createReducer(false,{
    [types.SET_LOADING](state, action){
        return action.payload;
    }
})

export const touchID = createReducer(false,{
    [types.SET_TOUCHID_VALUE](state, action){
        return action.payload;
    }
})

export const isProspect = createReducer(false,{
    [types.SET_PROSPECT](state, action){
        return action.payload;
    }
})