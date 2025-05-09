
import Form from 'react-bootstrap/Form';
import { Card, Col, Row } from 'react-bootstrap';
import { OfferContent } from '../types/OfferContent';

type CreatorFormProps = {
    formData: OfferContent;
    setFormData: (data: OfferContent) => void;
};


export const CreatorStepDetails = ({ formData, setFormData }: CreatorFormProps) => {

    return (
        <Card>
            <Card.Header as="h6" className="bg-primary text-white">
                Uzupełnij dane techniczne pojazdu
            </Card.Header>
            <Card.Body>
                <Form.Group>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label className="fw-bold">Rok produkcji</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Rok produkcji"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label className="fw-bold">Rodzaj paliwa</Form.Label>
                            <Form.Control
                                as="select"
                                value={formData.fuel}
                                onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                            >
                                <option value="benzyna">Benzyna</option>
                                <option value="diesel">Diesel</option>
                                <option value="benzyna+lpg">Benzyna + LPG</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label className="fw-bold">Pojemność silnika (L)</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.1"
                                placeholder="Pojemność silnika"
                                value={formData.displacement}
                                onChange={(e) => setFormData({ ...formData, displacement: e.target.value })}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label className="fw-bold">Moc silnika (KM)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Moc silnika"
                                value={formData.power}
                                onChange={(e) => setFormData({ ...formData, power: Number(e.target.value) })}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Label className="fw-bold">Przebieg (km)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Przebieg"
                                value={formData.mileage}
                                onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
                            />
                        </Col>
                    </Row>
                </Form.Group>
            </Card.Body>
        </Card>
    )
}