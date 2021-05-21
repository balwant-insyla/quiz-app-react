import React, { useState  } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Avatar, Button, Paper, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
//import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

//import Icon from './icon';
import { signin, signup } from '../../actions/auth';
//import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', mobile: '', email: '', password: '', confirmPassword: '', error: '' };

const SignUp = () => {
  
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {

  //async function handleSubmit(e) {
    e.preventDefault();
    //setError(null)
    //console.log(`my error before ${form.error}`)
    try {
      if (isSignup) {
        await dispatch(signup(form, history))
        
       } else {
        await dispatch(signin(form, history));
        
       }
       //setError(null)
    } catch (e) {
      //console.log(e)
      setError(e.message)
      
      console.log(e.message)
      //alert(error)
      
    } 
  }
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container maxWidth="lg">
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          { isSignup && (
          <>
            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            <Input name="mobile" label="Mobile" handleChange={handleChange} type="mobile" />
          </>
          )}
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
          { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
        </Grid>
        {error && <Typography className={classes.serverValidation} component="h1" variant="subtitle1">{error}</Typography>}
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          { isSignup ? 'Sign Up' : 'Sign In' }
        </Button>
        
        <Grid container justify="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
            </Button>
          </Grid>
        </Grid>
      </form>
        </div>
      </Grid>
    </Grid>
    </Container>
  );
};

export default SignUp;
