import initialStates from '../../initialStates';
import { UPDATE_APPLICATION_CONTEXT_MODEL } from './applicatioContext-actions';

const applicationContextReducer = (state = initialStates.applicationContext, action) => {
    let newState = {};
    console.log('in application context reducer', action);
    switch (action.type) {
    case UPDATE_APPLICATION_CONTEXT_MODEL:
        newState = { ...state, [action.property]: action.value };
        break;
    default:
        newState = state;
    }
    console.log('new state', action, newState);
    return newState;
};

export default applicationContextReducer;
