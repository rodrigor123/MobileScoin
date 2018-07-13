import createReducer from '../config/createReducer'
import * as types from '../config/actions'

export const b_profile = createReducer(false,{
    [types.GOTO_PROFILE_PAGE](state, action){
        return action.state;
    }
})

export const foundUserInfo = createReducer({},{
    [types.SET_FOUND_USERINFO](state, action){
        return action.payload;
    }
})

export const transfer_amount = createReducer('',{
    [types.SET_TRANSFER_AMOUNT](state, action){
        return action.payload;
    }
})

export const transfer_msg = createReducer('',{
    [types.SET_TRANSFER_MSG](state, action){
        return action.payload;
    }
})

export const trans_history = createReducer([],{
    [types.TRANSACTION_HISTORY](state, action){
        return action.payload;
    }
})

export const trans_history_loading = createReducer(false,{
    [types.TRANSACTION_HISTORY_LOADING](state, action){
        return action.payload;
    }
})

