import React, { useState, useEffect, useCallback } from 'react'
import  { Container, Grid, Paper, Box, FormControl, InputLabel, Select, MenuItem, Typography, Button,
            FormControlLabel, Checkbox, FormGroup, Divider, Chip  } from '@material-ui/core'
import AvTimerIcon from '@material-ui/icons/AvTimer'
import useStyles from './styles'
import Copyright from '../Footer/Copyright/Copyright'
import Navbar from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubjectsName } from '../../actions/subjects'
import { getQuizQuestion } from '../../actions/questions'
import Countdown from 'react-countdown'


const Quiz1 = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSubjectsName())
    }, [])
    
    const { user } = useSelector((state) => state.auth.user)
    const subjects = useSelector((state) => state.subjects)
    const [questions, setQuestions] = useState([])

    //console.log(JSON.stringify(subjects))
    const [error, setError] = useState()
    const [timeout, setTimeout] = useState(false) //
    const [subject, setSubject] = useState('')
    const [level, setLevel]= useState('')
    const [instruction, setInstruction] = useState(false)
    const duration = subject === 'Mathematics'? 'Total Duration 10 Mins' : 'Total Duration 5 Mins'

    const quizRenderer = ({minutes, seconds, completed}) => {
        if (completed) {
            setTimeout(true)
            return (
                <span>Completed!</span>
            )
        } else {
            return (
                <span>
                    {minutes}:{seconds}
                </span>
            )
        }
    }
    const handleLevelChange = (e) => {
        setLevel(e.target.value)
        setInstruction(true)
    }
    const handleSubjectChange = (e) => {
        setSubject(e.target.value)
    }
    const handleSubmit =  async (e) => {
        e.preventDefault()
        try {
            if(!subject || !level) {
                setError('Please choose subject and level for test.')
                console.log(error)
            } else {
                const size = 5
                const questionData = await dispatch(getQuizQuestion(subject, level, size))
                //const questionData = await getQuizQuestion(subject, level, size)
                //setQuestions(data)
                //setQuestions(useSelector((state) => state.questions))
                console.log(JSON.stringify(questionData))
                setError(undefined)
            }
        } catch (err) {
            setError(err)
        }
    }
    
    const handleQuiz = (e) => {
        e.preventDefault()
        setTimeout(true)
    }
    return ( 
        <React.Fragment>
        { user?.role === 'student' ? (
             questions.length > 0 ? (
                 !timeout ? (
                    <div className={classes.root}>
                        <Navbar />
                        <main className={classes.content}>
                            <div className={classes.appBarSpacer} />
                            <Container maxWidth="lg" className={classes.container}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Paper className={classes.paper}>
                                            <div className={classes.questionHeader}> 
                                                <Chip className={classes.questionTimer} variant="outlined" color="primary" 
                                                label={
                                                    <Countdown date = {Date.now()+ 5 * 60000}
                                                    intervalDelay={3}
                                                    precision={3}
                                                    renderer={quizRenderer}
                                                    />
                                                } 
                                                icon={<AvTimerIcon />} />
                                            </div>
                                            <Typography className={classes.questionTitle} component="h6" variant="h6" color="secondary">
                                                    1. Here is an example of customizing the component. You can learn more about Here is an example of customizing the component. You can learn more about 
                                                    Here is an example of customizing the component. You can learn more about    
                                            </Typography>
                                            <Typography className={classes.questionStatementTitle} variant="h6">Consider the following statements</Typography>
                                            <ol className={classes.questionStatementList}>
                                                <li className={classes.questionStatementListItems}>Statement 1</li>
                                                <li className={classes.questionStatementListItems}>Statement 2</li>
                                            </ol>
                                            <Divider className={classes.questionDivider} light />
                                            <FormControl className={classes.questionOptionGroup} component="fieldset">
                                                <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox name="gilad" />}
                                                    label="Gilad Gray"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox name="jason" />}
                                                    label="Jason Killian"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox name="antoine" />}
                                                    label="Antoine Llorca"
                                                />
                                                </FormGroup>
                                            </FormControl>
                                            <Divider className={classes.questionDivider} light />
                                            <div className={classes.questionButtons} >
                                                <Button className={classes.questionPrevButton} variant="contained" color="primary">Prev</Button> 
                                                <Button className={classes.questionNextButton} variant="contained" color="primary">Next</Button>
                                            </div>
                                                <Divider className={classes.questionDivider} light />
                                                <Button className={classes.questionSubmitButton} onClick={handleQuiz} variant="contained" color="secondary">Submit</Button>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Container>
                            <Box pt={4}>
                                <Copyright />
                            </Box>
                        </main>
                    </div>
                 ) : (
                    <div className={classes.root}>
                        <Navbar />
                        <main className={classes.content}>
                            <div className={classes.appBarSpacer} />
                            <Container maxWidth="lg" className={classes.container}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Paper className={classes.paper}>
                                            <Typography variant="h6">Quiz Result.</Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Container>
                            <Box pt={4}>
                                <Copyright />
                            </Box>
                        </main>
                    </div>
                 )
                
             ) : (
                <div className={classes.root}>
                <Navbar />
                <main className={classes.content}>
                     <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography className={classes.instructions} component="h6" variant="subtitle1">
                                    Please read the instructions carefully before starting the test.
                                </Typography>
                                <Paper className={classes.paper}>
                                    <form onSubmit={handleSubmit}>
                                        <FormControl className={classes.formControl}>
                                            <Typography className={classes.chooseTest} component="h6" variant="h6">Choose Test</Typography>
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                                 <InputLabel id="subject-level">Select Subject</InputLabel>
                                                 <Select labelId="subject-level" value={subject} required onClick={handleSubjectChange} id="subject">
                                                    {subjects.map((subject) => (
                                                        <MenuItem key={subject.name} value={subject.name}>{subject.name}
                                                        </MenuItem>
                                                     ))}
                                                </Select>
                                             </FormControl>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="subject-level">Select Level</InputLabel>
                                                <Select labelId="subject-level" value={level} required onClick={handleLevelChange} id="level" >
                                                    <MenuItem value={'Level 0'}>Level 0</MenuItem>
                                                    <MenuItem value={'Level 1'}>Level 1</MenuItem>
                                                    <MenuItem value={'Level 2'}>Level 2</MenuItem>
                                                    <MenuItem value={'Level 3'}>Level 3</MenuItem>
                                                    <MenuItem value={'Level 4'}>Level 4</MenuItem>
                                                    <MenuItem value={'Level 5'}>Level 5</MenuItem>
                                                </Select>
                                            </FormControl>
                                    
                                    { instruction ? (
                                        <React.Fragment>
                                            <Typography className={classes.things} component="h6" variant="subtitle2">
                                                THINGS TO REMEMBER 
                                                <Chip className={classes.instructionButton} label="Total no. of Questions - 5" variant="outlined" />
                                                <Chip className={classes.instructionButton} label={ duration }  variant="outlined" />
                                            </Typography>
                                            <ol>
                                                <li>Before starting the test, please close all the chat windows, screen-saver(s).</li>
                                                <li>Kindly make sure you have a stable internet connection.</li>
                                                <li>Pressing F5 or refreshing your browser at any time during the test will cause it to end immediately.</li>
                                                <li>Try to complete all the questions within time limit.</li>
                                                <li>You are allowed to submit only once, make sure that you have correctly attempted all the questions before submission.</li>
                                            </ol>
                                            {error ? <Typography color="secondary" className={classes.serverValidation} component="h6" variant="subtitle1">{error}</Typography> : null}
                                            <Typography className={classes.proceed} component="h6" variant="subtitle2">
                                                <Button color="secondary" variant="outlined" type="submit">Proceed</Button>
                                            </Typography>
                                        </React.Fragment>
                                    ) : ( null )}
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                     </Container>
                     <Box pt={4}>
                        <Copyright />
                     </Box>
                </main>
            </div>
             )
            
    ) : (
            <div className={classes.root}>
                <Navbar />
                <main className={classes.content}>
                     <div className={classes.appBarSpacer} />
                     <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={classes.paper}>
                                    <Typography variant="h6">Please login as student to take test.</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                     </Container>
                     <Box pt={4}>
                        <Copyright />
                     </Box>
                </main>
            </div>
        
        ) }
    </React.Fragment>  
    )
}

export default Quiz1