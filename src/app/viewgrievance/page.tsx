"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import styled from "styled-components";

interface User {
  _id: string;
  grievanceType: string;
  description: string;
  severity: string;
  documents: string[];
  status: string;
  createdAt: string;
}

const FetchUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/grievancestatus"); // Ensure this matches your API endpoint
        setUsers(response.data.users);
        setLoading(false);
        toast.success("Users fetched successfully!");
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred");
        setLoading(false);
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <Title>Users List</Title>
      <UserList>
        {users.map((user) => (
          <UserItem key={user._id}>
            <UserInfo><strong>ID:</strong> {user._id}</UserInfo>
            <UserInfo><strong>Grievance Type:</strong> {user.grievanceType}</UserInfo>
            <UserInfo><strong>Description:</strong> {user.description}</UserInfo>
            <UserInfo><strong>Severity:</strong> {user.severity}</UserInfo>
            <UserInfo><strong>Status:</strong> {user.status}</UserInfo>
            <UserInfo><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</UserInfo>
            <UserInfo><strong>Documents:</strong> {user.documents.join(", ")}</UserInfo>
            <Divider />
          </UserItem>
        ))}
      </UserList>
      <BackLink href="/">Back to Home</BackLink>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  background: #f9f9f9;
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.p`
  margin: 5px 0;
`;

const Divider = styled.hr`
  margin: 20px 0;
`;

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #0070f3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default FetchUsers;
