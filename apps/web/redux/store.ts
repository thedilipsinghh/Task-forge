import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/auth.api";
import { adminApi } from "./apis/admin.api";
import { empApi } from "./apis/employee.api";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [empApi.reducerPath]: empApi.reducer,
    },
    middleware: def => def().concat(authApi.middleware, adminApi.middleware, empApi.middleware)
})

export default reduxStore