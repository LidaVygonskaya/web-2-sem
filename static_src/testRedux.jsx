import {createStore, combineReducers, applyMiddleware, compose} from 'redux'

export const logger1 = store => next => (action) => {
    console.log('logger 1', action);
    const result = next(action);
    console.log('1 nextState', store.getState());
    return result;
    // store.dispatch();
    // const result = next(action);
    // return result;
};



const tasksReducer = (store = {postList:[]}, action) => {
    switch(action.type){
        case"CREATE_TASK":
            return {postList: [action.payload, ...store.postList]};
        default:
            return store;
    }
};


const middelware = applyMiddleware(logger1);

const userReducer = (store = {userList:[]}, action) => {
    console.log('userReducer', action);
    return store;
};

const reducer = combineReducers({
    tasks: tasksReducer,
    users: userReducer,
});



const initialStore = {};

const store = createStore(reducer, initialStore, compose(middelware, window.__REDUX_DEVTOOLS_EXTENSION__()));



store.subscribe(
    () => {
        console.log("subscriber1");
        console.log(store.getState());
    }
);

store.subscribe(
    () => {
        console.log("subscriber2");
        console.log(store.getState());
    }
);



store.dispatch({type: "CREATE_TASK",
                payload:"new Tasl",
});


store.dispatch({type: "CREATE_TASK",
                payload:"new Tasl",
});
