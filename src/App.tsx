﻿import {Button, Container} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from 'react';
import './App.css';
import {SpeedInsights} from "@vercel/speed-insights/react";
import {OfferContent} from './types/OfferContent';
import {getRecommendedVehicles} from './service/MockApiService';
import {RecommendationFrame} from "./components/RecommendationFrame.tsx";

function App() {
    const [offerCardList, setImgCardList] = useState<OfferContent[]>([]);

    useEffect(() => {
        getRecommendedVehicles().then(data => setImgCardList(data));
    }, []);

    return (
        <Container fluid>
            <SpeedInsights/>
            <Row className="d-flex justify-content-end  mt-3 mb-3">
                <Form className="search-bar d-flex mb-3">
                    <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Row>
            <div className="fw-bold fs-4 text-primary text-start my-4">
                O tej stronie:
            </div>
            <div className="mb-3">
                <p className="text-area">
                    Projekt powstał jako poligon doświadczalny do nauki i&nbsp;testowania komponentów oraz wzorców
                    projektowych w&nbsp;React, a&nbsp;obecnie pełni rolę elementu portfolio. Inspiracją do stworzenia
                    strony były serwisy ogłoszeniowe, takie jak Otomoto, natomiast zdjęcia samochodów użyte
                    w&nbsp;tym projekcie pochodzą z&nbsp;serwisu Pexels (
                    <a className="text-decoration-none" href="https://www.pexels.com">www.pexels.com</a>).
                </p>
                <p className="text-area">
                    Szczególnie zachęcam do zapoznania się z&nbsp;podstronami prezentującymi listę ofert z&nbsp;możliwością
                    sortowania i&nbsp;filtrowania oraz kreatorem ogłoszeń, który pozwala zarówno na dodawanie, jak i&nbsp;edycję
                    ofert, wyposażonym w&nbsp;rozbudowaną walidację. Wszystkie podstrony korzystają z&nbsp;jednego
                    serwisu mock API, dzięki czemu całość wiarygodnie symuluje działanie strony z&nbsp;prawdziwym backendem.
                </p>
            </div>
            <hr/>
            <div className="fw-bold fs-4 text-primary text-start my-4">
                Oferty wybrane dla Ciebie
            </div>
            <Row className="d-flex justify-content-between">
                {offerCardList.map((item: OfferContent, index: number) =>
                    <RecommendationFrame key={`card-${index}`} index={index} item={item}/>
                )}
            </Row>
        </Container>
    );
}

export default App;