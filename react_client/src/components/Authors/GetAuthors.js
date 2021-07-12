import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AuthorDataService from "../../services/author.service";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Title from '../Title';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import EditAuthor from './EditAuthor';

const drawerWidth = 240;
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
  }));
  


export default function GetAuthors() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [author, setauthor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreCommit = () => {
    setPage(page + 1);
  };
 
   function DeleteAuthor(e){
    AuthorDataService.delete(e)
    .then(response => {
      handleRemoveSpecificRow(e);
  })
  .catch(error => console.log(error));;
  
  }
  function handleRemoveSpecificRow(idx) {
    const rows = [...author];
    rows.splice(rows.findIndex(item => item.id === idx), 1)
    setauthor( rows )
  }

  useEffect(() => {
    AuthorDataService.getAll()
        .then(response => {
            console.log(response.data);
            setauthor(response.data);
            setIsLoading(false);
        })
        .catch(error => console.log(error));
    }, [page]);

  return (
    <main className={classes.content}>
     <div className={classes.appBarSpacer} />
     <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
      <Grid item xs={12} >
        <TableContainer component={Paper} className={classes.sm_padding}>
          <div className={classes.gridHeader}>
            <Title>Lates Authors
            <Link to={"/authors/add"} className={classes.actionButtons_create}>
                <AddIcon className={classes.icons_centered}></AddIcon>
            </Link>
            </Title>
          </div>

          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                {/* <TableCell align="right">Price</TableCell>
                <TableCell align="right">Author</TableCell> */}
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {author &&  author.map((author) => (
                            <TableRow key={author.id}>
                              <TableCell component="th" scope="row">
                                {author.name}
                              </TableCell>
                              <TableCell align="right">{author.surname}</TableCell>
                              {/* <TableCell align="right">{author.price}</TableCell>
                              <TableCell align="right">{author.author}</TableCell> */}
                              <TableCell align="right">
                              <li className={classes.actionButtons}>
                                <Link to={{pathname:"/authors/view/"+author.id, state:{id:author.id}}} className={classes.actionButtons_view}>
                                   <VisibilityIcon></VisibilityIcon>
                                </Link>
                                <Link to={ {pathname: "/authors/edit/"+author.id, state:{id:author.id}}} className={classes.actionButtons_edit} >
                                   <CreateIcon></CreateIcon>
                                </Link>
                                <Link to={"/authors"} onClick={()=>DeleteAuthor(author.id)} className={classes.actionButtons_delete}>
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