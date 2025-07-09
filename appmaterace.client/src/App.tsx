import * as React from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

export const App: React.FC = () => {
    const company = {
        name: 'Aquinos Bedding Poland',
        address: 'ul. Towarowa, 93-564 Gliwice',
        phone: '+48 504 627 486',
    };

    return (
        <div
            className="bg-danger text-white card mx-auto"
            style={{ maxWidth: '800px' }}
        >
            <div className="image-container mb-3">
                <Image src="/image/brand.png" className="img-fluid" />
            </div>
            <Container>
                <div className="card-body text-center">
                    <h2 className="card-title">{company.name}</h2>
                    <p className="card-text mb-1">
                        <strong>Adres:</strong> {company.address}
                    </p>
                    <p className="card-text">
                        <strong>Telefon:</strong> {company.phone}
                    </p>
                </div>
            </Container>
        </div>
    );
};


