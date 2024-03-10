import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Button,
  Typography,
  Grid,
  TextField,
  IconButton,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import CustomAppBar from '../components/CustomAppBar'; 

import bgGreen from '../images/bg_green.jpg'; 
import bgGreen3 from '../images/bg_green3.jpg'; 

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
    date: { type: 'string', format: 'date' },
    timeSlot: { type: 'string', enum: generateTimeSlots(), title: "Select Time Slot" }
  },
  required: ['date', 'timeSlot']
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/date', label: 'Reservation Date' },
    { type: 'Control', scope: '#/properties/timeSlot', label: 'Time Slot' }
  ]
};

export default function Slot() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [data, setData] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showText, setShowText] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSelectedSeats([]);
    setShowText(!(data.date && data.timeSlot));
  }, [data.date, data.timeSlot]);

  return (
    <>
      <CustomAppBar
        searchQuery={searchQuery}
        handleSearchChange={(event) => setSearchQuery(event.target.value)}
        handleSearchSubmit={() => console.log(`Searching for: ${searchQuery}`)}
        name="John Doe"
      />
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ width: '40%', backgroundImage: `url(${bgGreen3})`, backgroundSize: 'cover', p: 3 }}>
          <Typography variant="h5" gutterBottom>Reserve Seat in Room {roomId}</Typography>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
          />
        </Box>
        <Box sx={{ width: '60%', backgroundImage: `url(${bgGreen})`, backgroundSize: 'cover', p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {showText ? (
            <Typography>Please select a date and time slot.</Typography>
          ) : (
            <Grid container spacing={2}>
              {Array.from({ length: 15 }, (_, i) => i + 1).map((seatNumber) => (
                <Grid item xs={4} key={seatNumber}>
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedSeats(prev => [...prev, seatNumber])}
                    disabled={selectedSeats.includes(seatNumber)}
                  >
                    Seat {seatNumber}
                  </Button>
                </Grid>
              ))}
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate('/')}
              >
                Submit Reservation
              </Button>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}
