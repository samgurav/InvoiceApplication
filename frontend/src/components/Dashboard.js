import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import {useState} from 'react'
import {Navbar,Nav,Button} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react'
import { deleteInvoice, Updatepost, fetchproduct } from '../config/Myservice'
import Swal from 'sweetalert2'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const[flag,setFlag]=useState();
  const [refresh, setrefresh] = useState(true)
  const [state, setstate] = useState({
      paymentReceived: 0,
      pendingAmount: 0,
      totalAmount: 0,
      paidInvoice: 0,
      unpaidInvoice: 0,
      totalInvoice: 0,
      invoices: []

  })
  const navigate = useNavigate()
  const toggleDrawer = () => {
    setOpen(!open);
  };

   const logout=(e)=>{
       e.preventDefault();
       setFlag(true)
       localStorage.clear();
       navigate("/login")

   }
  
   const deleteEle = (item) => {
       deleteInvoice(item)
       setrefresh(!refresh)
       Swal.fire({
        icon: 'warning',
        title: 'Are your sure? Do you want to delete the invoice?',
       
      })
   }
   const updateInvoice = (item) => {
       Updatepost(item)
       setrefresh(!refresh)
   }

   useEffect(async () => {
     
       if (localStorage.getItem('user') != undefined) {
           let user = localStorage.getItem('user');
          
           let data = []
           await fetchproduct({ email: user.email }).then(res => {
               data = [...res.data]
               console.log(res.data)
           })
         
           let sumOfTotal = 0;
           let upaid = 0;
           let pamount = 0;
           let totalinvoice = 0;

           data.forEach(ele => {
               console.log(ele)

               totalinvoice += 1
               if (ele.status === 'UNPAID') {
                   upaid += 1
                   console.log('inside status');
                   ele.product.map(item => {
                       sumOfTotal += item.total
                       pamount += item.total


                   })
               }
               else {
                   ele.product.map(item => {
                       sumOfTotal += item.total
                   })

               }

               console.log(sumOfTotal, "Sum of total")




               // setstate({...state,totalAmount:ele.product.total})
           })

           setstate({
               invoices: data,
               paymentReceived: sumOfTotal - pamount,
               pendingAmount: pamount,
               totalAmount: sumOfTotal,
               paidInvoice: totalinvoice - upaid,
               unpaidInvoice: upaid,
               totalInvoice: totalinvoice,
           })
       }
   }, [refresh])
  return (
      <>
       <Navbar bg="light" expand="lg" style={{height:'80px'}}>
  <Container>
    <Navbar.Brand style={{fontSize:'25px',color:'blue',marginRight:'1000px',padding:'20px'}} as={NavLink} to="/"><span style={{color:'red',fontWeight:'bold',fontFamily:'italic'}}>A</span>sians</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto" style={{marginLeft:'1000px'}} >    
      <Nav.Link href="#home" as={NavLink} to="/dashboard" >
        <Button variant="outline-danger" as={NavLink} to="/setting">Profile</Button>{' '}
        </Nav.Link>
        <Nav.Link href="#home" as={NavLink} to="/dashboard" >
        <Button variant="outline-dark" onClick={logout}>Logout</Button>{' '}
        </Nav.Link>
        
      
      
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
     
        <Drawer variant="permanent" open={open}>
        
          <Divider />
          <List style={{height:'100px',paddingTop:'100px',paddingBottom:'50px'}}>
          <Nav.Link href="#home" as={NavLink} to="/dashboard" >
        <Button variant="outline-primary" style={{width:'150px'}}>Dashboard</Button>{' '}
        </Nav.Link>
          </List>
        

          <List style={{height:'100px',paddingTop:'100px',paddingBottom:'50px'}}>
          <Nav.Link href="#home" as={NavLink} to="/invoice" >
        <Button variant="outline-primary" style={{width:'150px'}}>Create Invoice</Button>{' '}
        </Nav.Link>
          </List>
     
       
          <List  style={{height:'100px',paddingTop:'100px',paddingBottom:'50px'}}>
          <Nav.Link href="#home" as={NavLink} to="/setting" >
        <Button variant="outline-primary" style={{width:'150px'}}>Settings</Button>{' '}
        </Nav.Link>
       </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
            <Grid container spacing={2}>
         
              <Grid item xs={12} md={3} lg={4} style={{background:''}}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                   
                  }}
                  style={{background:'#0096FF',color:'white'}}
                >
                      <h5 ><b>Payment Received</b></h5><br/>
                      <h6 >{state.paymentReceived}</h6>
                 
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                   <h5 ><b>Pending Amount</b></h5><br/>
                      <h6 >{state.pendingAmount}</h6>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                  <h5 ><b>Total Amount</b></h5><br/>
                   <h6 >{state.totalAmount}</h6>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                  style={{background:'#008000',color:'white'}}
                >
                   <h5 ><b>Paid Invoice</b></h5><br/>
                   <h6 >{state.paidInvoice}</h6>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                  <h5 ><b>Unpaid Invoice</b></h5><br/>
                   <h6 >{state.unpaidInvoice}</h6>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                   <h5 ><b>Total Invoice</b></h5><br/>
                   <h6 >{state.totalInvoice}</h6>
                 
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <div className="container mt-3">
                <table className='container table'>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Reciever's Name</th>
                            <th>Reciever's Due Date</th>
                            <th>Reciever's email</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>

                    <tbody>
                        {state.invoices.map((ele, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{ele.rname}</td>
                                <td>{ele.rdate}</td>
                                <td>{ele.remail}</td>
                                <td>{ele.status}</td>
                                <td><button className="btn btn-success" onClick={() => navigate('/preview', { state: {user:ele,amount:state.totalAmount}} )}>Preview</button></td>
                                <td><button className="btn btn-warning" onClick={() => updateInvoice(ele)}>Update</button></td>
                                <td><button className="btn btn-danger" onClick={() => deleteEle(ele)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
                </Paper>
              </Grid>
            </Grid>
         
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}