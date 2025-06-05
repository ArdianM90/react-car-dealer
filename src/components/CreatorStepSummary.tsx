
import { Card, Col, Row, Table } from 'react-bootstrap';
import { OfferCreatorDTO } from '../types/OfferCreatorDTO';
import { CreatorStep, StepValidationStatus } from '../types/OfferCreatorConstants';
import { JSX } from 'react/jsx-runtime';
import { FaExclamationTriangle } from 'react-icons/fa';

type CreatorSummaryProps = {
    formData: OfferCreatorDTO;
    uploadedFiles: File[];
    stepsValidation: StepValidationStatus[];
};


export const CreatorStepSummary = ({ formData, uploadedFiles, stepsValidation }: CreatorSummaryProps) => {
    const steps: CreatorStep[] = [CreatorStep.BasicData, CreatorStep.Images, CreatorStep.Details, CreatorStep.Description, CreatorStep.Price];

    const resolveTitle = (stepsValidation: StepValidationStatus[]): JSX.Element => {
        if (stepsValidation[steps.indexOf(CreatorStep.BasicData)] !== StepValidationStatus.Valid) {
            return <em className="text-muted fst-italic">Błędy w 1. lub 3. kroku kreatora.</em>;
        } else {
            return <span>{formData.brand} {formData.model} ({formData.year ?? "brak roku"})</span>;
        }
    }

    const resolvePrice = (price: number | null): JSX.Element => {
        if (price === null || price === 0) {
            return <em className="text-muted fst-italic">Błąd w kreatorze - nieprawidłowa cena.</em>;
        } else {
            return <span>{price.toLocaleString('pl-PL')} {formData.currency}</span>;
        }
    }

    const resolveType = (type: string | null): JSX.Element => {
        if (type === null || type.length === 0) {
            return <em className="text-muted fst-italic">Błąd w kreatorze - nie wybrano typu pojazdu.</em>;
        } else {
            return <span>{type}</span>;
        }
    }

    const resolveFuel = (fuel: string | null): JSX.Element => {
        if (fuel === null || fuel.length === 0) {
            return <em className = "text-muted fst-italic">Błąd w kreatorze - nie wybrano paliwa.</em>;
        } else {
            return <span>{fuel}</span>;
        }
    }

    const resolveDisplacement = (displacement: string | null): JSX.Element => {
        if (displacement === null || displacement.length === 0) {
            return <em className="text-muted fst-italic">Błąd w kreatorze - nie uzupełniono pojemności silnika.</em>;
        } else {
            const dspcCcm: number = Number(displacement) * 1000;
            return <span>{dspcCcm.toLocaleString('pl-PL')} ccm</span>;
        }
    }

    const resolvePower = (power: number | null): JSX.Element => {
        if (power === null || power === 0) {
            return <em className="text-muted fst-italic">Błąd w kreatorze - nie uzupełniono mocy silnika.</em>;
        } else {
            return <span>{power} KM</span>;
        }
    }

    const resolveMileage = (mileage: number | null): JSX.Element => {
        if (mileage === null || mileage === 0) {
            return <em className="text-muted fst-italic">Błąd w kreatorze - nie uzupełniono przebiegu pojazdu.</em>;
        } else {
            return <span>{mileage.toLocaleString('pl-PL')} km</span>;
        }
    }

    return (
        <Card>
            <Card.Header as="h5" className="bg-primary text-white">
                Podsumowanie oferty
            </Card.Header>
            <Card.Body>
                <Row className="mb-2">
                    <Col md={2} className="text-start fw-bold">Tytuł oferty:</Col>
                    <Col md={4} className="text-start">{resolveTitle(stepsValidation)}</Col>
                    <Col md={2} className="text-end fw-bold">Cena:</Col>
                    <Col md={4} className="text-start">{resolvePrice(formData.price)}</Col>
                </Row>
                <Row className="mb-2">
                    <Col md={2} className="text-start fw-bold">Kategoria:</Col>
                    <Col md={4} className="text-start">{resolveType(formData.type)}</Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <h6 className="fw-bold">Dane techniczne</h6>
                        <Table bordered hover responsive className="mb-0">
                            <tbody>
                                <tr>
                                    <th className="w-25">Rodzaj paliwa</th>
                                    <td>{resolveFuel(formData.fuel)}</td>
                                </tr>
                                <tr>
                                    <th>Pojemność silnika</th>
                                    <td>{resolveDisplacement(formData.displacement)}</td>
                                </tr>
                                <tr>
                                    <th>Moc silnika</th>
                                    <td>{resolvePower(formData.power)}</td>
                                </tr>
                                <tr>
                                    <th>Przebieg</th>
                                    <td>{resolveMileage(formData.mileage)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={3} className="text-end fw-bold">Opis:</Col>
                    <Col md={9} className="text-start">{formData.description || <em className="text-muted fst-italic"> Błąd w kreatorze - brak opisu</em>}</Col>
                </Row>
                <Row>
                    <Col md={3} className="text-end fw-bold">Zdjęcia:</Col>
                    <Col md={9} className="text-start">
                        <ul className="mb-0">
                            {uploadedFiles.length > 0 ? (
                                uploadedFiles.map((f, idx) => <li key={idx}>{f.name}</li>)
                            ) : (
                                <li><em className="text-muted fst-italic">Brak dodanych zdjęć</em></li>
                            )}
                        </ul>
                    </Col>
                </Row>
                {steps.map((step, index) =>
                    stepsValidation[index] !== StepValidationStatus.Valid && (
                        <div key={index} className="error-frame mt-3 d-flex align-items-center">
                            <FaExclamationTriangle className="me-2" />
                            Błąd w {index+1}. kroku kreatora.
                        </div>
                    )
                )}
            </Card.Body>
        </Card>
    )
}