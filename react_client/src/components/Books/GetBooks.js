import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BookDataService from "../../services/book.service";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Title from '../Title';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';


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
// const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
    sm_padding:{
      padding:'12px'
    },
    gridHeader: {
      display:"inline-block"
    },
    actionButtons: {
      textDecoration:"none",
      listStyleType:"none",
    },
    actionButtons_create: {
      color:"#4050b5",
      border:"1px solid",
      padding:"3px 5px",
      margin: "5px",
      borderRadius:"4px"
    },
    actionButtons_view : {
      color:"#757575",

    },
    actionButtons_edit : {
      color:"#4050b5",

    },
    actionButtons_delete : {
      color:"#ff005b",
    },
    // icons_centered:{
    //   position:"relative",
    //   top:"3px"
    // }
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
        .then(response => {
            console.log(response.data);
            setbook(response.data);
            setIsLoading(false);
        })
        .catch(error => console.log(error));
    }, [page]);


    function DeleteBook(e){
      debugger;
      BookDataService.delete(e)
      .then(response => {
        handleRemoveSpecificRow(e);
    })
    .catch(error => console.log(error));;
    
    }
    function handleRemoveSpecificRow(idx) {
      const rows = [...book];
      rows.splice(rows.findIndex(item => item.id === idx), 1);
      setbook( rows );
    }

  return (
    <main className={classes.content}>
     <div className={classes.appBarSpacer} />
     <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
      <Grid item xs={12} >
        <TableContainer component={Paper} className={classes.sm_padding}>
          <div className={classes.gridHeader}>
            <Title>Lates Books
            <Link to={"/books/add"} className={classes.actionButtons_create}>
                <AddIcon className={classes.icons_centered}></AddIcon>
            </Link>
            </Title>
          </div>

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
                              <li className={classes.actionButtons}>
                                <Link to={"/books/view/"} className={classes.actionButtons_view}>
                                   <VisibilityIcon></VisibilityIcon>
                                </Link>
                                <Link to={"/books/edit"} className={classes.actionButtons_edit} >
                                   <CreateIcon></CreateIcon>
                                </Link>
                                <Link onClick={()=>DeleteBook(book.id)}  className={classes.actionButtons_delete}>
                                   <DeleteIcon></DeleteIcon>
                                </Link>
                              </li>
                              </TableCell>
                            </TableRow>
                          ))
                    }
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
      </Grid>

    </Container>
   </main>
  );
}