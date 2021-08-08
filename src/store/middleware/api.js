// const action = {
//     type: 'apiCallBegan', //apiRequest
//     payload: {
//         url: '/bugs',
//         method: 'get',
//         data: {},
//         onSuccess: 'bugsRecieved', //needs to be string because functions are not serializable, action objects should be serializable
//         onError: 'apiRequestFailed'
//     }
// }

import axios from "axios";
import * as actions from '../api';

const api = ({ dispatch }) => next => async action => {
    if(action.type !== actions.apiCallBegan.type){
        next(action);
        return;
    }
    const { url, method, data, onStart, onSuccess, onError } = action.payload;
    
    if(onStart) dispatch({ type: onStart})
    
    next(action);

    try{
        const response = await axios.request({
            baseURL: 'http://localhost:9001/api',
            url,
            method,
            data
        });
        //General
        dispatch(actions.apiCallSuccess(response.data));
        //Specific
        if(onSuccess)
        dispatch({ type: onSuccess, payload: response.data});
    }catch(error){
        //General
        dispatch(actions.apiCallFailed(error.message));
        //Specific
        if(onError)
        dispatch({ type: onError, payload: error.message });
    }
}

export default api;