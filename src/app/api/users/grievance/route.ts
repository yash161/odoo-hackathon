// api/createGrievance.js

import { connect } from '@/app/dbConfig/dbConfig';
import Grievance from '@/app/models/grievance'
import User from '@/app/models/userSchema';
import { NextRequest, NextResponse } from 'next/server';
import {getIdFromToken} from '@/app/helpers/getTokenDetails'

connect(); // Establish MongoDB connection

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const {  grievanceType, description, severity, documents } = reqBody;
 

        const Id = await getIdFromToken(request)
        const user = await User.findOne({_id : Id}).select('-password')


        const newGrievance = new Grievance({
            grievanceType,
            employee_id:user.employee_id,
            description,
            severity,
            documents,
            status: 'Submitted'
        });

        const savedGrievance = await newGrievance.save();

        return NextResponse.json({
            message: "Grievance submitted successfully",
            success: true,
            savedGrievance
        });

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
