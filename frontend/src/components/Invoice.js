import React,{useState,useRef} from 'react'
import {useNavigate} from 'react-router-dom';
import logo from './logo.png'
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Container,Button,TextField,Typography,Grid,Paper,Avatar} from '@mui/material';
import {registerInvoice} from '../config/Myservice'
import {Navbar,Nav,Card,Form} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {addInvoice} from '../config/Myservice'
function Invoice() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    const paperStyle={padding:20,height:'180vh',width:720,margin:"20px auto"}
    const navigate = useNavigate()
    const [flag, setflag] = useState(false)
    const [productdata, setproductdata] = useState([])
    const itemRef = useRef(null)
    const quantityRef = useRef(null)
    const priceRef = useRef(null)
    const discountRef = useRef(null)
    const rname = useRef(null)
    const raddress = useRef(null)
    const remail = useRef(null)
    const rdate = useRef(null)
    const submitproduct=()=>{
        const newproduct = {
            title:itemRef.current.value, 
            quantity:parseInt(quantityRef.current.value), 
            price: parseInt(priceRef.current.value), 
            discount: parseInt(discountRef.current.value),
            total: ((priceRef.current.value - (priceRef.current.value * discountRef.current.value / 100)) * quantityRef.current.value)
        }
        if(newproduct.total > 0){
            setproductdata([...productdata, newproduct])
            setflag(false)
        }
        else{
            alert('Invoice total is 0')
            setflag(false)
        }
    }

    const submitdata=()=>{
    
        const newdata = {
            rname: rname.current.value,
            remail: remail.current.value,
            raddress: raddress.current.value,
            rdate: rdate.current.value,
            product: productdata,
            status:'UNPAID'
        }
        addInvoice(newdata).then(res=>{
            console.log(res.data)
        })
        navigate('/dashboard')
        
    }
    return (
        <>
             <Navbar bg="light" expand="lg" style={{height:'80px'}}>
  <Container>
    <Navbar.Brand style={{fontSize:'25px',color:'blue',marginRight:'1000px',padding:'20px'}} as={NavLink} to="/"><span style={{color:'red',fontWeight:'bold',fontFamily:'italic'}}>A</span>sians</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto" style={{marginLeft:'1000px'}} >    
      <Nav.Link href="#home" as={NavLink} to="/setting" >
        <Button variant="outline-danger">Profile</Button>{' '}
        </Nav.Link>
        <Nav.Link href="#home" as={NavLink} to="/login" >
        <Button variant="outline-dark">Logout</Button>{' '}
        </Nav.Link>
        
      
      
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
           <Container><br/>
                    <Grid>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid style={{float:'left'}} >
                                <img src={logo} style={{heigth:100,width:100}}/>
                            </Grid>
                        <Grid style={{float:'right'}}>
                            <h1>INVOICE</h1>
                            <hr/>
                        </Grid><br/><br/><br/><br/>
                        <Grid style={{marginRight:'500px',marginBottom:'20px'}}>
                            <Typography>BILL TO:</Typography>
                            <TextField id="receivername" label="Receiver Name" name="rname" variant="outlined" className='label'inputRef={rname} ></TextField>
                     
                           <TextField id="receiveraddress" label="Receiver Address" name="raddress" variant="outlined" className='label' inputRef={raddress}></TextField>
                   
                        </Grid>
                    <Grid style={{float:'right'}}>
                    <Stack component="form" noValidate spacing={3} >
                      <p>STATUS: <span style={{color:'red',fontFamily:'bold',fontSize:'20px'}}><b>UNPAID</b></span></p>
                      <p>Email</p>
                      <TextField id="receiveraddress" label="Receiver Email" name="remail" variant="outlined" className='label' inputRef={remail}></TextField>
                     <p> DATE</p>
                      <TextField id="receiveraddress" label="Enter Date" name="rdate" type="date" variant="outlined" className='label' inputRef={rdate}></TextField>
                <br/>

                    </Stack>
                    </Grid><br/><br/><br/><br/><br/><br/><br/>
                   
                    <Grid>
                    <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr No</StyledTableCell>
            <StyledTableCell>Item Name</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Discount</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
        {productdata.map((ele, index)=>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">{index+1} </StyledTableCell>
              <StyledTableCell align="right">{ele.title} </StyledTableCell>
              <StyledTableCell align="right">{ele.quantity} </StyledTableCell>
              <StyledTableCell align="right">{ele.price} </StyledTableCell>
              <StyledTableCell align="right">{ele.discount} </StyledTableCell>
              <StyledTableCell align="right">{ele.total} </StyledTableCell>
             
            </StyledTableRow>
              )}
        </TableBody>
      </Table>
    </TableContainer>
    {flag ? <>
           <div className="container">
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" name="item"placeholder="Item" aria-label="Item" ref={itemRef}/>
                </div>
                <div class="col">
                    <input type="text" class="form-control" name="quantity"placeholder="quantity" aria-label="Last name" ref={quantityRef}/>
                </div>
                <div class="col">
                    <input type="text" class="form-control" name="price"placeholder="price" aria-label="price" ref={priceRef}/>
                </div>
                <div class="col">
                    <input type="text" class="form-control" name="discount"placeholder="discount" aria-label="discount" ref={discountRef}/>
                </div>
               
            </div>
            <br/>
            <button onClick={()=> submitproduct()} className='btn btn-info' >Submit Product</button>
            <br/>
           
            </div>
            </>  : <div className='text-center mt-3'>
                <br/>
            <button onClick={()=> setflag(true)} className='btn btn-primary' >Add Product</button>
            </div>}
            <br/><br/>
            <button onClick={()=> submitdata()} className='btn btn-success' >Submit</button>
            <br/>
    
                    </Grid>
                    </Paper>
                    </Grid>
                    </Container>
        </>
    )
}

export default Invoice
