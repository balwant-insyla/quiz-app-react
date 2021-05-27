import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
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
  heading: {
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  blue: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
  },
  logout: {
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    borderRadius: '5px',
    '&:hover': {
      border: '2px solid #e3e3e3',
    }
  }
}));
