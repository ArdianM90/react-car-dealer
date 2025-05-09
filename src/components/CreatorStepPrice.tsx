
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { OfferContent } from '../types/OfferContent';

type CreatorFormProps = {
    formData: OfferContent;
    setFormData: (data: OfferContent) => void;
};


export const CreatorStepPrice = ({ formData, setFormData }: CreatorFormProps) => {

    return (
        <Card>
            <Card.Header as="h6" className="bg-primary text-white">
                Podaj cenę pojazdu
            </Card.Header>
            <Card.Body>
                <Form.Group>
                    <Form.Control type="number" placeholder="Cena" onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} />
                </Form.Group>
            </Card.Body>
        </Card>
    )
}