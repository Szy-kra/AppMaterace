// src/layout/layout.tsx

import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Image, NavDropdown, Nav, Navbar, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

export function Layout() {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar
                bg="dark"
                data-bs-theme="dark"
                expand="lg"
                collapseOnSelect
            >
                <Container fluid className="px-4">
                    <Navbar.Brand as={Link} to="/">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="home-tooltip">HOME</Tooltip>}
                        >
                            <Image src="/image/logo.png" className="logo" />
                        </OverlayTrigger>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/Products">Products</Nav.Link>
                            <NavDropdown title="Orders" id="Order">
                                <NavDropdown.Item as={Link} to="/NewOrder">New Order</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/OrdersList">Orders list</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Customers" id="Customer">
                                <NavDropdown.Item as={Link} to="/NewCustomer">New Customer</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/Customers">Customers</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav>
                            <Button
                                variant="outline-light"
                                size="sm"
                                onClick={toggleTheme}
                                aria-label="Zmień motyw"
                            >
                                {theme === 'light' ? '🌙' : '☀️'}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="flex-grow-1 px-3 py-4">
                <Container fluid>
                    <Outlet />
                </Container>
            </div>

            <footer className="bg-dark text-light py-3 mt-auto">
                <Container fluid className="text-center">
                    © 2025 App customer service
                </Container>
            </footer>
        </div>
    );
}