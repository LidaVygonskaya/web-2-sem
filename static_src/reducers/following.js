import update from 'react-addons-update';
import {SUCCESS_FOLLOWING_LOADING, START_FOLLOWING_LOADING, ERROR_FOLLOWING_LOADING} from './../actions/followings.js'


const initialState = {
    followingList: [],
    followings: {},
    isLoading: false,
};


export default function followings(store = initialState, action) {
    switch(action.type) {
        case START_FOLLOWING_LOADING:{
             return update(store, {
               isLoading:{$set: " true"},

            });

        }
        case SUCCESS_FOLLOWING_LOADING:{

            return update(store, {
               isLoading:{$set: "false"},
                followingList: {$set: action.payload.result },
                followings: {$merge: action.payload.entities.followings},

            });

        }

         case ERROR_FOLLOWING_LOADING:{

            return update(store, {
               isLoading:{$set: "false"},

            });

        }




        default:
            return store;
    }


}