import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
// eslint-disable-next-line import/no-extraneous-dependencies
import createHistory from 'history/createBrowserHistory';
import rootReducer from './root-reducer';
import rootSaga from '../sagas/index';

export const history = createHistory();

const initialState = {};
const enhancers = [];
export const sagaMiddleware = createSagaMiddleware();
const middleware = [
    routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
    const { devToolsExtension } = window;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    applyMiddleware(sagaMiddleware),
    ...enhancers,
);

const store = () => {
    const createdStore = createStore(
        rootReducer,
        initialState,
        composedEnhancers,
    );
    sagaMiddleware.run(rootSaga);
    return createdStore;
};
export const action = type => store.dispatch({ type });

export default store;
