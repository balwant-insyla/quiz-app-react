import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Radio,
  AppBar,
  CircularProgress,
} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import logo from '../../images/q2-logo.png'
import AvTimerIcon from "@material-ui/icons/AvTimer";
import ImageIcon from '@material-ui/icons/Image';
import useStyles from "./styles";
import Copyright from "../Footer/Copyright/Copyright";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjectsName } from "../../actions/subjects";
import { getLevels } from '../../actions/levels';
import { getQuizQuestion } from "../../actions/questions";
import { addResult } from '../../actions/result';
import Countdown from "react-countdown";
const Quiz = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubjectsName());
  }, []);
  useEffect(() => {
    dispatch(getLevels());
  }, []);
  const resultInitialState = {
    subject: '',
    level: '',
    questions: [],
    correctAnswers: '',
    negativeMarking: false,
    marks: '',
    percentage: '',
  };
  const { user } = useSelector((state) => state.auth.user);
  const subjects = useSelector((state) => state.subjects);
  const levels = useSelector((state) => state.levels);
  let tempQuestions = useSelector((state) => state.questions);
  const [questions, setQuestions] = useState(tempQuestions);

  //setQuestions(tempQuestions)

  useEffect(() => {
    setQuestions(tempQuestions);
  }, [tempQuestions]);
  

  const [resultQuestions, setResultQuestions] = useState([]);
  const [result, setResult] = useState(resultInitialState);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState();
  const [timeout, setTimeout] = useState(false); //
  const [now, setNow] = useState()
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [instruction, setInstruction] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [negativeMarking, setNegativeMarking] = useState(false);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const loader = () => {

    return (
        <div className={classes.loaderBox}>
            <CircularProgress className={classes.loader} color="secondary" />
        </div>
    )
  }
  
  const duration =  (level === 'Level 1' || level === 'Level 2' ) ? 
            (subject === "Mathematics" || subject === "Reasoning" ? size  : size * 0.5)
            : (subject === "Mathematics" || subject === "Reasoning" ? size * 1.5 : size * 0.75);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(error)
        setNow(Date.now());
        try {
          if (!subject || !level) {
            setError("Please choose subject and level for test.");
            console.log(error);
          } else {
            setResult({ ...result, subject, level });
            setLoading(true);
            await dispatch(getQuizQuestion(subject, level, size));
            
            setLoading(false);
            
            //duration = subject === "Mathematics" ? size * 1.5 : size;
            
            setError(undefined);
          }
        } catch (err) {
          setError(err.message);
        }
      };

    const handleTakeTest = () => {
        
        tempQuestions = [];
        setQuestions(tempQuestions);
        setResult(resultInitialState);
        setResultQuestions([]);
        setTimeout(false);
        setSelectedIndex(-1);
        setLevel('');
        setSubject('');
        setIndex(0);
    }
 //This method will save test result and it will called on submit button or when countdown is completed.
 const saveResult = () => {  
    let index = 0;
    let correctAnswers = 0;
    try {
        for(index = 0; index < resultQuestions.length; index++) {
        
            const selectedQuestion = questions.find((key) => key._id === resultQuestions[index]._id);
           // console.log(selectedQuestion)
            if(selectedQuestion) {
               const correctOption = selectedQuestion.options.find((x) => 
               x._id === resultQuestions[index].options._id && x.isCorrect === resultQuestions[index].options.isChecked);
                if(correctOption) {
                    correctAnswers = correctAnswers + 1;
                    resultQuestions[index].attempted = 1;
                }
            } else {
                resultQuestions[index].attempted = -1;
            }
        }
        const marks = negativeMarking ? correctAnswers * 2 - 0.25 * (resultQuestions.length - correctAnswers) : correctAnswers * 2; //currently there is no negative marking.
        const percentage = marks * 100 / parseInt(questions.length * 2);
        result.correctAnswers = correctAnswers;
        result.negativeMarking = negativeMarking;
        result.marks = marks;
        result.percentage = percentage;
        result.questions = resultQuestions;
        //result.questions.push(resultQuestions);
    } catch(errr) {
        setError(errr.message)
    }
    

  }
 
const quizRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setTimeout(true);
      if(resultQuestions.length >= size * 4 /10 ) {
        saveResult();
        //setLoading(true);
        //await dispatch(addResult(result));
        //setLoading(false);
      }
      
      //setQuestions([]);
      return <span>Completed!</span>;
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  const handleLevelChange = (e) => {
    setLevel(e.target.value);
    setInstruction(true);
  };
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  
 const handleNegativeMarking = (e) => {
     setNegativeMarking(true);
     //console.log(negativeMarking);
 }
  function handleOptionCheckbox(i, e) {
    setSelectedIndex(i)
    const questionIndex = resultQuestions.findIndex(
      (x) => x._id === questions[index]._id
    );
    if (questionIndex != -1) {
        if(resultQuestions[questionIndex].options.isChecked) {
            resultQuestions[questionIndex].options._id =  e.target.id;
            resultQuestions[questionIndex].options.index =  i;
        } 
    } else {

        setResultQuestions([
            ...resultQuestions,
            {
              _id: questions[index]._id,
              options: { index: i, _id: e.target.id, isChecked: e.target.checked },
              attempted: 0,
            },
          ]);
      
    }
    //console.log(resultQuestions)
  }



  


  const handleQuiz = async (e) => { //Final submission of test
    e.preventDefault();
    
    if(resultQuestions.length >= size * 4 /10 ) {
        saveResult();
        //console.log(`quiz questions result ${JSON.stringify(result)}`);
        setLoading(true);
        await dispatch(addResult(result));
        setLoading(false);
        setTimeout(true);
      } else {
        alert(' You have to complete at least 40% of total MCQ.')
      }
    
  };
  const handleFirst = () => {
    
    let optionIndex = -1;
    const questionIndex = resultQuestions.findIndex((key) => key._id === questions[0]._id);
    if(questionIndex != -1) {
        optionIndex =  resultQuestions[questionIndex].options.index; 
    }
    setSelectedIndex(optionIndex);
    setIndex(0);
  }
  const handlePrev = () => {
    let optionIndex = -1;
    const questionIndex = resultQuestions.findIndex((key) => key._id === questions[index - 1]._id);
    
    if(questionIndex != -1) {
        optionIndex =  resultQuestions[questionIndex].options.index; 
    }
    setSelectedIndex(optionIndex);

    if (index !== 0) {
        
      setIndex(index - 1);
    }
  };
  const handleNext = () => {
    let optionIndex = -1;
    const questionIndex = resultQuestions.findIndex((key) => key._id === questions[index + 1]._id);
    if(questionIndex != -1) {
        optionIndex =  resultQuestions[questionIndex].options.index; 
    }
    setSelectedIndex(optionIndex);

    if (index !== questions.length - 1) {

       
       
      setIndex(index + 1);
    }
  };
  const handleLast = () => {
    
    let optionIndex = -1;
    const questionIndex = resultQuestions.findIndex((key) => key._id === questions[questions.length - 1]._id);
    if(questionIndex != -1) {
        optionIndex =  resultQuestions[questionIndex].options.index; 
    }
    setSelectedIndex(optionIndex);
    setIndex(questions.length - 1);
  } 


  return (
    <React.Fragment>
       { loading ? loader() : (null) } 
      { 
        
        user?.role === "student" ? (
        questions.length > 0 ? (
          !timeout ? (
            <div className={classes.root}>
                <div>
                    <CssBaseline />
                    <AppBar className={classes.appBar} position="absolute">
                        <div className={classes.brandContainer}>
                            <img className={classes.image} src={logo} alt="icon" height="60" />
                        </div>
                    </AppBar>
                </div>
              <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                      <Paper className={classes.paper}>
                        <form>
                          <div className={classes.questionHeader}>
                            <Chip
                              className={classes.questionTimer}
                              variant="outlined"
                              color="primary"
                              label={
                                <Countdown
                                  date={now + duration * 60000}
                                  intervalDelay={3}
                                  renderer={quizRenderer}
                                />
                              }
                              icon={<AvTimerIcon />}
                            />
                          </div>
                          <Typography
                            className={classes.questionTitle}
                            component="h6"
                            variant="h6"
                            color="secondary"
                          >
                            <strong>{index + 1}. </strong>{" "}
                            {questions[index].description}
                          </Typography>
                          {questions[index].statements.length > 0 ? (
                            <React.Fragment>
                              <Typography
                                className={classes.questionStatementTitle}
                                variant="h6"
                              >
                                Consider the following statements
                              </Typography>
                              <ol className={classes.questionStatementList}>
                                {questions[index].statements.map(
                                  (statement) => (
                                    <li
                                      key={statement._id}
                                      className={
                                        classes.questionStatementListItems
                                      }
                                    >
                                      {statement.text}
                                    </li>
                                  )
                                )}
                              </ol>
                            </React.Fragment>
                          ) : null}

                          <Divider className={classes.questionDivider} light />
                          <FormControl
                            className={classes.questionOptionGroup}
                            component="fieldset"
                          >
                            <FormGroup>
                            
                              {
                                  questions[index].options.map((option, i) => {
                                    
                                return (
                                  <FormControlLabel
                                    key={option._id}
                                    control={
                                      <Radio
                                        id={option._id}
                                        key={option._id}
                                        name="quiz-radio-option"
                                        checked={i === selectedIndex ? true: false}
                                        onChange={(e) => handleOptionCheckbox(i,e)}
                                      />
                                    }
                                    label={option.text}
                                  />
                                );
                              })}
                            </FormGroup>
                          </FormControl>
                          <Divider className={classes.questionDivider} light />
                          <div className={classes.questionButtons}>
                            <Button
                              className={classes.questionPrevButton}
                              disabled={index === 0 ? true : false}
                              onClick={handleFirst}
                              variant="contained"
                              color="primary"
                            >
                              First
                            </Button>
                            <Button
                              className={classes.questionPrevButton}
                              disabled={index === 0 ? true : false}
                              onClick={handlePrev}
                              variant="contained"
                              color="primary"
                            >
                              Prev
                            </Button>
                            <Button
                              className={classes.questionNextButton}
                              disabled={
                                index === questions.length - 1 ? true : false
                              }
                              onClick={handleNext}
                              variant="contained"
                              color="primary"
                            >
                              Next
                            </Button>
                            <Button
                              className={classes.questionNextButton}
                              disabled={
                                index === questions.length - 1 ? true : false
                              }
                              onClick={handleLast}
                              variant="contained"
                              color="primary"
                            >
                              Last
                            </Button>
                          </div>
                          <Divider className={classes.questionDivider} light />
                          <div className={classes.questionSubmitButtonDiv}>
                            <Button
                              className={classes.questionSubmitButton}
                              onClick={handleQuiz}
                              variant="contained"
                              color="secondary"
                            >
                              Submit
                            </Button>
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
                        <Typography className ={classes.reportCard} variant="h5">Quiz Report Card</Typography>
                        <Button
                            color="secondary"
                            variant="outlined"
                            onClick={handleTakeTest}
                             >    
                                Take Another Test!
                        </Button>  
                    </Paper>
                    </Grid>
                  </Grid>
                </Container>
                <Container maxWidth="lg" className={classes.containerNew}>
                  <Grid container spacing={3}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={classes.paper}>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                             <ImageIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                         <ListItemText primary="Subject" secondary={result.subject} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                             <ImageIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                         <ListItemText primary="Level" secondary={result.level} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                             <ImageIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                         <ListItemText primary="Total Questions" secondary={size} />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={classes.paper}>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Attempted Questions" secondary={result.questions.length} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Correct Answers" secondary={result.correctAnswers} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Wrong Answers" secondary={result.questions.length - result.correctAnswers} />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>    
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={classes.paper}>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Total Marks" secondary={size * 2} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Obtained Marks" secondary={result.marks} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Percentage" secondary={result.percentage + ' %'}/>
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                  </Grid>
                </Container>
                <Container maxWidth="lg" className={classes.containerNew}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                      <Paper className={classes.paper}>
                        <Typography className ={classes.reportCard} variant="h5">Test Summary</Typography>
                        <Typography
                            className={classes.instructions}
                            component="h6"
                            variant="subtitle1"
                            >
                                Color notation - Choice with a green border is the correct answer by the test taker, 
                                 a choice with a yellow border is the correct answer, 
                                 if not attempted or wrongly answered by the test taker and 
                                 choice having red border is an incorrect option chosen by the test taker.
                            </Typography>
                        {
                            questions.map((question, i) => {
                                const resultQuestion = result.questions.find((x) => x._id === question._id);
                                //console.log(resultQuestion);
                                return (
                                    <React.Fragment>
                                        <Typography
                                        className={classes.questionTitle}
                                        component="h6"
                                        variant="h6"
                                        color="primary"
                                        key={question._id}
                                    >
                                        <strong>{i + 1}. </strong>{" "}
                                        {question.description}
                                    </Typography>
                                        <List className={classes.optionsRow}>
                                        { resultQuestion ? (
                                            question.options.map((opt, k) => {
                                                return (
                                                    <ListItem key={k}>
                                                        { resultQuestion.options._id === opt._id && opt.isCorrect ? 
                                                            (<ListItemText className={classes.userCorrectOption} secondary={opt.text} />) 
                                                            : (
                                                                opt.isCorrect ? ( 
                                                                    <ListItemText key={opt._id}  className={classes.correctOption} secondary={opt.text} />
                                                                ) : ( 
                                                                    resultQuestion.options._id === opt._id ? (
                                                                        <ListItemText key={opt._id} className={classes.userIcorrectOption} secondary={opt.text} /> 
                                                                    ) : (
                                                                        <ListItemText key={opt._id} secondary={opt.text} />
                                                                    )
                                                                    
                                                                )
                                                        )}
                                                    </ListItem>  
                                                )
                                            })
                                        ) : (
                                            question.options.map((option, j) => {
                                                return (
                                                    <ListItem key={j}>
                                                    { option.isCorrect ? <ListItemText key={option._id}  className={classes.correctOption} secondary={option.text} /> : <ListItemText key={option._id}  secondary={option.text} />}
                                                        
                                                    </ListItem>          
                                                )
                                            })
                                        )
                                            
                                            
                                        }
                                        </List>
                                    </React.Fragment>
                                )
                            })
                        }
                        

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
                    <Typography
                      className={classes.instructions}
                      component="h6"
                      variant="subtitle1"
                    >
                      Please read the instructions carefully before starting the
                      test.
                    </Typography>
                    <Paper className={classes.paper}>
                      <form onSubmit={handleSubmit}>
                        <FormControl className={classes.formControl}>
                          <Typography
                            className={classes.chooseTest}
                            component="h6"
                            variant="h6"
                          >
                            Choose Test
                          </Typography>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="subject-level">
                            Select Subject
                          </InputLabel>
                          <Select
                            labelId="subject-level"
                            value={subject}
                            required
                            onClick={handleSubjectChange}
                            id="subject"
                          >
                            {subjects.map((subject) => (
                              <MenuItem key={subject.name} value={subject.name}>
                                {subject.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="subject-level">
                            Select Level
                          </InputLabel>
                          <Select
                            labelId="subject-level"
                            value={level}
                            required
                            onClick={handleLevelChange}
                            id="level"
                          >
                          {levels.map((level) => (
                            <MenuItem key={level._id} value={level.level}>
                              {level.level}
                            </MenuItem>
                          ))}
                          </Select>
                        </FormControl>
                        <Typography className={classes.negativeMarks} component="h6" variant="h6">
                            <FormControlLabel
                                key="negative-marking"
                                control={
                                <Checkbox
                                    name="negativeMarks"
                                    onChange={handleNegativeMarking}
                                />
                                }
                                label="Take test with negative marking. There will be one fourth ( -0.25) penality marks for every wrong answer."
                            />
                        </Typography>
                            
                        
                        {instruction ? (
                          <React.Fragment>
                            <Typography
                              className={classes.things}
                              component="h6"
                              variant="subtitle2"
                            >
                              THINGS TO REMEMBER
                              <Chip
                                className={classes.instructionButton}
                                label={`Total no. of Questions - ${size}`}
                                variant="outlined"
                              />
                              <Chip
                                className={classes.instructionButton}
                                label={`Total Duration ${duration} Mins.`}
                                variant="outlined"
                              />
                            </Typography>
                            <ol>
                              <li>
                                Before starting the test, please close all the
                                chat windows, screen-saver(s).
                              </li>
                              <li>
                                Kindly make sure you have a stable internet
                                connection.
                              </li>
                              <li>
                                Pressing F5 or refreshing your browser at any
                                time during the test will cause it to end
                                immediately.
                              </li>
                              <li>
                                Kindly avoid pressing browser's back and forth buttons, if you do 
                                Your test data will be lost and no test record will be saved.
                              </li>
                              <li>
                                Try to complete all the questions within time
                                limit.
                              </li>
                              <li>
                                You are allowed to submit only once, make sure
                                that you have correctly attempted all the
                                questions before submission.
                              </li>
                              <li>
                                <strong>
                                    Important! - Make sure to submit (by pressing submit button)
                                     your test before timeout otherwise
                                    test result could not saved.
                                </strong>
                              </li>
                            </ol>
                            <div className={classes.wishesBox}>
                            <Chip
                                className={classes.wishes}
                                color="secondary"
                                label="All the best!"
                              />
                              </div>
                            {error ? (
                              <Typography
                                color="secondary"
                                className={classes.serverValidation}
                                component="h6"
                                variant="subtitle1"
                              >
                                {error}
                              </Typography>
                            ) : null}
                            <Typography
                              className={classes.proceed}
                              component="h6"
                              variant="subtitle2"
                            >
                              <Button
                                color="secondary"
                                variant="outlined"
                                type="submit"
                              >
                                Proceed
                              </Button>
                            </Typography>
                          </React.Fragment>
                        ) : null}
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
                    <Typography variant="h6">
                      Please login as student to take test.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
            <Box pt={4}>
              <Copyright />
            </Box>
          </main>
        </div>
      )}
    </React.Fragment>
  );
};

export default Quiz;