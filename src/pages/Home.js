import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import '../styles/Home.css';

export default function Home() {
  // const [isDropdownVisible, setisDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Implement your search logic here
    console.log(`Searching for: ${searchQuery}`);
    // You might want to navigate to a search results page or filter items on the current page
  };

  return (
  <div>
    <div className='sticky-header'>
      <div className='left-group'>
        <img src={require('../images/Header-logo.jpg')} alt='Logo' className='header-logo'></img>
        <Link to="/" className='header-link'>
          <h4>DigitalLabs</h4>
        </Link>
        <Link to="/reserve" className='header-link'>
          <h4>Reserve</h4>
        </Link>
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

      <Link to="/profile" className='header-link'>
        <h4>User1234</h4>
      </Link>
    </div>
  </div>
  );
}


// {/* {Array.from({ length:100 }).map((_, index) => (
//         <p key={index}>Scroll down content {index + 1}</p>
//       ))} */}