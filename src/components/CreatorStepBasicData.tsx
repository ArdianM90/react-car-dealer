import Form from 'react-bootstrap/Form';
import { Card, Col, Row } from 'react-bootstrap';
import { OfferContent } from '../types/OfferContent';
import { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';


type CreatorFormProps = {
    formData: OfferContent;
    setFormData: (data: OfferContent) => void;
    onValidate: (isValid: boolean) => void;
};

export const CreatorStepBasicData = ({ formData, setFormData, onValidate }: CreatorFormProps) => {
    const [typeError, setTypeError] = useState('');
    const [brandError, setBrandError] = useState('');
    const [modelError, setModelError] = useState('');

    const formErrors: string[] = [typeError, brandError, modelError].filter(Boolean);

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setFormData({ ...formData, type: e.target.value })
        setTypeError(checkForError(e.target.value, "typ"));
    }

    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, brand: e.target.value })
        setBrandError(checkForError(e.target.value, "marka"));
    }

    const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, model: e.target.value })
        setModelError(checkForError(e.target.value, "model"));
    }

    const checkForError = (str: string, fieldName: string): string => {
        let errorMsg = "";
        if (!str || str.trim().length === 0) {
            switch (fieldName) {
                case "typ":
                    errorMsg = "Wybierz kategorię pojazdu.";
                    break;
                case "marka":
                    errorMsg = "Pole marka pojazdu nie może być puste.";
                    break;
                case "model":
                    errorMsg = "Pole model pojazdu nie może być puste.";
                    break;
            }
        }
        return errorMsg;
    }

    useEffect(() => {
        const typeErrorMsg = checkForError(formData.type, "typ");
        const brandErrorMsg = checkForError(formData.brand, "marka");
        const modelErrorMsg = checkForError(formData.model, "model");
        setTypeError(typeErrorMsg);
        setBrandError(brandErrorMsg);
        setModelError(modelErrorMsg);
        onValidate(typeErrorMsg === "" && brandErrorMsg === "" && modelErrorMsg === "");
    }, [formData, onValidate]);

    return (
        <Card>
            <Card.Header as="h6" className="bg-primary text-white">
                Uzupełnij dane podstawowe
            </Card.Header>
            <Card.Body>
                <Form.Group>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Label className="fw-bold" htmlFor="type">Kategoria</Form.Label>
                            <Form.Select id="type" value={formData.type} onChange={handleTypeChange}>
                                <option value="" disabled hidden>Wybierz kategorię</option>
                                <option value="osobowe">Osobowe</option>
                                <option value="towarowe">Towarowe</option>
                                <option value="budowlane">Budowlane</option>
                                <option value="inne">Inne pojazdy</option>
                            </Form.Select>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="fw-bold" htmlFor="brand">Marka</Form.Label>
                            <Form.Control id="brand" type="text" value={formData.brand} onChange={handleBrandChange} />
                        </Col>
                        <Col md={4}>
                            <Form.Label className="fw-bold" htmlFor="model">Model</Form.Label>
                            <Form.Control id="model" type="text" value={formData.model} onChange={handleModelChange} />
                        </Col>
                    </Row>
                </Form.Group>
                {formErrors.map((errMsg, index) =>
                    errMsg !== "" && (
                        <div key={index} className="error-frame mt-3 d-flex align-items-center">
                            <FaExclamationTriangle className="me-2" />
                            {errMsg}
                        </div>
                    )
                )}
            </Card.Body>
        </Card>
    )
}