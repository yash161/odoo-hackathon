// api/grievances.js

import { connect } from '@/app/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Grievance from '@/app/models/grievance'; // Adjust the import path according to your project structure

connect(); // Establish MongoDB connection

export async function GET(request: NextRequest) {
    try {
        await mongoose.connection; // Wait for MongoDB connection
        const grievances = await Grievance.find(); // Fetching all grievance documents

        return NextResponse.json({
            message: "Grievances fetched successfully",
            success: true,
            grievances
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        await mongoose.connection; // Wait for MongoDB connection
        const { id, department } = await request.json() as { id: string, department: string }; // Explicitly define the types

        const grievance = await Grievance.findByIdAndUpdate(id, { isAssgined: department }, { new: true });

        return NextResponse.json({
            message: "Grievance updated successfully",
            success: true,
            grievance
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
