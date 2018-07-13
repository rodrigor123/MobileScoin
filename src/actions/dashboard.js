import * as ACTIONS from '../config/actions';
import * as API from './API'
import * as Operator from '../config/operator'

export function a_getTransaction(Me, prevHistory, screenIndex){
    return function (dispatch) {
        const str_api = API.GET_TRANSFER.replace('userid', Me.userId)
        const param = '?skip=' + prevHistory.length + '&limit=10'
        dispatch(setTransHistoryLoadingState(true))
        fetch (str_api + param, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Me.token,
                'Accept-Encoding': 'None'
            }
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.error == undefined){
                //alert(JSON.stringify(prevHistory.concat(data.transfers)))
                dispatch(setTransactionHistory(prevHistory.concat(data.transfers)))
                dispatch(setTransHistoryLoadingState(false))
            }
            else{
                const title = screenIndex == 0 ? 'Dashboard' : 'Transactions'
                Operator.MyAlert(title, data.error)
            }
        })
        .catch((e) => {
            const title = screenIndex == 0 ? 'Dashboard' : 'Transactions'
            Operator.MyAlert(title, e.toString())
        });
    }
}

export function setTransactionHistory(data) {
    return {
        type: ACTIONS.TRANSACTION_HISTORY,
        payload: data
    }
}

export function setTransHistoryLoadingState(state) {
    return {
        type: ACTIONS.TRANSACTION_HISTORY_LOADING,
        payload: state
    }
}