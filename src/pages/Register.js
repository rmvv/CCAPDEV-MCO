import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import {
  Container,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useUser } from '../components/UserContext';
import { useSnackbar } from 'notistack';
import '../styles/Register.css';
import registerBackground from '../images/registerBackground.jpg';

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    dlsuEmail: {
      type: 'string',
      format: 'email',
      pattern: '^[a-zA-Z0-9._%+-]+@dlsu.edu.ph$',
    },
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

const BackgroundBox = styled(Box)({
  backgroundImage: `url(${registerBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '50vw',
});

export default function Register() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [data, setData] = React.useState({});
  const { enqueueSnackbar } = useSnackbar();


  const handleSubmit = async () => {
    try {
      const submission = await fetch('http://localhost:3001/api/create/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      console.log(submission);
      const reply = await submission.json();

      if (reply && reply.success) {
        enqueueSnackbar('Register successful!', { variant: 'success' });
        navigate('/login');
      } else {
        enqueueSnackbar(reply.message);
      }
    } catch (e) {
      console.log(e)
    }
  }
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
          <Button variant="contained" sx={{ bgcolor: '#087830', '&:hover': { bgcolor: '#065f23' } }} onClick={handleSubmit}>
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
