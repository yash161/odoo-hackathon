import {connect} from '@/app/dbConfig/dbConfig'
import { sendMail } from '@/app/helpers/mailers'
import User from '@/app/models/userSchema'
import { NextRequest,NextResponse } from 'next/server'



connect()

export async function POST(request : NextRequest){
try {
        const reqBody = await request.json()
        const {email} = reqBody
    
        const user = await User.findOne({email})
    
        if(!user){
            return NextResponse.json({message : "Invalid User", status : 400})
        }
    
        await sendMail({email,emailType : "RESET",userId : user._id})

        return NextResponse.json({
            message : "Check Your Emaill",
            success : true
        })
    
} catch (error:any) {
    return NextResponse.json({error : error.message} , {status : 500})
}

}