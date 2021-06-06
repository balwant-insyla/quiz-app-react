import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import Drawers from '../Drawers/Drawers'
import useStyles from './styles'
import Copyright from '../Footer/Copyright/Copyright'
import  { Container, Grid, Paper, Box, Typography, Select,
     MenuItem, FormControl, InputLabel, TextField, Button, Checkbox } from '@material-ui/core'
import { editQuestion } from '../../actions/questions'
import { fetchSubjectsName } from "../../actions/subjects";

const QuestionEdit = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [form, setForm] = useState();
    const [error, setError] = useState()
    
    useEffect(() => {
        dispatch(fetchSubjectsName());
      }, []);
    const { user } = useSelector((state) => state.auth.user) //Current logged in user data
    const questions = useSelector((state) => state.questions)
    const subjects = useSelector((state) => state.subjects)
    const questionId = props.match.params.id

    var question = undefined
    //console.log(questionId)
    //const [options, setOptions] = useState({})
    question =  questions.find((q) => q._id === questionId)
    
    const [subject, setSubject] = useState(question.subject)
    const [level, setLevel] = useState(question.level)
    const [description, setDescription] = useState(question.description)
    const [statements, setStatements] = useState(question.statements)
    const [options, setOptions] = useState(question.options)
    
    //console.log(JSON.stringify(question.statements))

    //if(question) setOptions(question[0].options)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(editQuestion(questionId, form))
            alert('Question Updated!')
        } catch(e) {
            setError(e.message)
        }
        handleClear()
        //console.log(JSON.stringify(form))
    }
    const handleClear = () => {
        setForm()
    }

    /* Statement sections start */
    
    function handleStatementChange(i, e)  {
        const newStatements = [...statements]
        newStatements[i].text = e.target.value
        setStatements(newStatements)
        setForm({...form, statements: newStatements })
    }
    function handleStatementAdd() {
        const newStatements = [...statements]
        newStatements.push({ text: undefined })
        setStatements(newStatements)
    }
    function handleStatementRemove(i) {
        const newStatements = [...statements]
        newStatements.splice(i, 1)
        setStatements(newStatements)
    }
    /* Statement sections end */

    /* options sections start */

    const handleOptionAdd = () => {
        const newOptions = [...options]
        newOptions.push({ text: undefined, isCorrect: false})
        setOptions(newOptions)
    }
    const handleOptionChange = (i, e) => {
        const newOptions = [...options]
        newOptions[i].text = e.target.value
        setOptions(newOptions)
        setForm({...form, options: newOptions })
    }
    const handleIsCheckedChange = (i, e) => {
        const newOptions = [...options]
        //console.log(`Ischecked value ${JSON.stringify(options)}`)
        //newOptions[i].isCorrect = !newOptions[i].isCorrect
        newOptions[i].isCorrect = e.target.checked || false
        setOptions(newOptions)
        setForm({...form, options: newOptions })
        //setIsChecked({...isChecked, [e.target.name]: e.target.checked})
    }
    const handleOptionRemove = (i) => {
        const newOptions = [...options]
        newOptions.splice(i, 1)
        setOptions(newOptions)
    }
    /* options sections end */

    const handleChange = (e) => {
        setDescription(e.target.value)
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleLevelChange = (e) => {
        setLevel(e.target.value)
        setForm({...form, level: e.target.value})
    }
    const handleSubjectChange = (e) => {
        setSubject(e.target.value)
        setForm({...form, subject: e.target.value})
    }
    return (
        <React.Fragment>
        { user?.role === 'admin'  ? (
            <div className={classes.root}>
            <Drawers />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            
                                { question ? (
                                    <Paper>
                                        <Typography className={classes.subHeading} component="h2" variant="h5" color="secondary">
                                            Update Question
                                        </Typography>
                                        <form className={classes.form} onSubmit={handleSubmit}>
                                            <FormControl className={classes.formControl}>
                                                 <InputLabel id="subject-level">Select Subject</InputLabel>
                                                 <Select labelId="subject-level" value={subject} fullWidth onClick={handleSubjectChange} id="subject">
                                                    {subjects.map((subject) => (
                                                        <MenuItem key={subject.name} value={subject.name}>{subject.name}
                                                        </MenuItem>
                                                     ))}
                                                </Select>
                                             </FormControl>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="subject-level">Select Level</InputLabel>
                                                <Select labelId="subject-level" value={level} fullWidth onClick={handleLevelChange} id="level" >
                                                    <MenuItem value={'Level 0'}>Level 0</MenuItem>
                                                    <MenuItem value={'Level 1'}>Level 1</MenuItem>
                                                    <MenuItem value={'Level 2'}>Level 2</MenuItem>
                                                    <MenuItem value={'Level 3'}>Level 3</MenuItem>
                                                    <MenuItem value={'Level 4'}>Level 4</MenuItem>
                                                    <MenuItem value={'Level 5'}>Level 5</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField className={classes.input} name="description" value = {description} onChange={handleChange} multiline rows={4} fullWidth label="Question Description" required  variant="outlined" />
                                            { 
                                                // Statment component start
                                            }
                                             <Grid item xs={12} sm={12}>
                                            <Typography className={classes.subHeading} component="h6" variant="subtitle1">
                                            Statements - 
                                            { statements.length < 4 ? (
                                                <Button className={classes.addButton} variant="contained" color="secondary" onClick = {() => handleStatementAdd()}>Add</Button>
                                            ) : ( null )
                                                
                                            }
                                            </Typography>
                                        
                                        {
                                            statements.map((field, index) => {
                                                return (
                                                    <Grid className={classes.gridLayout} key={`${field}-${index}`}>
                                                    <Box className={classes.boxLabel} component="div" display="inline">{index + 1}</Box>
                                                    <TextField className={classes.textInput} name ={`Statement-${index + 1}`} value={field.text} onChange={e => handleStatementChange(index, e)} type="text" placeholder="Statement" variant="outlined" />
                                                    {index > 0 && <Button className={classes.removeButton} variant="outlined" onClick={() => handleStatementRemove(index)}>Remove</Button>}
                                                    </Grid>
                                                )
                                            })
                                        }    
                                        </Grid>
                                    { 
                                        // Statment component end
                                    } 

                                            { 
                                                // Options component Start
                                            } 
                                            <Grid item xs={12} sm={12}>
                                                <Typography className={classes.subHeading} component="h6" variant="subtitle1">
                                                     Options - 
                                                     { options.length < 5 ? (
                                                        <Button className={classes.addButton} variant="contained" color="secondary" onClick = {() => handleOptionAdd()}>Add</Button>
                                                    ) : ( null )
                                                        
                                                    } 
                                                
                                                
                                                </Typography>
                                            
                                            {
                                                options.map((option, i) => {
                                                    return (
                                                        <Grid className={classes.gridLayout} key={i}>
                                                        <Box className={classes.boxLabel} component="div" display="inline">{i+1}</Box>
                                                        <TextField className={classes.textInput} name ={`option-${i}`} key={i} value={option.text} 
                                                         type="text" onChange={e => handleOptionChange(i, e)} placeholder="Option" variant="outlined" />
                                                         {
                                                             option.isCorrect ? 
                                                             (<Checkbox name={`option-${i}-checkbox`} onChange = { (e) => handleIsCheckedChange(i, e) } checked={true}/>) 
                                                             : 
                                                             (<Checkbox name={`option-${i}-checkbox`} onChange = { (e) => handleIsCheckedChange(i, e) } checked={false}/>)} 
                                                             {i > 1 && <Button className={classes.removeButton} variant="outlined" onClick={() => handleOptionRemove(i)}>Remove</Button>}
                                                        
                                                        </Grid>
                                                    )
                                                })
                                            }
                                            </Grid>
                                            { 
                                                // Options component end
                                            }  

                                            {error && <Typography className={classes.serverValidation} component="h1" variant="subtitle1">{error}</Typography>}
                                            <Button type="submit" fullWidth  variant="contained" color="primary" className={classes.submit}>
                                                Update Question
                                            </Button>
                                            <Button fullWidth  variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
                                        </form>
                                    </Paper>
                                ) : (
                                    <Paper>
                                        <Typography className={classes.subHeading} component="h2" variant="h5" color="secondary">
                                            Something went wrong, please try again.
                                        </Typography>
                                    </Paper>
                                )

                                }
                            
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                    <Copyright />
                    </Box>
                </Container>
            </main>

        </div>
        ) : (
            <div className={classes.root}>
                <Drawers />
                <main className={classes.content}>
                     <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper>
                                    <Typography className={classes.subHeading} component="h2" variant="h5" color="secondary">
                                    Unauthorized Access!
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
        ) }
        
        </React.Fragment>
    )

}

export default QuestionEdit