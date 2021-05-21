import React from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core'
import SubjectIcon from '@material-ui/icons/Subject';
import DashboardIcon from '@material-ui/icons/Dashboard'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import BarChartIcon from '@material-ui/icons/BarChart'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const AdminListItems = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List>
      <ListItem button component={Link} to="/home">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/subjects">
        <ListItemIcon>
          <SubjectIcon />
        </ListItemIcon>
        <ListItemText primary="Subjects" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <QuestionAnswerIcon />
        </ListItemIcon>
        <ListItemText primary="Questions" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} component={Link} to="/questions">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Questions" />
          </ListItem>
          <ListItem button className={classes.nested} component={Link} to="/questions/add">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Add Question"/>
          </ListItem>
        </List>
      </Collapse>

      <ListItem button component={Link} to="/students">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItem>
      </List>
  );
}


  
  export const StudentListItems = () => {
    const classes = useStyles();
    return (
      <List>
      <ListItem button>
          <ListItemIcon>
            <AccessAlarmIcon />
          </ListItemIcon>
          <ListItemText primary="Test Yourself" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Report Cards" />
        </ListItem>
        </List>
    );
  }

  //export default { AdminListItems, StudentListItems }