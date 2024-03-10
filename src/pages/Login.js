import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

// Assuming the path adjustments as necessary
import bgGreen from '../images/bg_green.jpg';
import bgGreen3 from '../images/registerBackground.jpg';

const schema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string', format: 'password' },
  },
  required: ['username', 'password'],
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/username',
    },
    {
      type: 'Control',
      scope: '#/properties/password',
    },
  ],
};

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Container */}
      <Box
        className="left-container"
        sx={{
          width: '40%',
          minHeight: '100vh',
          backgroundImage: `url(${bgGreen3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Right Container */}
      <Box
        className="right-container"
        sx={{
          width: '60%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${bgGreen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="xs" sx={{ textAlign: 'center', backgroundColor: 'rgba(255, 255, 255)', borderRadius: '8px', padding: '20px' }}>
          <Typography variant="h4" gutterBottom component="div">
            Login
          </Typography>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data, _errors }) => setData(data)}
          />
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#087830', color: 'white', '&:hover': { backgroundColor: '#065a23' } }}
            onClick={() => navigate('/')}
          >
            Login
          </Button>
          <br></br>
          <Button
            variant="text"
            sx={{ mt: 1 }}
            onClick={() => navigate('/register')}
          >
            Don't have an account? Register
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
