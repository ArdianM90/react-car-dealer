import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { Employee } from '../../types/Employee';

export const EmployeesPage = () => {
    const [employeesList, setEmployeesList] = useState<Employee[]>([]);
    useEffect(() => {
        const employeesFromApi: Employee[] = [
            {
                name: "Imie 1",
                surname: "Nazwisko 1",
                position: "Dyrektor",
                grossSalary: 20000
            },
            {
                name: "Imie 2",
                surname: "Nazwisko 2",
                position: "Kierownik",
                grossSalary: 10000
            },
            {
                name: "Imie 3",
                surname: "Nazwisko 3",
                position: "Sprzedawca",
                grossSalary: 5000
            },
            {
                name: "Imie 4",
                surname: "Nazwisko 4",
                position: "Sprzedawca",
                grossSalary: 5000
            },
            {
                name: "Imie 5",
                surname: "Nazwisko 5",
                position: "Sprzedawca",
                grossSalary: 4000
            }        ];
        setEmployeesList(employeesFromApi);
    }, [])

    return (
        <Container fluid>
            <Accordion defaultActiveKey="filtrowanie">
                <Accordion.Item eventKey="filtrowanie">
                    <Accordion.Header>Filtrowanie i sortowanie</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Row className="mb-3">
                                <Col className="col-3">
                                    <Form.Group>
                                        <Form.Label>Szukaj po nazwisku</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="col-3">
                                    <Form.Group>
                                        <Form.Label>Płaca brutto od</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="col-3">
                                    <Form.Group>
                                        <Form.Label>Płaca brutto do</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="col-3">
                                    <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Stanowisko</Form.Label>
                                        <Form.Select>
                                            <option>Wybierz</option>
                                            <option>Dyrektor</option>
                                            <option>Kierownik</option>
                                            <option>Sprzedawca</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Stanowisko</th>
                        <th>Płaca brutto</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employeesList.map((item, index) =>
                            <tr key={`row-${index}`}>
                                <td></td>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.position}</td>
                                <td>{item.grossSalary}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Container>
    )
}