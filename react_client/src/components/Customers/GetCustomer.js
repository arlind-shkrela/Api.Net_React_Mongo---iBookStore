import React, { Component } from 'react';
import CustomerDataService from '../../services/customer.service';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Title from '../Title';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from "@material-ui/core/styles";
import GetAuthors from '../Authors/GetAuthors';
import AuthorDataService from "../../services/author.service";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Button } from '@material-ui/core';


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
  });
  


class GetCustomer extends Component {
    constructor(props){
        super(props);
        //this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {
            author : [],
        };
    this.DeleteAuthor = this.DeleteAuthor.bind(this);
     
    }   
    openModal = (id) => this.setState({ isOpen: true ,idTobeDeleted : id});
    closeModal = () => this.setState({ isOpen: false });

    componentDidMount(){
        AuthorDataService.getAll()
        .then(response => {
            console.log(response.data);
            this.setState({author : response.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }
    submit = (id) => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Delete',
              onClick: () => this.DeleteAuthor(id)
            },
            {
              label: 'Cancel',
            }
          ]
        });
      };
   

    DeleteAuthor(id){
        AuthorDataService.delete(id)
        .then(response => {
            debugger;
            this.setState({
                author: this.state.author.filter(el => el.id !== id)
            })
        })
        .catch(error=> {
            console.log(error)
        });

       
        return;
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
                   <Title>Lates Customers
                   <Link to={"/customers/add"} className={classes.actionButtons_create}>
                       <AddIcon className={classes.icons_centered}></AddIcon>
                   </Link>
                   </Title>
                 </div>
       
                 <Table className={classes.table} size="small" aria-label="a dense table">
                   <TableHead>
                     <TableRow>
                       <TableCell>First Name</TableCell>
                       <TableCell align="right">Last Name</TableCell>
                       <TableCell align="right"></TableCell>
                     </TableRow>
                   </TableHead>
                   <TableBody>
                {this.state.author &&  this.state.author.map((author) => (
                            <TableRow key={author.id}>
                              <TableCell component="th" scope="row">
                                {author.name}
                              </TableCell>
                              <TableCell align="right">{author.surname}</TableCell>
                              <TableCell align="right">
                              <li className={classes.actionButtons}>
                                <Link to={{pathname:"/customers/view/"+author.id, state:{id:author.id}}} className={classes.actionButtons_view}>
                                   <VisibilityIcon></VisibilityIcon>
                                </Link>
                                <Link to={ {pathname: "/customers/edit/"+author.id, state:{id:author.id}}} className={classes.actionButtons_edit} >
                                   <CreateIcon></CreateIcon>
                                </Link>
                                <Button style={{ backgroundColor: "trasparent" }}  onClick={()=>this.submit(author.id)} className={classes.actionButtons_delete}>
                                    <DeleteIcon></DeleteIcon>
                                </Button>
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
          
        )
    }
}
export default withStyles(styles, { withTheme: true })(GetCustomer);