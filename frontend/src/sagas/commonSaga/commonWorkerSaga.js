import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getStringFromObject, isValidFunction } from '../../constants/CommonUtil';

export function* commonPostWorkerSaga(action) {
    try {
        // yield put({ type: SHOW_SPINNER, state: { canShow: true } });
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
        // const successMessage = getStringFromObject('successMessage', action);
        // if (successMessage) {
        //     yield put({
        //         type: SUCCESS_MESSAGE,
        //         message: successMessage,
        //     });
        // }
    } catch (e) {
        // do error action
        if (isValidFunction(action.failureCallBack)) {
            action.failureCallBack();
        }
        // yield put({
        //     type: ERROR_MESSAGE,
        //     message: [
        //         getStringFromObject('failureMessage', action),
        //         getErrorMessage(e)].filter(Boolean).join(' : '),
        // });
        yield put({ type: getStringFromObject('failureAction', action) });
    }
}

export function* commonGetWorkerSaga(action) {
    try {
        const response = yield call(axios.get, action.api);
        yield put({
            type: getStringFromObject('successAction', action),
            data: response.data,
        });
        if (isValidFunction(action.successCallback)) {
            action.successCallback(response.data);
        }
    } catch (e) {
        // do error action
        if (isValidFunction(action.failureCallBack)) {
            action.failureCallBack();
        }
        yield put({ type: getStringFromObject('failureAction', action) });
    }
}

export function* commonDeleteWorkerSaga(action) {
    try {
        const response = yield call(axios.delete, action.api);
        yield put({
            type: getStringFromObject('successAction', action),
            data: response.data,
        });
        if (isValidFunction(action.successCallback)) {
            action.successCallback(response.data);
        }
    } catch (e) {
        // do error action
        if (isValidFunction(action.failureCallBack)) {
            action.failureCallBack();
        }
        yield put({ type: getStringFromObject('failureAction', action) });
    }
}
