import React from 'react'
import './styles.css'
import { Card } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Image } from 'react-bootstrap'

export default function UpdateRecipeForm(props) {
    return (
        <Card className="updateRecipeCard">
            <Card.Header className="updateRecipeTitle"><strong>Update Recipe!</strong></Card.Header>
            <Card.Body>
                <Form onSubmit={props.handleFormSubmit}>
                    <Form.Group>
                        {props.loading ? (
                            <h3 style={{ textAlign: "center" }}><strong>Loading Image...</strong></h3>
                        )
                            :
                            (
                                <Image
                                    src={
                                        props.recipeImage ?
                                            (props.recipeImage)
                                            : null
                                    }
                                    className="recipeImageUpdate"
                                />
                            )}
                    </Form.Group>
                    <Row noGutters>
                        <Col xs={8}>
                            <Form.Control
                                placeholder={props.recipeName !== "" ? props.recipeName : "Recipe Name"}
                                onChange={props.handleRecipeInputChange}
                                name="recipeName"
                            />
                        </Col>
                        <Col xs={4}>
                            <Form.Control
                                as="select"
                                onChange={props.handleSelectCategory}
                                // value={props.recipeCategory}
                                name="recipeCategory"
                            >
                                <option selected disabled value="">Category</option>
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                {/* <option>Dessert</option> */}
                                <option>Soup/Stew</option>
                                {/* <option>Snack</option> */}
                                <option>Other</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Form.Group className="updateRecipeDescript">
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder={props.recipeDescript !== "" ? props.recipeDescript : "Recipe Description"}
                            onChange={props.handleRecipeInputChange}
                            name="recipeDescript"
                        />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        <strong> Press Set for each ingredient to update.</strong>
                    </Form.Text>
                    <Form.Group>
                        {props.ingredients !== null || props.ingredients < 1 ?
                            props.ingredients.map(item => (
                                <Row noGutters>
                                    <Col xs={6}>
                                        <Form.Control
                                            placeholder={item.ingredient !== "" ? item.ingredient : "Ingredient"}
                                            type="text"
                                            name="ingredient"
                                            value={props.ingredient}
                                            onChange={props.handleIngreInputChange}
                                            id={item.id}
                                            recipeId={item.RecipeId}
                                        />
                                    </Col>
                                    <Col xs={2}>
                                        <Form.Control
                                            placeholder={item.ingredientQuant !== "" ? item.ingredientQuant : "Quanity"}
                                            type="number"
                                            min="0"
                                            name="ingredientQuant"
                                            value={props.ingredientQuant}
                                            onChange={props.handleIngreInputChange}
                                            id={item.id}
                                            recipeId={item.RecipeId}
                                        />
                                    </Col>
                                    <Col xs={2}>
                                        <Form.Control
                                            placeholder={item.ingredientUnit !== "" ? item.ingredientUnit : "Unit"}
                                            type="text"
                                            name="ingredientUnit"
                                            onChange={props.handleIngreInputChange}
                                            id={item.id}
                                            recipeId={item.RecipeId}
                                        />
                                    </Col>
                                    <Col xs={2}>
                                        <Button
                                            variant="outline-primary"
                                            style={{ width: "100%" }}
                                            onClick={props.handleIngreSetButton}
                                        >
                                            Set
                                            </Button>
                                    </Col>
                                </Row>
                            ))
                            :
                            null
                        }
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder={props.directions !== "" ? props.directions : "Recipe Directions"}
                            onChange={props.handleDirectInputChange}
                            name="directions"
                        />
                    </Form.Group>

                    <Button
                        type="button"
                        className="updateFormButton"
                        onClick={props.handleUploadImgBtn}
                    >
                        Upload Image
                         </Button>
                    {/* Hidden upload button for css */}
                    <Form.File
                        id="uploadImg"
                        onChange={props.handleUploadImg}
                        style={{ display: "none" }}
                        name="recipeImage"
                    />

                    <Button
                        variant="primary"
                        className="updateFormButton"
                        type="submit"
                    >
                        Update
                        </Button>

                </Form>
            </Card.Body>
        </Card>
    )
}