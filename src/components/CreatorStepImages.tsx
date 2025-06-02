
import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card, } from 'react-bootstrap';
import { FaExclamationTriangle, FaFileImage, FaRegTrashAlt } from "react-icons/fa";

type CreatorImageProps = {
    uploadedFiles: File[];
    setUploadedFiles: (files: File[]) => void;
    onValidate: () => void;
    wasVisited: boolean;
};


export const CreatorStepImages = ({ uploadedFiles, setUploadedFiles, onValidate, wasVisited }: CreatorImageProps) => {
    const maxFileSizeMB: number = 5;
    const maxFilesQty: number = 5;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const timeout = 2000;

    const [formError, setFormError] = useState<string>("");
    const [touchedStatus, setTouchedStatus] = useState<boolean>(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleAddFile = () => {
        if (selectedFile === null) {
            return null;
        }
        if (uploadedFiles.length >= maxFilesQty) {
            setFormError(`Możesz dodać maksymalnie ${maxFilesQty} zdjęć.`);
            return;
        }
        const errorMsg: string = validateImgFile(selectedFile);
        setFormError(errorMsg);
        if (errorMsg === "") {
            setUploadedFiles([...uploadedFiles, selectedFile]);
            setSelectedFile(null);
        }
    };

    const validateImgFile = (file: File): string => {
        const trimmedName: string = file.name.trim();
        const sizeInMB: number = parseFloat((file.size / (1024 * 1024)).toFixed(2));
        if (!trimmedName || trimmedName.length === 0) {
            return "Podana nazwa pliku jest pusta.";
        }
        if (!trimmedName.toLowerCase().endsWith(".jpg") && !trimmedName.toLowerCase().endsWith(".jpeg")) {
            return "Dozwolone formaty plików to jpg i jpeg.";
        }
        if (sizeInMB > maxFileSizeMB) {
            return `Rozmiar pliku przekracza maksymalny dozwolony rozmiar - ${maxFileSizeMB}MB.`;
        }
        return "";
    }

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const clearFileInput = (): void => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <Card>
            <Card.Header as="h6" className="bg-primary text-white">
                Dodaj zdjęcia pojazdu
            </Card.Header>
            <Card.Body>
                <Form.Group>
                    {
                        uploadedFiles.length === 0 ? (
                            <div className="text-muted mb-3">Brak dodanych zdjęć</div>
                        ) : (
                            <div className="mb-3 text-start">
                                {uploadedFiles.map((file, idx) => (
                                    <span key={idx}>
                                        <FaFileImage className="text-secondary me-1" />
                                        {file.name}
                                        {idx < uploadedFiles.length - 1 && ', '}
                                    </span>
                                ))}
                            </div>
                        )
                    }
                    <div className="d-flex align-items-center gap-2">
                        <Form.Control
                            type="file"
                            ref={fileInputRef}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedFile(e.target.files?.[0] || null)} />
                        <FaRegTrashAlt
                            className="text-secondary"
                            size={20}
                            onClick={clearFileInput}
                            style={{ cursor: 'pointer' }} />
                    </div>
                    <Button className="mt-2" onClick={handleAddFile} disabled={!selectedFile || uploadedFiles.length >= maxFilesQty}>
                        Dodaj zdjęcie
                    </Button>
                </Form.Group>
                {/*{formError !== "" && (wasVisited || touchedStatuses[name as keyof typeof touchedStatuses]) && (*/}
                {formError !== "" && (
                    <div className="error-frame mt-3 d-flex align-items-center">
                        <FaExclamationTriangle className="me-2" />
                        {formError}
                    </div>
                )}
                {uploadedFiles.length >= maxFilesQty && (
                    <div className="warning-frame mt-3 d-flex align-items-center">
                        <FaExclamationTriangle className="me-2" />
                        {`Osiągnięto maksymalną ilość zdięć - ${maxFilesQty}`}
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}