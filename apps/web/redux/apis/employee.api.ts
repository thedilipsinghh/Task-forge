import { APP_URL } from "@/config/env"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CONVOSEND_CREATE_REQUEST, CONVOSEND_CREATE_RESPONSE, CONVOSEND_FETCH_REQUEST, CONVOSEND_FETCH_RESPONSE, FETCH_TASK_REQUEST, FETCH_TASK_RESPONSE } from "@repo/types"

export const empApi = createApi({
    reducerPath: "empApi",
    baseQuery: fetchBaseQuery({ baseUrl: `/api/employee`, credentials: "include" }),
    tagTypes: ["tagName"],
    endpoints: (builder) => {
        return {
            fetchTaskEmp: builder.query<FETCH_TASK_RESPONSE, FETCH_TASK_REQUEST>({
                query: () => {
                    return {
                        url: "/fetchTaskEmp",
                        method: "GET",
                    }
                },
            }),
            Postconvosendlogic: builder.mutation<CONVOSEND_CREATE_RESPONSE, CONVOSEND_CREATE_REQUEST>({
                query: userData => {
                    return {
                        url: "/convoSend",
                        method: "POST",
                        body: userData
                    }
                },
            }),
            Getconvosendlogic: builder.query<CONVOSEND_FETCH_RESPONSE, CONVOSEND_FETCH_REQUEST>({
                query: userData => {
                    return {
                        url: "/convoFetch",
                        method: "GET",
                    }
                },
            }),

        }
    }
})

export const { useFetchTaskEmpQuery, usePostconvosendlogicMutation, useGetconvosendlogicQuery } = empApi
