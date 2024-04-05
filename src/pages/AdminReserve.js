import React, { useState } from 'react';
import {
  Container,
  Button,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomAppBar from '../components/CustomAppBar';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { useSnackbar } from 'notistack';
import { useUser } from '../components/UserContext';


import bgGreen from '../images/bg_green.jpg';

const generateOptions = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => (start + index).toString());
};
const generateTimeSlots = () => {
    let slots = [];
    for (let hour = 8; hour < 20; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`, `${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
};

const adminReserveSchema = {
    title: "Reserve a Room",
    type: "object",
    required: ["username", "date", "room", "seat", "timeSlot"],
    properties: {
        _id: {
            type: "string",
            title: "ID",
            readOnly: true
        },
        username: {
            type: "string",
            title: "Username"
        },
        date: {
            type: "string",
            format: "date",
            title: "Reservation Date"
        },
        room: {
            type: "string",
            title: "Select Room",
            enum: generateOptions(1, 10)
        },
        seat: {
            type: "string",
            title: "Select Seat",
            enum: generateOptions(1, 30)
        },
        time: {
            type: "string",
            title: "Select Time Slot",
            enum: generateTimeSlots()
        },
        anonReservation: { 
            type: "boolean",
            title: "Anonymous Reservation",
            description: "Check this box if you want a anonymous reservation."
        }
    }
};

const adminReserveUISchema = {
    type: 'VerticalLayout',
    elements: [
        { type: 'Control', scope: '#/properties/username', label: 'Username' },
        { type: 'Control', scope: '#/properties/date', label: 'Reservation Date' },
        { type: 'Control', scope: '#/properties/room', label: 'Room' },
        { type: 'Control', scope: '#/properties/seat', label: 'Seat' },
        { type: 'Control', scope: '#/properties/time', label: 'Time Slot' },
        { type: 'Control', scope: '#/properties/anonReservation', label: 'Opt for Anonymous Reservation?' }
    ]
};

const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
  },
});

export default function Reserve() {
  const { user } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [data, setData] = useState({});

  const greenColor = '#087830';

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSubmit = async () => {
    console.log(data.room, data.seat, data.time);
    try {
      const searchCriteria = {
        date: data.date,
        room: data.room,
        seat: data.seat,
        time: data.time
      }
      console.log("Search Criteria:", searchCriteria);
      const searchResponse = await fetch('/api/searchDetails/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': user.token
        },
        body: JSON.stringify(searchCriteria)
      });

      const searchResult = await searchResponse.json();

      console.log("Search Result:", searchResult);
      if(searchResult.result.length > 0) {
        enqueueSnackbar('Reservation Already Exists!', { variant: 'warning' });
        return;
      }

      const submission = await fetch('/api/create/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': user.token
        },
        body: JSON.stringify(data)
      });
      console.log(submission);

      const reply = await submission.json();

      if (reply && reply.success) {
        enqueueSnackbar('Reservation successful!', { variant: 'success' });
        navigate('/');
      } else {
        enqueueSnackbar(reply.message);
      }
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        backgroundSize: 'cover',
        backgroundImage: `url(${bgGreen})`,
        minHeight: '100vh',
        width: '100%'
      }}>
        <CustomAppBar
          handleOpenUserMenu={handleOpenUserMenu}
          handleCloseUserMenu={handleCloseUserMenu}
          anchorElUser={anchorElUser}
        />
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: '#ececec', p: 2, borderRadius: '16px', width: '100%', mt: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'left' }}>
              YOUR RESERVATION
            </Typography>
            <JsonForms
              schema={adminReserveSchema}
              uischema={adminReserveUISchema}
              data={data}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ data }) => setData(data)}
            />
            <Button onClick={handleSubmit} variant="contained" sx={{
              mt: 2,
              backgroundColor: greenColor,
              color: 'white',
              '&:hover': {
                backgroundColor: '#065a23',
              }
            }}
            >Submit Reservation
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}