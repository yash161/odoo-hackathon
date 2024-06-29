"use client";

import React from 'react';
import { Button, Container, Typography, Box, Grid, Paper, Avatar } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpdateIcon from '@mui/icons-material/Update';
import DashboardIcon from '@mui/icons-material/Dashboard';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[6],
  },
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: theme.spacing(7),
  height: theme.spacing(7),
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const AdminDashboard: React.FC = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h3" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="h5" gutterBottom>
          Efficiently manage and resolve employee grievances
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ mt: 8 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <IconWrapper>
              <UpdateIcon />
            </IconWrapper>
            <Typography variant="h6" gutterBottom>
              Update Grievance Status
            </Typography>
            <Typography variant="body1" gutterBottom>
              Update the status of grievances efficiently.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="/updategrievance" passHref>
                <Button variant="contained">Update Status</Button>
              </Link>
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <IconWrapper>
              <VisibilityIcon />
            </IconWrapper>
            <Typography variant="h6" gutterBottom>
              View Grievances
            </Typography>
            <Typography variant="body1" gutterBottom>
              View all submitted grievances in detail.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="/viewgrievance" passHref>
                <Button variant="contained">View Grievances</Button>
              </Link>
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <IconWrapper>
              <AssignmentIcon />
            </IconWrapper>
            <Typography variant="h6" gutterBottom>
              Assign Grievances
            </Typography>
            <Typography variant="body1" gutterBottom>
              Assign grievances to appropriate personnel.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="/assign-grievances" passHref>
                <Button variant="contained">Assign Grievances</Button>
              </Link>
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <IconWrapper>
              <DashboardIcon />
            </IconWrapper>
            <Typography variant="h6" gutterBottom>
              View Overview
            </Typography>
            <Typography variant="body1" gutterBottom>
              Get an overview of all grievance activities.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="/overview" passHref>
                <Button variant="contained">View Overview</Button>
              </Link>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;