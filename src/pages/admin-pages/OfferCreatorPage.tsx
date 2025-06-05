
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { FaCheckSquare } from 'react-icons/fa';
import { OfferContent } from '../../types/OfferContent';
import { CreatorStepBasicData } from '../../components/CreatorStepBasicData';
import { CreatorStepImages } from '../../components/CreatorStepImages';
import { CreatorStepDetails } from '../../components/CreatorStepDetails';
import { CreatorStepDescription } from '../../components/CreatorStepDescription';
import { CreatorStepPrice } from '../../components/CreatorStepPrice';
import { CreatorStepSummary } from '../../components/CreatorStepSummary';

enum CreatorStep {
    BasicData = "Marka i model",
    Images = "Zdjęcia",
    Details = "Dane techniczne",
    Description = "Opis",
    Price = "Cena",
    Summary = "Podsumowanie"
}
    
export const OfferCreatorPage = () => {
    const steps: CreatorStep[] = [
        CreatorStep.BasicData,
        CreatorStep.Images,
        CreatorStep.Details,
        CreatorStep.Description,
        CreatorStep.Price,
        CreatorStep.Summary
    ];

    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [animatedStep, setAnimatedStep] = useState<number | null>(null);
    const [formData, setFormData] = useState<OfferContent>({
        id: 0,
        brand: '',
        model: '',
        type: '',
        price: 0,
        year: 0,
        fuel: '',
        mileage: 0,
        power: 0,
        displacement: '',
        imgUrl: '',
        description: ''
    } as OfferContent);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleNext = (): void => {
        if (currentStepIdx < steps.length) {
            const nextStep = currentStepIdx + 1;
            setCurrentStepIdx(nextStep);
            setAnimatedStep(nextStep);
        }
    };

    const handleBack = (): void => {
        if (currentStepIdx > 0) {
            const prevStep = currentStepIdx - 1;
            setCurrentStepIdx(prevStep);
            setAnimatedStep(prevStep);
        }
    };

    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleConfirmation = (): void => setShowConfirmation(true);
    const handleCloseConfirmation = (accept: boolean): void => {
        setShowConfirmation(false)
        if (accept) {
            setCurrentStepIdx(0);
        }
    };

    useEffect(() => {
        if (animatedStep !== null) {
            const timeout = setTimeout(() => setAnimatedStep(null), 500);
            return () => clearTimeout(timeout);
        }
    }, [animatedStep]);

    const renderStepForm = () => {
        switch (steps[currentStepIdx]) {
            case CreatorStep.BasicData:
                return <CreatorStepBasicData formData={formData} setFormData={setFormData} />
            case CreatorStep.Images:
                return <CreatorStepImages uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
            case CreatorStep.Details:
                return <CreatorStepDetails formData={formData} setFormData={setFormData} />
            case CreatorStep.Description:
                return <CreatorStepDescription formData={formData} setFormData={setFormData} />
            case CreatorStep.Price:
                return <CreatorStepPrice formData={formData} setFormData={setFormData} />
            case CreatorStep.Summary:
                return <CreatorStepSummary formData={formData} uploadedImages={ uploadedFiles} />
            default:
                return null;
        }
    };

    return (
        <Container fluid>
            <div className="text-center fw-bold fs-4 mb-2" style={{ color: '#0D6EFD' }}>
                Kreator oferty
            </div>
            <Row>
                <Col md={2} className="step-sidebar">
                    {steps.map((step, index) => {
                        const isActive = currentStepIdx === index;
                        const bgClass = isActive ? 'bg-primary text-white' : 'bg-secondary text-white';
                        const animationClass = animatedStep === index ? 'animate-step' : '';

                        return (
                            <Card key={index} className={`step-box mb-2 ${bgClass} ${animationClass}`}>
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <span>{step}</span>
                                    {index < currentStepIdx && (
                                        <FaCheckSquare className="text-white ms-2" />
                                    )}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Col>
                <Col md={10}>
                    <Card className="p-4 mt-2">
                        <Form>{renderStepForm()}</Form>
                        <div className="d-flex justify-content-between mt-4">
                            <Button variant="secondary" onClick={handleBack} disabled={currentStepIdx === 0}>
                                Wstecz
                            </Button>
                            {currentStepIdx < steps.length - 1 ? (
                                <Button variant="primary" onClick={handleNext} disabled={currentStepIdx === steps.length - 1}>
                                    Dalej
                                </Button>
                            ) : (
                                <Button variant="primary" onClick={handleConfirmation}>
                                    Dodaj ofertę
                                </Button>
                            )}
                            
                        </div>
                    </Card>
                </Col>
            </Row>
            <Modal show={showConfirmation} onHide={() => handleCloseConfirmation(false)}>
                <Modal.Body>Czy na pewno chcesz dodać nową ofertę?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleCloseConfirmation(true)}>
                        Tak
                    </Button>
                    <Button variant="secondary" onClick={() => handleCloseConfirmation(false)}>
                        Nie
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}