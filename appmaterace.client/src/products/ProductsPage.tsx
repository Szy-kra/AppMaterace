// src/products/ProductsPage.tsx

import React, { useState, useMemo } from 'react';
import { Table, Button, Container, Form, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { allProducts as products, comfortTypes, coverColors, sizes, basePrices } from '../types/types';
import { calculatePrice, generatePriceListRows } from '../calculatePrice/CalculatePrice';

export const Products = () => {
    const [selectedProductOptions, setSelectedProductOptions] = useState<Record<string, { kolor: string; rozmiar: string }>>(
        products.reduce((acc, prod) => {
            acc[prod.idProd] = { kolor: 'Biały', rozmiar: '80x200' };
            return acc;
        }, {} as Record<string, { kolor: string; rozmiar: string }>)
    );

    const [comfortLevels, setComfortLevels] = useState<Record<string, 'miekki' | 'sredni' | 'twardy'>>(
        products.reduce((acc, prod) => {
            acc[prod.idProd] = 'sredni';
            return acc;
        }, {} as Record<string, 'miekki' | 'sredni' | 'twardy'>)
    );

    const [filters, setFilters] = useState({
        nazwaMateraca: '',
        rozmiar: '',
        kolorPokrowca: '',
        twardoscWkladu: ''
    });

    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const renderSpecLine = (label: string, value: string) => {
        if (value === 'tak') {
            return <div key={label}>{label}: ✅</div>;
        }
        return null;
    };

    const handleComfortChange = (idProd: string, newComfort: 'miekki' | 'sredni' | 'twardy') => {
        setComfortLevels(prev => ({ ...prev, [idProd]: newComfort }));
    };

    const handleProductOptionChange = (idProd: string, optionType: 'kolor' | 'rozmiar', value: string) => {
        setSelectedProductOptions(prev => ({
            ...prev,
            [idProd]: {
                ...prev[idProd],
                [optionType]: value
            }
        }));
    };

    const allPriceListRows = useMemo(() => generatePriceListRows(), []);

    const filteredRows = useMemo(() => {
        return allPriceListRows.filter(row => {
            return (
                (filters.nazwaMateraca === '' || row.nazwaMateraca === filters.nazwaMateraca) &&
                (filters.rozmiar === '' || row.rozmiar === filters.rozmiar) &&
                (filters.kolorPokrowca === '' || row.kolorPokrowca === filters.kolorPokrowca) &&
                (filters.twardoscWkladu === '' || row.twardoscWkladu === filters.twardoscWkladu)
            );
        });
    }, [allPriceListRows, filters]);

    const sortedAndFilteredRows = useMemo(() => {
        if (!sortBy) {
            return filteredRows;
        }

        const sorted = [...filteredRows].sort((a, b) => {
            const aValue = a[sortBy as keyof typeof a];
            const bValue = b[sortBy as keyof typeof b];

            if (sortBy === 'cena') {
                const priceA = a.cena;
                const priceB = b.cena;
                return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
            } else if (sortBy === 'rozmiar') {
                const [widthA, lengthA] = String(aValue).split('x').map(Number);
                const [widthB, lengthB] = String(bValue).split('x').map(Number);
                const areaA = widthA * lengthA;
                const areaB = widthB * lengthB;
                return sortOrder === 'asc' ? areaA - areaB : areaB - areaA;
            }

            if (String(aValue) < String(bValue)) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (String(aValue) > String(bValue)) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
        return sorted;
    }, [filteredRows, sortBy, sortOrder]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const getPriceForDisplay = (mattressName: string, size: string, comfort: 'miekki' | 'sredni' | 'twardy', color: string): string => {
        const comfortMap = {
            miekki: 'Miękki',
            sredni: 'Średni',
            twardy: 'Twardy',
        };
        const price = calculatePrice(mattressName, size, comfortMap[comfort], color);
        return `${price} zł`;
    }

    return (
        <Container className="my-4">
            <h2>Produkty i Cennik</h2>
            <Tabs defaultActiveKey="produkty" className="mb-3" fill>
                <Tab eventKey="produkty" title="Produkty">
                    <Table striped bordered hover responsive="sm">
                        <thead>
                            <tr>
                                <th style={{ width: '50%' }}>Nazwa</th>
                                <th style={{ width: '16.67%' }}>Kategoria</th>
                                <th style={{ width: '33.33%' }}>Specyfikacja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(prod => {
                                const selectedComfort = comfortLevels[prod.idProd];
                                const currentProductOptions = selectedProductOptions[prod.idProd];
                                const komfortValue = prod.specyfikacja.komfortOptions
                                    ? prod.specyfikacja.komfortOptions[selectedComfort]
                                    : prod.specyfikacja.komfort;
                                const currentPrice = getPriceForDisplay(
                                    prod.nazwa,
                                    currentProductOptions.rozmiar,
                                    selectedComfort,
                                    currentProductOptions.kolor
                                );

                                return (
                                    <React.Fragment key={prod.idProd}>
                                        <tr>
                                            <td style={{ width: '50%' }}>
                                                {prod.nazwa}
                                                <br />
                                                <img src={prod.imageSrc} alt={prod.nazwa} style={{ maxWidth: '350px', height: 'auto', marginTop: '5px' }} />
                                            </td>
                                            <td style={{ width: '16.67%' }}>{prod.rodzajProd}</td>
                                            <td style={{ width: '33.33%' }}>
                                                <div><strong>Konstrukcja:</strong> {prod.specyfikacja.konstrukcja}</div>
                                                <div><strong>Warstwy:</strong> {prod.specyfikacja.warstwy}</div>
                                                <div><strong>Komfort:</strong> {komfortValue}</div>
                                                <div><strong>Cechy:</strong> {prod.specyfikacja.cechy}</div>
                                                {renderSpecLine('bonel', prod.specyfikacja.bonel)}
                                                {renderSpecLine('kieszeniowe', prod.specyfikacja.kieszeniowe)}
                                                {renderSpecLine('multipocket', prod.specyfikacja.multipocket)}
                                                {renderSpecLine('piankaPU', prod.specyfikacja.piankaPU)}
                                                {renderSpecLine('termo', prod.specyfikacja.termo)}
                                                {renderSpecLine('lateks', prod.specyfikacja.lateks)}
                                                {renderSpecLine('hybryda', prod.specyfikacja.hybryda)}
                                                {renderSpecLine('sprezynaMiekka', prod.specyfikacja.sprezynaMiekka)}
                                                {renderSpecLine('sprezynaTwarda', prod.specyfikacja.sprezynaTwarda)}
                                                {renderSpecLine('piankaMiekka', prod.specyfikacja.piankaMiekka)}
                                                {renderSpecLine('piankaTwarda', prod.specyfikacja.piankaTwarda)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}>
                                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 p-2 border-top">
                                                    <div>
                                                        <strong>Komfort:</strong>
                                                        <Form.Select
                                                            className="ms-2 d-inline-block w-auto"
                                                            value={selectedComfort}
                                                            onChange={(e) => handleComfortChange(prod.idProd, e.target.value as 'miekki' | 'sredni' | 'twardy')}
                                                        >
                                                            <option value="miekki">Miękki</option>
                                                            <option value="sredni">Średni</option>
                                                            <option value="twardy">Twardy</option>
                                                        </Form.Select>
                                                    </div>
                                                    <div>
                                                        <strong>Kolor pokrowca:</strong>
                                                        <Form.Select
                                                            className="ms-2 d-inline-block w-auto"
                                                            value={currentProductOptions.kolor}
                                                            onChange={(e) => handleProductOptionChange(prod.idProd, 'kolor', e.target.value)}
                                                        >
                                                            {coverColors.map(color => (
                                                                <option key={color} value={color}>{color}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                    <div>
                                                        <strong>Rozmiar:</strong>
                                                        <Form.Select
                                                            className="ms-2 d-inline-block w-auto"
                                                            value={currentProductOptions.rozmiar}
                                                            onChange={(e) => handleProductOptionChange(prod.idProd, 'rozmiar', e.target.value)}
                                                        >
                                                            {sizes.map(size => (
                                                                <option key={size} value={size}>{size}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </div>
                                                    <div className="fw-bold fs-5 d-flex align-items-center">
                                                        Cena: {currentPrice}
                                                        <img
                                                            src="/image/icone.png"
                                                            alt="Dodaj do koszyka"
                                                            style={{ width: '24px', height: '24px', marginLeft: '8px', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </Table>
                </Tab>

                <Tab eventKey="cennik" title="Cennik">
                    <Form className="mb-3">
                        <Row className="g-2">
                            <Col md={3}>
                                <Form.Group controlId="filterNazwaMateraca">
                                    <Form.Label className="visually-hidden">Filtruj nazwę materaca</Form.Label>
                                    <Form.Select
                                        name="nazwaMateraca"
                                        value={filters.nazwaMateraca}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Wszystkie materace</option>
                                        {[...new Set(allPriceListRows.map(row => row.nazwaMateraca))].sort().map(name => (
                                            <option key={name} value={name}>{name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="filterRozmiar">
                                    <Form.Label className="visually-hidden">Filtruj rozmiar</Form.Label>
                                    <Form.Select
                                        name="rozmiar"
                                        value={filters.rozmiar}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Wszystkie rozmiary</option>
                                        {[...new Set(allPriceListRows.map(row => row.rozmiar))].sort((a, b) => {
                                            const [widthA, lengthA] = a.split('x').map(Number);
                                            const [widthB, lengthB] = b.split('x').map(Number);
                                            if (widthA !== widthB) return widthA - widthB;
                                            return lengthA - lengthB;
                                        }).map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="filterKolorPokrowca">
                                    <Form.Label className="visually-hidden">Filtruj kolor pokrowca</Form.Label>
                                    <Form.Select
                                        name="kolorPokrowca"
                                        value={filters.kolorPokrowca}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Wszystkie kolory</option>
                                        {coverColors.map(color => (
                                            <option key={color} value={color}>{color}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="filterTwardoscWkladu">
                                    <Form.Label className="visually-hidden">Filtruj twardość wkładu</Form.Label>
                                    <Form.Select
                                        name="twardoscWkladu"
                                        value={filters.twardoscWkladu}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Wszystkie twardości</option>
                                        {comfortTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>

                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Lp.</th>
                                <th onClick={() => handleSort('nazwaMateraca')} style={{ cursor: 'pointer' }}>
                                    Nazwa materaca {sortBy === 'nazwaMateraca' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                                </th>
                                <th onClick={() => handleSort('rozmiar')} style={{ cursor: 'pointer' }}>
                                    Rozmiar {sortBy === 'rozmiar' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                                </th>
                                <th onClick={() => handleSort('kolorPokrowca')} style={{ cursor: 'pointer' }}>
                                    Kolor pokrowca {sortBy === 'kolorPokrowca' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                                </th>
                                <th onClick={() => handleSort('twardoscWkladu')} style={{ cursor: 'pointer' }}>
                                    Twardość wkładu {sortBy === 'twardoscWkladu' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                                </th>
                                <th onClick={() => handleSort('cena')} style={{ cursor: 'pointer' }}>
                                    Cena {sortBy === 'cena' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAndFilteredRows.length > 0 ? (
                                sortedAndFilteredRows.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.nazwaMateraca}</td>
                                        <td>{row.rozmiar}</td>
                                        <td>{row.kolorPokrowca}</td>
                                        <td>{row.twardoscWkladu}</td>
                                        <td>{`${row.cena} zł`}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center">Brak wyników spełniających kryteria filtrowania.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </Container>
    );
};