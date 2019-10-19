import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import './index.css';
import 'antd/dist/antd.css';
import * as serviceWorker from './serviceWorker';
import Routes from './routes/Routes';
import configureStores from './redux/configureStores';

const store = configureStores();

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <Routes />
        </Provider>
    </HashRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
