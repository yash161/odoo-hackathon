// api/fetchEmployeeIds.js

import { connect } from '@/app/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Grievance from '@/app/models/grievance'; // Adjust the import path according to your project structure

connect(); // Establish MongoDB connection

export async function GET(request: NextRequest) {
    try {
        await mongoose.connection; // Wait for MongoDB connection
        const grievances = await Grievance.find({}, 'employee_id'); // Fetching all employee IDs

        const employeeIds = grievances.map(grievance => grievance.employee_id);

        return NextResponse.json({
            message: "Employee IDs fetched successfully",
            success: true,
            employeeIds
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
