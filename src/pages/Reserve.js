import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { Container, Button, Grid, Typography } from '@mui/material';

import { useNavigate } from "react-router-dom";

const rooms = [
    { id: 1, available: true },
    { id: 2, available: true },
    { id: 3, available: true },
    { id: 4, available: true },
    { id: 5, available: true },
    { id: 6, available: true },
    { id: 7, available: true },
];

export default function Reserve() {
    const navigate = useNavigate();
  
    const handleRoomSelect = (roomId) => {
      navigate(`/avail/${roomId}`);
    };
  
    return (
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Select a Room
        </Typography>
        <Grid container spacing={2}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Button
                variant="outlined"
                color={room.available ? 'primary' : 'secondary'}
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
    );
  }

