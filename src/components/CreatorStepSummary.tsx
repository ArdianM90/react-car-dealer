
import { Card, Col, Row, Table } from 'react-bootstrap';
import { OfferContent } from '../types/OfferContent';

type CreatorSummaryProps = {
    formData: OfferContent;
    uploadedFiles: File[];
};


export const CreatorStepSummary = ({ formData, uploadedFiles }: CreatorSummaryProps) => {

    return (
        <Card>
            <Card.Header as="h5" className="bg-primary text-white">
                Podsumowanie oferty
            </Card.Header>
            <Card.Body>
                <Row className="mb-2">
                    <Col md={2} className="text-start fw-bold">Tytuł oferty:</Col>
                    <Col md={4} className="text-start">{formData.brand} {formData.model} ({formData.year})</Col>
                    <Col md={2} className="text-end fw-bold">Cena:</Col>
                    <Col md={4} className="text-start">{formData.price.toLocaleString('pl-PL')} zł</Col>
                </Row>
                <Row className="mb-2">
                    <Col md={2} className="text-start fw-bold">Kategoria:</Col>
                    <Col md={4} className="text-start">{formData.type}</Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <h6 className="fw-bold">Dane techniczne</h6>
                        <Table bordered hover responsive className="mb-0">
                            <tbody>
                                <tr>
                                    <th className="w-25">Rodzaj paliwa</th>
                                    <td>{formData.fuel}</td>
                                </tr>
                                <tr>
                                    <th>Pojemność silnika</th>
                                    <td>{formData.displacement}</td>
                                </tr>
                                <tr>
                                    <th>Moc silnika</th>
                                    <td>{formData.power} KM</td>
                                </tr>
                                <tr>
                                    <th>Przebieg</th>
                                    <td>{formData.mileage.toLocaleString('pl-PL')} km</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={3} className="text-end fw-bold">Opis:</Col>
                    <Col md={9} className="text-start">{formData.description || <em>Brak opisu</em>}</Col>
                </Row>
                <Row>
                    <Col md={3} className="text-end fw-bold">Zdjęcia:</Col>
                    <Col md={9} className="text-start">
                        <ul className="mb-0">
                            {uploadedFiles.length > 0 ? (
                                uploadedFiles.map((f, idx) => <li key={idx}>{f.name}</li>)
                            ) : (
                                <li><em>Brak dodanych zdjęć</em></li>
                            )}
                        </ul>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}