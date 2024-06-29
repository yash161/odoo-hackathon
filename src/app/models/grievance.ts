import mongoose from "mongoose";


const grievanceSchema = new mongoose.Schema({
    grievanceType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    documents: [String],
    status: {
        type: String,
        enum: ['Submitted', 'In Progress', 'Resolved'],
        default: 'Submitted'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    employee_id: {
        type: Number,
        required : [true],
    }
});


const Grievance = mongoose.models.Grievance || mongoose.model("Grievance",grievanceSchema)

export default Grievance