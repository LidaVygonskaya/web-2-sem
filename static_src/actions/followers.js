import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import { follower } from './../utils/schemas.jsx';

export const START_FOLLOWER_LOADING = 'START_FOLLOWER_LOADING';
export const SUCCESS_FOLLOWER_LOADING = 'SUCCESS_FOLLOWER_LOADING';
export const ERROR_FOLLOWER_LOADING = 'ERROR_FOLLOWER_LOADING';


export const loadFollowers = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_FOLLOWER_LOADING,
                {
                    type: SUCCESS_FOLLOWER_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                const normalizedData = normalize(json.results, [follower]);
                                delete json.results;
                                return Object.assign({}, json, normalizedData);
                            },
                        );
                    },
                },
                ERROR_FOLLOWER_LOADING,
            ],
        },
    };
};