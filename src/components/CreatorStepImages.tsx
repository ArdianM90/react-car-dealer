
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card, } from 'react-bootstrap';
import { FaFileImage } from "react-icons/fa";

type CreatorImageProps = {
    uploadedFiles: File[];
    setUploadedFiles: (files: File[]) => void;
};


export const CreatorStepImages = ({ uploadedFiles, setUploadedFiles }: CreatorImageProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleAddFile = () => {
        if (selectedFile) {
            setUploadedFiles([...uploadedFiles, selectedFile]);
            setSelectedFile(null);
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
                    <Form.Control
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    <Button className="mt-2" onClick={handleAddFile} disabled={!selectedFile}>
                        Dodaj zdjęcie
                    </Button>
                </Form.Group>
            </Card.Body>
        </Card>
    )
}