import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";

const schema = {
  type: 'object',
  properties: {
    dlsuEmail: { 
      type: 'string',
      format: 'email',
      pattern: '^[a-zA-Z0-9._%+-]+@dlsu.edu.ph$'
    },
    password: { type: 'string', format: 'password' },
  },
  required: ['dlsuEmail', 'password'],
};

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/dlsuEmail',
      label: 'DLSU Email'
    },
    {
      type: 'Control',
      scope: '#/properties/password',
      label: 'Password'
    },
  ],
};

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});

  return (
    <Container maxWidth="sm" style={{ margin: '10px' }}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      <Button variant="contained" style={{marginTop: '20px'}} onClick={() => navigate('/login')}>Register</Button>
    </Container>
  );
}
