import * as ACTIONS from '../config/actions';

export function setTransFilterOption(option) {
    return {
        type: ACTIONS.TRANSACTION_FILTER_OPTION,
        payload: option
    }
}

export function saveFilterOptions(option, callback) {
    return function(dispatch) {
        dispatch(setTransFilterOption(option))
        callback()
    }
}
