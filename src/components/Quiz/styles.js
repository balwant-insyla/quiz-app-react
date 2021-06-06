import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({ 
    root: {
        maxWidth:'100%',
        padding: '0',
    },
    appBar: {
        margin: '0  0 60px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        background: '#003366',
        
        boxShadow: 'none',
        height: '70px'
    },
    loaderBox: {
        position:'fixed',
        left: '0',
        top: '0',
        right: '0',
        bottom:'0',
        zIndex: '999999',
        background: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
    },
    loader: {
        position:'absolute',
        left: '50%',
        top: '50%',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    image: {
        marginLeft: '15px',
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
    containerNew: {
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
    wishesBox: {
        width: '100%',
        margin: '20px auto',
        textAlign: 'center',
    },
    wishes: {
        padding: '5px 20px',
        fontSize: '20px',
        fontWeight: 800,
        
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
        margin: '10px',
    },
    negativeMarks: {
        margin: '20px 5px',
        padding: '10px',
        color: '#ff0035',
        border: '1px dashed #003366',
    },
    questionNextButton: {
        width: '150px',
        margin: '10px',
    },
    questionSubmitButtonDiv: {
        float:'right',
    },
    questionSubmitButton: {
        width: '150px',
        textAlign: 'center',
        margin: '30px',
    },
    reportCard: {
        textAlign:'center',
        padding: '10px, 0',
        marginBottom: '30px',
        color: '#003366',
    },
    optionsRow: {
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            flexDirection: 'row',
          },
        [theme.breakpoints.up('xl')]: {
            display: 'flex',
            flexDirection: 'row',
          },
    },
    correctOption: {
        padding: '5px 10px',
        border: 'solid 2px #eaf205',
    },
    userCorrectOption: {
        padding: '5px 10px',
        border: 'solid 2px #08541c',
    },
    userIcorrectOption: {
        padding: '5px 10px',
        border: 'solid 2px #b31b04',
    },
}))