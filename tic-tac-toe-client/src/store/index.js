import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import playSlice from "./play-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        play: playSlice
    }
})

export default store;