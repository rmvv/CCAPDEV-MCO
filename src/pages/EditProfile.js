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


import bgGreen from '../images/bg_green.jpg';

const schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      dlsuEmail: { type: 'string', format: 'email', pattern: '^[a-zA-Z0-9._%+-]+@dlsu.edu.ph$' },
      username: { type: 'string' },
      password: { type: 'string', format: 'password' },
      description: { type: 'string' },
      imageURL: { type: 'string' },
    },
    required: ['name', 'dlsuEmail', 'username', 'password', 'description'],
  };
  
  const uischema = {
    type: 'VerticalLayout',
    elements: [
      { type: 'Control', scope: '#/properties/name' },
      { type: 'Control', scope: '#/properties/dlsuEmail', label: 'DLSU Email' },
      { type: 'Control', scope: '#/properties/username' },
      { type: 'Control', scope: '#/properties/password', label: 'Password' },
      { type: 'Control', scope: '#/properties/description' },
      { type: 'Control', scope: '#/properties/imageURL' },
    ],
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
            const response = await fetch(`/api/get/user/${id}`, {
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
                enqueueSnackbar('Failed to fetch profile data', { variant: 'error' });
                navigate(-2);
            }
        } catch (e) {
            console.error('Error fetching Profile:', e);
            enqueueSnackbar('Error fetching Profiel data', { variant: 'error' });
        }
    };

    useEffect(() => {
        console.log('id detected', id);
        getReservationData();
    }, [id]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/update/user/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': user.token
                },
                body: JSON.stringify(data),
            });
            const reply = await response.json();
            if (reply && reply.success) {
                enqueueSnackbar('Profile updated successfully', { variant: 'success' });
                navigate('/');
            } else {
                enqueueSnackbar('Failed to update Profile', { variant: 'error' });
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
                            Edit Your Profile
                        </Typography>
                        <JsonForms
                            schema={schema}
                            uischema={uischema}
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

