import React from 'react'
import styles from './Home.module.css'
import {Navbar,Nav,Container,Button} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
export const Home = () => {
    return (
        <>

<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand style={{fontSize:'25px',color:'blue'}}><span style={{color:'red',fontWeight:'bold',fontFamily:'italic'}}>A</span>sians</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto" >
        <Nav.Link href="#home" style={{marginLeft:'900px'}} as={NavLink} to="/signup" >
        <Button variant="outline-primary">Get Started</Button>{' '}
        </Nav.Link>
      
      
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        <div className={styles.pageContainer}>
            
        <section className={styles.hero}>
            <h1>Easiest invoicing for freelancers and small businesses</h1>
            <div className={styles.paragraph}>
               
            </div>
            <div className={styles.imgContainer}>
                <img src="https://res.cloudinary.com/almpo/image/upload/v1637241441/special/banner_izy4xm.png" alt="invoicing-app"/>
            </div>
        </section>
    </div>

    <footer style={{background:'#F5F5F5', height:'50px',padding:'10px'}}>

            <div >
            Asian Application by Samiksha Gurav 
            </div>
         
        </footer>
    </>
    )
}
