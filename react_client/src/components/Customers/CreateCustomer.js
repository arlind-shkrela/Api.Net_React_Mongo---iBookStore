import React, { Component } from 'react';
import AuthorDataService from '../../services/author.service';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Title from '../Title';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";




const styles = theme => ({
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
    }
  });
  

class CreateCustomer extends Component {
    constructor(props){
        super(props);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);

        this.submitButton =this.submitButton.bind(this);

        this.state = {
            firstName :'',
            lastName:''
        }
    }

    handleFirstNameChange(e){
        this.setState({
            firstName:e.target.value
        })
    }  
    handleLastNameChange(e){
        this.setState({
            lastName:e.target.value
        })
    }

    submitButton(e){
        debugger;
        var data = {
          Name : this.state.firstName,
          Surname: this.state.lastName
        }

        AuthorDataService.create(data).then(res => {
            console.log(res);
            debugger;
            window.location("/customers")
            console.log(res.data);
          })
          .catch(error => {
            this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
             <Grid container spacing={3}>
             <Grid item xs={12} >
               <TableContainer component={Paper} className={classes.sm_padding}>
                 <div className={classes.gridHeader}>
                   <Title>Create Customer</Title> 
                 </div>
       
           <form onSubmit={e => { this.submitButton(e) }}>
               <div className="mb-3 row">
                 <label className="col-sm-2 col-form-label">First Name:</label>
                 <div className="col-sm-10">
                   <input type="text" className="form-control"
                   onChange={this.handleFirstNameChange} value={this.state.firstName} name="firstName" label="First Name"/>
               </div>
             </div>
       
             <div className="mb-3 row">
               <label className="col-sm-2 col-form-label">Last Name:</label>
               <div className="col-sm-10">
               <input type="text" className="form-control"
                   value={this.state.lastName}
                   onChange={this.handleLastNameChange}  name="lastName" label="Last Name"/>
               </div>
             </div>
             <div>
             <div>
               <a href="/authors" className="btn btn-sm btn-secondary float-left">Go Back</a>
               <input className="btn btn-sm btn-primary float-right" type="submit" value="Submit" ></input>
             </div>
             </div>
           </form>
               </TableContainer>
               </Grid>
           </Grid>
                 
           </Container>
          </main>
        )
    }
}


export default withStyles(styles, { withTheme: true })(CreateCustomer);