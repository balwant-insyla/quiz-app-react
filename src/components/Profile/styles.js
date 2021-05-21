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
        display:'flex',
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
      },
    fixedHeight: {
        height: 240,
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
    infoBox: {
        border: '1px solid #c2c2c2',
        borderRadius: '5px',
        margin: '5px',
        padding: '10px 5px',
    },
}))