"use client"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCreatTaskMutation, useDeleteTaskDetailMutation, useFetchTaskQuery, useGetEmployeeQuery, useUpdateTaskDetailMutation, useUpdateTaskMutation } from '@/redux/apis/admin.api'
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { CREATE_TASK_REQUEST, Employee, Task, UPDATE_TASK_DETAILS_REQUEST } from '@repo/types'
import { format, setDate } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import { title } from 'process'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z, { date } from 'zod'


// type Task = {
//     id: number
//     title: string
//     desc: string
//     eid: number
// }

const page = () => {
    const { data } = useGetEmployeeQuery()
    const { data: taskData } = useFetchTaskQuery()
    const [updateTask] = useUpdateTaskMutation()

    const handleDragEnd = async (e: DragEndEvent) => {
        const { active, over } = e
        const { id: taskId } = active
        // const { id: employeeId } = over
        const employeeId = over?.id
        // const index = tasks.findIndex(item => item.id === taskId)
        const singleTask = taskData && taskData.result?.find(item => item.id === taskId)

        if (singleTask) {
            if (employeeId === singleTask.userId) return
            await updateTask({ taskId: singleTask.id, userId: employeeId as number }).unwrap()
            toast.success("task update")
            // singleTask.eid = employeeId as number
        }
    }
    return <DndContext onDragEnd={handleDragEnd}>
        <div className='flex gap-2'>
            {data && taskData && taskData.result && data.result?.map(item => <Column item={item} tasks={taskData?.result as Task[]} key={item.id} />)}
        </div>

    </DndContext>

}

const Column = ({ item, tasks }: { item: Employee, tasks: Task[] }) => {
    const [showBtn, setShowBtn] = useState(false)

    const { setNodeRef, active } = useDroppable({ id: item.id as number })
    const [createTask] = useCreatTaskMutation()

    const taskSchema = z.object({
        title: z.string().min(2),
        userId: z.number(),
    }) satisfies z.ZodType<CREATE_TASK_REQUEST>

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            userId: item.id as number
        }
    })

    const handleFormSubmit = async (taskData: CREATE_TASK_REQUEST) => {
        try {
            await createTask(taskData).unwrap()
            toast.success("task create success")
            setShowBtn(false)
        } catch (error) {
            console.log(error)
            toast.error("unable to task create ")
        }
    }

    return <div className='flex-1'>
        <Card ref={setNodeRef} className=" overflow-visible">
            <CardHeader className='bg-gray-100'>
                <CardTitle className="b-gray-700 text-black text-center text-2xl p-3">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    tasks.map(t => t.userId === item.id && <TaskCard t={t} key={t.id} />)
                }
            </CardContent>
            <CardFooter className=' mt-auto flex-col'>
                {
                    showBtn
                        ? <div>
                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                <Input {...register("title")} placeholder='Enter Task' className='w-full mb-3'
                                    aria-invalid={errors.title?.message ? true : false} />
                                <Button type='submit' className='me-2'>Add</Button>
                                <Button type="button" onClick={() => setShowBtn(false)} variant="secondary">Cancle</Button>
                            </form>
                        </div>
                        : <Button onClick={() => setShowBtn(true)} className='w-full'>Add Task</Button>
                }
            </CardFooter>
        </Card >
    </div>
}


const TaskCard = ({ t }: { t: Task }) => {
    const [deleteTaskDetail] = useDeleteTaskDetailMutation()
    const [updateTaskDetail, { isLoading }] = useUpdateTaskDetailMutation()

    const taskDetailSchema = z.object({
        title: z.string().min(3),
        desc: z.string(),
        due: z.coerce.date(),
        taskImage: z.instanceof(FileList),
    }) satisfies z.ZodType<UPDATE_TASK_DETAILS_REQUEST>
    const { setValue, register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(taskDetailSchema) })

    const [show, setShow] = useState(false)
    const [date, setDate] = React.useState<Date>()
    const { attributes, transform, setNodeRef, listeners } = useDraggable({ id: t.id })
    const customeStyle = {
        transform: `translate(${transform?.x}px, ${transform?.y}px)`
    }
    const handleClose = () => {
        setShow(false)
    }

    const handleFormSubmit = async (taskData: UPDATE_TASK_DETAILS_REQUEST) => {
        try {
            const formData = new FormData();

            formData.append("title", taskData.title);
            formData.append("desc", taskData.desc);
            formData.append("due", taskData.due.toISOString());

            if (taskData.taskImage && taskData.taskImage.length > 0) {
                const file = taskData.taskImage.item(0);

                if (file) {
                    formData.append("taskImage", file);
                }
            }
            await updateTaskDetail({
                id: t.id,
                body: formData,
            }).unwrap();

            console.log("Updated:", taskData);
            toast.success("update Success")
            setShow(false)
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTaskDetail({ id }).unwrap()
            toast.success("task detail delete success")
            setShow(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleShowAndReset = () => {
        setShow(true)
        reset({
            title: t.title,
            desc: t.desc as string,
            due: t.due as Date,
            taskImage: t.taskImage as any,
        })
    }
    return <>
        <img src={t.taskImage as string} alt="" />
        <Card onClick={() => setShow(true)} style={customeStyle} className='rounded-lg bg-gray-300 p-3  m-2 cursor-grab'>
            <div {...attributes} {...listeners} ref={setNodeRef}>
                <CardHeader>
                    <CardTitle  >{t.title}</CardTitle>
                    <CardDescription>{t.desc}</CardDescription>
                    <CardDescription>{format(t.due as Date, "yyyy-MM-dd")}</CardDescription>
                    <Avatar>
                        <AvatarImage>{t.taskImage}</AvatarImage>
                    </Avatar>
                </CardHeader>
            </div>
        </Card>




        <Dialog open={show} >
            <DialogContent closeDialog={handleClose} className="sm:max-w-sm">
                <form onSubmit={handleSubmit(handleFormSubmit)}>

                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                        <DialogDescription>
                            Update your task details here.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <Label htmlFor="task-1">Title</Label>
                            <Input {...register("title")} id="task-1" />
                        </Field>

                        <Field>
                            <Label htmlFor="desc-1">Description</Label>
                            <Input {...register("desc")} id="desc-1" />
                        </Field>
                        <Field>
                            <Label htmlFor="desc-1">TaskImage</Label>
                            <Input {...register("taskImage")} type='file' id="desc-1" />
                        </Field>

                        <Field>
                            <Label htmlFor="date-1">Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-[212px] justify-between text-left font-normal"
                                    >
                                        {date ? format(date, "PPP") : "Pick a date"}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(x) => {
                                            setValue("due", new Date(x as Date), { shouldValidate: true })
                                            setDate(x)
                                        }}
                                        defaultMonth={date}
                                    />
                                </PopoverContent>
                            </Popover>
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <Button type="button" onClick={() => handleDelete(t.id)} variant="destructive">
                            Delete Task
                        </Button>
                        <Button type="button" onClick={() => handleShowAndReset()} variant="secondary">
                            Edit
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" onClick={handleClose} variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        < Button type="submit">Save Changes</Button >
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog >



    </>
}






export default page


