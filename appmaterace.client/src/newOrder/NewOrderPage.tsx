// src/newOrder/NewOrderPage.tsx

import React, { useState, useMemo, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    CustomerType,
    ProductType,
    allProducts,
    comfortTypes,
    coverColors,
    sizes
} from '../types/types';
import { generatePriceListRows } from '../calculatePrice/CalculatePrice';
import { useOrders, OrderItem } from '../context/OrderContext';
import { useCustomers } from '../context/CustomerContext';

interface PriceListRow {
    id: number;
    nazwaMateraca: string;
    rozmiar: string;
    kolorPokrowca: string;
    twardoscWkladu: string;
    cena: number;
}

export const NewOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addOrder } = useOrders();
    const { customers } = useCustomers();

    const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(null);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
    const [selectedMattressName, setSelectedMattressName] = useState<string>('');
    const [selectedComfortType, setSelectedComfortType] = useState<string>('Średni');
    const [selectedCoverColor, setSelectedCoverColor] = useState<string>('Biały');
    const [selectedSize, setSelectedSize] = useState<string>('80x200');
    const [quantity, setQuantity] = useState<number>(1);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [orderTotal, setOrderTotal] = useState<number>(0);

    const allPriceListRows: PriceListRow[] = useMemo(() => generatePriceListRows(), []);

    const currentSelectedCennikEntry = useMemo(() => {
        return allPriceListRows.find(row =>
            row.nazwaMateraca === selectedMattressName &&
            row.twardoscWkladu === selectedComfortType &&
            row.kolorPokrowca === selectedCoverColor &&
            row.rozmiar === selectedSize
        );
    }, [selectedMattressName, selectedComfortType, selectedCoverColor, selectedSize, allPriceListRows]);

    const currentCalculatedUnitPrice = useMemo(() => {
        return currentSelectedCennikEntry ? currentSelectedCennikEntry.cena : 0;
    }, [currentSelectedCennikEntry]);

    const currentTotalItemPrice = useMemo(() => {
        return currentCalculatedUnitPrice * quantity;
    }, [currentCalculatedUnitPrice, quantity]);

    useEffect(() => {
        if (location.state) {
            const { productRaw, productSelectedComfort, productSelectedColor, productSelectedSize } = location.state as any;
            setSelectedMattressName(productRaw.nazwa);
            setSelectedComfortType(productSelectedComfort === 'miekki' ? 'Miękki' : (productSelectedComfort === 'sredni' ? 'Średni' : 'Twardy'));
            setSelectedCoverColor(productSelectedColor);
            setSelectedSize(productSelectedSize);
            setQuantity(1);
            if (window.history.replaceState) {
                window.history.replaceState({}, document.title, location.pathname);
            }
        }
    }, [location.state]);

    useEffect(() => {
        const total = orderItems.reduce((sum, item) => sum + item.totalItemPrice, 0);
        setOrderTotal(total);
    }, [orderItems]);

    const handleCustomerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(e.target.value);
        setSelectedCustomerId(e.target.value);
        const customer = customers.find(c => c.id === id);
        setSelectedCustomer(customer || null);
    };

    const addProductToOrder = () => {
        if (!selectedMattressName || quantity <= 0 || !currentSelectedCennikEntry) {
            alert('Proszę wybrać pełną konfigurację produktu.');
            return;
        }
        const fullProduct = allProducts.find(p => p.nazwa === selectedMattressName);
        if (!fullProduct) return;

        const newItem: OrderItem = {
            id: currentSelectedCennikEntry.id,
            product: fullProduct,
            selectedComfort: selectedComfortType === 'Miękki' ? 'miekki' : (selectedComfortType === 'Średni' ? 'sredni' : 'twardy'),
            selectedColor: selectedCoverColor,
            selectedSize: selectedSize,
            quantity: quantity,
            itemCalculatedPrice: currentCalculatedUnitPrice,
            totalItemPrice: currentTotalItemPrice,
            displayPrice: `${currentCalculatedUnitPrice.toFixed(2)} zł`,
            totalDisplayPrice: `${currentTotalItemPrice.toFixed(2)} zł`,
        };
        setOrderItems(prev => [...prev, newItem]);
        setSelectedMattressName('');
        setQuantity(1);
    };

    const removeOrderItem = (id: number) => {
        setOrderItems(prev => prev.filter(item => item.id !== id));
    };

    const handleSubmitOrder = () => {
        if (!selectedCustomer || orderItems.length === 0) {
            alert('Proszę wybrać klienta i dodać produkty do zamówienia.');
            return;
        }
        const orderData = {
            customer: selectedCustomer,
            items: orderItems,
            totalAmount: orderTotal,
        };

        addOrder(orderData);
        alert(`Zamówienie dla klienta ${selectedCustomer.firstName} ${selectedCustomer.lastName} złożone!`);
        navigate('/OrdersList');
    };

    return (
        <Container className="my-4">
            <h2>Nowe Zamówienie</h2>
            <Row className="mb-4">
                <Col>
                    <h3>1. Wybór Klienta</h3>
                    <Form.Group className="mb-3">
                        <Form.Label>Wybierz Klienta:</Form.Label>
                        <Form.Select value={selectedCustomerId} onChange={handleCustomerSelect}>
                            <option value="">-- Wybierz klienta --</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.firstName} {customer.lastName} (NIP: {customer.nip})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    {selectedCustomer && (
                        <div className="border p-3 rounded bg-light">
                            <h5>Wybrany Klient:</h5>
                            <p><strong>{selectedCustomer.firstName} {selectedCustomer.lastName}</strong></p>
                            <Button variant="outline-danger" size="sm" onClick={() => { setSelectedCustomer(null); setSelectedCustomerId(''); }}>Zmień klienta</Button>
                        </div>
                    )}
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <h3>2. Dodaj Produkty</h3>
                    <Row className="mb-3 g-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Nazwa Materaca:</Form.Label>
                                <Form.Select value={selectedMattressName} onChange={(e) => setSelectedMattressName(e.target.value)}>
                                    <option value="">-- Wybierz materac --</option>
                                    {[...new Set(allProducts.map(p => p.nazwa))].sort().map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Twardość Wkładu:</Form.Label>
                                <Form.Select value={selectedComfortType} onChange={(e) => setSelectedComfortType(e.target.value)}>
                                    {comfortTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Kolor Pokrowca:</Form.Label>
                                <Form.Select value={selectedCoverColor} onChange={(e) => setSelectedCoverColor(e.target.value)}>
                                    {coverColors.map(color => <option key={color} value={color}>{color}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Rozmiar:</Form.Label>
                                <Form.Select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                                    {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Ilość sztuk:</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="d-flex align-items-end">
                            <Button variant="success" onClick={addProductToOrder} disabled={!selectedMattressName || quantity <= 0}>
                                Dodaj do zamówienia
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <h3>3. Pozycje Zamówienia</h3>
                    {orderItems.length === 0 ? (
                        <p>Brak produktów w zamówieniu.</p>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Lp.</th>
                                    <th>Produkt</th>
                                    <th>Konfiguracja</th>
                                    <th>Ilość</th>
                                    <th>Cena jedn.</th>
                                    <th>Cena całk.</th>
                                    <th>Akcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.product.nazwa}</td>
                                        <td>
                                            Twardość: {item.selectedComfort}, Kolor: {item.selectedColor}, Rozmiar: {item.selectedSize}
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>{item.displayPrice}</td>
                                        <td>{item.totalDisplayPrice}</td>
                                        <td>
                                            <Button variant="danger" size="sm" onClick={() => removeOrderItem(item.id)}>Usuń</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan={6} className="text-end">Suma do zapłaty:</th>
                                    <th>{orderTotal.toFixed(2)} zł</th>
                                </tr>
                            </tfoot>
                        </Table>
                    )}
                </Col>
            </Row>

            <Row>
                <Col className="text-center">
                    <Button variant="primary" size="lg" onClick={handleSubmitOrder} disabled={!selectedCustomer || orderItems.length === 0}>
                        Złóż Zamówienie
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};