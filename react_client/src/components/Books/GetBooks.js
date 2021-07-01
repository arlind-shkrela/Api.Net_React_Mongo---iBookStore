import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ReactDOM from "react-dom";
import BookDataService from "../../services/book.service";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import Title from '../Title';


// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const books = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
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
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
export default function GetBooks() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [book, setbook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreCommit = () => {
    setPage(page + 1);
  };
  

  useEffect(() => {
      BookDataService.getAll() 
        // .then(res => res.json())
        .then(response => {
            console.log(response.data);
            setbook(response.data);
            setIsLoading(false);
        })
        .catch(error => console.log(error));
    }, [page]);

  return (
    <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={6}>
    <TableContainer component={Paper}>
    <Title>Lates Books</Title>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Book Name</TableCell>
            <TableCell align="right">Release Date</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {book &&  book.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell component="th" scope="row">
                            {book.bookName}
                          </TableCell>
                          <TableCell align="right">{book.releaseDate}</TableCell>
                          <TableCell align="right">{book.price}</TableCell>
                          <TableCell align="right">{book.author}</TableCell>
                          <TableCell align="right">
                          <Button size="small"  variant="contained"  onClick={() => { alert('clicked') }}>
                             <VisibilityIcon></VisibilityIcon>
                          </Button>
                            <Button size="small"  variant="contained" color="primary" onClick={() => { alert('clicked') }}>
                              <CreateIcon></CreateIcon>
                            </Button>
                            <Button size="small"  variant="contained" color="secondary"  onClick={() => { alert('clicked') }}>
                              <DeleteIcon></DeleteIcon>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                }
            
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
          
          </Container>
        </main>
  );
}