import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { Item } from '../../types/Item';

export const ItemsPage = () => {
    const [listaTowarow, setListaTowarow] = useState<Item[]>([]);
    useEffect(() => {
        const productsFromApi: Item[] = [
            {
                code: "1",
                name: "Nazwa 1 Api",
                category: "Kategoria 1",
                taxCode: "1",
                price: 114.0
            },
            {
                code: "2",
                name: "Nazwa 2 Api",
                category: "Kategoria 2",
                taxCode: "2",
                price: 115.0
            },
            {
                code: "3",
                name: "Nazwa 3 Api",
                category: "Kategoria 3",
                taxCode: "3",
                price: 116.0
            },
            {
                code: "4",
                name: "Nazwa 4 Api",
                category: "Kategoria 4",
                taxCode: "4",
                price: 117.0
            }];
        setListaTowarow(productsFromApi);
    }, [])

    return (
        <Container fluid>
            <Accordion defaultActiveKey="filtrowanie">
                <Accordion.Item eventKey="filtrowanie">
                    <Accordion.Header>Filtrowanie i sortowanie</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Row className="mb-3">
                                <Col className="col-4">
                                    <Form.Group>
                                        <Form.Label>Szukaj po nazwie</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="col-2">
                                    <Form.Group>
                                        <Form.Label>Cena od</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="col-2">
                                    <Form.Group>
                                        <Form.Label>Cena do</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="col-3">
                                    <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Kategoria</Form.Label>
                                        <Form.Select>
                                            <option>Wybierz</option>
                                            <option>Ceg³y</option>
                                            <option>Cement</option>
                                            <option>Pustaki</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Kategoria</th>
                        <th>Nazwa</th>
                        <th>PKWiU</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>
                    {listaTowarow.map((item, index) => 
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.category}</td>
                            <td>{item.name}</td>
                            <td>{item.taxCode}</td>
                            <td>{item.price}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    )
}