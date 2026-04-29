import { baseTemplate } from "./basetem"

export const forgetPasswordTemplate = ({ name, resetLink }: { name: string, resetLink: string }) => {
    const content = `
<h2>Request Password Reset</h2>
<p>Hi, ${name}</p>
<p>You have request to reset password</p>
<a href='${resetLink}'>Reset Password</a=>
    <p>this link will expire in 15 min </p>
<p>If you have not Request to reset password, please igonre this email</p>
`
    return baseTemplate({
        title: "",
        content
    })
}