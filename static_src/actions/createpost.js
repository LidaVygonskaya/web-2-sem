import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import { post } from './../utils/schemas.jsx';

export const START_POST_CREATE = 'START_POST_CREATE';
export const SUCCESS_POST_CREATE = 'SUCCESS_POST_CREATE';
export const ERROR_POST_CREATE = 'ERROR_POST_LOADING';


export const createPosts = (url, data) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            headers: {'content-type': 'application/json', 'X-CSRFToken': document.cookie.match(/csrftoken=([^ ;]+)/)[1]},
            body: JSON.stringify(data),
            method: 'POST',
            types: [
                START_POST_CREATE,
                SUCCESS_POST_CREATE,
                ERROR_POST_CREATE,
            ],
        },
    };
};
