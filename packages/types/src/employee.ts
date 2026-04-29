// import {Task} from "./admin"

// export type FETCH_TASK_REQUEST = void
// export type FETCH_TASK_RESPONSE = {
//     message: string,
//     result?: Task[]
// }

export type CONVOSEND_CREATE_REQUEST = {
    id?: number,
    userID?: string | number
    taskID?: string | number
    msg: string,
}
export type CONVOSEND_CREATE_RESPONSE = {
    message: string

}
export type CONVOSEND_FETCH_REQUEST = {
    message: string

}
export type CONVOSEND_FETCH_RESPONSE = {
    massage: string,
    result: CONNVOSEND[]
}
export type CONNVOSEND = {
    id?: number,
    userID: string | number
    taskID: string | number
    msg: string,
}
