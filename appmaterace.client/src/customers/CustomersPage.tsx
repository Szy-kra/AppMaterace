import React from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useCustomers } from '../context/CustomerContext';

export const Customers = () => {
    const { customers, deleteCustomer } = useCustomers();

    const handleDelete = (customerId: number, customerName: string) => {
        if (window.confirm(`Czy na pewno chcesz usunąć klienta: ${customerName}?`)) {
            deleteCustomer(customerId);
        }
    };

    return (
        <Container className="my-4">
            <h2>Lista klientów</h2>
            {customers.length === 0 ? (
                <p>Brak klientów na liście.</p>
            ) : (
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Email</th>
                            <th>Telefon</th>
                            <th>Adres</th>
                            <th>NIP</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>{customer.nip}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(customer.id, `${customer.firstName} ${customer.lastName}`)}
                                    >
                                        Usuń
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};