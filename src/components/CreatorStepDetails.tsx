import Form from 'react-bootstrap/Form';
import {Card, Col, Row} from 'react-bootstrap';
import {OfferCreatorDTO} from '../types/OfferCreatorDTO';
import {useEffect, useRef, useState} from 'react';
import {FaExclamationTriangle} from 'react-icons/fa';
import {FuelType} from "../types/OfferContent.ts";
import {checkDetailsFieldError} from "../service/ValidatorService.ts";

type CreatorFormProps = {
    formData: OfferCreatorDTO;
    setFormData: (data: OfferCreatorDTO) => void;
    onValidate: (isValid: boolean) => void;
    wasVisited: boolean;
};


export const CreatorStepDetails = ({formData, setFormData, onValidate, wasVisited}: CreatorFormProps) => {
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
        setFormData({...formData, [inputName]: inputValue})
        if (timeoutRefs.current[inputName] != null) {
            clearTimeout(timeoutRefs.current[inputName]);
        }
        timeoutRefs.current[inputName] = setTimeout(() => {
            setFormErrors(prev => ({...prev, [inputName]: checkDetailsFieldError(inputName, inputValue)}))
            setTouchedStatuses(prev => ({...prev, [inputName]: true}));
        }, timeout);
    }

    const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const inputName: string = e.target.name;
        const inputValue: string = e.target.value;
        setTouchedStatuses(prev => ({...prev, [inputName]: true}));
        setFormErrors(prev => ({...prev, [inputName]: checkDetailsFieldError(inputName, inputValue)}));
    }

    const clearTimeOuts = (): void => {
        Object.values(timeoutRefs.current).forEach(timeout => {
            if (timeout != null) {
                clearTimeout(timeout);
            }
        });
    }

    useEffect(() => {
        const yearErrorMsg = checkDetailsFieldError("year", formData.year?.toString() ?? "");
        const fuelErrorMsg = checkDetailsFieldError("fuel", formData.fuel);
        const displacementErrorMsg = checkDetailsFieldError("displacement", formData.displacement);
        const powerErrorMsg = checkDetailsFieldError("power", formData.power?.toString() ?? "");
        const mileageErrorMsg = checkDetailsFieldError("mileage", formData.mileage?.toString() ?? "");
        onValidate(yearErrorMsg === "" && fuelErrorMsg === "" && displacementErrorMsg === "" && powerErrorMsg === "" && mileageErrorMsg === "");
        setFormErrors({
            year: yearErrorMsg,
            fuel: fuelErrorMsg,
            displacement: displacementErrorMsg,
            power: powerErrorMsg,
            mileage: mileageErrorMsg,
        });

        return (() => clearTimeOuts());
    }, [formData]);

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
                                         onBlur={handleOnBlur}>
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
                                         onBlur={handleOnBlur}>
                                <option value="" disabled hidden>Wybierz rodzaj paliwa</option>
                                {Object.entries(FuelType).map(([key, value]) => (
                                    <option key={key} value={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label className="fw-bold" htmlFor="displacement">Pojemność silnika (L)</Form.Label>
                            <Form.Control id="displacement" name="displacement" type="number" step="0.1"
                                          placeholder="Pojemność silnika"
                                          value={formData.displacement === null ? "" : formData.displacement}
                                          onChange={handleInputChange}
                                          onBlur={handleOnBlur}/>
                            <Form.Range name="displacement" min="0.1" max="5" step="0.1"
                                value={formData.displacement === null ? 0.1 : parseFloat(formData.displacement)}
                                onChange={handleInputChange}/>
                        </Col>
                        <Col md={6}>
                            <Form.Label className="fw-bold" htmlFor="power">Moc silnika (KM)</Form.Label>
                            <Form.Control id="power" name="power" type="number"
                                          placeholder="Moc silnika"
                                          value={formData.power === null ? "" : formData.power}
                                          onChange={handleInputChange}
                                          onBlur={handleOnBlur}/>
                            <Form.Range name="power" min="1" max="400" step="1"
                                value={formData.power === null ? 1 : Number(formData.power)}
                                onChange={handleInputChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Label className="fw-bold">Przebieg (km)</Form.Label>
                            <Form.Control id="mileage" name="mileage" type="number"
                                          placeholder="Przebieg"
                                          value={formData.mileage === null ? "" : formData.mileage}
                                          onChange={handleInputChange}
                                          onBlur={handleOnBlur}/>
                        </Col>
                    </Row>
                </Form.Group>
                {Object.entries(formErrors).map(([name, errMsg]) =>
                        errMsg !== "" && (wasVisited || touchedStatuses[name as keyof typeof touchedStatuses]) && (
                            <div key={name} className="error-frame mt-3 d-flex align-items-center">
                                <FaExclamationTriangle className="me-2"/>
                                {errMsg}
                            </div>
                        )
                )}
            </Card.Body>
        </Card>
    )
}