import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';

import '../styles/Profile.css'

import { Link, useParams } from 'react-router-dom';
import { useUser } from '../components/UserContext';

import { useEffect } from 'react';

import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [userProfile, setUserProfile] = React.useState(user.profile);
  const [reservations, setReservations] = React.useState([]);


  const handleLogOut = () => {
    setUser({ profile: {}, token: '' });
    navigate('/login');

  };

  const deleteReservation = async (reservationId) => {
    try {
      const response = await fetch(`/api/delete/reservation/${reservationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': user.token
        },
      });
      const json = await response.json();
      if (json.success) {
        enqueueSnackbar('Reservation deleted successfully', { variant: 'success' });
        setReservations(reservations.filter(reservation => reservation._id !== reservationId));
      }
    } catch (error) {
      console.log('Error deleting reservation:', error.message);
      enqueueSnackbar(`Error deleting reservation: ${error.message}`, { variant: 'error' });
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch('/api/search/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': user.token
        },
        body: JSON.stringify({ username: user.profile.username }),
      });
      console.log(response);
      const reply = await response.json();
      if (reply && reply.success) {
        setReservations(reply.result);
      } else {
        enqueueSnackbar(reply.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteAccount = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!isConfirmed) {
      return; 
    }
    try {
      const response = await fetch('/api/delete/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': user.token
        },
      });
      console.log(response);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.success) {
        enqueueSnackbar('Account Successfully Deleted', { variant: 'success' });
        setUser({ profile: {}, token: '' });
        navigate('/login');
      } else {
        enqueueSnackbar(result.message || 'Failed To Delete Account', { variant: 'error'});
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      enqueueSnackbar('Error deleting account', { variant: 'error' });
    }
  };  

  return (
    <Container class="profile-container">

      <div class="left-align">
        <Typography variant="h4" gutterBottom marginLeft={'auto'} marginRight={'auto'}>
          Profile
        </Typography>

        <Card className='profile-box'>
          <CardMedia
            className='profile-pic'
            component="img"
            image={userProfile.imageUrl}
            alt="Profile Image"
          />
          <CardContent className='card-content'>
            <Typography gutterBottom variant="h5" component="div" className='profile-name'>
              {userProfile.name}
            </Typography>

            <Typography gutterBottom variant="h6" component="div" className='profile-name' style={{ marginTop: '20px' }}>
              About Me
            </Typography>

            <Typography gutterBottom variant="body" component="div" className='profile-description'>
              {userProfile.description}
            </Typography>
          </CardContent>

          <div>
            <Button variant="contained" onClick={() => navigate('/EditProfile/' + user.profile._id)}
              className='design-button' style={{ marginBottom: '20px' }}>
              Edit Profile
            </Button>
            <Button variant="contained" onClick={() => deleteAccount()}
              className='design-button' style={{ marginBottom: '20px' }}>
              Delete Account
            </Button>

            <Button variant="contained" component={Link} to="/login"
              className='design-button' style={{ marginBottom: '20px' }}>
              Log-Out
            </Button>

            <Button variant="contained" component={Link} to="/"
              className='design-button' style={{ marginBottom: '20px' }}>
              Back To Home
            </Button>
          </div>

        </Card>

      </div>

      <div className="right-align">
        <Card className='reserve-box' style={{ backgroundColor: "#087830" }}>
          <CardContent>
            <Typography variant="h6" color="#fafafa">
              Reservations:
            </Typography>
            <Grid container spacing={2}>
              {reservations.map((reservation) => (
                <Grid item xs={12} key={reservation._id}>
                  <Card variant="outlined">
                    <CardContent>
                      {reservation.anonReservation ? (
                        <>
                          <Typography variant="h6">Room: Anonymous</Typography>
                          <Typography color="text.secondary">Date: Anonymous</Typography>
                          <Typography color="text.secondary">Time: Anonymous</Typography>
                          <Typography color="text.secondary">Seat: Anonymous</Typography>
                        </>
                      ) : (
                        <>
                          <Typography variant="h6">Room: {reservation.room}</Typography>
                          <Typography color="text.secondary">Date: {reservation.date}</Typography>
                          <Typography color="text.secondary">Time: {reservation.time}</Typography>
                          <Typography color="text.secondary">Seat: {reservation.seat}</Typography>
                        </>
                      )}

                      <Button variant="contained" onClick={() => navigate('/reservation/' + reservation._id)}
                        className='design-button'>
                        Edit Reservation
                      </Button>

                      <Button variant="contained" onClick={() => deleteReservation(reservation._id)}
                        className='design-button'>
                        Delete Reservation
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
  );
};

export default Profile;