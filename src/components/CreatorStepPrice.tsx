
import Form from 'react-bootstrap/Form';
import { Card, Col, Row } from 'react-bootstrap';
import { OfferCreatorDTO } from '../types/OfferCreatorDTO';
import { useState, useEffect, useRef } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import {checkNumberInputError} from "../service/ValidatorService.ts";

type CreatorFormProps = {
    formData: OfferCreatorDTO;
    setFormData: (data: OfferCreatorDTO) => void;
    onValidate: (isValid: boolean) => void;
    wasVisited: boolean;
};


export const CreatorStepPrice = ({ formData, setFormData, onValidate, wasVisited }: CreatorFormProps) => {
    const maxPrice: number = 5000000;
    const timeout = 2000;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [priceError, setPriceError] = useState<string>("");
    const [touchedStatus, setTouchedStatus] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const numericPrice: number | null = e.target.value.trim() === "" ? null : Number(e.target.value);
        setFormData({ ...formData, price: numericPrice });
        if (timeoutRef.current != null) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setPriceError(checkNumberInputError("cena", e.target.value, 1, maxPrice));
            setTouchedStatus(true);
        }, timeout);
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        setTouchedStatus(true);
        setPriceError(checkNumberInputError("cena", e.target.value, 1, maxPrice));
    }

    useEffect(() => {
        const errorMsg = checkNumberInputError("cena", String(formData.price), 1, maxPrice);
        setPriceError(errorMsg);
        onValidate(errorMsg === "");

        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [formData]);

    return (
        <Card>
            <Card.Header as="h6" className="bg-primary text-white">
                Podaj cenę pojazdu
            </Card.Header>
            <Card.Body>
                <Form.Group>
                    <div className="d-flex justify-content-center">
                        <Row className="g-2 w-100" style={{ maxWidth: '600px' }}>
                            <Col md={6}>
                                <Form.Control name="price" type="number"
                                    placeholder="Miejsce na cenę pojazdu"
                                    value={formData.price === null ? "" : formData.price}
                                    onChange={handleInputChange}
                                    onBlur={handleOnBlur} />
                                <Form.Range name="price" min="1" max="2000000" step="1"
                                    value={formData.price === null ? 1 : Number(formData.price)}
                                    onChange={handleInputChange} />
                            </Col>
                            <Col md={3}>
                                <Form.Select
                                    name="currency"
                                    value={formData.currency ?? "PLN"}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}>
                                    <option value="PLN">PLN</option>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </Form.Group>
                {(wasVisited || touchedStatus) && priceError.length > 0 && (
                    <div className="error-frame mt-3 d-flex align-items-center">
                        <FaExclamationTriangle className="me-2" />
                        {priceError}
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}