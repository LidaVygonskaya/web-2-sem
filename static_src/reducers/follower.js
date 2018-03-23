import update from 'react-addons-update';
import {SUCCESS_FOLLOWER_LOADING, START_FOLLOWER_LOADING, ERROR_FOLLOWER_LOADING} from './../actions/followers.js'


const initialState = {
    followerList: [],
    followers: {},
    isLoading: false,
};


export default function followers(store = initialState, action) {
    switch(action.type) {
        case START_FOLLOWER_LOADING:{
             return update(store, {
               isLoading:{$set: " true"},

            });

        }
        case SUCCESS_FOLLOWER_LOADING:{

            return update(store, {
               isLoading:{$set: "false"},
                followersList: {$set: action.payload.result },
                followers: {$merge: action.payload.entities.followers},

            });

        }

         case ERROR_FOLLOWER_LOADING:{

            return update(store, {
               isLoading:{$set: "false"},

            });

        }




        default:
            return store;
    }


}