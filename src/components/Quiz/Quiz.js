import React, { useState, useEffect } from 'react'
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


const Quiz = () => {

    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSubjectsName())
    }, [])
    const resultInitialState = { 
            user: '',
            subject: '', 
            level: '', 
            questions: [{ Id: '', choosenOption: false }],
            correctAnswers: 0,
            marks: 0, //correct answer and marks will be same if there is no negative marking and each question carry 1 mark.
            percentage: 0
        }
    const { user } = useSelector((state) => state.auth.user)
    const subjects = useSelector((state) => state.subjects)
    const tempQuestions = useSelector((state) => state.questions)
    const [questions, setQuestions] = useState(tempQuestions)

    //setQuestions(tempQuestions)
    
    useEffect(() => {
        setQuestions(tempQuestions)
    }, [tempQuestions])

    
    const [resultQuestion, setResultQuestion] = useState([])
    const [result, setResult] = useState(resultInitialState)
    const [index, setIndex] = useState(0)
    const [error, setError] = useState()
    const [timeout, setTimeout] = useState(false) //
    const [subject, setSubject] = useState('')
    const [level, setLevel] = useState('')
    const [instruction, setInstruction] = useState(false)
    const duration = subject === 'Mathematics' ? 'Total Duration 10 Mins' : 'Total Duration 5 Mins' // I will set formula for duration.
    
    const quizRenderer = ({minutes, seconds, completed}) => {
        if (completed) {
            setTimeout(true)
            setQuestions()
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
                await dispatch(getQuizQuestion(subject, level, size))

                setResult({...result, user: user.email, subject, level})

                setError(undefined)
            }
        } catch (err) {
            setError(err)
        }
    }
    function handleOptionCheckbox (e) {

        // setResultQuestion([...resultQuestion, { question: questions[index]._id, 
        //     options: {[e.target.id]: e.target.checked } }])
        
        const currentQuestion = resultQuestion.question.find((id) => id.questions[index]._id === questions[index]._id )

        if(currentQuestion) {
            const currentOption = currentQuestion.options.find((option) => option[e.target.id] === e.target.id)
            if(currentOption) {
                currentOption = {[e.target.id]: e.target.checked } 
                // setResultQuestion([...resultQuestion, { question: questions[index]._id, 
                //     options: [{[e.target.id]: e.target.checked }]
                // }])
            } else {
                // setResultQuestion([...resultQuestion, { question: questions[index]._id, 
                //     options: [{[e.target.id]: e.target.checked }]
                // }])
            }
        } else {
            setResultQuestion([...resultQuestion, { question: questions[index]._id, 
                options: [{[e.target.id]: e.target.checked }]
            }])
        }
        

        

            console.log(e.target.checked)

        //setChoosenOption([...choosenOption, {_id: e.target.id, isChecked: e.target.checked}])
        console.log('result Question ' + JSON.stringify(resultQuestion))
        //setResult({...result, questions: [{Id: questions[index]._id, choosenOption: false }]})
        //console.log('result object at checkbox change ' + JSON.stringify(result))
    }
    const handleQuiz = (e) => {
        e.preventDefault()
        setTimeout(true)
    }
    const handleFirst = () => setIndex(0)
    const handlePrev = () => {
        if(index !== 0)
        {
            setIndex(index - 1)
        }
    }
    const handleNext = () => {
        
        if(index !== questions.length - 1)
        {
            setIndex(index + 1)
        }
    }
    const handleLast = () => setIndex(questions.length - 1)

    console.log('line 115' , resultQuestion)
    
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
                                            <form>
                                            <div className={classes.questionHeader}> 
                                                <Chip className={classes.questionTimer} variant="outlined" color="primary" 
                                                label={
                                                    <Countdown date = {Date.now()+ 3 * 60000}
                                                    intervalDelay={3}
                                                    precision={3}
                                                    renderer={quizRenderer}
                                                    />
                                                } 
                                                icon={<AvTimerIcon />} />
                                            </div>
                                            <Typography className={classes.questionTitle} component="h6" variant="h6" color="secondary">
                                                    <strong>{index + 1}. </strong> {questions[index].description}
                                            </Typography>
                                            { questions[index].statements.length > 0 ? (
                                                <React.Fragment>
                                                    <Typography className={classes.questionStatementTitle} variant="h6">Consider the following statements</Typography>
                                                    <ol className={classes.questionStatementList}>
                                                    {questions[index].statements.map((statement) => (
                                                        <li key={statement._id} className={classes.questionStatementListItems}>{statement.text}</li>
                                                    ))}
                                                    </ol>
                                                </React.Fragment>
                                            ): ( null )}
                                            
                                            <Divider className={classes.questionDivider} light />
                                            <FormControl className={classes.questionOptionGroup} component="fieldset">
                                                <FormGroup>
                                                { questions[index].options.map((option, i) => {
                                                        const temp = resultQuestion.find((result) => result.question === questions[index]._id)
                                                        let isChecked = temp ? temp.options[option._id] : false;
                                                        //let isChecked = temp ? temp.options.find((id) => id.[option._id] === questions[index].options._id) : false;
                                                       return (
                                                        <FormControlLabel 
                                                        key={option._id}
                                                        control={<Checkbox id={option._id} key={option._id} name={'option-'+questions[index]._id} checked={isChecked} onChange={handleOptionCheckbox} />}
                                                        label={option.text}
                                                    />
                                                    ) 
                                                })}
                                                </FormGroup>
                                            </FormControl>
                                            <Divider className={classes.questionDivider} light />
                                            <div className={classes.questionButtons} >
                                                <Button className={classes.questionPrevButton} disabled={ index === 0 ? true: false} onClick={handleFirst} variant="contained" color="primary">First</Button> 
                                                <Button className={classes.questionPrevButton} disabled={ index === 0 ? true: false} onClick={handlePrev} variant="contained" color="primary">Prev</Button> 
                                                <Button className={classes.questionNextButton} disabled={ index === questions.length-1 ? true: false} onClick={handleNext} variant="contained" color="primary">Next</Button>
                                                <Button className={classes.questionNextButton} disabled={ index === questions.length-1 ? true: false} onClick={handleLast}variant="contained" color="primary">Last</Button>
                                            </div>
                                                <Divider className={classes.questionDivider} light />
                                                <div className={classes.questionSubmitButtonDiv}>
                                                    <Button className={classes.questionSubmitButton} onClick={handleQuiz} variant="contained" color="secondary">Submit</Button>
                                                </div>
                                                
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
                    <div className={classes.appBarSpacer} />    
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

export default Quiz