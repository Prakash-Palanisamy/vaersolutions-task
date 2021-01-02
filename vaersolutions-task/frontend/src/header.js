import {Navbar, Nav, NavDropdown,  } from 'react-bootstrap'

const Header = (props) => {
    let email = localStorage.getItem('email');
    return(
        <div >
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/home">Logo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                           
                        </Nav>
                        <Nav>
                        <NavDropdown title={email} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#" onClick={()=>{
                                    window.location.href = 'profile';
                                }}>View Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#" onClick={()=>{
                                    localStorage.clear()
                                    window.location.href = 'login';
                                }}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
            
        </div>

        
       
    )
}

export default Header;