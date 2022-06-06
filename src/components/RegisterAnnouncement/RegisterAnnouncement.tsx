import React from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const RegisterAnnouncement = () => {
    return (
        <Container className={'w-50'}>
            <Form>
                <h2 className={"mt-4"}>Zarehestruj się: </h2>

                <Form.Group as={Row} className="mb-3 mt-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Nazwa użytkownika:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="nazwa użytkownika"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Email:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" placeholder="Email"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Hasło:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Hasło"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Powtórz Hasło:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Powtórz Hasło"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{span: 10, offset: 2}}>
                        <Button type="submit">Zaloguj</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}

export {
    RegisterAnnouncement,
}
