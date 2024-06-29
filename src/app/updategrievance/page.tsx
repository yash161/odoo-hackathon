"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const UpdateGrievanceForm: React.FC = () => {
    const [grievanceType, setGrievanceType] = useState<string>('');
    const [grievanceTypes, setGrievanceTypes] = useState<string[]>([]);
    const [employeeIds, setEmployeeIds] = useState<number[]>([]);
    const [employeeId, setEmployeeId] = useState<string>('');
    const [status, setStatus] = useState<string>('Submitted');
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        // Fetch grievance types from the server
        const fetchGrievanceTypes = async () => {
            try {
                const response = await axios.get('/api/users/grievancetype');
                setGrievanceTypes(response.data.grievanceTypes);
            } catch (error) {
                console.error('Error fetching grievance types:', error.response?.data || error.message);
            }
        };

        fetchGrievanceTypes();
    }, []);

    useEffect(() => {
        if (grievanceType) {
            // Fetch employee IDs from the server based on selected grievance type
            const fetchEmployeeIds = async () => {
                try {
                    const response = await axios.get('/api/users/getid', {
                        params: { grievanceType }
                    });
                    setEmployeeIds(response.data.employeeIds);
                } catch (error) {
                    console.error('Error fetching employee IDs:', error.response?.data || error.message);
                }
            };

            fetchEmployeeIds();
        }
    }, [grievanceType]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.put('/api/users/updategrievance', {
                employee_id: employeeId,
                status: status,
            });

            setMessage('Grievance status updated successfully'); // Set success message
            setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
            console.log('Grievance status updated successfully:', response.data);
        } catch (error) {
            setMessage('Error updating grievance status'); // Set error message
            setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
            console.error('Error updating grievance status:', error.response?.data || error.message);
        }
    };

    const handleGrievanceTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setGrievanceType(e.target.value);
        setEmployeeId(''); // Reset employee ID when grievance type changes
        setEmployeeIds([]); // Clear employee IDs when grievance type changes
    };

    const handleEmployeeIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setEmployeeId(e.target.value);
    };

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Update Grievance Status</h2>
                {message && (
                    <div className={`mb-4 text-center p-2 ${message.includes('Error') ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                        {message}
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="grievanceType" className="block text-gray-700 mb-2">Grievance Type:</label>
                    <select
                        id="grievanceType"
                        value={grievanceType}
                        onChange={handleGrievanceTypeChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Select a grievance type</option>
                        {grievanceTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="employeeId" className="block text-gray-700 mb-2">Employee ID:</label>
                    <select
                        id="employeeId"
                        value={employeeId}
                        onChange={handleEmployeeIdChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!grievanceType}
                    >
                        <option value="" disabled>Select an employee ID</option>
                        {employeeIds.map(id => (
                            <option key={id} value={id}>{id}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="status" className="block text-gray-700 mb-2">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={handleStatusChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Submitted">Submitted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Update Status
                </button>
            </form>
        </div>
    );
};

export default UpdateGrievanceForm;
