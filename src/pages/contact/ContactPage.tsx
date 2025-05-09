import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"


export const ContactPage = () => {
    return (
        <Container className="d-flex flex-column">
            <Row>
                <Col className="mt-4 mb-4" md={7}>
                    <Card className="p-4 shadow-sm">
                        <h4 className="text-primary mb-4" style={{ paddingBottom: "0.5rem" }}>Skontaktuj się z nami</h4>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Imię i nazwisko</Form.Label>
                                <Form.Control type="text" placeholder="Jan Kowalski" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="email@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Wiadomość</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Button variant="primary" type="submit">Wyślij</Button>
                        </Form>
                    </Card>
                </Col>
                <Col className="mt-4 mb-4" md={5}>
                    <Card className="p-4 shadow-sm bg-light">
                        <h5 className="text-primary mt-3" style={{ paddingBottom: "0.5rem" }}>
                            <FaMapMarkerAlt /> Adres
                        </h5>
                        <p>ul. Przykładowa 1, 01-234 Warszawa</p>
                        <h5 className="text-primary mt-3" style={{ paddingBottom: "0.5rem" }}>
                            <FaPhoneAlt /> Telefon
                        </h5>
                        <p>+48 123 456 789</p>
                        <h5 className="text-primary mt-3" style={{ paddingBottom: "0.5rem" }}>
                            <FaEnvelope /> Email
                        </h5>
                        <p>support@amce.pl</p>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}