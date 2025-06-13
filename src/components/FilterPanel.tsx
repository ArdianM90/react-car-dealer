import Form from "react-bootstrap/Form";
import {Button, Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {OfferType} from "../types/OfferContent.ts";
import {FaSearch, FaUndo} from "react-icons/fa";
import {Filter, FilterValueType} from "../types/Filter.ts";
import {FormEvent} from "react";

interface FilterPanelProps {
    filterData: Filter,
    onChange: (field: keyof Filter, value: FilterValueType) => void;
    onSubmit: (e: FormEvent) => void;
    onClearFilter: () => void
}

export const FilterPanel = ({filterData, onChange, onSubmit, onClearFilter}: FilterPanelProps) => {
    return (
        <Form onSubmit={onSubmit}>
            <Row className="mb-3">
                <Col md={3}>
                    <Form.Label htmlFor="category">Kategoria</Form.Label>
                    <Form.Select id="category" name="category"
                                 value={filterData.category || "all"}
                                 onChange={(e) => onChange("category", e.target.value === "all" ? null : e.target.value)}>
                        <option value="all">Wszystkie</option>
                        {Object.entries(OfferType).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Label htmlFor="name">Marka i/lub model</Form.Label>
                    <Form.Control id="name" name="name" type="text"
                                  placeholder="Wpisz markę lub model"
                                  value={filterData.name || ""}
                                  onChange={(e) => onChange("name", e.target.value || null)} />
                </Col>
                <Col md={3}>
                    <Form.Label>Cena (od - do)</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control type="number" placeholder="Od" min={1}
                                          value={filterData.priceFrom ?? ""}
                                          onChange={(e) => onChange("priceFrom", e.target.value ? parseInt(e.target.value) : null)} />
                        </Col>
                        <Col>
                            <Form.Control type="number" placeholder="Do" min={1}
                                          value={filterData.priceTo ?? ""}
                                          onChange={(e) => onChange("priceTo", e.target.value ? parseInt(e.target.value) : null)} />
                        </Col>
                    </Row>
                </Col>
                <Col md={3}>
                    <Form.Label>Moc (KM)</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control type="number" placeholder="Od" min={1}
                                          value={filterData.powerFrom ?? ""}
                                          onChange={(e) => onChange("powerFrom", e.target.value ? parseInt(e.target.value) : null)} />
                        </Col>
                        <Col>
                            <Form.Control type="number" placeholder="Do" min={1}
                                          value={filterData.powerTo ?? ""}
                                          onChange={(e) => onChange("powerTo", e.target.value ? parseInt(e.target.value) : null)} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <Form.Label>Pojemność silnika (l)</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control type="number" placeholder="Od" min={0.1} step={0.1}
                                          value={filterData.displacementFrom ?? ""}
                                          onChange={(e) => onChange("displacementFrom", e.target.value ? parseFloat(e.target.value) : null)} />
                        </Col>
                        <Col>
                            <Form.Control type="number" placeholder="Do" min={0.1} step={0.1}
                                          value={filterData.displacementTo ?? ""}
                                          onChange={(e) => onChange("displacementTo", e.target.value ? parseFloat(e.target.value) : null)} />
                        </Col>
                    </Row>
                </Col>
                <Col md={3}>
                    <Form.Label htmlFor="fuel">Rodzaj paliwa</Form.Label>
                    <Form.Select id="fuel" name="fuel"
                                 value={filterData.fuel || "all"}
                                 onChange={(e) => onChange("fuel", e.target.value === "all" ? null : e.target.value)}>
                        <option value="all">Wszystkie</option>
                        <option value="benzyna">Benzyna</option>
                        <option value="diesel">Diesel</option>
                        <option value="benzyna+lpg">Benzyna + LPG</option>
                    </Form.Select>
                </Col>
                <Col md={6} className="d-flex justify-content-end align-items-end">
                    <Button variant="secondary" className="mt-2 me-2" onClick={onClearFilter}>
                        <FaUndo className="me-2" size="14" style={{ verticalAlign: 'middle' }} />Wyczyść filtry
                    </Button>
                    <Button variant="secondary" className="mt-2" type="submit">
                        <FaSearch className="me-2" size="14" style={{ verticalAlign: 'middle' }} />Szukaj
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};