import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import posts from './task.js';
import events from './event.js';
import followers from './follower.js';
import followings from './following.js'
import users from './users.js'
//import users from './users';


export default combineReducers({
    routerReducer,
    posts,
    events,
    followers,
    followings,
    users,
});