import React, { useState } from 'react';
import {
  Container,
  Button,
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomAppBar from '../components/CustomAppBar'; 
import bgGreen from '../images/bg_green.jpg'; 
import bgGreen3 from '../images/bg_green3.jpg'; 

const rooms = [
  { id: 1, available: true },
  { id: 2, available: true },
  { id: 3, available: true },
  { id: 4, available: true },
  { id: 5, available: true },
  { id: 6, available: true },
  { id: 7, available: true },
  { id: 8, available: true },
  { id: 9, available: true },
  { id: 10, available: true },
];

const greenColor = '#087830'; 

export default function Reserve() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleRoomSelect = (roomId) => {
    navigate(`/slot/${roomId}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <CustomAppBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
        handleOpenUserMenu={handleOpenUserMenu}
        handleCloseUserMenu={handleCloseUserMenu}
        anchorElUser={anchorElUser}
        name="John Doe"
      />

      <Grid container spacing={2} sx={{ p: 2, display: 'flex', minHeight: '100vh' }}>
        <Grid item xs={12} md={6} sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 5,
          width: '40%', minHeight: '100vh', backgroundSize: 'cover', backgroundImage: `url(${bgGreen3})`
        }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', width: '90%' }}>
            SELECT A ROOM
          </Typography>
          <TextField
            label="Select Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            sx={{ 
              mt: 2, 
              backgroundColor: greenColor, 
              '&:hover': { backgroundColor: '#065a23' }, // Darker shade of green for hover
              color: '#ffffff' 
            }} 
            onClick={() => navigate('/')}
          >
            Cancel Reservation
          </Button>
        </Grid>
        <Grid item xs={12} md={6} sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 5,
          width: '60%', minHeight: '100vh', backgroundSize: 'cover', backgroundImage: `url(${bgGreen})`
        }}>
          <Container maxWidth="md" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {rooms.map((room) => (
                <Grid item xs={12} sm={6} md={4} key={room.id}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleRoomSelect(room.id)}
                    disabled={!room.available}
                    sx={{
                      borderColor: 'transparent',
                      color: greenColor,
                      backgroundColor: '#ffffff',
                      '&:hover': {
                        backgroundColor: greenColor,
                        color: '#ffffff',
                      },
                    }}
                  >
                    Room {room.id} - {room.available ? 'Available' : 'Not Available'}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
