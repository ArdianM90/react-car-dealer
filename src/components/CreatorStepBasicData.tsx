
import Form from 'react-bootstrap/Form';
import { Card, Col, Row } from 'react-bootstrap';
import { OfferContent } from '../types/OfferContent';

type CreatorFormProps = {
    formData: OfferContent;
    setFormData: (data: OfferContent) => void;
};


export const CreatorStepBasicData = ({ formData, setFormData }: CreatorFormProps) => {

    return (
        <Card>
            <Card.Header as="h6" className="bg-primary text-white">
                Uzupełnij dane podstawowe
            </Card.Header>
            <Card.Body>
                <Form.Group>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Label className="fw-bold">Kategoria</Form.Label>
                            <Form.Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                <option value="" disabled hidden>Wybierz kategorię</option>
                                <option value="osobowe">Osobowe</option>
                                <option value="towarowe">Towarowe</option>
                                <option value="budowlane">Budowlane</option>
                                <option value="inne">Inne pojazdy</option>
                            </Form.Select>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="fw-bold">Marka</Form.Label>
                            <Form.Control type="text" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
                        </Col>
                        <Col md={4}>
                            <Form.Label className="fw-bold">Model</Form.Label>
                            <Form.Control type="text" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} />
                        </Col>
                    </Row>
                </Form.Group>
            </Card.Body>
        </Card>
    )
}