// src/ordersList/OrdersListPage.tsx

import React from 'react';
import { Table, Badge, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pl-PL', {
        year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(date);
};

export const OrdersList = () => {
    const { orders } = useOrders();

    return (
        <Container className="my-4">
            <h2>Lista zamówień</h2>
            {orders.length === 0 ? (
                <p className="text-muted">Brak złożonych zamówień na liście.</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Numer Zam.</th>
                            <th>Data</th>
                            <th>Klient</th>
                            <th>Zamówione Produkty</th>
                            <th>Wartość</th>
                            <th>Status</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{formatDate(order.orderDate)}</td>
                                <td>{order.customer.firstName} {order.customer.lastName}</td>
                                <td>
                                    <ul className="list-unstyled mb-0" style={{ fontSize: '0.9em' }}>
                                        {order.items.map(item => (
                                            <li key={`${order.id}-${item.id}`}>
                                                - {item.product.nazwa} ({item.quantity} szt.)
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td><strong>{order.totalAmount.toFixed(2)} zł</strong></td>
                                <td><Badge bg="info" text="dark">{order.status}</Badge></td>
                                <td>
                                    <Button variant="primary" size="sm" as={Link} to={`/OrderChanges/${order.id}`}>
                                        Szczegóły
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