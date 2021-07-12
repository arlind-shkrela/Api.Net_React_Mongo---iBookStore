import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Title from '../Title';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import AuthorDataService from '../../services/author.service';


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



function ViewAuthor(props) {
    const classes = useStyles();

    const [inputField , setInputField] = useState({
      name: '',
      surname: ''
    })
    useEffect(() => {
        const id = props.match.params.id;
        AuthorDataService.get(id)
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
            <Title>View Author</Title>
          </div>

        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">First Name:</label>
          <label className="col-sm-10"> {inputField.name}</label>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Last Name:</label>
        <label className="col-sm-10">{inputField.surname}</label>
      </div>
      <div>
        <a href="/authors" className="btn btn-sm btn-secondary float-left">Go Back</a>
      </div>
        </TableContainer>
        </Grid>
    </Grid>

    </Container>
   </main>
    )
}


export default ViewAuthor
