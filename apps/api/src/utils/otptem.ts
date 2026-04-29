// const { baseTemplate } = require("./baseTemplate")

import { baseTemplate } from "./basetem"


export const otpTemplate = ({ name, otp, min, sec }: { name: string, otp: string, min: string, sec: string }) => {
    const content = `
<h2>OTP</h2>
<p>Hi, ${name}</p>
<p>please use following OTP</p>
    <h1>${otp}</h1>
<p>this link will expire ${min} min ${sec} seconds </p>
<p>If you did not Request this, please ignore this email</p>
`
    return baseTemplate({
        title: "welocome",
        content
    })
}