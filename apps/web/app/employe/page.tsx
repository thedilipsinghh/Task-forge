"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useFetchTaskEmpQuery, useGetconvosendlogicQuery, usePostconvosendlogicMutation } from "@/redux/apis/employee.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { skipToken } from "@reduxjs/toolkit/query"
import { CONVOSEND_CREATE_REQUEST } from "@repo/types"
import { Form } from "radix-ui"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const Page = () => {
    const [show, setShow] = useState(false)
    const { data, isLoading } = useFetchTaskEmpQuery()
    const { data: ConvoData } = useGetconvosendlogicQuery(skipToken)

    const [ConvoCreate] = usePostconvosendlogicMutation()
    const { data: GetDataConvo } = useGetconvosendlogicQuery(skipToken)
    console.log(GetDataConvo, "comment box")


    const ConvoSchema = z.object({
        msg: z.string(),
        taskID: z.number().optional()
    }) satisfies z.ZodType<CONVOSEND_CREATE_REQUEST>

    const { register, reset, handleSubmit, setValue, formState: { errors, } } = useForm({
        resolver: zodResolver(ConvoSchema)
    })

    const HandleconvoCreate = async (convoData: CONVOSEND_CREATE_REQUEST) => {
        try {
            // console.log(convoData);

            await ConvoCreate(convoData).unwrap()
            // console.log("enter")
            toast.success("Convo Send Succcess")
            reset()
        } catch (error) {
            console.log(error)
            toast.error("Unable to send Success")

        }
    }
    console.log(errors);


    if (isLoading) return <p>Loading...</p>

    const tasks = data?.result || []


    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">All Tasks</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {tasks.length === 0 ? (
                    <p>No tasks found</p>
                ) : (
                    tasks.map((task: any) => (
                        <Card key={task.id} className="rounded-2xl shadow-md">
                            <CardHeader>
                                <CardTitle>{task.title}</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-2">

                                {task.taskImage ? (
                                    <img
                                        src={task.taskImage}
                                        alt="task"
                                        className="w-full h-40 object-cover rounded-md"
                                    />
                                ) : (
                                    <p>No Image</p>
                                )}

                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {task.desc}
                                </p>

                                <p className="text-sm">
                                    <b>Due:</b>{" "}
                                    {task.due
                                        ? new Date(task.due).toLocaleDateString()
                                        : "N/A"}
                                </p>

                                <p>
                                    {task.complete ? (
                                        <span className="text-green-500">Done</span>
                                    ) : (
                                        <span className="text-red-500">Pending</span>
                                    )}
                                </p>


                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => {
                                            console.log(task.id)

                                            setValue("taskID", task.id as number)
                                            setShow(true)
                                        }} className="w-full mt-2">
                                            Comment Box
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Task Details
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-3">
                                            {task.taskImage && (
                                                <img
                                                    src={task.taskImage}
                                                    className="w-full h-48 object-cover rounded-md"
                                                />
                                            )}

                                            <p><b>Title:</b> {task.title}</p>
                                        </div>
                                        <form onSubmit={handleSubmit(HandleconvoCreate)}>
                                            <Label>Response Input</Label>
                                            <Input {...register("msg")} placeholder=" Enter Your Response comment"></Input>
                                            <Button type="submit" className="w-34">Submit</Button>
                                        </form>
                                    </DialogContent>
                                    <div>
                                        {GetDataConvo?.result?.map((item) => (
                                            <p key={item.id}>{item.msg}</p>
                                        ))}
                                    </div>

                                </Dialog>

                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}

export default Page