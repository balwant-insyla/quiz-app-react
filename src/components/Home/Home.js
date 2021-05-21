import React from 'react';
import clsx from 'clsx'
import  { Container, Grid, Paper, Box, Typography  } from '@material-ui/core';
import Drawers from '../Drawers/Drawers'
import useStyles from './styles'
import Copyright from '../Footer/Copyright/Copyright'
//import { useSelector } from 'react-redux'

// import { getPosts } from '../../actions/posts';
// import Posts from '../Posts/Posts';
// import Form from '../Form/Form';

const Home = () => {
  const classes = useStyles()
  const accessToken = JSON.parse(localStorage.getItem('user')).token
  console.log(accessToken)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  // const [currentId, setCurrentId] = useState(0);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  return (
    <div className={classes.root}>
    <Drawers />
    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
            <Typography variant="h1" component="h2" gutterBottom>
            Home
          </Typography>
            </Paper>
          </Grid>
        </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
        </Container>
    </main>
    </div>
  );
};

export default Home;
