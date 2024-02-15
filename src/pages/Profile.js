import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

const Profile = () => {
  // Hardcoded user information and reservations
  const userProfile = {
    name: "John Doe",
    imageUrl: "https://example.com/profile-pic.jpg", // Replace with your image URL or local path
    reservations: [
      { id: 1, date: "2024-02-22", time: "10:00 AM", description: "Lab Work" },
      { id: 2, date: "2024-02-23", time: "1:00 PM", description: "Work" },
      { id: 3, date: "2024-02-24", time: "1:00 PM", description: "Activity" },
      { id: 4, date: "2024-02-25", time: "1:00 PM", description: "Lesson" },
      { id: 5, date: "2024-02-26", time: "1:00 PM", description: "Lesson" },
      // Add more reservations as needed
    ],
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <CardMedia
          component="img"
          height="140"
          image={userProfile.imageUrl}
          alt="Profile Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userProfile.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reservations:
          </Typography>
          <Grid container spacing={2}>
            {userProfile.reservations.map((reservation) => (
              <Grid item xs={12} key={reservation.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{reservation.description}</Typography>
                    <Typography color="text.secondary">Date: {reservation.date}</Typography>
                    <Typography color="text.secondary">Time: {reservation.time}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
