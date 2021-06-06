import React, { useState } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import Drawers from '../Drawers/Drawers'
import useStyles from './styles'
import Copyright from '../Footer/Copyright/Copyright'
import  { Container, Grid, Paper, Box, Typography, Select, MenuItem, FormControl, InputLabel, TextField, Button, Checkbox } from '@material-ui/core'

import { addQuestion } from '../../actions/questions'

const AddQuestion = () => {

    const classes = useStyles()
    const [form, setForm] = useState();
    const [error, setError] = useState()
    const [subject, setSubject] = useState('')
    const [level, setLevel]= useState('')
    const dispatch = useDispatch()
    const subjects = useSelector((state) => state.subjects)
    const { user } = useSelector((state) => state.auth.user) //Current logged in user data
   
    const [fields, setFields] = useState([{ statements: undefined }])
    function handleStatementChange(i, e)  {
        const statements = [...fields]
        statements[i].text = e.target.value
        setFields(statements)
        setForm({...form, statements })
    }
    function handleStatementAdd() {
        const statements = [...fields]
        statements.push({ text: null })
        setFields(statements)
    }
    function handleStatementRemove(i) {
        const statements= [...fields]
        statements.splice(i, 1)
        setFields(statements)
    }
    /* Statement sections end */

    /* Options sections start */
    const [optionFields, setOptionFields] = useState([{ text: undefined, isCorrect: false }])
    //const [isChecked, setIsChecked] = useState({})

    function handleOptionChange(i, e)  {
        const options = [...optionFields]
        options[i].text = e.target.value
        setOptionFields(options)
        setForm({...form, options })
    }
    function handleIsCheckedChange(i, e) {
        const options = [...optionFields]
        options[i].isCorrect = e.target.checked || false
        setOptionFields(options)
        setForm({...form, options })
        //setIsChecked({...isChecked, [e.target.name]: e.target.checked})
    }
    function handleOptionAdd() {
        const options = [...optionFields]
        options.push({ text: undefined })
        setOptionFields(options)
    }

    function handleOptionRemove(i) {
        const options= [...optionFields]
        options.splice(i, 1)
        setOptionFields(options)
    }
    /* Options sections end */
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await dispatch(addQuestion(form))
            alert('Question Added!')

            // if(subject._id) {
            //       await dispatch(editSubject(subject._id, form))
            //       alert('Subject Updated!')
            // } else {
            //   await dispatch(addSubject(form))
            //   alert('Subject Added!')
            // }
          
          
          
          handleClear()
        } catch (e) {
            setError(e.message)
        }

    }
    const handleClear =() => {
        setForm('')
        setLevel()
        setSubject()
        setOptionFields([{ text: undefined, isCorrect: false }])
        setFields([{ text: undefined }])
    }

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})
    const handleLevelChange = (e) => {
        setLevel(e.target.value)
        setForm({...form, level: e.target.value})
    }
    const handleSubjectChange = (e) => {
        setSubject(e.target.value)
        setForm({...form, subject: e.target.value})
    }

    //console.log(`Subject ${subject}`)
    //console.log(`Level ${level}`)
    //console.log(`${JSON.stringify(isChecked)}`)
    //console.log(`Statement Data ${JSON.stringify(fields)}`)
    //console.log(`Options Data ${JSON.stringify(optionFields)}`)
    //console.log(`form data ${JSON.stringify(form)}`)
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
                                 <Paper>
                                    <Typography className={classes.subHeading} component="h2" variant="h5" color="secondary">
                                        Add Question
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
                                            <InputLabel id="level-level">Select Level</InputLabel>
                                            <Select 
                                            labelId="level-level" 
                                            value={level}
                                            fullWidth onClick={handleLevelChange}
                                            id="level"
                                            >
                                                <MenuItem value={'Level 1'}>Level 1</MenuItem>
                                                <MenuItem value={'Level 2'}>Level 2</MenuItem>
                                                <MenuItem value={'Level 3'}>Level 3</MenuItem>
                                                <MenuItem value={'Level 4'}>Level 4</MenuItem>
                                                <MenuItem value={'Level 5'}>Level 5</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField className={classes.input} name="description" onChange={handleChange} multiline rows={4} fullWidth label="Question Description" required  variant="outlined" />
                { 
                    // Statment component start
                }
                                        <Grid item xs={12} sm={12}>
                                            <Typography className={classes.subHeading} component="h6" variant="subtitle1">
                                            Statements - 
                                            { fields.length < 4 ? (
                                                <Button className={classes.addButton} variant="contained" color="secondary" onClick = {() => handleStatementAdd()}>Add</Button>
                                            ) : ( null )
                                                
                                            }
                                            </Typography>
            
                                            {
                                                fields.map((field, index) => {
                                                    return (
                                                        <Grid className={classes.gridLayout} key={`${field}-${index}`}>
                                                        <Box className={classes.boxLabel} component="div" display="inline">{index + 1}</Box>
                                                        <TextField className={classes.textInput} name ={`Statement-${index + 1}`} value={field.value} onChange={e => handleStatementChange(index, e)} type="text" placeholder="Statement" variant="outlined" />
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
                                                { optionFields.length < 5 ? (
                                                    <Button className={classes.addButton} variant="contained" color="secondary" onClick = {() => handleOptionAdd()}>Add</Button>
                                                ) : ( null )
                                                    
                                                } 
                                            </Typography>
        
                                            {
                                                optionFields.map((field, index) => {
                                                    return (
                                                        <Grid className={classes.gridLayout} key={`${field}-${index}`}>
                                                        <Box className={classes.boxLabel} component="div" display="inline">{index + 1}</Box>
                                                        <TextField className={classes.textInput} name ={`option-${index + 1}`} value={field.value} onChange={e => handleOptionChange(index, e)} type="text" placeholder="Option" variant="outlined" />
                                                        <Checkbox name={`option-${index + 1}-checkbox`} onChange={e => handleIsCheckedChange(index, e)} />
                                                        {index > 1 && <Button className={classes.removeButton} variant="outlined" onClick={() => handleOptionRemove(index)}>Remove</Button>}
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
                                            Add Question
                                        </Button>
                                        <Button fullWidth  variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
                                    </form>
                                 </Paper>
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
        )}
    </React.Fragment>
    )
}

export default AddQuestion