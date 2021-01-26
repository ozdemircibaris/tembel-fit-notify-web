import {
    FETCH_NOTICATIONS,
    CREATE_TIMED_NOTIFICATION_CLICK,
    CREATE_TIMED_NOTIFICATION_SUCCESS,
    CREATE_TIMED_NOTIFICATION_FINALLY,

} from "../actions/notificationAction";

const INITIAL_STATE = {
    notificationValues: [],
    spinnerValue: false,
    createNotificationFinallyValue: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_NOTICATIONS:
            return {
                ...state,
                notificationValues: action.payload,
                createNotificationFinallyValue: null
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
        case CREATE_TIMED_NOTIFICATION_FINALLY:
            return {
                ...state,
                createNotificationFinallyValue: 'finally'
            }
        default:
            return state;
    }
}