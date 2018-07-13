import createReducer from '../config/createReducer'
import * as types from '../config/actions'

export const filter_option = createReducer(
    {
        received: true,
        transferred: false,
        weekly: false,
        monthly: false
    },
    {
        [types.TRANSACTION_FILTER_OPTION](state, action){
            return action.payload;
        }
    }
)