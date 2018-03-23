import { CALL_API, getJSON } from 'redux-api-middleware';


export const START_LIKE_CREATE = 'START_LIKE_CREATE';
export const SUCCESS_LIKE_CREATE = 'SUCCESS_LIKE_CREATE';
export const ERROR_LIKE_CREATE = 'ERROR_LIKE_LOADING';


export const createLike = (url, data) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            headers: {'content-type': 'application/json', 'X-CSRFToken': document.cookie.match(/csrftoken=([^ ;]+)/)[1]},
            body: JSON.stringify(data),
            method: 'POST',
            types: [
                START_LIKE_CREATE,
                SUCCESS_LIKE_CREATE,
                ERROR_LIKE_CREATE,
            ],
        },
    };
};
