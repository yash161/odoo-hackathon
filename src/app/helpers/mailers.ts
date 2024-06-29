import nodemailer from 'nodemailer'
import User from '@/app/models/userSchema'
import bcryptjs from 'bcryptjs'


export const sendMail = async ({email , emailType , userId} : any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{$set:{verification_code: hashedToken}})
        }
          else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{$set:{forgot_password: hashedToken}})
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            }
          });
            
          const mailOptions = {
            from: 'aryanpandit17032002@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}${emailType === "VERIFY" ? `/verifyemail?token=${hashedToken}` :`/verifyforgot?token=${hashedToken}`}
            </p>`
        }
            const mailResponse  = await transport.sendMail
            (mailOptions);
    
            return mailResponse
    
    } catch (error : any) {
        throw new Error(error.message)
    }

}