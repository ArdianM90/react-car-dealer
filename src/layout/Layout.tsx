import { FormEvent, useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import { FaComment, FaAt, FaPhone } from "react-icons/fa";
import { Col, Container, Image, Nav, Navbar, NavDropdown, Row, Form, Button } from 'react-bootstrap';

export const Layout = () => {
    const [email, setEmail] = useState('');

    const submitNewsletter = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        console.log('Wysłano:', email);
        setEmail('');
    };

    return (
        <div className="app bg-body-secondary">
            <Navbar expand="lg" className="bg-primary-subtle mb-3 navbar">
                <Container fluid>
                    <Navbar.Brand>
                        <Link to="/" className="d-block">
                            <Image src="/assets/img/logo.png" className="logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="d-flex flex-wrap me-auto my-2 my-lg-0" navbarScroll>
                            <Nav.Link as={Link} to="/offers/all" className="menu-item d-flex justify-content-center align-items-center">Wszystkie oferty</Nav.Link>
                            <NavDropdown title="Kategorie" id="kategorie" className="menu-item d-flex justify-content-center align-items-center">
                                <NavDropdown.Item as={Link} to="/offers/passenger">Osobowe</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/offers/cargo">Towarowe</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/offers/specialized">Budowlane</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/offers/others">Inne pojazdy</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/offers/parts">Części samochodowe</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Kadry" id="kadry" className="menu-item d-flex justify-content-center align-items-center">
                                <NavDropdown.Item as={Link} to="/pracownik">Pracownik</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/pracownicy">Pracownicy</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Zarządzaj" id="inne1" className="menu-item d-flex justify-content-center align-items-center">
                                <NavDropdown.Item as={Link} to="/add-offer">Dodaj ofertę</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/manage-offers">Zarządzaj ofertami</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/pracownik">Pracownik</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/pracownicy">Pracownicy</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/towar">Towar</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/towary">Towary</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/contact"  className="menu-item d-flex justify-content-center align-items-center">Kontakt</Nav.Link>
                            <Nav.Link as={Link} to="/about-us" className="menu-item d-flex justify-content-center align-items-center">O nas</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="px-3">
                <Container fluid>
                    <Outlet />
                </Container>
            </div>
            <Container className="py-5">
                <Row className="text-start">
                    <Col md={3} className="border-end border-primary px-4 mb-4">
                        <h5 className="text-primary border-bottom pb-2 mb-3">DOWIEDZ SIĘ PIERWSZY O&nbsp;NOWOŚCIACH!</h5>
                        <p className="small text-muted">Nasi subskrybenci mają najszybszy dostęp do informacji o ofertach specjalnych.</p>
                        <Form onSubmit={submitNewsletter}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    required
                                    placeholder="Podaj adres email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" size="sm">Subskrybuję</Button>
                        </Form>
                    </Col>
                    <Col md={3} className="border-end border-primary px-4 mb-4">
                        <h5 className="text-primary border-bottom pb-2 mb-3">NAPISZ DO NAS!</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2 d-flex align-items-start">
                                <FaComment className="text-primary me-2 mt-1" />
                                <div>
                                    <p className="mb-1">LiveChat</p>
                                    <small className="text-muted">PN–PT, 08:00–16:00</small>
                                </div>
                            </li>
                            <li className="mb-2 d-flex align-items-start">
                                <FaAt className="text-primary me-2 mt-1" />
                                <p className="mb-0">support@amce.pl</p>
                            </li>
                            <li className="d-flex align-items-start">
                                <FaPhone className="text-primary me-2 mt-1" />
                                <p className="mb-0">+48 123 456 789</p>
                            </li>
                        </ul>
                    </Col>
                    <Col md={3} className="border-end border-primary px-4 mb-4">
                        <h5 className="text-primary border-bottom pb-2 mb-3">WSPARCIE POZAKUPOWE</h5>
                        <div className="d-flex flex-column">
                            <Link to="" className="text-decoration-none text-dark mb-2">Napisz do nas</Link>
                            <Link to="" className="text-decoration-none text-dark mb-2">Wysyłka i zwroty</Link>
                            <Link to="" className="text-decoration-none text-dark mb-2">Status zamówienia</Link>
                            <Link to="" className="text-decoration-none text-dark mb-2">FAQ</Link>
                            <Link to="" className="text-decoration-none text-dark mb-2">Zarządzaj subskrypcjami</Link>
                            <Link to="" className="text-decoration-none text-dark">Karty podarunkowe</Link>
                        </div>
                    </Col>
                    <Col md={3} className="px-4 mb-4">
                        <h5 className="text-primary border-bottom pb-2 mb-3">O NAS</h5>
                        <div className="d-flex flex-column">
                            <Link to="" className="text-decoration-none text-dark mb-2">Dołącz do nas</Link>
                            <Link to="" className="text-decoration-none text-dark mb-2">Historia</Link>
                            <Link to="" className="text-decoration-none text-dark mb-2">Blog</Link>
                            <Link to="" className="text-decoration-none text-dark">Lokalizacje</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}