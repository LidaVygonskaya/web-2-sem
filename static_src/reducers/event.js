import update from 'react-addons-update';
import {SUCCESS_EVENT_LOADING, START_EVENT_LOADING, ERROR_EVENT_LOADING} from './../actions/events.js'


const initialState = {
    eventList: [],
    events: {},
    isLoading: false,
};


export default function events(store = initialState, action) {
    switch(action.type) {
        case START_EVENT_LOADING:{
             return update(store, {
               isLoading:{$set: " true"},

            });

        }
        case SUCCESS_EVENT_LOADING:{

            return update(store, {
               isLoading:{$set: "false"},
                eventList: {$set: action.payload.result },
                events: {$merge: action.payload.entities.events},

            });

        }

         case ERROR_EVENT_LOADING:{

            return update(store, {
               isLoading:{$set: "false"},

            });

        }




        default:
            return store;
    }


}