import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import CustomAppBar from '../components/CustomAppBar'; 
import '../styles/Home.css';

import { useNavigate } from "react-router-dom";
import { useUser } from '../components/UserContext';

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if(user && user.profile && user.profile.name){
    }else{
      navigate('/login');
    }
  }, []);

  const handleReserveSeatClick = () => {
    console.log("Profile: ", user.profile.username);
    if (user.profile.username === 'admin') {
      navigate('/adminReserve'); 
    } else {
      navigate('/reserve');
    }
  };

  return (
    <>
      <CustomAppBar
        handleOpenUserMenu = {handleOpenUserMenu}
        handleCloseUserMenu = {handleCloseUserMenu}
        anchorElUser = {anchorElUser}
      />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>Welcome to the Digital Labs!</Typography>
        <Typography paragraph>
          DigitalLabs is an innovative seat reservation system designed specifically for students at De La Salle University (DLSU).
          It offers a user-friendly interface that simplifies the process of finding and reserving seats within various study areas and
          labs across the campus. With its intuitive design and easy-to-navigate features, DigitalLabs ensures that DLSU students can
          efficiently plan their study sessions, book seats in advance, and maximize their academic productivity in comfortable and
          conducive learning environments. This system is tailored to meet the unique needs of the DLSU community, providing a seamless
          and hassle-free reservation experience.
        </Typography>
        <img src={require('../images/Header-logo.jpg')} alt='Logo' className='body-logo'></img>
        <br></br>
        <Button
          variant="contained"
          onClick={handleReserveSeatClick}
          sx={{ mt: 2, bgcolor: '#087830', '&:hover': { bgcolor: '#065f23' } }} 
        >
          Reserve a Seat
        </Button>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={require('../images/member1.jpg')}
                alt="Member 1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Bea Claire Sollesta / Developer
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={require('../images/member2.jpg')}
                alt="Member 2"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Bianca Clarizze Sollesta / Developer
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={require('../images/member3.jpg')}
                alt="Member 3"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ysabela Erika Alvarez / Developer
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={require('../images/member4.jpg')}
                alt="Member 4"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Raine Miguel Villaver / Developer
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}> 
          <Typography variant="h5" gutterBottom>
            Don't have an account?
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            to="/register" 
            sx={{ bgcolor: '#087830', '&:hover': { bgcolor: '#065f23' } }} 
          >
            Register Here
          </Button>
        </Box>
      </Container>
    </>
  );
}
