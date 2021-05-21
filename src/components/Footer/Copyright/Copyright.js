import React from 'react'
import { Container, Typography, Link } from '@material-ui/core';

import useStyles from './styles'

function Copyright() {
  const classes = useStyles()
    return (
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
              Q2 Testing App
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </footer>
      
    );
  }

  export default Copyright