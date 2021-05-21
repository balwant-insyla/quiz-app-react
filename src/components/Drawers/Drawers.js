import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Drawer, AppBar,Avatar, Toolbar, IconButton, Badge, Divider, Popper, Grow, Paper, MenuItem, MenuList, ClickAwayListener } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { AdminListItems, StudentListItems } from './listItems'
import { baseURL } from '../../constants/baseURL'
import logo from '../../images/q2-logo.png'
import useStyles from './styles';
import { logout } from '../../actions/auth'

const Drawers = () => {
    const dispatch = useDispatch();
    //const location = useLocation();
    const history = useHistory();
    const avatarBaseURL = baseURL+'/uploads/'
    const { user, token } = useSelector((state) => state.auth.user) //Current logged in user data
    //console.log('Drawer' + JSON.stringify(user))
    const classes = useStyles()
    const [open, setOpen] = useState(true)

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
    // logout from app
    const handleLogout = async (e) => {
      //e.preventDefault()
      try {
        await dispatch(logout(history))
        history.push('/')
        
        
      } catch (err) {

      }
    }
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setPopperOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(popperOpen);
    React.useEffect(() => {
      if (prevOpen.current === true && popperOpen === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = popperOpen;
    }, [popperOpen]);
    // profile menu end
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    return (
        <div>
        {token ? (
          <div>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.brandContainer}>
                <img className={classes.image} src={logo} alt="icon" height="60" />
            </div>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
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
                    <MenuItem to="/profile" component={Link} onClick={handleClose}>Profile</MenuItem>
                    <MenuItem to="" component={Link} onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
              </div>
            
          
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {
            user?.role === 'admin' ? (<AdminListItems />) : (<StudentListItems />)
          }
          
          <Divider />
          
        </Drawer>
        </div> 
        ) : ( null ) }
        </div>
        
    )
}

export default Drawers