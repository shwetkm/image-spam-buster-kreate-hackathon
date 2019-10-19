import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import applicationContext from './modules/applicationContext/applicationContext-reducer';

export default combineReducers({
    routing: routerReducer,
    applicationContext,
});
