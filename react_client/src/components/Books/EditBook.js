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

function EditBook(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [inputField , setInputField] = useState({
        bookName: '',
        releaseDate: '',
        price: '',
        description:'',
        author:''

    })

  
    useEffect(() => {
      fetchData();
    },[]);

    const fetchData = () => {
      setLoading(true);
      const id = props.match.params.id;
      bookService.get(id)
      .then(response => {
        setInputField(response.data);
        })
       .catch(error => {
         console.log(error);
         setLoading(false);
       });
    };


    function handleChange(evt) {
      const value = evt.target.value;
      setInputField({
        ...inputField,
        [evt.target.name]: value
      });
    }

    const submitButton = (e) =>{
      debugger;
      var data = {
        BookName : inputField.bookName,
        ReleaseDate: inputField.releaseDate,
        Price: inputField.price,
        Description: inputField.description,
        Author: inputField.author,

      }
      bookService.create(data)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(error => {
          this.setState({ errorMessage: error.message });
          console.error('There was an error!', error);
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
            <Title>Create Book</Title> 
          </div>

    <form onSubmit={e => { submitButton(e) }}>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Book Name:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control"
            onChange={handleChange} value={inputField.bookName} name="bookName" label="Book Name"/>
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Release Date:</label>
        <div className="col-sm-10">
            <input type="date" className="form-control" 
                value={inputField.releaseDate}
                onChange={handleChange} name="releaseDate"  label="Release Date"/>
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Price:</label>
        <div className="col-sm-10">
        <input type="text" className="form-control"
            value={inputField.price}
            onChange={handleChange}  name="price" label="Price"/>
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Author:</label>
        <div className="col-sm-10">
            <input type="text" className="form-control"
                value={inputField.author}
                onChange={handleChange} name="author" label="Author" />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Description:</label>
        <div className="col-sm-10">
            <textarea className="form-control"
                value={inputField.description}
                onChange={handleChange} name="description" label="Description" />
        </div>
      </div>
      <div>
        <a href="/books" className="btn btn-sm btn-secondary float-left">Go Back</a>
        <input className="btn btn-sm btn-primary float-right" type="submit" value="Submit" ></input>
      </div>
    </form>
        </TableContainer>
        </Grid>
    </Grid>
          
    </Container>
   </main>
    )
}

export default EditBook
