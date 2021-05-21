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
    subHeading: {
        padding: theme.spacing(1.5),
        textAlign: 'center',
        marginBottom: theme.spacing(0),
    },
}))