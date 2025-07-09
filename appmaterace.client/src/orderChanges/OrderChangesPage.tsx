import { Tabs, Tab, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Image, NavDropdown, Nav, Navbar } from 'react-bootstrap';
import * as React from 'react';
import * as ReactDOM from "react-dom/client";


export const OrderChanges = () => {
    return (
        <Container className="my-4">
            <h2>Zarządzanie Produktami</h2>
            <Tabs defaultActiveKey="list" className="mt-3">
                <Tab eventKey="list" title="Lista produktów">
                    <ProductList />
                </Tab>
                <Tab eventKey="config" title="Konfiguracja">
                    <ProductConfig />
                </Tab>
                <Tab eventKey="pricing" title="Cennik">
                    <ProductPricing />
                </Tab>
            </Tabs>
        </Container>
    )
}

