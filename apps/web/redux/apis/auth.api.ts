import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { APP_URL } from "../../config/env"
import { LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT_REQUEST, LOGOUT_RESPONSE, ME_REQUEST, ME_RESPONSE } from "@repo/types"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `/api/auth`, credentials: "include" }),
    endpoints: (builder) => {
        return {
            signin: builder.mutation<LOGIN_RESPONSE, LOGIN_REQUEST>({
                query: userdata => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userdata
                    }
                },
            }),
            signout: builder.mutation<LOGOUT_RESPONSE, LOGOUT_REQUEST>({
                query: () => {
                    return {
                        url: "/logout",
                        method: "POST",
                    }
                },
            }),


        }
    }
})

export const { useSigninMutation, useSignoutMutation } = authApi
