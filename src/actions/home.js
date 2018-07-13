import * as types from '../config/actions';

export const gotoProfilePage = (state) => {
    return {
        type: types.GOTO_PROFILE_PAGE,
        state
    }
}