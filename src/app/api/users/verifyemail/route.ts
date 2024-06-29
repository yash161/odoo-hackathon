import {connect} from '@/app/dbConfig/dbConfig'
import User from '@/app/models/userSchema'
import { NextRequest,NextResponse } from 'next/server'


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()

        const {token} = reqBody
    
        console.log("token" , token);

        console.log(typeof token)
    
        const user = await User.findOne({verification_code : token})
    
        if(!user){
            return NextResponse.json({message : "Invalid Token", status : 400})
        }

        user.isVerified = true
        user.verification_code = undefined

        await user.save()

        return NextResponse.json({message:"User vertification completed",status:200, success : true})



    } catch (error:any) {
        return NextResponse.json({error : error.message,status : 500})
    }
}