import React from 'react'
import {Navbar,Nav,Button,Container,Card,Form} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
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
import  {useEffect, useState ,useRef} from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import Link from '@mui/material/Link';
import { getSetting, addsetting, getPosts } from '../config/Myservice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const user = JSON.parse(localStorage.getItem('user'))

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

function Settings() {
    const [open, setOpen] = React.useState(true);
    const titleRef = useRef(null)
    const addressRef = useRef(null)
    const [user,setUser] = useState([])
    const [data, setdata] = useState([])
  const toggleDrawer = () => {
    setOpen(!open);
  }

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    setUser(user)
},[])

console.log(getSetting)

useEffect(() => {
  getPosts().then(res => {
        console.log(res.data)
        setdata(res.data)
    })
},[])
  
const add=()=>{
    if( titleRef.current.value!=="" & addressRef.current.value!==""){
    addsetting({"email":user.email,"title":titleRef.current.value,"address":addressRef.current.value}).then(res=>{
        alert(res.data.msg)
    })
}

}

    return (
        <>
     <Navbar bg="light" expand="lg" style={{height:'80px'}}>
     <Container>
    <Navbar.Brand style={{fontSize:'25px',color:'blue',marginRight:'1000px',padding:'20px'}} as={NavLink} to="/"><span style={{color:'red',fontWeight:'bold',fontFamily:'italic'}}>A</span>sians</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto" style={{marginLeft:'1000px'}} >    
      
        
      
      
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
     
        <Card className="text-center" style={{ height:'550px',textAlign:'center',paddingTop:'10px',width:'1200px'}}>
        <Card.Header style={{fontSize:'50px'}}><b>  Profile</b></Card.Header>
     
          

             <Card.Body>
            <Card.Title>Welcome <b>{JSON.parse(localStorage.getItem('user')).fname} {JSON.parse(localStorage.getItem('user')).lname}</b></Card.Title>
            <TableContainer component={Paper} style={{marginTop:'30px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>sr.No</TableCell>
            <TableCell align="right">Company Name</TableCell>
            <TableCell align="right">Contact Email</TableCell>
            <TableCell align="right">Address of the Company</TableCell>

          </TableRow>
        </TableHead>
      <TableBody>
      {data.map((ele, index) =>
            <TableRow
        
            >
             
              <TableCell align="right">{index+1}</TableCell>
              <TableCell align="right">{ele.title}</TableCell>
              <TableCell align="right">{ele.email}</TableCell>
              <TableCell align="right">{ele.address}</TableCell>
            
          
            </TableRow>
          )}
      </TableBody>
      </Table>
    </TableContainer>

            <Box component="form" required  sx={{ mt: 3 }} enctype='multipart/form-data'>
            <Grid container spacing={2}>
            
            <Grid item xs={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
   
    <Form.Control type="email"  value={user.email} readOnly/>
   
  </Form.Group>
              
              </Grid>
         
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Company Name"
                  name="title"
                  autoComplete="title"
                 
                  inputRef={titleRef}
                />
              
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Enter Address"
                  type="text"
                  id="address"
                  autoComplete="address"
              
                  inputRef={addressRef}
                />
                 </Grid>
           
            </Grid>
           <br/>
            <Button
              type="submit"
              fullWidth
              style={{background:'blue', color:'white'}}
              sx={{ mt: 3, mb: 2 }}
              onClick={add}
            >
              Update
            </Button>
    
         
           <br/>
            <Grid container justifyContent="flex-end">
              <Grid item>
             
              </Grid>
            </Grid>
          </Box>
         
        </Card.Body>
     
        </Card>
      </Box>
    </ThemeProvider>
        </>
    )
}

export default Settings
