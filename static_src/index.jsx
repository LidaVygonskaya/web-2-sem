import React from 'react';
import ReactDom from 'react-dom';
import apiUrls from './constants/apiUrls.js'
import MyPage from './components/MyPage.jsx'
import FollowingsPage from './components/FollowingsPage.jsx'
import FollowersPage from './components/FollowersPage.jsx'
import {Provider} from 'react-redux';
import initStore from './utils/store.jsx';
import LayoutComponent from './components/Layout.jsx'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';



const history = createHistory();
const middleware = routerMiddleware(history);

ReactDom.render(
    <Provider store={initStore()}>
        <ConnectedRouter history={history}>
            <LayoutComponent>
    <MyPage/>
             </LayoutComponent>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')

);