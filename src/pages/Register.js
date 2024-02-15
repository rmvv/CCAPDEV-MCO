import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";

import '../styles/Register.css'
import registerBackground from '../images/registerBackground.jpg';

const schema = {
  type: 'object',
  properties: {
    firstname: {type: 'string'},
    lastname: {type: 'string'},
    dlsuEmail: { 
      type: 'string',
      format: 'email',
      pattern: '^[a-zA-Z0-9._%+-]+@dlsu.edu.ph$'
    },
    username: {type: 'string'},
    password: { type: 'string', format: 'password' },
    confirmPassword: { type: 'string', format: 'password' },
  },
  required: ['firstname', 'lastname', 'dlsuEmail', 'username', 'password', 'confirmPassword'],
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/firstname',
    },
    {
      type: 'Control',
      scope: '#/properties/lastname',
    },
    {
      type: 'Control',
      scope: '#/properties/dlsuEmail',
      label: 'DLSU Email'
    },
    {
      type: 'Control',
      scope: '#/properties/username',
    },
    {
      type: 'Control',
      scope: '#/properties/password',
      label: 'Password'
    },
    {
      type: 'Control',
      scope: '#/properties/confirmPassword',
      label: 'Confirm Password'
    },
  ],
};

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});

  return (
    <div className='main-container'>
       <div className="left-div" style={{ backgroundImage: `url(${registerBackground})` }}></div>
      <Container maxWidth="sm" className='right-div'>
        <div className='content'>
          <h1>Register Account</h1>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
          />
          <Button className="greenButton" variant="contained" style={{marginTop: '20px'}} onClick={() => navigate('/login')}>
            Register
          </Button>
          </div>
      </Container>
    </div>
  );
}
