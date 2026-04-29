"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDeleteEmployeeMutation, useGetEmployeeQuery, useRegisterEmployeeMutation, useRestoreEmployeeMutation, useUpdateEmployeeMutation } from "@/redux/apis/admin.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Employee, REGISTER_EMPLOYEE_REQUEST } from "@repo/types"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { format } from 'date-fns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
export default function EmployeeDashboard() {
    const [show, setShow] = useState(false)
    const [showimage, setShowimage] = useState(true)

    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

    const closeDialog = () => {
        setShow(false)
        setSelectedEmployee(null)
        reset({
            name: "",
            email: "",
            mobile: "",
            department: "",
            jobRole: "",
            doj: new Date(),
            dob: new Date(),
        })
    }

    const { data } = useGetEmployeeQuery()
    const [regiEmployee, { isLoading }] = useRegisterEmployeeMutation()
    const [deleteEmployee] = useDeleteEmployeeMutation()
    const [restoreEmployee] = useRestoreEmployeeMutation()
    const [updateEmployee] = useUpdateEmployeeMutation()

    const employeeSchema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        mobile: z.string(),
        profile: z.instanceof(FileList),
        department: z.string(),
        jobRole: z.string(),
        doj: z.coerce.date(),
        dob: z.coerce.date(),
    }) satisfies z.ZodType<REGISTER_EMPLOYEE_REQUEST>

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(employeeSchema)
    })

    const handleDelete = async (id: number) => {
        try {
            await deleteEmployee({ id }).unwrap()
            toast.success("employee delete success")
        } catch (error) {
            console.log(error)
        }
    }
    const handleRestore = async (id: number) => {
        try {
            await restoreEmployee({ id }).unwrap()
            toast.success("employee restore success")
        } catch (error) {
            console.log(error)
        }
    }

    const handleFormSubmit = async (userData: REGISTER_EMPLOYEE_REQUEST) => {
        try {
            const fd = new FormData()
            fd.append("name", userData.name)
            fd.append("email", userData.email)
            fd.append("mobile", userData.mobile)
            fd.append("department", userData.department)
            fd.append("jobRole", userData.jobRole)
            fd.append("doj", new Date(userData.doj).toISOString())
            fd.append("dob", new Date(userData.dob).toISOString())
            if (userData.profile) {
                fd.append("profile", userData.profile[0] as File)
            }
            if (selectedEmployee) {
                await updateEmployee({ id: selectedEmployee.id as number, fd })
                setShow(false)
                toast.success("employee update success")
            } else {
                await regiEmployee(fd).unwrap()
                setShow(false)
                reset()
                toast.success("Employee register success")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (employeeData: Employee) => {
        setShow(true)
        setSelectedEmployee(employeeData)
        reset({
            name: employeeData.name,
            email: employeeData.email,
            mobile: employeeData.mobile,
            department: employeeData.department as string,
            doj: format(employeeData.doj as Date, "yyyy-MM-dd") as unknown as Date,
            dob: format(employeeData.dob as Date, "yyyy-MM-dd") as unknown as Date,
            jobRole: employeeData.jobRole as string,
        })
    }
    return <>
        <Dialog open={show}>
            <div className="flex justify-end">
                <DialogTrigger asChild>
                    <Button disabled={isLoading} onClick={() => setShow(true)}>Add Employee</Button>
                </DialogTrigger>
            </div>
            <DialogContent isLoading={isLoading} closeDialog={closeDialog} className="sm:max-w-lg">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <DialogHeader >
                        {
                            selectedEmployee
                                ? <DialogTitle>Update Employee</DialogTitle>
                                : <DialogTitle>Save Profile</DialogTitle>

                        }
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="grid grid-cols-2 gap-2">
                        <Field>
                            <Label htmlFor="name-1">Name</Label>
                            <Input disabled={isLoading} {...register("name")} id="name-1" name="name" />
                        </Field>
                        <Field>
                            <Label htmlFor="email-1">Email</Label>
                            <Input disabled={isLoading} {...register("email")} id="email-1" />
                        </Field>
                        <Field>
                            <Label htmlFor="mobile-1">Mobile</Label>
                            <Input disabled={isLoading} {...register("mobile")} id="mobile-1" />
                        </Field>
                        <Field>
                            <Label htmlFor="department-1">Department</Label>
                            <Input disabled={isLoading} {...register("department")} id="department-1" />
                        </Field>
                        <Field>
                            <Label htmlFor="jobRole-1">JobRole</Label>
                            <Input disabled={isLoading} {...register("jobRole")} id="jobRole-1" />
                        </Field>
                        <Field>
                            <Label htmlFor="date-of-birth-1">Date of Birth</Label>
                            <Input disabled={isLoading} {...register("dob")} id="date-of-birth-1" type="date" />
                        </Field>
                        <Field>
                            <Label htmlFor="date-of-job-1">Date Of Job</Label>
                            <Input disabled={isLoading} {...register("doj")} id="date-of-job-1" type="date" />
                        </Field>
                        <Field>
                            {
                                selectedEmployee && showimage
                                    ? <>
                                        <img src={selectedEmployee.profilePic as string} height={50} width={50} alt="" />
                                        <Button onClick={() => setShowimage(false)} variant={"secondary"}>Change Image</Button>
                                    </>
                                    : <>
                                        <Label htmlFor="profile-1">Profile</Label>
                                        <Input disabled={isLoading} {...register("profile")} id="profile-1" type="file" />
                                        {!showimage && <Button onClick={() => setShowimage(true)}> Cancle</Button>}
                                    </>
                            }

                        </Field>
                    </FieldGroup>
                    <DialogFooter className="mt-3">
                        <DialogClose asChild>
                            <Button disabled={isLoading} onClick={closeDialog} variant="outline">Cancel</Button>
                        </DialogClose>
                        {
                            selectedEmployee
                                ? <Button type="submit">Update Employee</Button>
                                : <Button disabled={isLoading} type="submit">Save changes</Button>

                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
        <div className="overflow-x-auto w-full">
            {data && <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow className="">
                        <TableHead>Id</TableHead>
                        <TableHead>Profile</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Eamil</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>JobRole</TableHead>
                        <TableHead>Date of Join</TableHead>
                        <TableHead>Date of Birth</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.result?.map((item) =>
                        <TableRow key={item.id} className={`${item.isDelete ? "bg-red-300" : "bg-gray-200"}`}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell><Avatar><AvatarImage height={70} width={70} src={item.profilePic as string} alt="" /></Avatar></TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.mobile}</TableCell>
                            <TableCell >{item.department}</TableCell>
                            <TableCell >{item.jobRole}</TableCell>
                            <TableCell>{format(item.doj as Date, "yyyy-MM-dd")}</TableCell>
                            <TableCell>{format(item.dob as Date, "yyyy-MM-dd")}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEdit(item)}>Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem variant="destructive">
                                            {item.isDelete
                                                ? <Button onClick={() => handleRestore(item.id as number)}>Restore</Button>
                                                : <Button onClick={() => handleDelete(item.id as number)}>Delete</Button>
                                            }
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table >
            }
        </div>
    </>
}
