import React, {useRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import {apiUrl} from "../../config/api";

interface FormRegisterType {
    username: string;
    email: string;
    password: string;
    RePassword: string;
}

const RegisterAnnouncement = () => {
    const {register, formState: {errors}, handleSubmit, watch} = useForm<FormRegisterType>();
    const password = useRef<HTMLInputElement | string>();
    password.current = watch("password", "");

    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');

    const onSubmit: SubmitHandler<FormRegisterType> = async (data) => {
        const {RePassword, ...respondeData} = data;
        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...respondeData,
                }),
            });

            const dataForm = await res.json();

            setId(dataForm.id);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <h2>Trwa proces rejestracji...</h2>;
    }
    if (id) {
        return <h2>Twoje konto u numerze <br/> ID: {id} <br/> zostało utworzone.</h2>
    }

    return (
        <Container className={'w-50'}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2 className={"mt-4"}>Zarejestruj się: </h2>

                <Form.Group as={Row} className="mb-3 mt-3" controlId="formHorizontalUsername">
                    <Form.Label column sm={2}>
                        Nazwa użytkownika:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="nazwa użytkownika" {...register('username')}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Email:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" placeholder="Email" {...register('email')}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Hasło:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Hasło"
                                      {...register('password', {
                                          required: "You must specify a password",
                                          minLength: {
                                              value: 8,
                                              message: "Password must have at least 8 characters"
                                          }
                                      })}/>
                        {errors.password && <p>{errors.password.message}</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalRepeatPassword">
                    <Form.Label column sm={2}>
                        Powtórz Hasło:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Powtórz Hasło" {...register('RePassword', {
                            validate: value =>
                                value === password.current || "The passwords do not match"
                        })}/>
                        {errors.RePassword && <p>{errors.RePassword.message}</p>}
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
