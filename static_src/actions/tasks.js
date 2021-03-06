import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import { post } from './../utils/schemas.jsx';

export const START_POST_LOADING = 'START_POST_LOADING';
export const SUCCESS_POST_LOADING = 'SUCCESS_POST_LOADING';
export const ERROR_POST_LOADING = 'ERROR_POST_LOADING';



export const loadPosts = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,

            method: 'GET',
            types: [
                START_POST_LOADING,
                {
                    type: SUCCESS_POST_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                const normalizedData = normalize(json.results, [post]);
                                delete json.results;
                                return Object.assign({}, json, normalizedData);
                            },
                        );
                    },
                },
                ERROR_POST_LOADING,
            ],
        },
    };
};
