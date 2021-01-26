import axios from "axios";
import { API_BASE } from "../components/config/env";

export const FETCH_NOTICATIONS = 'fetch_notifications';

export const CREATE_TIMED_NOTIFICATION_CLICK = 'create_timed_notification_click';
export const CREATE_TIMED_NOTIFICATION_SUCCESS = 'create_timed_notification_success';
export const CREATE_TIMED_NOTIFICATION_FAILED = 'create_timed_notification_failed';
export const CREATE_TIMED_NOTIFICATION_FINALLY = 'create_timed_notification_finally';

export const CREATE_NOW_NOTIFICATION_CLICK = 'create_now_notification_click';
export const CREATE_NOW_NOTIFICATION_SUCCESS = 'create_now_notification_success';
export const CREATE_NOW_NOTIFICATION_FAILED = 'create_now_notification_failed';

export const fetchNotifications = (state) => {
    return dispatch => {
        axios({
            method: 'get',
            url: `${API_BASE}/notifications`,
        }).then((result) => {
            dispatch({
                type: FETCH_NOTICATIONS,
                payload: result.data.data
            })
        })
    }
}

export const createTimedNotification = (title, description, date, pageName) => {
    return dispatch => {
        dispatch({
            type: CREATE_TIMED_NOTIFICATION_CLICK,
        })
        let data = JSON.stringify({
            "title": title,
            "description": description,
            "date": date,
            "pageName": pageName
        })
        axios({
            method: 'post',
            url: `${API_BASE}/notifications/timed`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: data
        }).then((result) => {
            dispatch({
                type: CREATE_TIMED_NOTIFICATION_SUCCESS,
                payload: result.data.data
            })
        }).finally(() => {
            dispatch({
                type: CREATE_TIMED_NOTIFICATION_FINALLY
            })
        })
    }
}

export const createNowNotification = (title, description, pageName) => {
    return dispatch => {
        dispatch({
            type: CREATE_NOW_NOTIFICATION_CLICK,
        })
        let data = JSON.stringify({
            "title": title,
            "description": description,
            "pageName": pageName
        })
        axios({
            method: 'post',
            url: `${API_BASE}/notifications/now`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: data
        }).then((result) => {
            dispatch({
                type: CREATE_NOW_NOTIFICATION_SUCCESS,
                payload: result.data.data
            })
        })
    }
}