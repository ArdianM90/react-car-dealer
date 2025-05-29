import { Button, Card, Col, Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import './App.css';
import { useEffect, useState } from 'react';
import { OfferContent } from './types/OfferContent';
import { Link } from 'react-router-dom';
import { getRecommendedVehicles } from './service/MockApiService';

function App() {
    const [offerCardList, setImgCardList] = useState<OfferContent[]>([]);

    useEffect(() => {
        getRecommendedVehicles().then(data => setImgCardList(data));
    }, []);

    return (
        <Container fluid>
            <Row className="d-flex justify-content-end  mt-3 mb-3">
                <Form className="d-flex mb-3" style={{ minWidth: '300px', maxWidth: '500px' }}>
                    <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Row>
            <div className="fw-bold fs-5 text-start mb-2" style={{ color: '#0D6EFD' }}>
                Nowości w wersji v0.0.2
            </div>
            <div className="mb-3 text-area">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <hr />
            <div className="fw-bold fs-5 text-start mb-2" style={{ color: '#0D6EFD' }}>
                Oferty wybrane dla ciebie
            </div>
            <Row className="d-flex justify-content-between">
                {offerCardList.map((item, index) =>
                    <Col key={`card-${index}`} className="mb-3 img-card" style={{ width: '18rem' }}>
                        <Card className="pt-2">
                            <Card.Title style={{ textAlign: 'center' }}>{item.brand + " " + item.model + " (" + item.year + ")"}</Card.Title>
                            <Link to={`/offer/${item.id}`} state={{ carData: item }} style={{ textDecoration: 'none' }}>
                                <Card.Img variant="top" src={item.imgUrl} />
                            </Link>
                            <Card.Body>
                                <ul className="list-group list-group-flush">
                                    <li key={`card-item${index}-engine`} className="list-group-item d-flex justify-content-between align-items-start">
                                        <Container className="me-auto">
                                            <Container className="fw-bold">Silnik</Container>
                                            {item.fuel + ', ' + item.displacement + ', ' + item.power + ' KM'}
                                        </Container>
                                    </li>
                                    <li key={`card-item${index}-mileage`} className="list-group-item d-flex justify-content-between align-items-start">
                                        <Container className="me-auto">
                                            <Container className="fw-bold">Przebieg</Container>
                                            {item.mileage + ' 000 km'}
                                        </Container>
                                    </li>
                                    <li key={`card-item${index}-price`} className="list-group-item justify-content-between align-items-start" style={{ padding: "0px" }}>
                                        <Container className="d-flex flex-row" style={{ padding: "0px" }}>
                                            <Container className="d-flex flex-column" style={{ padding: "0px", width: '40%' }} />
                                            <Container className="d-flex flex-column" style={{ padding: "12px 0px" }}>
                                                <Container className="d-flex justify-content-center fs-5 fw-bold" style={{ color: '#0D6EFD' }}>CENA</Container>
                                                <Container className="d-flex justify-content-center fs-5">{item.price.toLocaleString('pl-PL') + ' zł'}</Container>
                                            </Container>
                                        </Container>
                                    </li>
                                </ul>
                                <Link to={`/offer/${item.id}`} state={{ carData: item }} style={{ textDecoration: 'none' }}>
                                    <Button variant="primary">Szczegóły</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
            <hr />
            <div className="mb-3 text-area">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <Row className="d-flex justify-content-between">
                <Col className="mb-3 text-area">
                    <Card>
                        <Card.Header>Ogłoszenie 1</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
                            </Card.Text>
                            <Button variant="primary">Szczegóły</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3 text-area">
                    <Card>
                        <Card.Header>Ogłoszenie 2</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
                            </Card.Text>
                            <Button variant="primary">Szczegóły</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3 text-area">
                    <Card>
                        <Card.Header>Ogłoszenie 3</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
                            </Card.Text>
                            <Button variant="primary">Szczegóły</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3 text-area">
                    <Card>
                        <Card.Header>Ogłoszenie 4</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
                            </Card.Text>
                            <Button variant="primary">Szczegóły</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default App;