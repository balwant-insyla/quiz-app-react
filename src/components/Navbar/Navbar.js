import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';

import logo from '../../images/q2-logo.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
const Navbar = () => {
  //const [user, setUser] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.authData)
  console.log(user)
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    //setUser(null);
  };

  useEffect(() => {
    console.log(user)
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    //setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        
        <img className={classes.image} src={logo} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.token && (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.user.name} src={user?.imageUrl}>{user?.user.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.user.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) 
      }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
