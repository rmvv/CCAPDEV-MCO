// pages/index.js
import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { useNavigate } from "react-router-dom";

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
    <Container maxWidth="sm" style={{margin:'10px'}}>
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
      <Button variant="contained" onClick={()=>{
        navigate('/');
      }}>Login</Button>
    </Container>
  );
}
