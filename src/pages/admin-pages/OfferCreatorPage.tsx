import {useParams} from "react-router-dom";
import {ReactNode, useCallback, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap"
import {FaCheckSquare, FaExclamationTriangle} from 'react-icons/fa';
import {getVehicle, persistChanges} from '../../service/MockApiService';
import {CreatorStepBasicData} from '../../components/CreatorStepBasicData';
import {CreatorStepImages} from '../../components/CreatorStepImages';
import {CreatorStepDetails} from '../../components/CreatorStepDetails';
import {CreatorStepDescription} from '../../components/CreatorStepDescription';
import {CreatorStepPrice} from '../../components/CreatorStepPrice';
import {CreatorStepSummary} from '../../components/CreatorStepSummary';
import {OfferCreatorDTO} from '../../types/OfferCreatorDTO';
import {formInitialData, CreatorStep, StepValidationStatus} from '../../types/OfferCreatorConstants';


export const OfferCreatorPage = () => {

    const { id } = useParams();
    const isEditMode: boolean = id !== undefined;
    const steps: CreatorStep[] = [CreatorStep.BasicData, CreatorStep.Images, CreatorStep.Details, CreatorStep.Description, CreatorStep.Price, CreatorStep.Summary];
    const stepsVisitedInitialState: Record<CreatorStep, boolean> = {
        [CreatorStep.BasicData]: false,
        [CreatorStep.Images]: false,
        [CreatorStep.Details]: false,
        [CreatorStep.Description]: false,
        [CreatorStep.Price]: false,
        [CreatorStep.Summary]: false
    };

    const [formData, setFormData] = useState<OfferCreatorDTO>(formInitialData);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [animatedStep, setAnimatedStep] = useState<number | null>(null);
    const [stepsValidation, setStepsValidation] = useState<StepValidationStatus[]>(Array(steps.length).fill(StepValidationStatus.Unvisited));
    const [stepsVisited, setStepsVisited] = useState(stepsVisitedInitialState);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleConfirmation = (): void => setShowConfirmation(true);

    const handleNext = (): void => {
        if (currentStepIdx < steps.length - 1) {
            setStepsVisited(prev => ({...prev, [steps[currentStepIdx]]: true,}));
            const nextStep = currentStepIdx + 1;
            setCurrentStepIdx(nextStep);
            setAnimatedStep(nextStep);
        }
    };

    const handleBack = (): void => {
        if (currentStepIdx > 0) {
            setStepsVisited(prev => ({...prev, [steps[currentStepIdx]]: true,}));
            const prevStep = currentStepIdx - 1;
            setCurrentStepIdx(prevStep);
            setAnimatedStep(prevStep);
        }
    };

    const handleCloseConfirmation = (accept: boolean): void => {
        setShowConfirmation(false)
        if (accept) {
            formData.imgUrl = "/assets/img/" + uploadedFiles[0].name;
            persistChanges(formData);
            if (!isEditMode) {
                setCurrentStepIdx(0);
                setStepsVisited(stepsVisitedInitialState);
                setFormData(formInitialData);
                setUploadedFiles([]);
            }
        }
    };

    const updateFormValidation = useCallback((isValid: boolean): void => {
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
                validationIcon = <FaCheckSquare className="text-white ms-2" style={{fontSize: '1.3rem'}}/>;
                break;
            case StepValidationStatus.Invalid:
                validationIcon = <FaExclamationTriangle className="text-white ms-2" style={{fontSize: '1.3rem'}}/>;
                break;
        }
        return validationIcon;
    }

    const formIsInvalid = (): boolean => {
        const stepWithoutSummary = stepsValidation.slice(0, -1);
        return stepWithoutSummary.filter((e) => e !== StepValidationStatus.Valid).length > 0;
    }

    useEffect(() => {
        if (id) {
            getVehicle(Number(id)).then(vehicle => {
                if (vehicle) {
                    setFormData({
                        id: vehicle.id,
                        brand: vehicle.brand,
                        model: vehicle.model,
                        type: vehicle.type,
                        price: vehicle.price,
                        currency: vehicle.currency,
                        year: vehicle.year,
                        fuel: vehicle.fuel,
                        mileage: vehicle.mileage,
                        power: vehicle.power,
                        displacement: vehicle.displacement,
                        imgUrl: vehicle.imgUrl,
                        description: vehicle.description
                    });
                }
            });
        }
    }, [id]);

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
                    onValidate={updateFormValidation}
                    wasVisited={stepsVisited[CreatorStep.BasicData]}/>
            case CreatorStep.Images:
                return <CreatorStepImages
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                    onValidate={updateFormValidation}
                    wasVisited={stepsVisited[CreatorStep.Images]}/>
            case CreatorStep.Details:
                return <CreatorStepDetails
                    formData={formData}
                    setFormData={setFormData}
                    onValidate={updateFormValidation}
                    wasVisited={stepsVisited[CreatorStep.Details]}/>
            case CreatorStep.Description:
                return <CreatorStepDescription
                    formData={formData}
                    setFormData={setFormData}
                    onValidate={updateFormValidation}
                    wasVisited={stepsVisited[CreatorStep.Description]}/>
            case CreatorStep.Price:
                return <CreatorStepPrice
                    formData={formData}
                    setFormData={setFormData}
                    onValidate={updateFormValidation}
                    wasVisited={stepsVisited[CreatorStep.Price]}/>
            case CreatorStep.Summary:
                return <CreatorStepSummary
                    formData={formData}
                    uploadedFiles={uploadedFiles}
                    stepsValidation={stepsValidation}/>
        }
    };

    return (
        <Container fluid>
            <div className="text-center text-primary fw-bold fs-4 mb-2">
                {isEditMode ? 'KREATOR OFERTY' : 'EDYCJA OFERTY'} - krok {currentStepIdx+1} z {steps.length}
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
                                    <span>{step}</span>{resolveIcon(step, stepsValidation[index])}
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
                                    {isEditMode ? 'Zapisz zmiany' : 'Dodaj ofertę'}
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
