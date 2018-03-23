import update from 'react-addons-update';
import {SUCCESS_POST_LOADING, START_POST_LOADING, ERROR_POST_LOADING} from './../actions/tasks'
import {START_POST_CREATE, SUCCESS_POST_CREATE, ERROR_POST_CREATE} from './../actions/createpost'
import {SUCCESS_LIKE_CREATE} from './../actions/createlike'


const initialState = {
    postList: [],
    posts: {},
    likes:{},
    likeList:[],
    isLoading: false,
};


export default function posts(store = initialState, action) {
    switch(action.type) {
        case START_POST_LOADING:{
             return update(store, {
               isLoading:{$set: " true"},

            });

        }
        case SUCCESS_POST_LOADING:{

            return update(store, {
               isLoading:{$set: "false"},
                postList: {$set: action.payload.result },
                posts: {$merge: action.payload.entities.posts},

            });

        }

         case ERROR_POST_LOADING:{

            return update(store, {
               isLoading:{$set: "false"},

            });

        }

        case SUCCESS_POST_CREATE: {
           return update(store, {
                posts: {
                   [action.payload.id]: { $set: action.payload }
                },
                postList: {$unshift: [action.payload.id] },

            });

        }

        case SUCCESS_LIKE_CREATE: {
           return update(store, {



            });

        }




        default:
            return store;
    }


}