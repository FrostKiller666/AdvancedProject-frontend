import React, {SyntheticEvent, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import {apiUrl} from "../../config/api";

const RegisterAnnouncement = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [checkPw, setCheckPw] = useState(false);
    const [rePassword, setRePassword] = useState('');
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const formChangeHandler = (key: string, value: any): void => {
        setForm((form) => ({
            ...form,
            [key]: value,
        }));
    }

    const AddUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        if (loading) {
            return <h2>Trwa proces rejestracji...</h2>;
        }
        if (id) {
            return <h2>Twoje konto u numerze <br/> ID: {id} <br/> zostało utworzone.</h2>
        }

        if (rePassword !== form.password) {

        }

        try {


            const res = await fetch(`${apiUrl}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                }),
            });

            const data = await res.json();

            setId(data.id);
        } finally {
            setLoading(false);
        }

    }


    return (
        <Container className={'w-50'}>
            <Form onSubmit={AddUser}>
                <h2 className={"mt-4"}>Zarejestruj się: </h2>

                <Form.Group as={Row} className="mb-3 mt-3" controlId="formHorizontalUsername">
                    <Form.Label column sm={2}>
                        Nazwa użytkownika:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="nazwa użytkownika" name={'username'}
                                      value={form.username}
                                      onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Email:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" placeholder="Email" name={'email'} value={form.email}
                                      onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Hasło:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Hasło" name={'password'} value={form.password}
                                      onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalRepeatPassword">
                    <Form.Label column sm={2}>
                        Powtórz Hasło:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Powtórz Hasło" name={'RePassword'} value={rePassword}
                                      onChange={e => (setRePassword(e.target.value))}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{span: 10, offset: 2}}>
                        <Button type="submit">Zarejestruj</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}

export {
    RegisterAnnouncement,
}
