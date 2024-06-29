"use client";

import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Grievance {
    _id: string;
    grievanceType: string;
    description: string;
    severity: string;
    status: string;
    isAssgined: string;
}

const GrievanceList: React.FC = () => {
    const [grievances, setGrievances] = useState<Grievance[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/users/assign')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setGrievances(data.grievances);
                } else {
                    setError(data.message);
                }
            })
            .catch(error => setError(error.message));
    }, []);

    const handleAssign = (id: string, department: 'HR' | 'Marketing') => {
        fetch('/api/users/assign', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, department })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setGrievances(prevGrievances =>
                    prevGrievances.map(grievance =>
                        grievance._id === id ? { ...grievance, isAssgined: department } : grievance
                    )
                );
                alert(`Grievance assigned to ${department}`);
            } else {
                setError(data.message);
            }
        })
        .catch(error => setError(error.message));
    };

    if (error) {
        return <ErrorMessage>Error: {error}</ErrorMessage>;
    }

    return (
        <Container>
            <Title>Grievance List</Title>
            {grievances.length === 0 ? (
                <NoGrievances>No grievances found.</NoGrievances>
            ) : (
                grievances.map(grievance => (
                    <GrievanceCard key={grievance._id}>
                        <GrievanceType>Type: {grievance.grievanceType}</GrievanceType>
                        <Description>Description: {grievance.description}</Description>
                        <Severity>Severity: {grievance.severity}</Severity>
                        <Status>Status: {grievance.status}</Status>
                        <AssignedTo>Assigned To: {grievance.isAssgined}</AssignedTo>
                        <ButtonContainer>
                            <Button onClick={() => handleAssign(grievance._id, 'HR')}>Assign to HR</Button>
                            <Button onClick={() => handleAssign(grievance._id, 'Marketing')}>Assign to Marketing</Button>
                        </ButtonContainer>
                    </GrievanceCard>
                ))
            )}
        </Container>
    );
};

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    font-size: 2em;
    color: #333;
`;

const NoGrievances = styled.p`
    text-align: center;
    color: #888;
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`;

const GrievanceCard = styled.div`
    background: #f9f9f9;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const GrievanceType = styled.p`
    font-weight: bold;
    color: #333;
`;

const Description = styled.p`
    color: #555;
`;

const Severity = styled.p`
    color: ${props => (props.children.includes('High') ? 'red' : props.children.includes('Medium') ? 'orange' : 'green')};
`;

const Status = styled.p`
    color: #555;
`;

const AssignedTo = styled.p`
    color: #555;
`;

const ButtonContainer = styled.div`
    margin-top: 10px;
`;

const Button = styled.button`
    background: #0070f3;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
        background: #005bb5;
    }
`;

export default GrievanceList;
