"use client";

import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Grievance {
    _id: string;
    grievanceType: string;
    severity: string;
    status: string;
}

interface Summary {
    total: number;
    submitted: number;
    inProgress: number;
    resolved: number;
    low: number;
    medium: number;
    high: number;
}

const Overview: React.FC = () => {
    const [grievances, setGrievances] = useState<Grievance[]>([]);
    const [summary, setSummary] = useState<Summary>({
        total: 0,
        submitted: 0,
        inProgress: 0,
        resolved: 0,
        low: 0,
        medium: 0,
        high: 0
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/users/assign')
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    console.log('Fetched grievances:', data.grievances);
                    setGrievances(data.grievances);
                    calculateSummary(data.grievances);
                } else {
                    setError(data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching grievances:', error);
                setError('Failed to fetch grievances. Please try again later.');
            });
    }, []);

    const calculateSummary = (grievances: Grievance[]) => {
        const summary = grievances.reduce(
            (acc: Summary, grievance) => {
                acc.total += 1;

                if (grievance.status.toLowerCase() === 'submitted') {
                    acc.submitted += 1;
                } else if (grievance.status.toLowerCase() === 'in progress') {
                    acc.inProgress += 1;
                } else if (grievance.status.toLowerCase() === 'resolved') {
                    acc.resolved += 1;
                }

                if (grievance.severity.toLowerCase() === 'low') {
                    acc.low += 1;
                } else if (grievance.severity.toLowerCase() === 'medium') {
                    acc.medium += 1;
                } else if (grievance.severity.toLowerCase() === 'high') {
                    acc.high += 1;
                }

                return acc;
            },
            {
                total: 0,
                submitted: 0,
                inProgress: 0,
                resolved: 0,
                low: 0,
                medium: 0,
                high: 0
            }
        );
        console.log('Calculated summary:', summary);
        setSummary(summary);
    };

    if (error) {
        return <ErrorMessage>Error: {error}</ErrorMessage>;
    }

    return (
        <Container>
            <Title>Grievance Overview</Title>
            <SummaryContainer>
                <SummaryCard>Total Grievances: {summary.total}</SummaryCard>
                <SummaryCard>Submitted: {summary.submitted}</SummaryCard>
                <SummaryCard>In Progress: {summary.inProgress}</SummaryCard>
                <SummaryCard>Resolved: {summary.resolved}</SummaryCard>
                <SummaryCard>Low Severity: {summary.low}</SummaryCard>
                <SummaryCard>Medium Severity: {summary.medium}</SummaryCard>
                <SummaryCard>High Severity: {summary.high}</SummaryCard>
            </SummaryContainer>
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

const SummaryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 10px;
`;

const SummaryCard = styled.div`
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    flex: 1 1 calc(33% - 20px);
    margin: 10px;
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`;

export default Overview;
