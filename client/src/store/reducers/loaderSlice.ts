import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
  },
});

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
