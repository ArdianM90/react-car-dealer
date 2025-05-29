import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export const EmployeePage = () => {
    return (
        <Container fluid>
            <Form>
                <Row>
                    <Col>
                        <button type="button" className="btn btn-primary m-2">Dodaj</button>
                        <button type="button" className="btn btn-secondary m-2">Anuluj</button>
                    </Col>
                </Row>
                <Row>
                    <Tabs defaultActiveKey="Dane podstawowe" id="uncontrolled-tab-example">
                        <Tab eventKey="Dane podstawowe" title="Dane podstawowe">
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Imię</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Nazwisko</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Płaca</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col class="m-4">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Stanowisko</Form.Label>
                                        <Form.Select>
                                            <option>Umowa zlecenie</option>
                                            <option>Dyrektor</option>
                                            <option>Kierownik</option>
                                            <option>Sprzedawca</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col class="m-4">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Forma zatrudnienia</Form.Label>
                                        <Form.Select>
                                            <option>Umowa zlecenie</option>
                                            <option>Wybierz</option>
                                            <option>Umowa o pracę</option>
                                            <option>Umowa B2B</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                        </Tab>
                        <Tab eventKey="Wynagorodzenie" title="Wynagorodzenie">
                            <Row>
                                <Form.Group className="mb-3 col-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Netto</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                                <Form.Group className="mb-3 col-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Brutto</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                            </Row>
                        </Tab>
                        <Tab eventKey="Uwagi" title="Uwagi">
                            <Row>
                                <Col className="col-6">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Dodatkowe informacje</Form.Label>
                                        <Form.Control as="textarea" />
                                    </Form.Group>
                                </Col>
                                <Col className="col-4">
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Uwagi</Form.Label>
                                        <Form.Control as="textarea" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </Row>
            </Form>
        </Container>
    )
}