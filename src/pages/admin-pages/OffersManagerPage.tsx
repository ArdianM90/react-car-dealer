
import { useEffect, useState } from 'react';
import { Button, Card, Container, Form, Table } from "react-bootstrap"
import { OfferContent } from '../../types/OfferContent';
import { getVehicles } from '../../service/MockApiService';


export const OffersManagerPage = () => {
    const [vehicles, setVehicles] = useState<OfferContent[]>([]);

    useEffect(() => {
        getVehicles().then(data => setVehicles(data));
    }, []);

    return (
        <Container fluid>
            <Card>
                <Card.Header as="h5" className="bg-primary text-white">
                    Zarządzanie ofertami
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Marka i model</th>
                                    <th>Rok produkcji</th>
                                    <th>Cena</th>
                                    <th>Silnik</th>
                                    <th>Przebieg</th>
                                    <th>Zarządzaj</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.map((item, index) =>
                                    <tr key={item.id}>
                                        <td>{index+1}</td>
                                        <td>{item.brand} {item.model}</td>
                                        <td>{item.year}</td>
                                        <td>{item.price.toLocaleString('pl-PL')} PLN</td>
                                        <td>{item.fuel}, {item.displacement} ccm, {item.power} KM</td>
                                        <td>{item.mileage} 000 km</td>
                                        <td><Button variant="secondary" className="me-2" >Edytuj</Button><Button variant="secondary" >Usuń</Button></td>
                                        <td><Form.Check id={`check-${index}`} /></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <div className="text-end">
                            <Button variant="secondary">
                                Usuń zaznaczone
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}