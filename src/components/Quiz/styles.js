import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({ 
    root: {
        maxWidth:'100%',
        padding: '0',
      },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        marginTop:'80px',
        paddingTop: theme.spacing(4),
        display:'flex',
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: '20px 50px',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    instructions: {
        background: '#003366',
        
        color: '#FFFFFF',
        padding: '5px',
        marginBottom: '15px',

    },
    chooseTest: {
        color: '#003366',
        textAlign:'center',
        padding: '8px',
        borderBottom: '1px solid #b8b4b2',
    },
    things: {
        fontWeight: 800,
        margin: '40px 0 70px',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
      },
    instructionButton: {
        margin: '0 20px',
        padding: '5px',
        textAlign: 'right',
    },
    proceed: {
        textAlign: 'right',
        marginRight: '50px',
    },
    serverValidation: {
        textAlign: 'center',
        margin: '10px 0',
        fontWeight: 800,

    },
    questionHeader: {
        width: '100%',
        height: '50px',
    },
    questionTitle: {
        fontWeight:500,
        fontSize: '18px',
        padding: '10px 0',
        marginBottom: '20px',
    },
    questionTimer: {
        margin: '5px 10px',
        float: 'right',
    },
    questionDivider: {
        width: '98%',
        margin: '5px auto',
    },
    questionStatementTitle: {
        fontWeight:600,
        fontSize: '15px',
        padding: '10px 0',
        marginLeft: '50px',
    },
    questionStatementList: {
        margin: '0 0 20px 60px',
    },
    questionOptionGroup: {
        margin: '10px 0 20px 60px',
    },
    questionStatementListItems: {
        fontSize: '17px',
        padding: '5px 0',
    },
    questionButtons: {
        textAlign: 'center',
        margin: '30px auto',
    },
    questionPrevButton: {
        width: '150px',
        margin: '0 10px',
    },
    questionNextButton: {
        width: '150px',
        margin: '0 10px',
    },
    questionSubmitButtonDiv: {
        float:'right',
    },
    questionSubmitButton: {
        width: '150px',
        textAlign: 'center',
        margin: '30px',
    },
}))