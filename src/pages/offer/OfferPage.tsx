
import { Badge, Container, ListGroup } from "react-bootstrap"
import { useLocation, useParams } from "react-router-dom";
import { OfferContent } from '../../types/OfferContent';
import ImageGallery from 'react-image-gallery';
import { getGalleryImagesByItemId } from '../../service/MockApiService';



export const OfferPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const carData = (location.state as { carData: OfferContent })?.carData;
    const images = id ? getGalleryImagesByItemId(parseInt(id)) : [];

    
    return (
        <Container className="d-flex flex-column">
            <Container className="d-flex flex-row">
                <Container>
                    <div className="d-flex flex-row text-primary fw-bold fs-3">
                        {carData.brand} {carData.model}
                        <span className="d-inline-flex align-self-start ms-2">
                            <Badge bg="primary" style={{ fontSize: '1rem', padding: '0.3em 0.5em' }}>
                                {carData.type}
                            </Badge>
                        </span>
                    </div>
                    <Container className="d-flex flex-row" style={{ padding: "12px 0px" }}>
                        <table width="100%">
                            <tbody>
                                <tr className="fs-5 fw-bold">
                                    <td width="50%">Cena</td><td>{carData.price.toLocaleString('pl-PL')} zł</td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                    <Container>
                        <ListGroup>
                            <ListGroup.Item>
                                <table width="100%">
                                    <tbody>
                                        <tr >
                                            <td width="50%" style={{ textAlign: 'left' }}>Rok produkcji:</td><td>{carData.year}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td width="50%" style={{ textAlign: 'left' }}>Rodzaj paliwa:</td><td>{carData.fuel}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td width="50%" style={{ textAlign: 'left' }}>Pojemność silnika:</td><td>{carData.displacement} ccm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td width="50%" style={{ textAlign: 'left' }}>Moc silnika:</td><td>{carData.power} KM</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td width="50%" style={{ textAlign: 'left' }}>Przebieg:</td><td>{carData.mileage} 000 km</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </ListGroup.Item>
                        </ListGroup>
                    </Container>
                </Container>
                <Container className="d-flex image-gallery" style={{ padding: "12px 0px" }}>
                    <ImageGallery items={images} />
                </Container>
            </Container>
            <Container className="d-flex flex-column">
                <div className="text-primary text-start fw-bold fs-3 pb-3">Opis:</div>
                <div className="mb-3 text-area">
                    {carData.description}
                </div>
            </Container>
        </Container>
    )
}