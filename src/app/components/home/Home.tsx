import React from 'react'
import { Button, Container, Typography, Box, Grid, Paper } from '@mui/material';
import Link from 'next/link';
function Home() {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Grievance Management System
        </Typography>
        <Typography variant="h5" gutterBottom>
          Efficiently manage and resolve employee grievances
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              User Authentication
            </Typography>
            <Typography variant="body1" gutterBottom>
              Secure registration and login for employees and administrators.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="/login" passHref>
                <Button variant="contained">Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button variant="outlined" sx={{ ml: 2 }}>Register</Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Grievance Submission
            </Typography>
            <Typography variant="body1" gutterBottom>
              Employees can submit grievances detailing their concerns.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="/grievances" passHref>
                <Button variant="contained">Submit Grievance</Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Admin Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
              View all submitted grievances and assign them for resolution.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="/dashboard" passHref>
                <Button variant="contained">Go to Dashboard</Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home