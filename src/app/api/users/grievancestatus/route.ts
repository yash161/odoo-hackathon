// api/fetchUser.js

import { connect } from '@/app/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Grievance from '@/app/models/grievance'// Adjust the import path according to your project structure
import {getIdFromToken} from '@/app/helpers/getTokenDetails'

connect(); // Establish MongoDB connection
export async function GET(request: NextRequest) {
    try {
        await mongoose.connection; // Wait for MongoDB connection
        const url = new URL(request.url);
        console.log(url);

        const Id = await getIdFromToken(request)
        const users = await Grievance.find({_id : Id})

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
