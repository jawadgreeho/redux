import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

import { createSelector } from 'reselect';
import { apiCallBegan } from "./api";

import moment from 'moment';
//Action Creators

// export const bugAdded = createAction('bugAdded');
     
// export const bugResolved = createAction('bugResolved');

// export const bugRemoved = createAction('bugRemoved');

//Reducers

let lastId = 0;

const slice = createSlice({
    name: "bugs",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {

        bugsRequested: (state, action) => {
            state.loading = true;
        },

        bugsRequestedFailed: (state, action) => {
            state.loading = false;
        },
        bugsReceived: (state, action) => {
            state.list = action.payload;
            state.loading = false;
            state.lastFetch = Date.now(); //cant use date object because its not serializable 
        },

        bugAssignedToUser: (state, action) => {
            const { id, userId } = action.payload;
            const index = state.list.findIndex(bug => bug.id === id );
            state.list[index].userId = userId;
        },

        bugAdded: (state, action) => {
             state.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
             })
         },

        bugAddedByServer: (state, action) => {
            state.list.push(action.payload);
        },
        bugResolved: (state, action) => {
            {
                const index = state.list.findIndex(bug => bug.id === action.payload.id);
                state.list[index].resolved = true;
            }
         },
        bugRemoved: (state, action) => {
            state.list.splice(state.list.findIndex(bug => bug.id === action.payload.id), 1);
        }


    }
})


export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestedFailed, bugAddedByServer } = slice.actions;
export default slice.reducer;

const url = '/bugs';

export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

    if (diffInMinutes < 10) return;
    return dispatch(
        apiCallBegan({
            url,
            onStart: bugsRequested.type,
            onSuccess: bugsReceived.type,
            onError: bugsRequestedFailed.type //needs to be string because functions are not serializable, action objects should be serializable
        })
    )
};

export const addBug = bug => apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAddedByServer.type

});

export const resolveBug = id => apiCallBegan({
    url: url + '/' + id,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type

});

export const assignBugToUser = (bugId, userId) => 
    apiCallBegan({
        url: url + '/' + bugId,
        method: 'patch',
        data: { userId }/*,
        onSuccess: bugAssignedToUser.type*/
    });
//selector function

// export const UnresolvedBugsSelector = state => 
//      state.entities.bugs.filter(bug => !bug.resolved);
 
//Memoization 
//bugs => get unresolve bugs from cache

export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, project) => bugs.list.filter(bug => !bug.resolved)
)

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => bug.userId === userId)
)

// export default createReducer([], {
//     //key: value p
//     //action: function

//     [bugAdded.type]: (state, action) => {
//         state.push(
//             {
//                 id: ++lastId,
//                 description: action.payload.description,
//                 resolved: false
//             }
//         );
//     },

//     [bugResolved.type]: (state, action) => {
//         const index = state.findIndex(bug => bug.id === action.payload.id);
//         state[index].resolved = true;
//     },

//     [bugRemoved.type]: (state, action) => {
//         state.splice(state.findIndex(bug => bug.id === action.payload.id));
//     }
// })

// export default function reducer(state = [], action){
//     switch (action.type){
//         case bugAdded.type:
//             return [
//                 ...state,
//                 {
//                     id: ++lastId,
//                     description: action.payload.description,
//                     resolved: false
//                 }
//             ];

//         case bugRemoved.type:
//             return state.filter(bug => bug.id !==action.payload.id);

//         case bugResolved.type:
//             return state.map(bug => bug.id === action.payload.id ? {...bug,
//                 resolved: true} : bug);

//         default:
//             return state;
//     }
// }
