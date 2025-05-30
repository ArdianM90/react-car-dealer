import { FormEvent, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa"


export const ContactPage = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const nameChangeTimeout = useRef<NodeJS.Timeout | null>(null);
    const surnameChangeTimeout = useRef<NodeJS.Timeout | null>(null);
    const emailChangeTimeout = useRef<NodeJS.Timeout | null>(null);
    const messageChangeTimeout = useRef<NodeJS.Timeout | null>(null);
    const timeout = 2000;

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [surname, setSurname] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const formErrors: string[] = [nameError, surnameError, emailError, messageError].filter(Boolean);

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
        if (nameChangeTimeout.current) {
            clearTimeout(nameChangeTimeout.current);
        }
        nameChangeTimeout.current = setTimeout(() => {
            setNameError(checkNameError(e.target.value));
        }, timeout);
    }

    const checkNameError = (str: string): string => {
        let errorMsg = "";
        if (!str || str.trim().length === 0) {
            errorMsg = "Pole imię nie może być puste.";
        } else if (str.trim().length < 3) {
            errorMsg = "Pole imię powinno zawierać przynajmniej 3 znaki.";
        }
        return errorMsg;
    }

    const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSurname(e.target.value);
        if (surnameChangeTimeout.current) {
            clearTimeout(surnameChangeTimeout.current);
        }
        surnameChangeTimeout.current = setTimeout(() => {
            setSurnameError(checkSurnameError(e.target.value));
        }, timeout);
    }

    const checkSurnameError = (str: string): string => {
        let errorMsg = "";
        if (!str || str.trim().length === 0) {
            errorMsg = "Pole nazwisko nie może być puste.";
        } else if (str.trim().length < 3) {
            errorMsg = "Pole nazwisko powinno zawierać przynajmniej 3 znaki.";
        }
        return errorMsg;
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
        if (emailChangeTimeout.current) {
            clearTimeout(emailChangeTimeout.current);
        }
        emailChangeTimeout.current = setTimeout(() => {
            setEmailError(checkEmailError(e.target.value));
        }, timeout);
    }

    const checkEmailError = (str: string): string => {
        let errorMsg = "";
        if (!str || str.trim().length === 0) {
            errorMsg = "Pole email nie może być puste.";
        } else if (str.trim().length < 3) {
            errorMsg = "Pole email powinno zawierać przynajmniej 3 znaki.";
        } else {
            let atQty = 0;
            for (const char of str) {
                if (char === "@") {
                    atQty++;
                }
            }
            if (atQty != 1) {
                errorMsg = "Pole email powinno zawierać dokładnie jeden znak @.";
            }
        }
        return errorMsg;
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setMessage(e.target.value);
        if (messageChangeTimeout.current) {
            clearTimeout(messageChangeTimeout.current);
        }
        messageChangeTimeout.current = setTimeout(() => {
            setMessageError(checkMessageError(e.target.value));
        }, timeout);
    }

    const checkMessageError = (str: string): string => {
        let errorMsg = "";
        if (!str || str.trim().length === 0) {
            errorMsg = "Wiadomość jest pusta.";
        }
        return errorMsg;
    }

    const formHasErrors = (): boolean => {
        const nameHasError = checkNameError(name);
        const surnameHasError = checkSurnameError(surname);
        const emailHasError = checkEmailError(email);
        const messageHasError = checkMessageError(message);
        return Boolean(nameHasError || surnameHasError || emailHasError || messageHasError);
    }

    const submitContactForm = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setWasSubmitted(true);
        if (!formHasErrors()) {
            setShowConfirmation(true);
            setName("");
            setSurname("");
            setEmail("");
            setMessage("");
            setNameError("");
            setSurnameError("");
            setEmailError("");
            setMessageError("");
        } else {
            setNameError(checkNameError(name));
            setSurnameError(checkSurnameError(surname));
            setEmailError(checkEmailError(email));
            setMessageError(checkMessageError(message));
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
                                            type="text"
                                            placeholder="Twoje imię"
                                            value={name}
                                            onChange={handleNameChange}
                                            onBlur={() => setNameError(checkNameError(name))} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nazwisko</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Twoje nazwisko"
                                            value={surname}
                                            onChange={handleSurnameChange}
                                            onBlur={() => setSurnameError(checkSurnameError(surname))} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email@example.com"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={() => setEmailError(checkEmailError(email))} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Wiadomość</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={message}
                                    onChange={handleMessageChange}
                                    onBlur={() => setMessageError(checkMessageError(message))} />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={ wasSubmitted && formHasErrors() }>
                                Wyślij
                            </Button>
                        </Form>
                        {formErrors.map((errMsg, index) => 
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