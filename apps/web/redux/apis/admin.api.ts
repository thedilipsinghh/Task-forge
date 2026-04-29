import { APP_URL } from "@/config/env"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CREATE_TASK_REQUEST, CREATE_TASK_RESPONSE, DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_RESPONSE, DELETE_TASK_DETAILS_REQUEST, DELETE_TASK_DETAILS_RESPONSE, FETCH_TASK_REQUEST, FETCH_TASK_RESPONSE, ME_REQUEST, ME_RESPONSE, READ_EMPLOYEE_REQUEST, READ_EMPLOYEE_RESPONSE, REGISTER_EMPLOYEE_REQUEST, REGISTER_EMPLOYEE_RESPONSE, RESTORE_EMPLOYEE_REQUEST, RESTORE_EMPLOYEE_RESPONSE, UPDATE_EMPLOYEE_RESPONSE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESPONSE, UPDATE_TASK_DETAILS_REQUEST, UPDATE_TASK_DETAILS_RESPONSE, UPDATE_TASK_REQUEST, UPDATE_TASK_RESPONSE } from "@repo/types"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `/api/admin`, credentials: "include" }),
    tagTypes: ["profile", "employee", "task"],
    endpoints: (builder) => {
        return {
            updateProfile: builder.mutation<UPDATE_PROFILE_RESPONSE, { id: number, fd: FormData }>({
                query: userData => {
                    return {
                        url: `/update-profile/${userData.id}`,
                        method: "PUT",
                        body: userData.fd
                    }
                },
                invalidatesTags: ["profile"]
            }),
            fetchMe: builder.query<ME_RESPONSE, ME_REQUEST>({
                query: () => {
                    return {
                        url: "/me",
                        method: "GET",
                    }
                },
                providesTags: ["profile"]
            }),
            registerEmployee: builder.mutation<REGISTER_EMPLOYEE_RESPONSE, FormData>({
                query: userData => {
                    return {
                        url: "/employee-register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["employee"]
            }),
            getEmployee: builder.query<READ_EMPLOYEE_RESPONSE, READ_EMPLOYEE_REQUEST>({
                query: () => {
                    return {
                        url: "/employee",
                        method: "GET",
                    }
                },
                providesTags: ["employee"]
            }),
            deleteEmployee: builder.mutation<DELETE_EMPLOYEE_RESPONSE, DELETE_EMPLOYEE_REQUEST>({
                query: empData => {
                    return {
                        url: "/employee-delete/" + empData.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["employee"]
            }),
            restoreEmployee: builder.mutation<RESTORE_EMPLOYEE_RESPONSE, RESTORE_EMPLOYEE_REQUEST>({
                query: empData => {
                    return {
                        url: "/employee-restore/" + empData.id,
                        method: "POST",
                    }
                },
                invalidatesTags: ["employee"]
            }),
            updateEmployee: builder.mutation<UPDATE_EMPLOYEE_RESPONSE, { id: number, fd: FormData }>({
                query: empData => {
                    return {
                        url: "/employee-update/" + empData.id,
                        method: "PUT",
                        body: empData.fd
                    }
                },
                invalidatesTags: ["employee"]
            }),

            // task api

            creatTask: builder.mutation<CREATE_TASK_RESPONSE, CREATE_TASK_REQUEST>({
                query: userData => {
                    return {
                        url: "/task-create",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["task"]
            }),
            fetchTask: builder.query<FETCH_TASK_RESPONSE, FETCH_TASK_REQUEST>({
                query: () => {
                    return {
                        url: "/task-read",
                        method: "GET",
                    }
                },
                providesTags: ["task"]
            }),
            updateTask: builder.mutation<UPDATE_TASK_RESPONSE, UPDATE_TASK_REQUEST>({
                query: userData => {
                    return {
                        url: "/task-update",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["task"]
            }),

            updateTaskDetail: builder.mutation<
                UPDATE_TASK_DETAILS_RESPONSE,
                { id: number; body: FormData }
            >({
                query: ({ id, body }) => ({
                    url: "/task-detail-update/" + id,
                    method: "PUT",
                    body,
                }),
            }),
            deleteTaskDetail: builder.mutation<DELETE_TASK_DETAILS_RESPONSE, DELETE_TASK_DETAILS_REQUEST>({
                query: userData => {
                    return {
                        url: "/task-detail-delete/" + userData.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["task"]
            }),

        }
    }
})

export const {
    useUpdateProfileMutation,
    useFetchMeQuery,
    useGetEmployeeQuery,
    useRegisterEmployeeMutation,
    useDeleteEmployeeMutation,
    useRestoreEmployeeMutation,
    useUpdateEmployeeMutation,
    useCreatTaskMutation,
    useFetchTaskQuery,
    useUpdateTaskMutation,
    useUpdateTaskDetailMutation,
    useDeleteTaskDetailMutation
} = adminApi




