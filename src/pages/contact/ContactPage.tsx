import { FormEvent, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa"
import {checkEmailError, checkMessageError, checkTextInputError} from "../../service/ValidatorService.ts";


export const ContactPage = () => {
    const formInitialState = {
        name: '',
        surname: '',
        email: '',
        message: ''
    };

    const errorsInitialState = {
        name: '',
        surname: '',
        email: '',
        message: '',
    }

    const timeoutsInitialState = {
        name: null,
        surname: null,
        email: null,
        message: null
    };

    const [showConfirmation, setShowConfirmation] = useState(false);
    const timeoutRefs = useRef<Record<string, NodeJS.Timeout | null>>(timeoutsInitialState)
    const timeout = 2000;

    const [formData, setFormData] = useState(formInitialState);
    const [formErrors, setFormErrors] = useState(errorsInitialState);
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const inputName: string = e.target.name;
        const inputValue: string = e.target.value;
        setFormData(prev => ({ ...prev, [inputName]: inputValue }));
        if (timeoutRefs.current[inputName] != null) {
            clearTimeout(timeoutRefs.current[inputName]);
        }
        timeoutRefs.current[inputName] = setTimeout(() => {
            setFormErrors(prev => ({ ...prev, [inputName]: validateField(inputName, inputValue) }))
        }, timeout);
    }

    const validateField = (inputName: string, value: string): string => {
        switch (inputName) {
            case "name":
                return checkTextInputError("imię", value, 3);
            case "surname":
                return checkTextInputError("nazwisko", value, 3);
            case "email":
                return checkEmailError(value);
            case "message":
                return checkMessageError(value);
            default:
                return "";
        }
    }

    const formHasErrors = (): boolean => {
        const nameHasError = checkTextInputError("imię", formData.name, 3);
        const surnameHasError = checkTextInputError("nazwisko", formData.surname, 3);
        const emailHasError = checkEmailError(formData.email);
        const messageHasError = checkMessageError(formData.message);
        return Boolean(nameHasError || surnameHasError || emailHasError || messageHasError);
    }

    const submitContactForm = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!formHasErrors()) {
            setShowConfirmation(true);
            setFormData(formInitialState);
            setFormErrors(errorsInitialState);
            setWasSubmitted(false);
        } else {
            setFormErrors({
                name: checkTextInputError("imię", formData.name, 3),
                surname: checkTextInputError("nazwisko", formData.surname, 3),
                email: checkEmailError(formData.email),
                message: checkMessageError(formData.message)
            });
            setWasSubmitted(true);
        }
    };

    return (
        <Container className="d-flex flex-column">
            <Row>
                <Col className="mt-4 mb-4" md={7}>
                    <Card className="p-4 shadow-sm">
                        <h4 className="text-primary mb-4" style={{ paddingBottom: "0.5rem" }}>Skontaktuj się z nami</h4>
                        <Form onSubmit={submitContactForm} noValidate>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Imię</Form.Label>
                                        <Form.Control
                                            name="name"
                                            type="text"
                                            placeholder="Twoje imię"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onBlur={() => setFormErrors(
                                                prev => (
                                                    { ...prev, "name": checkTextInputError("imię", formData.name, 3) }
                                                )
                                            )} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nazwisko</Form.Label>
                                        <Form.Control
                                            name="surname"
                                            type="text"
                                            placeholder="Twoje nazwisko"
                                            value={formData.surname}
                                            onChange={handleInputChange}
                                            onBlur={() => setFormErrors(
                                                prev => (
                                                    { ...prev, "surname": checkTextInputError("nazwisko", formData.surname, 3) }
                                                )
                                            )} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={() => setFormErrors(
                                        prev => (
                                            { ...prev, "email": checkEmailError(formData.email) }
                                        )
                                    )} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Wiadomość</Form.Label>
                                <Form.Control
                                    name="message"
                                    as="textarea"
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    onBlur={() => setFormErrors(prev => (
                                            {...prev, "message": checkMessageError(formData.message)}
                                        )
                                    )}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={ wasSubmitted && formHasErrors() }>
                                Wyślij
                            </Button>
                        </Form>
                        {Object.values(formErrors).map((errMsg, index) => 
                            wasSubmitted && errMsg !== "" && (
                                <div key={ index } className="error-frame mt-3 d-flex align-items-center">
                                    <FaExclamationTriangle className="me-2" />
                                    {errMsg}
                                </div>
                            )
                        )}
                    </Card>
                </Col>
                <Col className="mt-4 mb-4" md={5}>
                    <Card className="p-4 shadow-sm bg-light">
                        <h5 className="text-primary mt-3" style={{ paddingBottom: "0.5rem" }}>
                            <FaMapMarkerAlt /> Adres
                        </h5>
                        <p>ul. Przykładowa 1, 01-234 Warszawa</p>
                        <h5 className="text-primary mt-3" style={{ paddingBottom: "0.5rem" }}>
                            <FaPhoneAlt /> Telefon
                        </h5>
                        <p>+48 123 456 789</p>
                        <h5 className="text-primary mt-3" style={{ paddingBottom: "0.5rem" }}>
                            <FaEnvelope /> Email
                        </h5>
                        <p>support@amce.pl</p>
                    </Card>
                </Col>
            </Row>
            <Modal show={showConfirmation} onHide={() => handleCloseConfirmation()}>
                <Modal.Body>Wysłaliśmy twoją wiadomość. Odpowiemy najszybciej jak to tylko będzie możliwe.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleCloseConfirmation()}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}