import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, Popper, Grow, Paper, Avatar, MenuItem, MenuList, ClickAwayListener } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { baseURL } from '../../constants/baseURL'
import logo from '../../images/q2-logo.png'
import useStyles from './styles';
import { logout } from '../../actions/auth'



const Navbar = () => {
  //const [user, setUser] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { user, token } = useSelector((state) => state.auth.user) 
  const avatarBaseURL = baseURL+'/uploads/'


  // profile menu start
  const [popperOpen, setPopperOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setPopperOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setPopperOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setPopperOpen(false);
    }
  }
  const handleLogout = async () => {

    try {
      await dispatch(logout(history))
    } catch(err) {

    }
  }
  

  return ( token ? (
    <div>
      <CssBaseline />
      <AppBar className={classes.appBar} position="absolute">
        <div className={classes.brandContainer}>
          <img className={classes.image} src={logo} alt="icon" height="60" />
        </div>
        <div ref={anchorRef} aria-controls={popperOpen ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle} className={classes.profile}>
          <Avatar className={classes.blue} alt={user?.name} src={avatarBaseURL + user?.avatar}>{user?.name.charAt(0)}</Avatar>
          <Popper open={popperOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper className={classes.paperPopper}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={popperOpen} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem to="/home" component={Link} onClick={handleClose}>Home</MenuItem>
                      <MenuItem to="/profile" component={Link} onClick={handleClose}>Profile</MenuItem>
                      <MenuItem to="/quiz" component={Link} onClick={handleClose}>Quiz</MenuItem>
                      <MenuItem to="/redirect" component={Link} onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
           )}
          </Popper>
        </div>
    </AppBar>
  </div>
  ) : ( null)
    
  );
};

export default Navbar;
