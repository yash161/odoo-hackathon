// api/fetchUser.js

import { connect } from '@/app/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Grievance from '@/app/models/grievance'// Adjust the import path according to your project structure

connect(); // Establish MongoDB connection
export async function PUT(request: NextRequest) {
    try {
        await mongoose.connection; // Wait for MongoDB connection
        const { employee_id, status } = await request.json(); // Extracting employee_id and status from request body

        if (!employee_id || !status) {
            return NextResponse.json({ error: "employee_id and status are required" }, { status: 400 });
        }

        const grievance = await Grievance.findOneAndUpdate(
            { employee_id: employee_id }, // Find the grievance by employee_id
            { status: status }, // Update the status
            { new: true } // Return the updated document
        );

        if (!grievance) {
            return NextResponse.json({ error: "Grievance not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Grievance status updated successfully",
            success: true,
            grievance
        });

    } catch (error) {
        return NextResponse.json({ error: "error" }, { status: 500 });
    }
}