import React from 'react'
import { useSelector } from 'react-redux'
import Drawers from '../Drawers/Drawers'
import useStyles from './styles'
import Copyright from '../Footer/Copyright/Copyright'
import  { Container, Grid, Paper, Box, Typography } from '@material-ui/core'
//import { getQuestions } from '../../actions/questions'

const QuestionView = (props) => {
    const classes = useStyles()
    //const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getQuestions())
    // }, [])
    const { user } = useSelector((state) => state.auth.user) //Current logged in user data
    const questions = useSelector((state) => state.questions)
    const questionId = props.match.params.id
    var question = undefined
    //console.log(questionId)
    //const [options, setOptions] = useState({})
    question =  questions.find((q) => q._id === questionId)
    
    //console.log(JSON.stringify(question.statements))
    //if(question) setOptions(question[0].options)
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
                                        <Box className={classes.boxLabel} component="div" display="inline">{question.subject}</Box>
                                        <Box className={classes.boxLabel} component="div" display="inline">{question.level}</Box>
                                        <Typography className={classes.subHeading} component="h2" variant="h5" color="secondary">
                                            Q. {question.description}
                                        </Typography>
                                        { question.statements.length > 0 && 
                                            <div>
                                                <Typography component="h6" variant="h6">Statements</Typography>
                                                <ol>
                                                    { question.statements.map((statement, i) => ( <li key={i}><Typography variant="subtitle1">{statement.text}</Typography></li> ) ) }
                                                </ol>
                                            </div>
                                        }
                                        { question.options.length > 0 && 
                                            <div>
                                            <Typography component="h6" variant="h6">Options</Typography>
                                                <ol>
                                                    { question.options.map((option, i) => ( <li key={i}><Typography variant="subtitle1">{option.text}  { option.isCorrect ? ' - True': '' }</Typography></li> ) ) }
                                                </ol>
                                            </div>
                                        }
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
            )}
        </React.Fragment>
    )

}

export default QuestionView