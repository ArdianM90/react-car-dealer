import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { FaCheckSquare, FaExclamationTriangle } from 'react-icons/fa';
import { CreatorStepBasicData } from '../../components/CreatorStepBasicData';
import { CreatorStepImages } from '../../components/CreatorStepImages';
import { CreatorStepDetails } from '../../components/CreatorStepDetails';
import { CreatorStepDescription } from '../../components/CreatorStepDescription';
import { CreatorStepPrice } from '../../components/CreatorStepPrice';
import { CreatorStepSummary } from '../../components/CreatorStepSummary';
import { OfferCreatorDTO } from '../../types/OfferCreatorDTO';
import { formInitialData, CreatorStep, StepValidationStatus } from '../../types/OfferCreatorConstants';

    
export const OfferCreatorPage = () => {
    const steps: CreatorStep[] = [CreatorStep.BasicData, CreatorStep.Images, CreatorStep.Details, CreatorStep.Description, CreatorStep.Price, CreatorStep.Summary];
    const stepsVisitedInitialState: Record<CreatorStep, boolean> = {
        [CreatorStep.BasicData]: false,
        [CreatorStep.Images]: false,
        [CreatorStep.Details]: false,
        [CreatorStep.Description]: false,
        [CreatorStep.Price]: false,
        [CreatorStep.Summary]: false
    };

    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [animatedStep, setAnimatedStep] = useState<number | null>(null);
    const [stepsValidation, setStepsValidation] = useState<StepValidationStatus[]>(Array(steps.length).fill(StepValidationStatus.Unvisited));
    const [stepsVisited, setStepsVisited] = useState(stepsVisitedInitialState);
    const [formData, setFormData] = useState<OfferCreatorDTO>(formInitialData);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleConfirmation = () => setShowConfirmation(true);

    const handleNext = () => {
        if (currentStepIdx < steps.length - 1) {
            setStepsVisited(prev => ({ ...prev, [steps[currentStepIdx]]: true, }));
            const nextStep = currentStepIdx + 1;
            setCurrentStepIdx(nextStep);
            setAnimatedStep(nextStep);
        }
    };

    const handleBack = () => {
        if (currentStepIdx > 0) {
            setStepsVisited(prev => ({ ...prev, [steps[currentStepIdx]]: true, }));
            const prevStep = currentStepIdx - 1;
            setCurrentStepIdx(prevStep);
            setAnimatedStep(prevStep);
        }
    };

    const handleCloseConfirmation = (accept: boolean) => {
        setShowConfirmation(false)
        if (accept) {
            setCurrentStepIdx(0);
            setStepsVisited(stepsVisitedInitialState);
            setFormData(formInitialData);
            setUploadedFiles([]);
        }
    };

    const updateFormValidation = useCallback((isValid: boolean) => {
        setStepsValidation(prev => {
            const updated = [...prev];
            updated[currentStepIdx] = isValid ? StepValidationStatus.Valid : StepValidationStatus.Invalid;
            return updated;
        });
    }, [currentStepIdx]);

    const resolveIcon = (step: CreatorStep, stepStatus: StepValidationStatus): ReactNode => {
        if (!stepsVisited[step]) return null;
        let validationIcon = null;
        switch (stepStatus) {
            case StepValidationStatus.Valid:
                validationIcon = <FaCheckSquare className="text-white ms-2" style={{ fontSize: '1.3rem' }} />;
                break;
            case StepValidationStatus.Invalid:
                validationIcon = <FaExclamationTriangle className="text-white ms-2" style={{ fontSize: '1.3rem' }} />;
                break;
        }
        return validationIcon;
    }

    const formIsInvalid = (): boolean => {
        const stepWithoutSummary = stepsValidation.slice(0, -1);
        return stepWithoutSummary.filter((e) => e !== StepValidationStatus.Valid).length > 0;
    } 

    useEffect(() => {
        if (animatedStep !== null) {
            const timeout = setTimeout(() => setAnimatedStep(null), 500);
            return () => clearTimeout(timeout);
        }
    }, [animatedStep]);

    const renderStepForm = () => {
        switch (steps[currentStepIdx]) {
            case CreatorStep.BasicData:
                return <CreatorStepBasicData
                    formData={formData}
                    setFormData={setFormData}
                    onValidate={(isValid) => updateFormValidation(isValid)}
                    wasVisited={stepsVisited[CreatorStep.BasicData]} />
            case CreatorStep.Images:
                return <CreatorStepImages
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                    onValidate={(isValid) => updateFormValidation(isValid)}
                    wasVisited={stepsVisited[CreatorStep.Images]} />
            case CreatorStep.Details:
                return <CreatorStepDetails
                    formData={formData}
                    setFormData={setFormData}
                    onValidate={(isValid) => updateFormValidation(isValid)}
                    wasVisited={stepsVisited[CreatorStep.Details]} />
            case CreatorStep.Description:
                return <CreatorStepDescription
                    formData={formData}
                    setFormData={setFormData} 
                    onValidate={(isValid) => updateFormValidation(isValid)}
                    wasVisited={stepsVisited[CreatorStep.Description]} />
            case CreatorStep.Price:
                return <CreatorStepPrice
                    formData={formData}
                    setFormData={setFormData}
                    onValidate={(isValid) => updateFormValidation(isValid)}
                    wasVisited={stepsVisited[CreatorStep.Price]} />
            case CreatorStep.Summary:
                return <CreatorStepSummary
                    formData={formData}
                    uploadedFiles={uploadedFiles}
                    stepsValidation={stepsValidation} />
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
                            <Card key={step} className={`step-box mb-2 ${bgClass} ${animationClass}`}>
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <span>{step}</span>{resolveIcon(step, stepsValidation[index]) }
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
                                <Button variant="primary" onClick={handleNext}>
                                    Dalej
                                </Button>
                            ) : (
                                <Button variant="primary"
                                    onClick={handleConfirmation}
                                        disabled={formIsInvalid()}>
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

function getFormInitialData(): OfferCreatorDTO | (() => OfferCreatorDTO) {
    throw new Error('Function not implemented.');
}
