﻿import Form from 'react-bootstrap/Form';
import {Alert, Card} from 'react-bootstrap';
import {OfferCreatorDTO} from '../types/OfferCreatorDTO';
import {useState, useEffect} from 'react';
import {FaExclamationTriangle} from 'react-icons/fa';
import {checkDescriptionError} from "../service/ValidatorService.ts";

type CreatorFormProps = {
    formData: OfferCreatorDTO;
    setFormData: (data: OfferCreatorDTO) => void;
    onValidate: (isValid: boolean) => void;
    wasVisited: boolean;
};


export const CreatorStepDescription = ({formData, setFormData, onValidate, wasVisited}: CreatorFormProps) => {
    const [descriptionError, setDescriptionError] = useState<string>("");
    const [touchedStatus, setTouchedStatus] = useState<boolean>(false);
    const maxDescriptionLetters: number = 500;

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
        setTouchedStatus(true);
        setDescriptionError(checkDescriptionError(e.target.value, maxDescriptionLetters));
    }

    useEffect(() => {
        const descriptionErrorMsg = checkDescriptionError(formData.description, maxDescriptionLetters);
        onValidate(descriptionErrorMsg === "");
        setDescriptionError(descriptionErrorMsg);
    }, [formData]);

    return (
        <Card>
            <Card.Header as="h6" className="bg-primary text-white">
                Uzupełnij opis pojazdu
            </Card.Header>
            <Alert variant="info">
                <strong>Wskazówka:</strong> Dodaj informacje o historii, serwisowaniu, stanie technicznym i wyposażeniu samochodu.
            </Alert>
            <Card.Body>
                <Form.Label className="fw-bold" htmlFor="description">Opis pojazdu</Form.Label>
                <Form.Group>
                    <Form.Control id="description" name="description" as="textarea" rows={4}
                                  placeholder="Miejsce na opis pojazdu"
                                  value={formData.description}
                                  onChange={handleTextChange}
                                  onBlur={handleOnBlur}/>
                    <div className="text-end mt-1 text-muted small">
                        {formData.description.trim().length} / {maxDescriptionLetters}
                    </div>
                </Form.Group>
                {(wasVisited || touchedStatus) && descriptionError.length > 0 && (
                    <div className="error-frame mt-3 d-flex align-items-center">
                        <FaExclamationTriangle className="me-2"/>
                        {descriptionError}
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}