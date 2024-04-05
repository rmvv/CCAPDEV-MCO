import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

import bgGreen from '../images/bg_green.jpg';
import bgGreen3 from '../images/registerBackground.jpg';

import { useSnackbar } from 'notistack';
import { useUser } from '../components/UserContext'; 

const schema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
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
      scope: '#/properties/password'
    },
  ],
};

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [data, setData] = React.useState({});
  const [errors, setErrors] = React.useState([]);
  const { setUser } = useUser();

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
            onChange={(rep) => {
              let { data, errors } = rep;
              setData(data);
              setErrors(errors);
            }}
          />
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#087830', color: 'white', '&:hover': { backgroundColor: '#065a23' } }}
            onClick={async () => {
              if(errors && errors.length>0){
                for(let i=0;i<errors.length;i++){
                  enqueueSnackbar(errors[i]);
                }
                return;
              }
              const hashedPassword = CryptoJS.SHA256(data.password).toString(CryptoJS.enc.Hex);
              const loginData = {
                ...data,
                password: hashedPassword,
              };

              try{
                const response = await fetch('/api/login?rnd='+ new Date(), {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },    
                  body: JSON.stringify(loginData),
                });
                console.log(response);
                const reply = await response.json();
                if(reply && reply.success){
                  setUser(reply.result);
                  navigate('/');
                } else {
                  enqueueSnackbar(reply.message);
                }
              }catch(e){
                console.log(e);
              }
              
            }}
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
