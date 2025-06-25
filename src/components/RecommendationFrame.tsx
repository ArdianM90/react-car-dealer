import {Button, Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {OfferContent} from "../types/OfferContent.ts";

export const RecommendationFrame = ({index, item}: {index: number, item: OfferContent}) => {
    return (
        <Col className="mb-3 recommendation-card">
            <Card className="pt-2">
                <Card.Title
                    className="text-center text-primary fs-5">{item.brand + " " + item.model + " (" + item.year + ")"}</Card.Title>
                <Link className="text-decoration-none" to={`/offer/${item.id}`} state={{carData: item}}>
                    <Card.Img className="img-fluid p-2 object-fit-cover" variant="top" src={item.imgUrl}/>
                </Link>
                <Card.Body>
                    <ul className="list-group list-group-flush">
                        <li key={`card-item${index}-engine`} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="me-auto">
                                <div className="fw-bold">Silnik</div>
                                {item.fuel + ', ' + item.displacement + ', ' + item.power + ' KM'}
                            </div>
                        </li>
                        <li key={`card-item${index}-mileage`}
                            className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="me-auto">
                                <div className="fw-bold">Przebieg</div>
                                {item.mileage + ' 000 km'}
                            </div>
                        </li>
                        <li key={`card-item${index}-price`} className="list-group-item p-0">
                            <div className="d-flex flex-row p-0 justify-content-end">
                                <div className="d-flex flex-column align-items-center p-0 py-3 px-3">
                                    <div className="fs-5 fw-bold text-primary">CENA</div>
                                    <div className="fs-5">{item.price.toLocaleString('pl-PL')} {item.currency}</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <Link className="text-decoration-none" to={`/offer/${item.id}`} state={{carData: item}}>
                        <Button variant="primary">Szczegóły</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    )
}