import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name,
        })
    },

    bugsAssigned : (state, action) => {
        const index = state.findIndex(member => member.id === action.payload.id);
        state[index].task.push(action.payload.bugId);
      },
  }
});

export const { userAdded, projectRemoved } = slice.actions;
export default slice.reducer;

//Memoization 
//bugs => get unresolve bugs from cache

// export const getMemberTasks = createSelector(
   
// )