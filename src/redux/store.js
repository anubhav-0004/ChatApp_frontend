import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/reduxAPI";
import miscSlice from "./reducers/misc";

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [miscSlice.name]: miscSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (defaultMiddleWare) => [...defaultMiddleWare(), api.middleware],
});


export default store;