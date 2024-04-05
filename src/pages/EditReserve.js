import React, { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Typography,
    Box,
    ThemeProvider,
    createTheme,
    CssBaseline
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
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

export default function EditReserve() {
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { user } = useUser();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [data, setData] = useState(null);

    const greenColor = '#087830';

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const getReservationData = async () => {
        try {
            const response = await fetch(`/api/get/reservation/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': user.token
                },
            });
            const json = await response.json();
            console.log('received', json);
            if (json.success) {
                setData(json.result);
            } else {
                enqueueSnackbar('Failed to fetch reservation data', { variant: 'error' });
                navigate(-2);
            }
        } catch (e) {
            console.error('Error fetching reservation:', e);
            enqueueSnackbar('Error fetching reservation data', { variant: 'error' });
        }
    };

    useEffect(() => {
        console.log('id detected', id);
        getReservationData();
    }, [id]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/update/reservation/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': user.token
                },
                body: JSON.stringify(data),
            });
            const reply = await response.json();
            if (reply && reply.success) {
                enqueueSnackbar('Reservation updated successfully', { variant: 'success' });
                navigate('/');
            } else {
                enqueueSnackbar('Failed to update reservation', { variant: 'error' });
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{
                backgroundSize: 'cover',
                backgroundImage: `url(${bgGreen})`,
                minHeight: '100vh',
                width: '100%',
            }}>
                <CustomAppBar
                    handleOpenUserMenu={handleOpenUserMenu}
                    handleCloseUserMenu={handleCloseUserMenu}
                    anchorElUser={anchorElUser}
                />
                <Container maxWidth="sm">
                    <Box sx={{ bgcolor: '#ececec', p: 2, borderRadius: '16px', width: '100%', mt: 8 }}>
                        <Typography variant="h4" gutterBottom sx={{ textAlign: 'left' }}>
                            Edit Your Reservation
                        </Typography>
                        <JsonForms
                            schema={reservationSchema}
                            uischema={reservationUISchema}
                            data={data}
                            renderers={materialRenderers}
                            cells={materialCells}
                            onChange={({ data }) => setData(data)}
                        />
                        <Button onClick={()=>{
                            handleSubmit(data);
                        }} variant="contained"> Save Changes</Button>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

