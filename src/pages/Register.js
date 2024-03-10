import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'; // Import Typography for text
import Box from '@mui/material/Box'; // Import Box for layout
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles'; // For custom styling

import '../styles/Register.css';
import registerBackground from '../images/registerBackground.jpg';

const schema = {
  type: 'object',
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    dlsuEmail: {
      type: 'string',
      format: 'email',
      pattern: '^[a-zA-Z0-9._%+-]+@dlsu.edu.ph$',
    },
    username: { type: 'string' },
    password: { type: 'string', format: 'password' },
    confirmPassword: { type: 'string', format: 'password' },
  },
  required: ['firstname', 'lastname', 'dlsuEmail', 'username', 'password', 'confirmPassword'],
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/firstname' },
    { type: 'Control', scope: '#/properties/lastname' },
    { type: 'Control', scope: '#/properties/dlsuEmail', label: 'DLSU Email' },
    { type: 'Control', scope: '#/properties/username' },
    { type: 'Control', scope: '#/properties/password', label: 'Password' },
    { type: 'Control', scope: '#/properties/confirmPassword', label: 'Confirm Password' },
  ],
};

const BackgroundBox = styled(Box)({
  backgroundImage: `url(${registerBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '50vw', 
});

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});

  return (
    <Box className="main-container" display="flex">
      <BackgroundBox className="left-div" />
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
        <Box className="content" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Register Account
          </Typography>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
          />
          <Button variant="contained"  sx={{ bgcolor: '#087830', '&:hover': { bgcolor: '#065f23' } }} onClick={() => navigate('/login')}>
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
