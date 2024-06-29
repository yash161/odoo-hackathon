import {connect} from '@/app/dbConfig/dbConfig'
import User from '@/app/models/userSchema'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest) {
    try {

        const reqBody = await request.json()

        const {email,password} = reqBody

        const  user = await User.findOne({email})

        if(!user) { 
            return NextResponse.json({
                message : "Email Id Does not exists",
                status:500
            })
        }

        const validPassword = await bcryptjs.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json({
                message : "Password Does Not Match",
                status : 500
            })
        }

        if(!user.isVerified){
            return NextResponse.json({
                message : "User Not Verified",
                status : 500
            })
        }

        const tokenData = {
            id : user._id
        }

        const response = NextResponse.json({
            message : "Done",
            success : true
        })

        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn : '1d'})

        response.cookies.set("token",token,{
            httpOnly : true
        })

        return response

        
    } catch (error:any) {
        return NextResponse.json({
            error : error.message,
            status:400
        })
        
    }
}

