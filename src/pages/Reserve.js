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
import { reservationSchema, reservationUISchema } from '../schemas/reservationSchema';

import bgGreen from '../images/bg_green.jpg';

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
  const [data, setData] = useState({
    username: user.profile.username || ''
  });

  const greenColor = '#087830';

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSubmit = async () => {

    try {
      const submission = await fetch('http://localhost:3001/api/create/reservation', {
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
              schema={reservationSchema}
              uischema={reservationUISchema}
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
            >Submit Reservation</Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
