
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


export const CreatorStepDetails = ({ formData, setFormData, onValidate, wasVisited }: CreatorFormProps) => {
    const errorsInitialState = {
        year: '',
        fuel: '',
        displacement: '',
        power: '',
        mileage: '',
    };

    const touchedInitialState = {
        year: false,
        fuel: false,
        displacement: false,
        power: false,
        mileage: false,
    };

    const timeoutsInitialState = {
        year: null,
        fuel: null,
        displacement: null,
        power: null,
        mileage: null,
    };

    const timeoutRefs = useRef<Record<string, NodeJS.Timeout | null>>(timeoutsInitialState)
    const timeout = 2000;

    const [formErrors, setFormErrors] = useState(errorsInitialState);
    const [touchedStatuses, setTouchedStatuses] = useState(touchedInitialState);

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear; y >= 1900; y--) {
        years.push(y);
    }

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

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputName: string = e.target.name;
        const inputValue: string = e.target.value;
        setFormData({ ...formData, displacement: inputValue });
        if (timeoutRefs.current[inputName] != null) {
            clearTimeout(timeoutRefs.current[inputName]);
        }
        timeoutRefs.current[inputName] = setTimeout(() => {
            setFormErrors(prev => ({ ...prev, displacement: validateField(inputName, inputValue) }))
            setTouchedStatuses(prev => ({ ...prev, displacement: true }));
        }, timeout);
    }

    const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const inputName: string = e.target.name;
        const inputValue: string = e.target.value;
        setTouchedStatuses(prev => ({ ...prev, [inputName]: true }));
        setFormErrors(prev => ({ ...prev, [inputName]: validateField(inputName, inputValue) }));
    }

    const validateField = (inputName: string, value: string | null): string => {
        switch (inputName) {
            case "year": {
                if (value === null || value === "") {
                    return "Wybierz rok produkcji.";
                }
                break;
            }
            case "fuel": {
                if (value === null || value === "") {
                    return "Wybierz rodzaj paliwa.";
                }
                break;
            }
            case "displacement": {
                if (value === null || value === "") {
                    return "Pole pojemność silnika jest wymagane.";
                }
                if (Number(value) <= 0) {
                    return "Nieprawidłowa pojemność."
                }
                if (Number(value) > 5) {
                    return "Maksymalna pojemność to 5.0."
                }
                break;
            }
            case "power": {
                if (value === null || value === "") {
                    return "Pole moc silnika jest wymagane.";
                }
                if (Number(value) <= 0) {
                    return "Nieprawidłowa moc silnika."
                }
                if (Number(value) > 1000) {
                    return "Maksymalna moc to 1000 KM."
                }
                break;
            }
            case "mileage": {
                if (value === null || value === "") {
                    return "Przebieg jest polem wymaganym.";
                }
                if (Number(value) < 1) {
                    return "Nieprawidłowy przebieg."
                }
                break;
            }
        }
        return "";
    }

    useEffect(() => {
        const yearErrorMsg = validateField("year", formData.year?.toString() ?? "");
        const fuelErrorMsg = validateField("fuel", formData.fuel);
        const displacementErrorMsg = validateField("displacement", formData.displacement);
        const powerErrorMsg = validateField("power", formData.power?.toString() ?? "");
        const mileageErrorMsg = validateField("mileage", formData.mileage?.toString() ?? "");
        onValidate(yearErrorMsg === "" && fuelErrorMsg === "" && displacementErrorMsg === "" && powerErrorMsg === "" && mileageErrorMsg === "");
        setFormErrors({
            year: yearErrorMsg,
            fuel: fuelErrorMsg,
            displacement: displacementErrorMsg,
            power: powerErrorMsg,
            mileage: mileageErrorMsg,
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
                Uzupełnij dane techniczne pojazdu
            </Card.Header>
            <Card.Body>
                <Form.Group>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label className="fw-bold" htmlFor="year">Rok produkcji</Form.Label>
                            <Form.Select id="year" name="year"
                                value={formData.year === null ? "" : formData.year}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur} >
                                <option value="" disabled hidden>Wybierz rok produkcji</option>
                                {years.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={6}>
                            <Form.Label className="fw-bold" htmlFor="fuel">Rodzaj paliwa</Form.Label>
                            <Form.Select id="fuel" name="fuel"
                                value={formData.fuel === null ? "" : formData.fuel}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur} >
                                <option value="" disabled hidden>Wybierz rodzaj paliwa</option>
                                <option value="benzyna">Benzyna</option>
                                <option value="diesel">Diesel</option>
                                <option value="benzyna+lpg">Benzyna + LPG</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label className="fw-bold">Pojemność silnika (L)</Form.Label>
                            <Form.Control id="displacement" name="displacement" type="number" step="0.1" 
                                placeholder="Pojemność silnika"
                                value={formData.displacement === null ? "" : formData.displacement}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur} />
                            <Form.Range
                                name="displacement"
                                min="0.1"
                                max="5"
                                step="0.1"
                                value={formData.displacement === null ? 0.1 : parseFloat(formData.displacement)}
                                onChange={handleRangeChange}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label className="fw-bold">Moc silnika (KM)</Form.Label>
                            <Form.Control id="power" name="power" type="number"
                                placeholder="Moc silnika"
                                value={formData.power === null ? "" : formData.power}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Label className="fw-bold">Przebieg (km)</Form.Label>
                            <Form.Control id="mileage" name="mileage" type="number"
                                placeholder="Przebieg"
                                value={formData.mileage === null ? "" : formData.mileage}
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