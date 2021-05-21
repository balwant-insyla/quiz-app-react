import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({ 
    root: {
        display: 'flex',
        maxWidth:'100%',
        padding: '0',
      },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    table: {
        minWidth: 750,
        padding: theme.spacing(1, 2),
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
    fixedHeight: {
        height: 240,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
      },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1.5),
        padding: theme.spacing(1.5),
      },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
    input: {
        margin: theme.spacing(3, 0, 2),
      },
    gridLayout: {
        margin: theme.spacing(2, 0),
      },
    subHeading: {
        margin: theme.spacing(2, 1.5),
        padding: theme.spacing(2.5, 2),
    },
    addButton: {
        width: '90px',
        marginLeft: theme.spacing(3),

    },
    removeButton: {
        border: '1px solid #c2c2c2',
        borderRadius: '3px',
        marginTop: theme.spacing(1.5),
        marginLeft: theme.spacing(2),
        alignItems: 'center',
    },
    textInput: {
        width: '60%',
    },
    boxLabel: {
        padding: theme.spacing(2.5, 2),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paperModal: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modalButton: {
      textAlign: 'left',
      color: '#2F80C8',
      '&:hover': {
        backgroundColor: 'transparent',
        
      },
    },
}))