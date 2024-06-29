import { connect } from '@/app/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Grievance from '@/app/models/grievance'; // Adjust the import path according to your project structure

connect(); // Establish MongoDB connection

export async function GET(request: NextRequest) {
    try {
        await mongoose.connection; // Wait for MongoDB connection

        const grievanceTypes = await Grievance.distinct('grievanceType'); // Fetch distinct grievance types

        return NextResponse.json({
            message: "Grievance types fetched successfully",
            success: true,
            grievanceTypes
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
