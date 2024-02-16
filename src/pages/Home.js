import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import '../styles/Home.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div>
      <div className="container">
        <div className='sticky-header'>
          <div className='left-group'>
            <img src={require('../images/Header-logo.jpg')} alt='Logo' className='header-logo'></img>
            <Link to="/" className='header-link'><h4>DigitalLabs</h4></Link>
            <Link to="/reserve" className='header-link'><h4>Reserve</h4></Link>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              style={{ marginRight: '8px' }}
            />
            <IconButton onClick={handleSearchSubmit}>
              <SearchIcon />
            </IconButton>
          </div>

          <Link to="/profile" className='header-link'><h4>User1234</h4></Link>
        </div>
      </div>
      
      <div className='content'>
        <h1>Welcome to the Digital Labs!</h1>
        <p>
          DigitalLabs is an innovative seat reservation system designed specifically for students at De La Salle University (DLSU). 
          It offers a user-friendly interface that simplifies the process of finding and reserving seats within various study areas and 
          labs across the campus. With its intuitive design and easy-to-navigate features, DigitalLabs ensures that DLSU students can 
          efficiently plan their study sessions, book seats in advance, and maximize their academic productivity in comfortable and 
          conducive learning environments. This system is tailored to meet the unique needs of the DLSU community, providing a seamless 
          and hassle-free reservation experience.
        </p>
      </div>
    </div>
    
  );
}
