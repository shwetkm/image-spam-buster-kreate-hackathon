import axios from 'axios';
import { getStringFromObject } from './constants/CommonUtil';

export const getUniqueFileTypes = (fileTypes) => {
    let uniqueTypes = '';
    fileTypes.map((format) => {
        const formatType = format.toLowerCase();
        if (!uniqueTypes.includes(formatType)) {
            uniqueTypes = `${uniqueTypes}, ${formatType}`;
        }
        return null;
    });
    return uniqueTypes.substr(2, uniqueTypes.length);
};

export const retriable = () => {
    const ret = axios.create();
    ret.interceptors.response.use((response) => {
        let errorCode = 0;
        if (getStringFromObject('data.error', response)) {
            errorCode = getStringFromObject('data.error.code', response);
        }
        console.log('Errorcode ', errorCode);
        /*
        if (errorCode === 300) {
            persistState(initialAuthState);
            window.location('/');
            persistLocationId(null);
            persistShopId(null);
            return Promise.reject(response);
        }
        */
        return Promise.resolve(response);
    }, undefined);
    return ret;
};
