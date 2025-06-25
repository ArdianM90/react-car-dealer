import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Alert, Card,} from 'react-bootstrap';
import { FaExclamationTriangle, FaFileImage, FaRegTrashAlt, FaTimes } from "react-icons/fa";
import {validateImgFile} from "../service/ValidatorService.ts";

type CreatorImageProps = {
    uploadedFiles: File[];
    setUploadedFiles: (files: File[]) => void;
    onValidate: (isValid: boolean) => void;
    wasVisited: boolean;
};


export const CreatorStepImages = ({ uploadedFiles, setUploadedFiles, onValidate, wasVisited }: CreatorImageProps) => {
    const maxFileSizeMB: number = 5;
    const maxFilesQty: number = 5;

    const [filesQtyError, setFilesQtyError] = useState<string>("");
    const [fileValidationError, setFileValidationError] = useState<string>("");
    const fileErrors = [filesQtyError, fileValidationError].filter(error => error !== "");
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
    const fileInputRef = useRef<HTMLInputElement >(null);

    const clearFileInput = (): void => {
        setSelectedFiles(null);
        if (fileInputRef.current !== null) {
            fileInputRef.current.value = "";
        }
        setFilesQtyError("");
        setFileValidationError("");
    };

    const handleUploadFiles = (): void => {
        if (selectedFiles === null) {
            return;
        }
        if (selectedFiles.length + uploadedFiles.length > maxFilesQty) {
            setFilesQtyError(`Możesz dodać maksymalnie ${maxFilesQty} zdjęć.`);
            return;
        }
        let errorMsg: string = "";
        for (const file of selectedFiles) {
            errorMsg = validateImgFile(file, maxFileSizeMB);
            if (errorMsg != "") {
                setFileValidationError(errorMsg);
                return;
            }
        }
        setUploadedFiles([...uploadedFiles, ...selectedFiles]);
        const currentFilesQty = uploadedFiles.length + selectedFiles.length;
        onValidate(currentFilesQty > 0);
        clearFileInput();
    };

    const handleDeleteFile = (fileName: string): void => {
        const newFilesList = uploadedFiles.filter(file => file.name !== fileName);
        setUploadedFiles(newFilesList);
    }

    useEffect(() => {
        onValidate(uploadedFiles.length > 0);
    }, [uploadedFiles]);

    return (
        <Card>
            <Card.Header as="h6" className="bg-primary text-white">
                Dodaj zdjęcia pojazdu
            </Card.Header>
            <Card.Body>
                <Form.Group>
                    <Alert variant="warning">
                        <strong>Uwaga:</strong> Dodawanie zdjęć działa wyłącznie w&nbsp;trybie pokazowym. Nowa oferta zostanie utworzona i&nbsp;pojawi
                        się na liście ofert, jednak zdjęcia nie zostaną przesłane na serwer. Aby walidacja kreatora umożliwiła dodanie oferty
                        należy jednak zasymulować dodanie zdjęcia.
                    </Alert>
                    {
                        uploadedFiles.length === 0 ? (
                            <div className="text-muted mb-3">Brak dodanych zdjęć</div>
                        ) : (
                            <div className="mb-3 text-start">
                                {uploadedFiles.map((file, idx) => (
                                    <span key={idx} className="image-file-span">
                                        <FaFileImage className="text-secondary me-1" style={{ fontSize: '1.2rem' }} />
                                        {file.name}
                                        <FaTimes className="text-secondary me-1 icon-hover-scale" onClick={() => handleDeleteFile(file.name)} style={{ fontSize: '1.2rem', cursor: 'pointer' }} />
                                    </span>
                                ))}
                            </div>
                        )
                    }
                    <div className="d-flex align-items-center gap-2">
                        <Form.Control
                            type="file"
                            multiple
                            ref={fileInputRef}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files !== null && setSelectedFiles(Array.from(e.target.files))}
                            disabled={uploadedFiles.length >= maxFilesQty} />
                        <FaRegTrashAlt
                            className="text-secondary icon-hover-scale"
                            size={20}
                            onClick={clearFileInput}
                            style={{ cursor: 'pointer' }} />
                    </div>
                    <Button
                        className="mt-2"
                        title={!selectedFiles ? "Wybierz pliki" : uploadedFiles.length >= maxFilesQty ? "Osiągnięto limit zdjęć" : ""}
                        onClick={handleUploadFiles}
                        disabled={!selectedFiles || uploadedFiles.length >= maxFilesQty} >Dodaj zdjęcie</Button>
                </Form.Group>
                {fileErrors.map((item, index) => (
                    <div key={`error-${index}`} className="error-frame mt-3 d-flex align-items-center">
                        <FaExclamationTriangle className="me-2" />
                        {item}
                    </div>
                ))}
                {uploadedFiles.length >= maxFilesQty && (
                    <div className="warning-frame mt-3 d-flex align-items-center">
                        <FaExclamationTriangle className="me-2" />
                        {`Osiągnięto maksymalną ilość zdjęć.`}
                    </div>
                )}
                {wasVisited && uploadedFiles.length == 0 && (
                    <div className="error-frame mt-3 d-flex align-items-center">
                        <FaExclamationTriangle className="me-2" />
                        {`Należy dodać przynajmniej jedno zdjęcie.`}
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}