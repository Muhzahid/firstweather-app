import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import weatherReducer from "../features/weatherSlice";
import preferencesReducer from '../features/preferencesSlice';



export const store = configureStore({
    reducer: {
        auth: authReducer,
        weather: weatherReducer,
        preferences: preferencesReducer,

    },
});