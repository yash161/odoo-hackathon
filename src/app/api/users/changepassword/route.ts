import {connect} from '@/app/dbConfig/dbConfig'
import User from '@/app/models/userSchema'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const {uid,password} = reqBody //should match when calling this API endpoint parameters

        console.log("User id",uid);
        console.log("User password",password);
        

        const user = await User.findOne({_id : uid})

        if(!user) {
            return NextResponse.json({
                message : "User Does Not Match",
                status : 400
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const newHasedPassword = await bcryptjs.hash(password,salt)
        
        user.password = newHasedPassword

        await user.save()

        return NextResponse.json({
            message : "Successfully Changed The Password",
            success : true
        })
        
        
    } catch (error:any) {
        return NextResponse.json({
            error : error.message,
            status : 500
        })
    }
}