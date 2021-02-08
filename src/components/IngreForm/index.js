import { Card } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import './styles.css'

export default function IngreForm(props) {
    return (
        <Card className="SignInCard">
            <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>Add Ingredients</Card.Title>
                <Form onSubmit={props.handleFormSubmit}>
                    <Form.Group>
                        <Row noGutters>
                            <Col sm="12">
                                <Form.Control
                                    type="text"
                                    placeholder="Ingredient"
                                    onChange={props.handleIngreInputChange}
                                    value={props.ingredient}
                                    name="ingredient"
                                />
                            </Col>
                            <Col xs="6">
                                <Form.Control
                                    type="number"
                                    min="0"
                                    placeholder="Quantity"
                                    onChange={props.handleIngreInputChange}
                                    value={props.ingredientQuant}
                                    name="ingredientQuant"
                                />
                            </Col>
                            <Col xs="6">
                                <Form.Control
                                    type="text"
                                    placeholder="Unit"
                                    onChange={props.handleIngreInputChange}
                                    value={props.ingredientUnit}
                                    name="ingredientUnit"
                                />
                            </Col>
                        </Row>
                        <Form.Text className="text-muted">
                            Press Add Ingredient to add multiple ingredients.
                        </Form.Text>
                        <Button
                            onClick={props.handleAddIngreBtn}
                            variant="primary"
                            type="button"
                            style={{ width: "100%" }}
                        >
                            Add Ingredient
                        </Button>
                        {props.ingredients !== null ?
                            props.ingredients.map(item => (
                                <ListGroup variant="flush" style={{ textAlign: "center" }}>
                                    <ListGroup.Item>
                                        <strong>
                                            {item.ingredientQuant} {item.ingredientUnit} {item.ingredient}
                                        </strong>
                                    </ListGroup.Item>
                                </ListGroup>
                            ))
                            : null}
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Directions"
                            onChange={props.handleDirectInputChange}
                            value={props.directions}
                            name="directions"
                            className="ingreFormControl"
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "100%" }}
                    >
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
