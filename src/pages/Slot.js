import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Grid } from '@mui/material';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { useNavigate, useParams } from 'react-router-dom';

const generateTimeSlots = () => {
  let slots = [];
  for (let hour = 8; hour < 20; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`, `${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

const schema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date'
    },
    timeSlot: {
      type: 'string',
      enum: generateTimeSlots(),
      title: "Select Time Slot"
    }
  },
  required: ['date', 'timeSlot']
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/date',
      label: 'Reservation Date'
    },
    {
      type: 'Control',
      scope: '#/properties/timeSlot',
      label: 'Time Slot'
    }
  ]
};

export default function Slot() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [data, setData] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelection = (seatNumber) => {
    // Here you can add logic to handle seat selection,
    // such as updating the state or sending data to a backend service.
    console.log(`Seat ${seatNumber} selected`);
  };

  useEffect(() => {
    // Reset selected seats when time slot changes
    setSelectedSeats([]);
  }, [data.timeSlot]);

  return (
    <Container maxWidth="sm" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: '10px auto'
    }}>
      <div style={{ width: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Reserve Seat in Room {roomId}
        </Typography>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setData(data)}
        />
        {data.timeSlot && (
          <Grid container spacing={2} sx={{ marginTop: '20px' }}>
            {Array.from({ length: 15 }, (_, i) => i + 1).map((seatNumber) => (
              <Grid item xs={4} key={seatNumber}>
                <Button 
                  variant="outlined" 
                  onClick={() => handleSeatSelection(seatNumber)}
                  disabled={selectedSeats.includes(seatNumber)} // Disable if seat is selected
                >
                  Seat {seatNumber}
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
        <Button variant="contained" onClick={() => navigate('/')} sx={{ marginTop: '20px' }}>
          Submit Reservation
        </Button>
      </div>
    </Container>
  );
}
