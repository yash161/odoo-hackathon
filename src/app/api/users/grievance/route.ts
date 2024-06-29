// api/createGrievance.js

import { connect } from '@/app/dbConfig/dbConfig';
import Grievance from '@/app/models/grievance'
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

connect(); // Establish MongoDB connection

export async function POST(request: NextRequest) {
    try {
        await mongoose.connection; // Wait for MongoDB connection

        const reqBody = await request.json();
        const { employeeId, grievanceType, description, department, severity, documents } = reqBody;

        const newGrievance = new Grievance({
            employeeId,
            grievanceType,
            description,
            department,
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
