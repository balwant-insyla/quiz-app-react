import React, { useState } from 'react'
import  { Container, Grid, Paper, Box, FormControl, InputLabel, Select, MenuItem,
    TextField, Typography, Button  } from '@material-ui/core';
import Drawers from '../Drawers/Drawers'
import useStyles from './styles'
import Copyright from '../Footer/Copyright/Copyright'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../actions/auth'
import ProfileImage from './ProfileImage'
import Navbar from '../Navbar/Navbar'
// import { getPosts } from '../../actions/posts';
// import Posts from '../Posts/Posts';
// import Form from '../Form/Form';

const Profile = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user)


//   useEffect(() => {
//       dispatch(getProfile())
//   }, [])
  //let updateUser = { name:'', email: '', mobile: '',displayName: '', address: '', city: '', state: '', country: '', zipCode: '' }
  
  const updateUser = {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      displayName: user.displayName,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
      zipCode:user.zipCode
  }

  const [error, setError] = useState(null)
  const [form, setForm] = useState(updateUser)
  const [editProfile, setEditProfile] = useState(false)

  //console.log('Form data '+ JSON.stringify(form))

  const handleUpdateProfile = (e) => {
      e.preventDefault()
      setEditProfile(true)
  }
  const handleViewProfile = (e) => {
    e.preventDefault()
    setEditProfile(false)
}
const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
}
const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await dispatch(updateProfile(form))
        alert('Profile Updated successfully!')
        setEditProfile(false)
        //setForm(updateUser)
    } catch (err) {

        console.log('Error' + err.message)

        setError(err.message)
    }
}
 
 
  return (
    <div className={classes.root}>
    { user.role === 'student' ? <Navbar /> : <Drawers /> }
    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={4}>
                     <Paper className={classes.paper}>
                        <Typography variant="h4" component="h4" color="secondary"  gutterBottom>
                        Hi {user.name} </Typography>
                        <ProfileImage />
                    </Paper> 
                    </Grid>
                    { !editProfile ? (
                        <React.Fragment>
                        <Grid item xs={12} md={8} lg={8}>
                        <Paper className={classes.paper}>
                        <Typography variant="h5" component="h6" color="secondary" gutterBottom>
                            Profile - <Button onClick={handleUpdateProfile} variant="outlined" color="primary">Update Profile</Button> </Typography>
                            <Typography variant="h6" component="h6" gutterBottom>
                            Basic Information </Typography>
                            <Typography variant="subtitle1" component="subtitle1" gutterBottom>
                                Name: {user.name} </Typography>
                            <Typography variant="subtitle1" component="subtitle1" gutterBottom>
                                Email: {user.email} </Typography>
                            { user.mobile ?  <Typography variant="subtitle1" component="subtitle1" gutterBottom>
                                Mobile: {user.mobile} </Typography> : null }
                            { user.displayName ?  <Typography variant="subtitle1" component="subtitle1" gutterBottom>
                                Display Name: {user.displayName} </Typography> : null }
                                <Typography variant="h6" component="h6" gutterBottom>
                                Address Information</Typography>
                                { user.address ? <Typography variant="subtitle1" component="subtitle1" gutterBottom>
                                    address: {user.address} </Typography> : null }
                                { user.city ? <Typography variant="subtitle1" component="subtitle1" gutterBottom>
                                    City: {user.city} </Typography> : null }
                                { user.state ? <Typography variant="subtitle1" component="subtitle1" gutterBottom>
                                    State: {user.state} </Typography> : null }
                                { user.country ? <Typography variant="subtitle1" component="subtitle1" gutterBottom>
                                    Country: {user.country} </Typography> : null } 
                                { user.zipCode ? <Typography variant="subtitle1" component="subtitle1" gutterBottom>
                                    Zip Code: {user.zipCode} </Typography> : null }
                        </Paper>   
                    </Grid>
                    </React.Fragment>
                    ) : (
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h6" color="secondary" gutterBottom>
                                Update Profile  - <Button onClick={handleViewProfile} variant="outlined" color="primary">View Profile</Button></Typography>
                                <form className={classes.form} onSubmit={handleSubmit}>
                                    <TextField className={classes.input} name="name" value={form.name} onChange={handleChange} fullWidth label="Name" required  variant="outlined" />
                                    <TextField className={classes.input} name="email" type="email" value={form.email} onChange={handleChange} fullWidth label="Email" required  variant="outlined" />
                                    <TextField className={classes.input} name="mobile" type="text" value={form.mobile} onChange={handleChange} fullWidth label="Mobile" variant="outlined" />
                                    <TextField className={classes.input} name="displayName" type="text" value={form.displayName} onChange={handleChange} fullWidth label="Display Name" variant="outlined" />
                                    <TextField className={classes.input} name="address" value={form.address} onChange={handleChange} multiline rows={4} fullWidth label="Address"  variant="outlined" />
                                    <TextField className={classes.input} name="city" value={form.city} onChange={handleChange} type="text" fullWidth label="City" variant="outlined" />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="state-level">Select State</InputLabel>
                                        <Select 
                                        labelId="state-level" 
                                        value ={form.state}
                                        onChange={handleChange}
                                        fullWidth
                                        name="state"
                                        >
                                            <MenuItem value={'Himachal Pradesh'}>Himachal Pradesh</MenuItem>
                                            <MenuItem value={'Punjab'}>Punjab</MenuItem>
                                            <MenuItem value={'Chandigarh'}>Chandigarh</MenuItem>
                                            <MenuItem value={'Haryana'}>Haryana</MenuItem>
                                            <MenuItem value={'Ladhakh'}>Ladhakh</MenuItem>
                                            <MenuItem value={'Jammu Kashmir'}>Jammu Kashmir</MenuItem>
                                            <MenuItem value={'Other'}>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="country-level">Select Country</InputLabel>
                                        <Select 
                                        labelId="country-level"
                                        value={form.country}
                                        onChange={handleChange}
                                        fullWidth
                                        name="country"
                                        >
                                            <MenuItem value={'India'}>India</MenuItem>
                                            <MenuItem value={'Nepal'}>Nepal</MenuItem>
                                            <MenuItem value={'Bhutan'}>Bhutan</MenuItem>
                                            <MenuItem value={'Canada'}>Canada</MenuItem>
                                            <MenuItem value={'United State'}>United State</MenuItem>
                                            <MenuItem value={'Other '}>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField className={classes.input} name="zipCode" value={form.zipCode} onChange={handleChange} type="text" fullWidth label="Zip Code" variant="outlined" />
                                    {error ? <Typography className={classes.serverValidation} component="h1" variant="subtitle1">{error}</Typography> : null}
                                    <Button type="submit" fullWidth  variant="contained" color="primary" className={classes.submit}>
                                        Update Profile
                                    </Button>
                                </form>
                            </Paper>
                        </Grid>
                    )}
                    
            </Grid>
            
        </Container>
        <Box pt={4}>
        <Copyright />
      </Box>
    </main>
    </div>
  );
};

export default Profile
