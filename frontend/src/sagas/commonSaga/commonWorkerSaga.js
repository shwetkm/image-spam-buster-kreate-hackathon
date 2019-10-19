import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../redux/modules/message/message-actions';
import { HIDE_SPINNER, SHOW_SPINNER } from '../../redux/modules/spinner/spinner';
import {
    didApiCallFailDueToUnauthorizedUser,
    getErrorMessage,
    getStringFromObject,
    isValidFunction,
} from '../../constants/CommonUtil';
import { SESSION_TIMEOUT } from '../../redux/modules/login/login-actions';

export function* commonPostWorkerSaga(action) {
    try {
        yield put({ type: SHOW_SPINNER, state: { canShow: true } });
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        const response = yield call(axios.post, action.api, action.payload, config);
        yield put({
            ...action,
            type: getStringFromObject('successAction', action),
            data: response.data,
        });
        if (isValidFunction(action.successCallback)) {
            action.successCallback(response.data);
        }
        const successMessage = getStringFromObject('successMessage', action);
        if (successMessage) {
            yield put({
                type: SUCCESS_MESSAGE,
                message: successMessage,
            });
        }
        yield put({ type: HIDE_SPINNER, state: { canShow: false } });
    } catch (e) {
        // do error action
        if (isValidFunction(action.failureCallBack)) {
            action.failureCallBack();
        }
        if (didApiCallFailDueToUnauthorizedUser(e)) {
            yield put({ type: SESSION_TIMEOUT, actionToDispatchAfterLogin: action });
        } else {
            yield put({
                type: ERROR_MESSAGE,
                message: [
                    getStringFromObject('failureMessage', action),
                    getErrorMessage(e)].filter(Boolean).join(' : '),
            });
        }
        yield put({ type: getStringFromObject('failureAction', action) });
        yield put({ type: HIDE_SPINNER, state: { canShow: false } });
    }
}

export function* commonGetWorkerSaga(action) {
    try {
        yield put({ type: SHOW_SPINNER, state: { canShow: true } });
        const response = yield call(retriable().get, action.api);
        yield put({
            type: getStringFromObject('successAction', action),
            data: response.data,
        });
        if (isValidFunction(action.successCallback)) {
            action.successCallback(response.data);
        }
        const successMessage = getStringFromObject('successMessage', action);
        if (successMessage) {
            yield put({
                type: SUCCESS_MESSAGE,
                message: successMessage,
            });
        }
        yield put({ type: HIDE_SPINNER, state: { canShow: false } });
    } catch (e) {
        // do error action
        if (isValidFunction(action.failureCallBack)) {
            action.failureCallBack();
        }
        if (didApiCallFailDueToUnauthorizedUser(e)) {
            yield put({ type: SESSION_TIMEOUT, actionToDispatchAfterLogin: action });
        } else {
            yield put({
                type: ERROR_MESSAGE,
                message: [
                    getStringFromObject('failureMessage', action),
                    getErrorMessage(e)].filter(Boolean).join(' : '),
            });
        }
        yield put({ type: getStringFromObject('failureAction', action) });
        yield put({ type: HIDE_SPINNER, state: { canShow: false } });
    }
}

export function* commonDeleteWorkerSaga(action) {
    try {
        yield put({ type: SHOW_SPINNER, state: { canShow: true } });
        const response = yield call(retriable().delete, action.api);
        yield put({
            type: getStringFromObject('successAction', action),
            data: response.data,
        });
        if (isValidFunction(action.successCallback)) {
            action.successCallback(response.data);
        }
        const successMessage = getStringFromObject('successMessage', action);
        if (successMessage) {
            yield put({
                type: SUCCESS_MESSAGE,
                message: successMessage,
            });
        }
        yield put({ type: HIDE_SPINNER, state: { canShow: false } });
    } catch (e) {
        // do error action
        if (isValidFunction(action.failureCallBack)) {
            action.failureCallBack();
        }
        if (didApiCallFailDueToUnauthorizedUser(e)) {
            yield put({ type: SESSION_TIMEOUT, actionToDispatchAfterLogin: action });
        } else {
            yield put({
                type: ERROR_MESSAGE,
                message: [
                    getStringFromObject('failureMessage', action),
                    getErrorMessage(e)].filter(Boolean).join(' : '),
            });
        }
        yield put({ type: getStringFromObject('failureAction', action) });
        yield put({ type: HIDE_SPINNER, state: { canShow: false } });
    }
}
