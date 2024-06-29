import {connect} from '@/app/dbConfig/dbConfig'
import User from '@/app/models/userSchema'
import { NextResponse,NextRequest } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendMail } from '@/app/helpers/mailers'

connect()

export async function POST(request : NextRequest){
    try {

        const reqBody = await request.json()
        const {employee_id,username,email,password,designation,department} = reqBody

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hasedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            employee_id,
            username,
            email,
            password:hasedPassword,
            designation,
            department
        })

        const savedUser = await newUser.save()
        await sendMail({email, emailType: "VERIFY", userId: savedUser._id})
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
    } catch (error:any) {
        return NextResponse.json({error : error.message} , {status : 500})
    }
}
