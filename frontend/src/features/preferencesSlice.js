import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempUnit: "C", // default Celsius
  defaultCity: "",
  theme: "light", // optional
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setTempUnit: (state, action) => {
      state.tempUnit = action.payload;
    },
    setDefaultCity: (state, action) => {
      state.defaultCity = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTempUnit, setDefaultCity, setTheme } = preferencesSlice.actions;
export default preferencesSlice.reducer;
