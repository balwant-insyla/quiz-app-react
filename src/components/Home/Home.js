import React from 'react';
import clsx from 'clsx'
import  { Container, Grid, Card, CardContent, CardActions, Button, Box, Typography  } from '@material-ui/core';
import Drawers from '../Drawers/Drawers';
import useStyles from './styles';
import Copyright from '../Footer/Copyright/Copyright';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
// import { getPosts } from '../../actions/posts';
// import Posts from '../Posts/Posts';
// import Form from '../Form/Form';
const Home = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { user } = useSelector((state) => state.auth.user); 

  return (
    <div className={classes.root}>
    { user.role === 'student' ? <Navbar /> : <Drawers /> }
    
    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        {user.role === 'student' ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Card className = {classes.cardBox} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Q2 Academy - Online Testing
                  </Typography>
                  <Typography variant="h5" component="h2">
                    MCQ Based Test.
                  </Typography>
                  <Typography variant="body2" component="p">
                    Q2 Academy trying its best to provide you top quality MCQ, which will help you to achieve your goal.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    className={classes.linkButton} 
                    size="large" 
                    color="secondary" 
                    variant="outlined"
                    to="/quiz"
                    component={Link} 
                  >
                      Take Test
                    </Button>
                </CardActions>
              </Card>
              <Card className = {classes.cardBox}  variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Q2 Academy - Online Testing
                </Typography>
                <Typography variant="h5" component="h2">
                  Quiz Report Card
                </Typography>
                <Typography variant="body2" component="p">
                  Check your past performance, which will help you to improve. 
                </Typography>
              </CardContent>
              <CardActions>
                <Button className={classes.linkButton} size="large" color="secondary" variant="outlined">Result</Button>
              </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Card className = {classes.cardBox}  variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Q2 Academy - Online Testing
                </Typography>
                <Typography variant="h5" component="h2">
                  Update your profile.
                </Typography>
                <Typography variant="body2" component="p">
                   Take some time to complete your profile. It will help other to know more about you. 
                   You can also set your display picture.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  className={classes.linkButton} 
                  size="large" 
                  color="secondary" 
                  variant="outlined"
                  to="/profile"
                  component={Link}
                >
                  Profile
                </Button>
              </CardActions>
              </Card>
              <Card className = {classes.cardBox}  variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Q2 Academy - Online Testing
                </Typography>
                <Typography variant="h5" component="h2">
                  More features
                </Typography>
                <Typography variant="body2" component="p">
                  coming soon!
                </Typography>
              </CardContent>
              <CardActions>
                <Button className={classes.linkButton} size="large" color="secondary" variant="outlined">Coming Soon!</Button>
              </CardActions>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
          <Card className = {classes.cardBox} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Q2 Academy - Online Testing
              </Typography>
              <Typography variant="h5" component="h2">
                MCQ Based Test.
              </Typography>
              <Typography variant="body2" component="p">
                Q2 Academy trying its best to provide you top quality MCQ, which will help you to achieve your goal.
              </Typography>
            </CardContent>
            <CardActions>
              <Button className={classes.linkButton} size="large" color="secondary" variant="outlined">Take Test</Button>
            </CardActions>
          </Card>
          <Card className = {classes.cardBox}  variant="outlined">
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Q2 Academy - Online Testing
            </Typography>
            <Typography variant="h5" component="h2">
              Quiz Report Card
            </Typography>
            <Typography variant="body2" component="p">
              Check your past performance, which will help you to improve. 
            </Typography>
          </CardContent>
          <CardActions>
            <Button className={classes.linkButton} size="large" color="secondary" variant="outlined">Result</Button>
          </CardActions>
          </Card>
        </Grid>
          </Grid>
        )}

        <Box pt={4}>
          <Copyright />
        </Box>   
        </Container>
    </main>
    </div>
  );
};

export default Home;
