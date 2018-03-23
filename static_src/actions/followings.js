import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import { following } from './../utils/schemas.jsx';

export const START_FOLLOWING_LOADING = 'START_FOLLOWING_LOADING';
export const SUCCESS_FOLLOWING_LOADING = 'SUCCESS_FOLLOWING_LOADING';
export const ERROR_FOLLOWING_LOADING = 'ERROR_FOLLOWING_LOADING';


export const loadFollowings = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_FOLLOWING_LOADING,
                {
                    type: SUCCESS_FOLLOWING_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                const normalizedData = normalize(json.results, [following]);
                                delete json.results;
                                return Object.assign({}, json, normalizedData);
                            },
                        );
                    },
                },
                ERROR_FOLLOWING_LOADING,
            ],
        },
    };
};