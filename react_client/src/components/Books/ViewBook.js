import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Title from '../Title';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import bookService from '../../services/book.service';



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
  }));
function ViewBook(props) {
    const classes = useStyles();
    const [inputField , setInputField] = useState({
        bookName: '',
        releaseDate: '',
        price: '',
        description:'',
        author:''

    })

  
    useEffect(() => {
        const id = props.match.params.id;
        bookService.get(id)
        .then(response => {
          setInputField(response.data);
          },[])
         .catch(error => console.log(error));
    });


    function handleChange(evt) {
      const value = evt.target.value;
      setInputField({
        ...inputField,
        [evt.target.name]: value
      });
    }


    return (
        <main className={classes.content}>
     <div className={classes.appBarSpacer} />
     <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
      <Grid item xs={12} >
        <TableContainer component={Paper} className={classes.sm_padding}>
          <div className={classes.gridHeader}>
            <Title>View Book</Title> 
          </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Book Name:</label>
          <div className="col-sm-10"> {inputField.bookName}
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Release Date:</label>
        <div className="col-sm-10">{inputField.releaseDate}
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Price:</label>
        <div className="col-sm-10">{inputField.price}
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Author:</label>
        <div className="col-sm-10">
        {inputField.author}
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Description:</label>
        <div className="col-sm-10"> {inputField.description}
        </div>
      </div>
      <div>
        <a href="/books" className="btn btn-sm btn-secondary float-left">Go Back</a>
      </div>
        </TableContainer>
        </Grid>
    </Grid>
          
    </Container>
   </main>
    )
}

export default ViewBook
