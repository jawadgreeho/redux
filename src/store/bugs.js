import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

import { createSelector } from 'reselect';
//Action Creators

// export const bugAdded = createAction('bugAdded');
     
// export const bugResolved = createAction('bugResolved');

// export const bugRemoved = createAction('bugRemoved');

//Reducers

let lastId = 0;

const slice = createSlice({
    name: "bugs",
    initialState: [],
    reducers: {

        bugAssignedToUser: (state, action) => {
            const { bugId, userId } = action.payload;
            const index = state.findIndex(bug => bug.id === bugId );
            state[index].userId = userId;
        },

         bugAdded: (state, action) => {
             state.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
             })
         },
         bugResolved: (state, action) => {
            {
                const index = state.findIndex(bug => bug.id === action.payload.id);
                state[index].resolved = true;
            }
         },
         bugRemoved: (state, action) => {
            state.splice(state.findIndex(bug => bug.id === action.payload.id), 1);
        }


    }
})


export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser } = slice.actions;
export default slice.reducer;

//selector function

// export const UnresolvedBugsSelector = state => 
//      state.entities.bugs.filter(bug => !bug.resolved);
 
//Memoization 
//bugs => get unresolve bugs from cache

export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, project) => bugs.filter(bug => !bug.resolved)
)

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
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
