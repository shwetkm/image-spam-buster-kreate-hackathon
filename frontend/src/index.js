import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStores';
import Routes from './routes/routes';
import './index.css';

const store = configureStore();

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <Routes />
        </Provider>
    </HashRouter>,
    document.getElementById('root'),
);
