import {connect} from '@/app/dbConfig/dbConfig'
import User from '@/app/models/userSchema'
import { NextRequest,NextResponse } from 'next/server'


connect()

export async function POST(request:NextRequest){
    try {

        const reqBody = await request.json()

        const {token} = reqBody

        const user = await User.findOne({forgot_password : token})

        if(!user) {
            return NextResponse.json({
                message : "Invalid Token",
                status : 400
            })
        }

        user.forgotpasswordToken = undefined
        user.forgotpasswordExpiry = undefined

        await user.save()

        return NextResponse.json({
            message : "SuccessFully Verified ",
            success : true,
            data : user._id
        })

        
    } catch (error:any) {
        return NextResponse.json({error : error.message,status : 500})
    }

}