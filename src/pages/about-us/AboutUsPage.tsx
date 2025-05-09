import { Card, Col, Container, Row } from "react-bootstrap"


export const AboutUsPage = () => {

    return (
        <Container className="py-5">
            <Row className="mb-5">
                <Col md={6}>
                    <h2 className="text-primary mb-3">O nas</h2>
                    <p>
                        Jesteśmy rodzinną firmą z ponad 15-letnim doświadczeniem w sprzedaży samochodów używanych.
                        Naszą misją jest dostarczanie sprawdzonych, bezpiecznych i&nbsp;przystępnych cenowo pojazdów klientom z całej Polski.
                    </p>
                    <p>
                        Każdy samochód w naszej ofercie przechodzi rygorystyczny przegląd techniczny i&nbsp;jest gotowy do jazdy od zaraz.
                        Oferujemy również możliwość finansowania oraz przyjmujemy auta w rozliczeniu.
                    </p>
                    <p>
                        Nasz zespół tworzą pasjonaci motoryzacji, którzy chętnie pomogą Ci dobrać auto idealnie dopasowane do Twoich potrzeb.
                    </p>
                </Col>
                <Col md={6}>
                    <Card className="p-3 shadow-sm">
                        <h5 className="text-primary mb-2">LOKALIZACJA</h5>
                        <p><strong>AMCE – Samochody Używane</strong><br />
                            ul. Przykładowa 1<br />
                            01-234 Warszawa</p>
                        <div className="ratio ratio-4x3">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2585.858965674065!2d20.689439999999998!3d49.600409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDnCsDM2JzAxLjUiTiAyMMKwNDEnMjIuMCJF!5e0!3m2!1spl!2spl!4v1746621427492!5m2!1spl!2spl"
                                width="100%"
                                height="100%"
                                title="Lokalizacja AMCE"
                            ></iframe>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}