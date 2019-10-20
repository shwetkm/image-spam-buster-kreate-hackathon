import getProperty from 'lodash.get';
import find from 'lodash.find';

export const isArrayValidAndNotEmpty = anArray => anArray && Array.isArray(anArray) && anArray.length > 0;

export const getStringFromObject = (string, obj, defaultValue = '') => {
    const value = getProperty(obj, string, defaultValue);
    if (value == null) {
        return undefined;
    }
    return value;
};

export const findObjInArray = (array, obj) => find(array, obj);

export const checkIfImage = fileName => (fileName.endsWith('.jpg') ||
    fileName.endsWith('.png') ||
    fileName.endsWith('.JPG') ||
    fileName.endsWith('.jpeg') ||
    fileName.endsWith('.JPEG') ||
    fileName.endsWith('.PNG'));

export const getCookieValue = (name) => {
    if (document.cookie.length > 0) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i += 1) {
            if (cookies[i].startsWith(name)) {
                return cookies[i].split('=')[1];
            }
        }
    }
    return '';
};

export const isValidFunction = aFunction => (
    aFunction && typeof aFunction === 'function'
);

export const isObjectValidAndNotEmpty = anObject => (
    anObject && typeof anObject === 'object' && Object.keys(anObject).length > 0
);

export const NumberOf = (value) => {
    let numberValue = Number(value);
    if (Number.isNaN(numberValue)) {
        numberValue = 0;
    }
    return numberValue;
};

export const getStringForBoolean = (aBoolean) => {
    if (aBoolean) {
        if (typeof aBoolean === 'string') {
            return aBoolean.toLowerCase() === 'true' ? 'YES' : 'NO';
        }
        return 'YES';
    }
    return 'NO';
};
export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

