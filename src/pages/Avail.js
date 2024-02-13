import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { Container, Button} from '@mui/material';

import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
const schema = {
    type: 'object',
    properties: {
        date: {
            type: 'string',
            format: 'date'
        },
        timeSlot: {
            type: 'string',
            enum: ['Morning', 'Afternoon', 'Evening']
        },
        seat: {
            type: 'string',
            description: 'Number of Seats',
            minimum: 1,
            maximum: 10
        }
    },
    required: ['date', 'timeSlot', 'seat']
};

const uischema = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Control',
            scope:'#/properties/date',
            label: 'Reservation Date'
        },
        {
            type: 'Control',
            scope:'#/properties/timeSlot',
            label: 'Time Slot'
        },
        {
            type: 'Control',
            scope:'#/properties/seat',
            label: 'Number of Seats'
        }
    ]
};

export default function Avail() {
    const navigate = useNavigate();
    const [data, setData] = React.useState({});
    const { roomId } = useParams();

    return (
      <Container maxWidth="sm" style={{margin:'10px'}}>
        {roomId}
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
        }}>Avail</Button>
      </Container>
    );
  }
  
  //   import React, { useState } from 'react';
//   import { JsonForms } from '@jsonforms/react';
//   import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
//   import { Container, Button} from '@mui/material';
  
//   import { useNavigate } from "react-router-dom";
  
//   const schema = {
//       type: 'object',
//       properties: {
//           schedules: {
//               type: 'array',
//               items: {
//                   type: 'object',
//                   properties: {
//                       date: {
//                           type: 'string',
//                           format: 'date'
//                       },
//                       timeSlot: {
//                           type: 'string',
//                           enum: ['Morning', 'Afternoon', 'Evening']
//                       },
//                       seat: {
//                           type: 'string',
//                           description: 'Number of Seats',
//                           minimum: 1,
//                           maximum: 10
//                       }
//                   },
//                   required: ['date', 'timeSlot', 'seat']
//               }
//           }
//       }
//   };
  
//   const uischema = {
//       type: 'VerticalLayout',
//       elements: [
//           {
//               type: 'Control',
//               scope:'#/properties/schedules',
//               label: 'Schedules'
//           }
//       ]
//   };
  
//   export default function Avail() {
//       const navigate = useNavigate();
//       const [data, setData] = React.useState({});
    
//       return (
//         <Container maxWidth="sm" style={{margin:'10px'}}>
//           <JsonForms
//             schema={schema}
//             uischema={uischema}
//             data={data}
//             renderers={materialRenderers}
//             cells={materialCells}
//             onChange={({ data, _errors }) => {
//               console.log(data);
//               setData(data);
//             }}
//           />
//           <Button variant="contained" onClick={()=>{
//             navigate('/');
//           }}>Avail</Button>
//         </Container>
//       );
//     }
    
  
  

