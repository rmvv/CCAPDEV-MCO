import React from 'react';
import { AppBar, Toolbar, Container, Box, Button, TextField, IconButton, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
function CustomAppBar({ handleOpenUserMenu, handleCloseUserMenu, anchorElUser,}) {
  const navigate = useNavigate();

  // const handleReserveSeatClick = () => {
  //   console.log("Profile: ", user.profile.username);
  //   if (user.profile.username === 'admin') {
  //     navigate('/adminReserve');
  //   } else {
  //     navigate('/reserve');
  //   }
  // };

  const { user } = useUser();

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={require('../images/Header-logo.jpg')} alt="Logo" style={{ marginRight: '20px', width: '50px', borderRadius: '50%' }} />
            <Button component={Link} to="/" color="inherit">DigitalLabs</Button>
            <Button component={Link} to="/reserve" color="inherit">Reserve</Button>
          </Box>
          <Button color="inherit" onClick={handleOpenUserMenu}>{user.profile.name}</Button>
          <Menu
            sx={{ mt: '45px' }}
            id="user-menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem component={Link} to="/profile" onClick={handleCloseUserMenu}>Profile</MenuItem>
            <MenuItem component={Link} to="/reserve" onClick={handleCloseUserMenu}>Reserve</MenuItem>
            <MenuItem component={Link} to="/login" onClick={handleCloseUserMenu}>Logout</MenuItem>
          </Menu>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;
