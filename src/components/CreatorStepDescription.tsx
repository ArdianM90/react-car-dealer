
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { OfferContent } from '../types/OfferContent';

type CreatorFormProps = {
    formData: OfferContent;
    setFormData: (data: OfferContent) => void;
};


export const CreatorStepDescription = ({ formData, setFormData }: CreatorFormProps) => {

    return (
        <Card>
            <Card.Header as="h6" className="bg-primary text-white">
                Uzupełnij opis pojazdu
            </Card.Header>
            <Card.Body>
                <Form.Group>
                    <Form.Control as="textarea" rows={4} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </Form.Group>
            </Card.Body>
        </Card>
    )
}