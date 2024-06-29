"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface GrievanceForm {
  grievanceType: string;
  description: string;
  severity: string;
  documents: string[];
}

const GrievancePage: React.FC = () => {
  const router = useRouter();

  const [grievance, setGrievance] = useState<GrievanceForm>({
    grievanceType: "",
    description: "",
    severity: "Low",
    documents: []
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/grievance", grievance);
      console.log("Successfully submitted grievance", response.data);
      toast.success("Grievance submitted successfully");
      setTimeout(() => {
        router.push("/"); // Redirect to dashboard after successful submission
      }, 1000);
    } catch (error: any) {
      console.error("Failed to submit grievance", error.message);
      toast.error("Failed to submit grievance");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGrievance({ ...grievance, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-5">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">{loading ? "Processing" : "Submit Grievance"}</h1>
        <hr className="mb-6" />
        <div className="mb-4">
          <label htmlFor="grievanceType" className="block text-sm font-medium text-gray-700">Grievance Type</label>
          <input
            type="text"
            id="grievanceType"
            name="grievanceType"
            value={grievance.grievanceType}
            onChange={handleInputChange}
            placeholder="Enter grievance type"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={grievance.description}
            onChange={handleInputChange}
            placeholder="Enter grievance description"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severity</label>
          <select
            id="severity"
            name="severity"
            value={grievance.severity}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="documents" className="block text-sm font-medium text-gray-700">Documents (comma separated)</label>
          <input
            type="text"
            id="documents"
            name="documents"
            value={grievance.documents.join(",")}
            onChange={(e) => setGrievance({ ...grievance, documents: e.target.value.split(",") })}
            placeholder="Attach documents (optional)"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Grievance"}
        </button>
        <Link href="/dashboard" className="block mt-4 text-center text-blue-500 hover:text-blue-700">
          Visit Dashboard
        </Link>
      </div>
    </div>
  );
};

export default GrievancePage;
