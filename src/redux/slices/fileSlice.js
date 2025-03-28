import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
  name: "file",
  initialState: { files: [] },
  reducers: {
    uploadFile: (state, action) => {
      state.files.push(action.payload);
    },
  },
});

export const { uploadFile } = fileSlice.actions;
export default fileSlice.reducer;
