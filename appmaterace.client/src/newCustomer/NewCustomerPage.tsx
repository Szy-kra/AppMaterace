import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../context/CustomerContext';

export const NewCustomer = () => {
    const { addCustomer } = useCustomers();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phonePrefix: '+48',
        phoneNumber: '',
        address: '',
        nip: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'nip') {
            const digitsOnly = /^[0-9]*$/;
            if (digitsOnly.test(value) && value.length <= 10) {
                setFormData({ ...formData, [name]: value });
            }
            return;
        }

        if (name === 'phoneNumber') {
            const digitsOnly = /^[0-9]*$/;
            if (digitsOnly.test(value) && value.length <= 9) {
                setFormData({ ...formData, [name]: value });
            }
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleClear = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phonePrefix: '+48',
            phoneNumber: '',
            address: '',
            nip: ''
        });
    };

    const handleSave = () => {
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.address.trim() || !formData.nip.trim() || !formData.phoneNumber.trim()) {
            alert('Wszystkie pola są wymagane. Proszę uzupełnić cały formularz.');
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Proszę podać poprawny format adresu email (np. nazwa@domena.pl).');
            return;
        }

        if (formData.phoneNumber.length !== 9) {
            alert('Numer telefonu musi składać się z dokładnie 9 cyfr.');
            return;
        }
        if (formData.nip.length !== 10) {
            alert('NIP musi składać się z dokładnie 10 cyfr.');
            return;
        }

        const customerToSave = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: `${formData.phonePrefix} ${formData.phoneNumber}`,
            address: formData.address,
            nip: formData.nip,
        };

        addCustomer(customerToSave);
        alert(`Klient ${formData.firstName} ${formData.lastName} został pomyślnie dodany!`);
        handleClear();
        navigate('/Customers');
    };

    return (
        <Container className="my-4">
            <h2>Nowy Klient</h2>
            <Form className="mt-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <Form.Group className="mb-3">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Telefon</Form.Label>
                    <Row>
                        <Col xs="auto" style={{ paddingRight: 0 }}>
                            <Form.Select name="phonePrefix" value={formData.phonePrefix} onChange={handleChange}>
                                <option value="+48">+48 (PL)</option>
                                <option value="+49">+49 (DE)</option>
                                <option value="+420">+420 (CZ)</option>
                                <option value="+421">+421 (SK)</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                placeholder="123456789"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Adres</Form.Label>
                    <Form.Control as="textarea" rows={3} name="address" value={formData.address} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>NIP</Form.Label>
                    <Form.Control
                        type="text"
                        name="nip"
                        placeholder="Tylko cyfry"
                        value={formData.nip}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                        Zapisz
                    </Button>
                    <Button variant="secondary" onClick={handleClear} type="button">
                        Wyczyść
                    </Button>
                </div>
            </Form>
        </Container>
    );
};