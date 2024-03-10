import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';

import '../styles/Profile.css'
import registerBackground from '../images/registerBackground.jpg';

import { Link } from 'react-router-dom';

const Profile = () => {
  // Hardcoded user information and reservations
  const userProfile = {
    description: "I am a Software Developer that teaches Advanced Programming.",
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

    /*
      this.name: name;
      this.description: description;
      this.imageUrl: imageUrl;
      this.reservations: reservations[]; 
    
    
    */
  };

  // Edit Reservation Button
  const handleEditReservation = (reservationId) => {
    // Implement your edit reservation logic here
    console.log(`Edit reservation clicked for ID: ${reservationId}`);
  };

  const handleDeleteAcct = () => {
    // Implement your edit reservation logic here
    console.log(`Account is deleted.`);
  };

  const handleLogOut = () => {
    // Implement your edit reservation logic here
    console.log(`You have logged out.`);
  };

  return (
    <Container class="profile-container">
    
      <Container class="left-align">
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>

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

            <Typography gutterBottom variant="h5" component="div" className='profile-name'>
              About Me
            </Typography>

            <Typography gutterBottom variant="body" component="div" color='#fafafa'>
            {userProfile.description}
            </Typography>
          </CardContent>
        </Card>

        <Container>
          <Button variant="contained" component={Link} to="/"
            className = 'design-button' style={{marginBottom: '20px'}}>
            Delete Account
          </Button>

          <Button variant="contained" component={Link} to="/login"
            className = 'design-button' style={{marginBottom: '20px'}}>
            Log-Out
          </Button>

          <Button variant="contained" component={Link} to="/"
            className = 'design-button' style={{marginBottom: '20px'}}>
            Back To Home
          </Button>
          <Button variant="contained" component={Link} to="/profile"
            className = 'design-button' style={{marginBottom: '20px'}}>
            Edit Profile
          </Button>
        </Container>

      </Container>

      <Container class="right-align">
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
                      className = 'design-button'>
                        Edit Reservation
                      </Button>


                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};

export default Profile;