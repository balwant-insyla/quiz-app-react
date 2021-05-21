import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Drawers from '../Drawers/Drawers'
import PropTypes from 'prop-types';
import useStyles from './styles'
import Copyright from '../Footer/Copyright/Copyright'
import clsx from 'clsx'
import  { Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Toolbar, Container, Grid, Paper, Box, IconButton, Typography, Button } from '@material-ui/core'
import { lighten, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux'
import { getQuestions, deleteQuestion } from '../../actions/questions'


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [
  { id: 'srno', numeric: false, disablePadding: true, label: 'Sr. No.' },
  { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
  { id: 'subject', numeric: false, disablePadding: true, label: 'Subject' },
  { id: 'level', numeric: false, disablePadding: true, label: 'Level' },
  { id: 'edit', numeric: false, disablePadding: false, label: '' },
  { id: 'delete', numeric: false, disablePadding: false, label: '' },
  
];
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'} 
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={clsx(classes.root)}>
      
        <Typography className={classes.title} variant="h4" id="tableTitle" color="secondary" component="div">
          Questions
        </Typography>

    </Toolbar>
  );
};



const Questions = () => {
    const classes = useStyles()
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('level');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const dispatch= useDispatch()

    useEffect(() => {
      dispatch(getQuestions())
  }, []) // to get all the questions from database we have to use useEffect hook otherwise blank data will load.
    const questions = useSelector((state) => state.questions)
    const { user } = useSelector((state) => state.auth.user) //Current logged in user data
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, questions.length - page * rowsPerPage);
    return (
      <React.Fragment>
      { user?.role === 'admin'  ? (
        <div className={classes.root}>
          <Drawers />
          <main className={classes.content}>
           <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
           <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>
                  <EnhancedTableToolbar numSelected={selected.length}/>
                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                      >
                        <EnhancedTableHead
                          classes={classes}
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onRequestSort={handleRequestSort}
                          rowCount={questions.length}
                        />
                        <TableBody>
                          {stableSort(questions, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.description);
                              const labelId = `enhanced-table-checkbox-${index}`;
    
                              return (
                                <TableRow
                                  hover={false}
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row._id}
                                  selected={false}
                                >
                                  <TableCell>{index+1}</TableCell>
                                  <TableCell component="th" id={labelId} scope="row">
                                    <Button className={classes.modalButton} to={`/questions/view/${row._id}`} component={Link} type="button">
                                    {row.description}</Button>
                                  </TableCell>
                                  <TableCell>{row.subject}</TableCell>
                                  <TableCell>{row.level}</TableCell>
                                  <TableCell>
                                  <IconButton to={`/questions/edit/${row._id}`} component={Link} aria-label="edit">
                                    <EditIcon />
                                    </IconButton>
                                  </TableCell>
                                  <TableCell>
                                  <IconButton onClick={(e) => dispatch(deleteQuestion(row._id))} aria-label="delete">
                                    <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                      
                             })}
                            {emptyRows > 0 && (
                              <TableRow>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={questions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                      />
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

export default Questions