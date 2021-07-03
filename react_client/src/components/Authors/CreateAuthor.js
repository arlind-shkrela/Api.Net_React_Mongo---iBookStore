import React,  { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Title from '../Title';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import AuthorDataService from '../../services/author.service';



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
  }));

function CreateAuthor() {
    const classes = useStyles();
    const [inputField , setInputField] = useState({
        firstName: '',
        lastName: ''
    })

    const inputsHandler = (e) =>{
        setInputField( {[e.target.name]: e.target.value} )
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        debugger;
        AuthorDataService.create();
   
       
    }
    const submitButton = () =>{
        debugger;
        AuthorDataService.create();
       
    }



    return (
        <main className={classes.content}>
     <div className={classes.appBarSpacer} />
     <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
      <Grid item xs={12} >
        <TableContainer component={Paper} className={classes.sm_padding}>
          <div className={classes.gridHeader}>
            <Title>Create Author</Title> 
          </div>

    <form onSubmit={e => { handleSubmit(e) }}>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">First Name:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control"
            onChange={inputsHandler} value={inputField.firstName} name="firstName" label="First Name"/>
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Last Name:</label>
        <div className="col-sm-10">
        <input type="text" className="form-control"
            value={inputField.lastName}
            onChange={inputsHandler}  name="lastName" label="Last Name"/>
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

export default CreateAuthor;
