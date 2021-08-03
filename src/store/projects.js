import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (state, action) => {
      state.push({
        id: ++lastId,
        projectName: action.payload.name
        })
    },

    projectRemoved: (state, action) => {
      state.splice(state.findIndex(bug => bug.id === action.payload.id), 1);
    }
  }
});

export const { projectAdded, projectRemoved } = slice.actions;
export default slice.reducer;
