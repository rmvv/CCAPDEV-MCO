// pages/index.js
import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { useNavigate } from "react-router-dom";
import '../styles/Register.css';
import registerBackground from '../images/registerBackground.jpg';

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
    <div className='main-container'>
      <div className="left-div" style={{ backgroundImage: `url(${registerBackground})` }}></div>
      <Container className='right-div' maxWidth="sm">
      <div className='content'>
        <h1>Login</h1>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, _errors }) => {
            console.log(data);
            setData(data);
          }}
        />
        <Button className="greenButton" variant="contained" style={{marginTop: '20px'}} onClick={()=>{
          navigate('/');
        }}>Login</Button>
        <Button variant="text" onClick={() => 
          navigate('/register')} style={{marginTop: '10px'}}>Don't have an account? Register</Button>
      </div>
      </Container>
    </div>
    
  );
}
