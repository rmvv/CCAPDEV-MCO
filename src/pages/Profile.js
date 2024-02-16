import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';

import '../styles/Profile.css'
import registerBackground from '../images/registerBackground.jpg';



const Profile = () => {
  // Hardcoded user information and reservations
  const userProfile = {
    name: "John Doe",
    imageUrl: registerBackground, // Replace with your image URL or local path
    reservations: [
      { id: 1, date: "2024-02-22", time: "10:00 AM", description: "Lab Work" },
      { id: 2, date: "2024-02-23", time: "1:00 PM", description: "Work" },
      { id: 3, date: "2024-02-24", time: "1:00 PM", description: "Activity" },
      { id: 4, date: "2024-02-25", time: "1:00 PM", description: "Lesson" },
      { id: 5, date: "2024-02-26", time: "1:00 PM", description: "Lesson" },
      // Add more reservations as needed
    ],
  };


  // Edit Reservation Button
  const handleEditReservation = (reservationId) => {
    // Implement your edit reservation logic here
    console.log(`Edit reservation clicked for ID: ${reservationId}`);
  };

  return (
    <div class="profile-container">
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        
        <div class="left-align">
          <Card className='profile-box'> 
            <CardMedia
              className='profile-pic'
              style={{marginTop: "25px"}}
              component="img"
              height="140"
              image={userProfile.imageUrl}
              alt="Profile Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" className='profile-name'>
                {userProfile.name}
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div class="right-align">
          <Card className='reserve-box'>
            <CardContent>
              <Typography variant="h6" color="#fafafa">
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
                        

                        {/*Button for Edit Reservation*/ }
                        <Button variant="contained" onClick={() => handleEditReservation(reservation.id)}
                        className = 'reserve-button'>
                          Edit Reservation
                        </Button>


                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
          </div>
      </Container>
  </div>
  );
};

export default Profile;