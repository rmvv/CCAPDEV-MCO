import React, { useState } from 'react';
import { Container, Button, Grid, Typography, TextField, IconButton } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import '../styles/Reserve.css';

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

export default function Reserve() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleRoomSelect = (roomId) => {
    navigate(`/slot/${roomId}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Implement your search logic here
    console.log(`Searching for: ${searchQuery}`);
    // You might want to navigate to a search results page or filter items on the current page
  };

  return (
    <div>
      {/* Sticky Header from Home component */}
      <div className='sticky-header'>
        <div className='left-group'>
          <img src={require('../images/Header-logo.jpg')} alt='Logo' className='header-logo'></img>
          <Link to="/" className='header-link'>
            <h4>DigitalLabs</h4>
          </Link>
          <Link to="/reserve" className='header-link'>
            <h4>Reserve</h4>
          </Link>
        </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          size="small"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          style={{ marginRight: '8px' }}
        />
        <IconButton onClick={handleSearchSubmit}>
          <SearchIcon />
        </IconButton>
      </div>

      <Link to="/profile" className='header-link'>
        <h4>User1234</h4>
      </Link>
    </div>

      {/* Reserve Component Content */}
      <div className='reserve-container'>
        <div className='left-container'>
            <Typography className='title' variant="h1" gutterBottom>
                SELECT A ROOM
            </Typography>
            <TextField
                  className='date'
                  label="Select Date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
            />
        </div>
        <div className='right-container'>
          <Container className='slots' maxWidth="md">
              <Grid container spacing={2}>
                {rooms.map((room) => (
                  <Grid item xs={12} sm={6} md={6} key={room.id}>
                    <Button
                      className={`button ${room.available ? 'available' : 'not-available'}`}
                      variant="outlined"
                      fullWidth
                      onClick={() => handleRoomSelect(room.id)}
                      disabled={!room.available}
                    >
                      Room {room.id} - {room.available ? 'Available' : 'Not Available'}
                    </Button>
                  </Grid>
                ))}
              </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
}
