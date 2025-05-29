import { FormEvent, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa"


export const ContactPage = () => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [surname, setSurname] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');

    const isNameValid = (str: string) => {
        setName(str);
        let errorMsg = "";
        if (!str || str.trim().length === 0) {
            errorMsg = "Pole imię nie może być puste.";
        } else if (str.trim().length < 3) {
            errorMsg = "Pole imię powinno zawierać przynajmniej 3 znaki.";
        }
        setNameError(errorMsg);
        return errorMsg === "";
    }

    const isSurnameValid = (str: string) => {
        setSurname(str);
        let errorMsg = "";
        if (!str || str.trim().length === 0) {
            errorMsg = "Pole nazwisko nie może być puste.";
        } else if (str.trim().length < 3) {
            errorMsg = "Pole nazwisko powinno zawierać przynajmniej 3 znaki.";
        }
        setSurnameError(errorMsg);
        return errorMsg === "";
    }

    const isEmailValid = (str: string) => {
        setEmail(str);
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
        setEmailError(errorMsg);
        return errorMsg === "";
    }

    const isMessageValid = (str: string) => {
        setMessage(str);
        let errorMsg = "";
        if (!str || str.trim().length === 0) {
            errorMsg = "Wiadomość jest pusta.";
        }
        setMessageError(errorMsg);
        return errorMsg === "";
    }

    const submitContactForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (+isNameValid(name) & +isSurnameValid(surname) & +isEmailValid(email) & +isMessageValid(message)) {
            alert("Wysłaliśmy twoją wiadomość. Odpowiemy najszybciej jak to tylko będzie możliwe.");
            setName("");
            setSurname("");
            setEmail("");
            setMessage("");
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
                                            onChange={(e) => isNameValid(e.target.value)} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nazwisko</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Twoje nazwisko"
                                            value={surname}
                                            onChange={(e) => isSurnameValid(e.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => isEmailValid(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Wiadomość</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={message}
                                    onChange={(e) => isMessageValid(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">Wyślij</Button>
                        </Form>
                        {nameError != "" && (
                            <div className="error-frame mt-3 d-flex align-items-center">
                                <FaExclamationTriangle className="me-2" />
                                { nameError }
                            </div>
                        )}
                        {emailError != "" && (
                            <div className="error-frame mt-3 d-flex align-items-center">
                                <FaExclamationTriangle className="me-2" />
                                { emailError }
                            </div>
                        )}
                        {surnameError && (
                            <div className="error-frame mt-3 d-flex align-items-center">
                                <FaExclamationTriangle className="me-2" />
                                {surnameError}
                            </div>
                        )}
                        {messageError && (
                            <div className="error-frame mt-3 d-flex align-items-center">
                                <FaExclamationTriangle className="me-2" />
                                {messageError}
                            </div>
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
        </Container>
    )
}