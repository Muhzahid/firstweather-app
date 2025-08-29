import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const fetchWeather = createAsyncThunk("weather/fetch", async (city) => {
    const res = await axios.get(`http://localhost:5000/api/weather?city=${city}&email=test@example.com`);
    return res.data;
});

const weatherSlice = createSlice({
    name: "weather",
    initialState: { data: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
    .addCase(fetchWeather.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchWeather.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    }
});

export default weatherSlice.reducer;
