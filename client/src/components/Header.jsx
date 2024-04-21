import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const Header = () => {
    return (
        <header>

            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <LinkContainer to="/">
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <LinkContainer to="/login">
                                <Nav.Link>SignIn</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/register">
                                <Nav.Link >SignUp</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;