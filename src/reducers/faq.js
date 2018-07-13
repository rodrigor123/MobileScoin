import createReducer from '../config/createReducer'
import * as types from '../config/actions'

export const termsHTML = createReducer('<Text>Loading...</Text>',{
    [types.TERMS_HTML](state, action){
        return action.data;
    }
})