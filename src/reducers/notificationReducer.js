import {
    FETCH_NOTICATIONS,
    CREATE_TIMED_NOTIFICATION_CLICK,
    CREATE_TIMED_NOTIFICATION_SUCCESS,

} from "../actions/notificationAction";

const INITIAL_STATE = {
    notificationValues: [],
    spinnerValue: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_NOTICATIONS:
            return {
                ...state,
                notificationValues: action.payload
            }
        case CREATE_TIMED_NOTIFICATION_CLICK:
            return {
                ...state,
                spinnerValue: true
            }
        case CREATE_TIMED_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notificationValues: state.notificationValues.concat(action.payload)
            }
        default:
            return state;
    }
}