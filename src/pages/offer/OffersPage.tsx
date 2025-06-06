import {useEffect, useState} from 'react';
import {Container, Card, Col, Row, Button, Dropdown, DropdownButton, Badge, Collapse, Form} from "react-bootstrap"
import {Link, useParams} from "react-router-dom";
import {OfferContent, OfferType} from '../../types/OfferContent';
import {getVehicles} from '../../service/MockApiService';
import {FaSearch} from "react-icons/fa";


export const OffersPage = () => {
    const ITEMS_PER_PAGE: number = 5;

    const {type} = useParams();
    const [advFiltersOpen, setAdvFiltersOpen] = useState(false);
    const [vehicles, setVehicles] = useState<OfferContent[]>([]);
    const filteredVehicles = vehicles.filter(item => (!type || type === 'all' || item.type === OfferType[type as keyof typeof OfferType]));
    const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
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

    const pageItems = sortVehicles(filteredVehicles).slice((currentPage * ITEMS_PER_PAGE) - ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <Container fluid>
            <Container className="mt-3 mb-3">
                <div className="d-flex justify-content-end gap-2 mb-2">
                    <Button onClick={() => setAdvFiltersOpen(!advFiltersOpen)}>Pokaż więcej filtrów</Button>
                    <DropdownButton id="dropdown-basic-button" variant="secondary" title={selectedSort} onSelect={handleSelect}>
                        <Dropdown.Item eventKey="Cena: malejąco">Cena: malejąco</Dropdown.Item>
                        <Dropdown.Item eventKey="Cena: rosnąca">Cena: rosnąca</Dropdown.Item>
                        <Dropdown.Item eventKey="Przebieg: malejąco">Przebieg: malejąco</Dropdown.Item>
                        <Dropdown.Item eventKey="Przebieg: rosnąco">Przebieg: rosnąco</Dropdown.Item>
                    </DropdownButton>
                </div>
                <Collapse in={advFiltersOpen}>
                    <div className="border p-3">
                        <Form>
                            <Row className="mb-3">
                                <Col md={3}>
                                    <Form.Label htmlFor="category">Kategoria</Form.Label>
                                    <Form.Select id="category" name="category">
                                        <option value="all">Wszystkie</option>
                                        {Object.entries(OfferType).map(([key, value]) => (
                                            <option key={key}
                                                    value={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={3}>
                                    <Form.Label htmlFor="name">Marka i/lub model</Form.Label>
                                    <Form.Control id="name" name="name" type="text"
                                                  placeholder="Wpisz markę lub model"/>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Cena (od - do)</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control type="number" placeholder="Od" min={0}/>
                                        </Col>
                                        <Col>
                                            <Form.Control type="number" placeholder="Do" min={0}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={3}>
                                    <Form.Label htmlFor="power">Moc (KM)</Form.Label>
                                    <Form.Control id="power" name="power" type="number" placeholder="Moc" min={0}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <Form.Label htmlFor="displacement">Pojemność silnika (l)</Form.Label>
                                    <Form.Control id="displacement" name="displacement" type="number"
                                                  placeholder="Pojemność silnika" min={0}/>
                                </Col>
                                <Col md={3}>
                                    <Form.Label htmlFor="fuel">Rodzaj paliwa</Form.Label>
                                    <Form.Select id="fuel" name="fuel">
                                        <option value="all">Wszystkie</option>
                                        <option value="benzyna">Benzyna</option>
                                        <option value="diesel">Diesel</option>
                                        <option value="benzyna+lpg">Benzyna + LPG</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6} className="d-flex justify-content-end align-items-end">
                                    <Button variant="primary" className="mt-2" type="submit">
                                        <FaSearch className="me-2" />Szukaj
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Collapse>
            </Container>
            <Row>
                {pageItems.map((item) =>
                    <Link key={`offer-${item.id}`} to={`/offer/${item.id}`} state={{carData: item}}
                          style={{textDecoration: 'none'}}>
                        <Card className="mb-3 shadow-sm"
                              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                                  e.currentTarget.style.transform = 'scale(1.01)';
                              }}
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
                                        <Card.Title>{item.brand} {item.model} <Badge
                                            bg="primary">{item.type}</Badge></Card.Title>
                                        <Card.Text>
                                            Rok: {item.year}<br/>
                                            Przebieg: {item.mileage} tys. km<br/>
                                            Paliwo: {item.fuel}<br/>
                                            Moc: {item.power} KM
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                                <Col md={3} className="text-end pe-4">
                                    <Card.Body>
                                        <Card.Text className="fw-bold text-primary" style={{fontSize: '1.5rem'}}>
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
                <span className="mx-3 align-self-center">Strona {currentPage} z {totalPages > 0 ? totalPages : 1}</span>
                <Button variant="secondary" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Następna
                </Button>
            </Container>
        </Container>
    )
}