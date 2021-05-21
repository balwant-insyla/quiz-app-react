import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import clsx from 'clsx'
//import PropTypes from 'prop-types'
import  { 
    Container, 
    Grid, 
    Paper, 
    Box, 
    Typography, 
    Button, 
    TextField

  } from '@material-ui/core'
import Drawers from '../Drawers/Drawers'
import useStyles from './styles'
import Copyright from '../Footer/Copyright/Copyright'
import  { getSubjects, addSubject, editSubject} from '../../actions/subjects'
import EnhancedTable  from './DataTable'
const initialState = { name: '', description: ''}

const Subject = () => {

    
    
    const [form, setForm] = useState(initialState);
    const [error, setError] = useState();
    const [subject, setSubject] = useState(initialState)
    //const [name, setName] = useState()
    //const [description, setDescription] = useState()
    const dispatch = useDispatch()
    const classes = useStyles()

    //const accessToken = JSON.parse(localStorage.getItem('user')).token
    //console.log(accessToken)
    //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    useEffect(() => {
        dispatch(getSubjects())
    }, []) // to get all the subjects from database we have to use useEffect hook otherwise blank data will load.

    const { user } = useSelector((state) => state.auth.user) //Current logged in user data
    

   // console.log('I am here ' +JSON.stringify(subjects)) //checking all the subjects

    
    
   const callback = (edit) => {
    //console.log('Callback' + JSON.stringify(edit))   
    setSubject(edit)
    }
    useEffect(() => {
        setForm({...form, name: subject.name, description: subject.description })
    },[subject])
    //console.log('outside ' + JSON.stringify(subject))
    console.log('outside ' + JSON.stringify(form))
    // if(editSubject) {
    //     setName(editSubject.name)
    //     setDescription(editSubject.description)
    // }
    

    const handleSubmit = async (e) => {
        
      e.preventDefault();
      try {
          if(subject._id) {
                await dispatch(editSubject(subject._id, form))
                alert('Subject Updated!')
          } else {
            await dispatch(addSubject(form))
            alert('Subject Added!')
          }
        
        
        
        handleClear()
      } catch (err) {
          setError(err.message)
      }
     }
    const handleClear = async (e)=>{
        //e.preventDefault();
        setForm(initialState)
        setSubject(initialState)
        //e.target.reset()
    }
    const handleNameChange = (e) => {
       // setName(e.target.value)
        setForm({ ...form, name: e.target.value })
        //console.log(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        //setDescription(e.target.value)
        setForm({ ...form, description: e.target.value })
        //console.log(e.target.value)
    }
    
  return (
    <div className={classes.root}>
    <Drawers />
    { user.role === 'admin' ? (
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={4} lg={4}>
        <Paper>
            <Typography className={classes.subHeading} component="h2" variant="h5" color="secondary">
               { subject._id ? ('Update Subject') : ('Add Subject')}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField className={classes.input} value={form.name} name="name" id="name" onChange={handleNameChange} label="Subject" autoFocus required fullWidth variant="outlined" />
                <TextField className={classes.input} value={form.description} name="description" id="description" onChange={handleDescriptionChange} multiline rows={4} fullWidth label="Subject Description" required  variant="outlined" />
                {error && <Typography className={classes.serverValidation} component="h1" variant="subtitle1">{error}</Typography>}
                <Button type="submit" fullWidth  variant="contained" color="primary" className={classes.submit}>
                { subject._id ? ('Update Subject') : ('Add Subject')}
                </Button>
                <Button fullWidth  variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
            </form>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} lg={8}>
        <Paper>
          <EnhancedTable editSubjectCallback={callback} />
        </Paper>
        </Grid>
        </Grid>
        <Grid container spacing={3}>
        
        </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
        </Container>
    </main>
    ) : (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Typography component="h2" variant="h6" color="secondary" gutterBottom>
                    Unauthorized access!
                </Typography>
                <Box pt={4}>
                    <Copyright />
                </Box>
            </Container>
        </main>
    
    )}
    
    </div>
  );
};

export default Subject;
