import { NextRequest, NextResponse } from 'next/server'

const proxy = (req: NextRequest) => {
    const { pathname } = req.nextUrl
    const Admitoken = req.cookies.get("USER")?.value
    const Employeetoken = req.cookies.get("EMPLOYEE")?.value

    if (pathname.startsWith("/admin") && !Admitoken) {
        return NextResponse.redirect(new URL("/signin", req.url))
    }
    if (pathname.startsWith("/employee") && !Employeetoken) {
        return NextResponse.redirect(new URL("/signin", req.url))
    }

    return NextResponse.next()
}

export default proxy