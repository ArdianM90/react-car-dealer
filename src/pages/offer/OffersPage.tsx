
import { useEffect, useState } from 'react';
import { Container, Card, Col, Row, Button, Dropdown, DropdownButton, Badge } from "react-bootstrap"
import { Link, useParams } from "react-router-dom";
import { OfferContent } from '../../types/OfferContent';
import { getVehicles } from '../../service/MockApiService';
    

export const OffersPage = () => {
    const itemsPerPage = 5;
    const { type } = useParams();
    const [vehicles, setVehicles] = useState<OfferContent[]>([]);
    const filteredVehicles = vehicles.filter(item => (!type || type === 'all' || item.type === type));
    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSort, setSelectedSort] = useState<string>('Cena: malejąco');
    const handleSelect = (eventKey: string | null) => {
        if (eventKey) {
            setSelectedSort(eventKey);
            setCurrentPage(1);
        }
    };

    useEffect(() => {
        getVehicles().then(data => setVehicles(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [type]);

    const sortVehicles = (data: OfferContent[]): OfferContent[] => {
        switch (selectedSort) {
            case 'Cena: rosnąca':
                return [...data].sort((a, b) => a.price - b.price);
            case 'Cena: malejąco':
                return [...data].sort((a, b) => b.price - a.price);
            case 'Przebieg: rosnąco':
                return [...data].sort((a, b) => a.mileage - b.mileage);
            case 'Przebieg: malejąco':
                return [...data].sort((a, b) => b.mileage - a.mileage);
            default:
                return data;
        }
    };

    const pageItems = sortVehicles(filteredVehicles).slice((currentPage * itemsPerPage) - itemsPerPage, currentPage * itemsPerPage);

    return (
        <Container fluid>
            <Container className="d-flex justify-content-end mt-3 mb-3">
                <DropdownButton id="dropdown-basic-button" variant="secondary" title={selectedSort} onSelect={handleSelect}>
                    <Dropdown.Item eventKey="Cena: malejąco">Cena: malejąco</Dropdown.Item>
                    <Dropdown.Item eventKey="Cena: rosnąca">Cena: rosnąca</Dropdown.Item>
                    <Dropdown.Item eventKey="Przebieg: malejąco">Przebieg: malejąco</Dropdown.Item>
                    <Dropdown.Item eventKey="Przebieg: rosnąco">Przebieg: rosnąco</Dropdown.Item>
                </DropdownButton>
            </Container>
            <Row>
                {pageItems.map((item) =>
                    <Link key={`offer-${item.id}`} to={`/offer/${item.id}`} state={{ carData: item }} style={{ textDecoration: 'none' }}>
                        <Card className="mb-3 shadow-sm" onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                    <Row className="g-0 align-items-center">
                                <Col md={4}>
                                    <Card.Img
                                        variant="top"
                                        src={item.imgUrl}
                                        alt={`${item.brand} ${item.model}`}
                                        className="img-fluid p-2 object-fit-cover"
                                    />
                                </Col>
                                <Col md={5}>
                                    <Card.Body>
                                        <Card.Title>{item.brand} {item.model} <Badge bg="primary">{item.type}</Badge></Card.Title>
                                        <Card.Text>
                                            Rok: {item.year}<br />
                                            Przebieg: {item.mileage} tys. km<br />
                                            Paliwo: {item.fuel}<br />
                                            Moc: {item.power} KM
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                                <Col md={3} className="text-end pe-4">
                                    <Card.Body>
                                        <Card.Text className="fw-bold text-primary" style={{ fontSize: '1.5rem' }}>
                                            {item.price.toLocaleString('pl-PL')} PLN
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Link>
                )}
            </Row>
            <Container>
                <Button variant="secondary" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Poprzednia
                </Button>
                <span className="mx-3 align-self-center">Strona {currentPage} z {totalPages > 0 ? totalPages : 1 }</span>
                <Button variant="secondary" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Następna
                </Button>
            </Container>
        </Container>
    )
}