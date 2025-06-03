import Form from 'react-bootstrap/Form';
import { Card, Col, Row } from 'react-bootstrap';
import { OfferContent } from '../types/OfferContent';
import { useEffect, useRef, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';


type CreatorFormProps = {
    formData: OfferContent;
    setFormData: (data: OfferContent) => void;
    onValidate: (isValid: boolean) => void;
    wasVisited: boolean;
};

export const CreatorStepBasicData = ({ formData, setFormData, onValidate, wasVisited }: CreatorFormProps) => {
    const errorsInitialState = {
        type: '',
        brand: '',
        model: ''
    };

    const touchedInitialState = {
        type: false,
        brand: false,
        model: false
    };

    const timeoutsInitialState = {
        type: null,
        brand: null,
        model: null
    };

    const timeoutRefs = useRef<Record<string, NodeJS.Timeout | null>>(timeoutsInitialState)
    const timeout = 2000;

    const [formErrors, setFormErrors] = useState(errorsInitialState);
    const [touchedStatuses, setTouchedStatuses] = useState(touchedInitialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const inputName: string = e.target.name;
        const inputValue: string = e.target.value;
        setFormData({ ...formData, [inputName]: inputValue })
        if (timeoutRefs.current[inputName] != null) {
            clearTimeout(timeoutRefs.current[inputName]);
        }
        timeoutRefs.current[inputName] = setTimeout(() => {
            setFormErrors(prev => ({ ...prev, [inputName]: validateField(inputName, inputValue) }))
            setTouchedStatuses(prev => ({ ...prev, [inputName]: true }));
        }, timeout);
    }

    const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const inputName: string = e.target.name;
        const inputValue: string = e.target.value;
        setTouchedStatuses(prev => ({ ...prev, [inputName]: true }));
        setFormErrors(prev => ({ ...prev, [inputName]: validateField(inputName, inputValue) }));
    }

    const validateField = (inputName: string, value: string): string => {
        const trimmedValue = value.trim();
        if (!trimmedValue || trimmedValue.length === 0) {
            switch (inputName) {
                case "type":
                    return "Wybierz kategorię pojazdu.";
                case "brand":
                case "model":
                    return `Pole ${ inputName === 'brand' ? 'marka' : 'model' } pojazdu nie może być puste.`;
            }
        }
        if (inputName === "brand" && trimmedValue.length < 2) {
            return "Zbyt krótka marka";
        }
        return "";
    }

    useEffect(() => {
        const typeErrorMsg = validateField("type", formData.type);
        const brandErrorMsg = validateField("brand", formData.brand);
        const modelErrorMsg = validateField("model", formData.model);
        onValidate(typeErrorMsg === "" && brandErrorMsg === "" && modelErrorMsg === "");
        setFormErrors({
            type: typeErrorMsg,
            brand: brandErrorMsg,
            model: modelErrorMsg
        });
    }, [formData]);

    useEffect(() => {
        return () => {
            Object.values(timeoutRefs.current).forEach(timeout => {
                if (timeout) clearTimeout(timeout);
            });
        };
    }, []);

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
                            <Form.Select id="type" name="type" value={formData.type} onChange={handleInputChange} onBlur={handleOnBlur} >
                                <option value="" disabled hidden>Wybierz kategorię</option>
                                <option value="osobowe">Osobowe</option>
                                <option value="towarowe">Towarowe</option>
                                <option value="budowlane">Budowlane</option>
                                <option value="inne">Inne pojazdy</option>
                            </Form.Select>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="fw-bold" htmlFor="brand">Marka</Form.Label>
                            <Form.Control
                                id="brand"
                                name="brand"
                                type="text"
                                value={formData.brand}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur} />
                        </Col>
                        <Col md={4}>
                            <Form.Label className="fw-bold" htmlFor="model">Model</Form.Label>
                            <Form.Control id="model" name="model" type="text"
                                value={formData.model}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur} />
                        </Col>
                    </Row>
                </Form.Group>
                {Object.entries(formErrors).map(([name, errMsg]) =>
                    errMsg !== "" && (wasVisited || touchedStatuses[name as keyof typeof touchedStatuses]) && (
                        <div key={name} className="error-frame mt-3 d-flex align-items-center">
                            <FaExclamationTriangle className="me-2" />
                            {errMsg}
                        </div>
                    )
                )}
            </Card.Body>
        </Card>
    )
}