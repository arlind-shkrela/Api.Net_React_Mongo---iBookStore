import React,  { useState } from 'react';
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

function CreateBook() {
    const classes = useStyles();
    const [inputField , setInputField] = useState({
        bookName: '',
        releaseDate: '',
        price: '',
        description:'',
        author:''

    })

    const inputsHandler = (e) =>{
        setInputField( {[e.target.name]: e.target.value} )
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        debugger;
        bookService.create()
   
       
    }
    const submitButton = () =>{
        debugger;
        bookService.create([inputField.bookName,inputField.releaseDate,inputField.price,inputField.description,inputField.author]);
    }



    return (
        <main className={classes.content}>
     <div className={classes.appBarSpacer} />
     <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
      <Grid item xs={12} >
        <TableContainer component={Paper} className={classes.sm_padding}>
          <div className={classes.gridHeader}>
            <Title>Create Book</Title> 
          </div>

    <form onSubmit={e => { handleSubmit(e) }}>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Book Name:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control"
            onChange={inputsHandler} value={inputField.bookName} name="bookName" label="Book Name"/>
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Release Date:</label>
        <div className="col-sm-10">
            <input type="date" className="form-control" 
                value={inputField.releaseDate}
                onChange={inputsHandler} name="releaseDate"  label="Release Date"/>
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Price:</label>
        <div className="col-sm-10">
        <input type="text" className="form-control"
            value={inputField.price}
            onChange={inputsHandler}  name="price" label="Price"/>
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Author:</label>
        <div className="col-sm-10">
            <input type="text" className="form-control"
                value={inputField.author}
                onChange={inputsHandler} name="author" label="Author" />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Description:</label>
        <div className="col-sm-10">
            <textarea className="form-control"
                value={inputField.description}
                onChange={inputsHandler} name="description" label="Description" />
        </div>
      </div>
      <div>
    <input type="submit" value="Submit" ></input>
      </div>
    </form>
        </TableContainer>
        </Grid>
    </Grid>
          
    </Container>
   </main>
    )
}

export default CreateBook
