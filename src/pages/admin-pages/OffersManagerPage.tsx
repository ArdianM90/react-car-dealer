import {useEffect, useState} from 'react';
import {Button, Card, Container, Form, Modal, Table} from "react-bootstrap"
import {OfferContent} from '../../types/OfferContent';
import {deleteVehiclesByIds, getVehicles} from '../../service/MockApiService';


export const OffersManagerPage = () => {
    const [vehicles, setVehicles] = useState<OfferContent[]>([]);
    const [checkedToDelete, setCheckedToDelete] = useState<boolean[]>([]);
    const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const confirmDelete = (indexes: number[]) => {
        setPendingDeleteIds(indexes);
        setShowConfirmation(true);
    };

    const handleCloseConfirmation = (accept: boolean): void => {
        setShowConfirmation(false)
        if (accept && pendingDeleteIds.length > 0) {
            deleteVehiclesByIds(pendingDeleteIds)
                .then(() => getVehicles())
                .then((newList) => {
                    setVehicles(newList);
                    setCheckedToDelete(new Array(newList.length).fill(false))
                });
        } else {
            setPendingDeleteIds([]);
        }
    };

    const toggleToDelete = (idx: number): boolean => {
        const updated: boolean[] = [...checkedToDelete];
        updated[idx] = !updated[idx];
        setCheckedToDelete(updated);
        return updated[idx];
    }

    const getSelectedIds = (): number[] => {
        return vehicles.filter((_, index) => checkedToDelete[index])
            .map(vehicle => vehicle.id);
    }
    const toDeleteCount: number = getSelectedIds().length;

    useEffect(() => {
        getVehicles().then(data => {
            setVehicles(data);
            setCheckedToDelete(new Array(data.length).fill(false));
        });
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
                                    <td>{index + 1}</td>
                                    <td>{item.brand} {item.model}</td>
                                    <td>{item.year}</td>
                                    <td>{item.price.toLocaleString('pl-PL')} PLN</td>
                                    <td>{item.fuel}, {item.displacement} ccm, {item.power} KM</td>
                                    <td>{item.mileage} 000 km</td>
                                    <td>
                                        <Button variant="secondary" className="me-2">Edytuj</Button>
                                        <Button variant="secondary" onClick={() => confirmDelete([item.id])}>Usuń</Button>
                                    </td>
                                    <td>
                                        <Form.Check id={`check-${index}`}
                                                    checked={checkedToDelete[index]}
                                                    onChange={(): boolean => toggleToDelete(index)}/>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        <div className="text-end">
                            <Button variant="secondary" onClick={() => confirmDelete(getSelectedIds())}>
                                Usuń zaznaczone oferty
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showConfirmation} onHide={() => handleCloseConfirmation(false)}>
                <Modal.Body>
                    {
                        toDeleteCount == 1
                        ? `Wybrana oferta zostanie usunięta. `
                        : `Usuniętych zostanie ${toDeleteCount} ofert.`}
                    Czy na pewno chcesz to zrobić?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleCloseConfirmation(true)}>
                        Tak
                    </Button>
                    <Button variant="secondary" onClick={() => handleCloseConfirmation(false)}>
                        Nie
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}