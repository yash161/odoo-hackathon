// api/fetchUser.ts

import { connect } from '@/app/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Grievance from '@/app/models/grievance'; // Adjust the import path according to your project structure
import AWS from 'aws-sdk';

connect(); // Establish MongoDB connection

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' }); // Replace 'your-region' with your actual AWS region
const sns = new AWS.SNS();

interface UpdateRequest {
    employee_id: number;
    status: string;
}

export async function PUT(request: NextRequest) {
    try {
        await mongoose.connection; // Wait for MongoDB connection
        const { employee_id, status }: UpdateRequest = await request.json(); // Extracting employee_id and status from request body

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

        // Send notification via SNS
        const params = {
            Message: `Employee ${employee_id} status of your grievance has been updated to ${status}.`, 
            Subject: 'Grievance Status Update',
            TopicArn: 'arn:aws:sns:us-east-1:992382554424:statusupdate', // Replace with your SNS Topic ARN
        };

        try {
            await sns.publish(params).promise();
        } catch (snsError) {
            console.error('Error sending SNS notification:', snsError);
            return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
        }

        return NextResponse.json({
            message: "Grievance status updated successfully",
            success: true,
            grievance
        });

    } catch (error) {
        console.error('Error updating grievance:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
