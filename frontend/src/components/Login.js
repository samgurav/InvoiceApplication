import React from 'react'
import {Navbar,Nav,Container,Button} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState ,useRef,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts,addPost } from '../config/Myservice';
const paperStyle={padding:20,height:'80vh', width:500, margin:'20px auto'}
const theme=createTheme();
function Login() {
    const navigate = useNavigate()
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [state, setstate] = useState([])
    const [flag, setFlag] = useState(false)
  
    useEffect(()=>{
        getPosts().then(res=>{
          setstate(res.data)
          console.log(res.data)
          
        })
      },[])

      const checkdata=(event)=>{
          event.preventDefault()
          let flag=true
          let email=emailRef.current.value;
          let password=passwordRef.current.value;
          
          state.forEach(ele=>{
            if(email===ele.email && password===ele.password){
                localStorage.setItem('user',JSON.stringify(ele))
                localStorage.setItem('data',JSON.stringify([]))
                flag=false
                alert("Login Succesfully")
                navigate("/dashboard")
            }
        })
        if(flag){
          alert("Email or Password does not match")
        }
      }

    
    return (
        <>
                   
 <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand style={{fontSize:'25px',color:'blue'}} as={NavLink} to="/"><span style={{color:'red',fontWeight:'bold',fontFamily:'italic'}}>A</span>sians</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto" >
        <Nav.Link href="#home" style={{marginLeft:'880px'}} as={NavLink} to="/signup" >
        <Button variant="outline-primary">Get Started</Button>{' '}
        </Nav.Link>
      
      
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar> 
<Paper elevation={10} style={paperStyle }>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop:3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
          
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" required onSubmit={checkdata} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            
             
            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                 
                  inputRef={emailRef}
                />
              
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
              
                  inputRef={passwordRef}
                />
                 </Grid>
           
            </Grid>
           <br/>
            <Button
              type="submit"
              fullWidth
              style={{background:'blue', color:'white'}}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
    
         
           <br/>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2" style={{marginRight:'120px',marginTop:'10px'}}>
                 New user? Create New Account 
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    </Paper>
    <footer style={{background:'#F5F5F5', height:'50px',padding:'10px'}}>

<div >
Asian Application by Samiksha Gurav 
</div>

</footer>
        </>
    )
}

export default Login
