// api/fetchUser.js

import { connect } from '@/app/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Grievance from '@/app/models/grievance'// Adjust the import path according to your project structure
import {getIdFromToken} from '@/app/helpers/getTokenDetails'
import User from '@/app/models/userSchema';

connect(); // Establish MongoDB connection
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        console.log(url);

        const Id = await getIdFromToken(request)

        const user = await User.findOne({_id : Id})

        
        var users = await Grievance.find()
        if(!user.isAdmin){
             users = await Grievance.find({employee_id : user.employee_id})
        }

        

        // const users = await Grievance.find(); // Fetching all user documents

        return NextResponse.json({
            message: "Users fetched successfully",
            success: true,
            users
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
