import React, {useRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import {apiUrl} from "../../config/api";
import axios from "axios";

interface FormRegisterType {
    oldPassword: string;
    password: string;
    RePassword: string;
}

const UserPersonalDataAnnouncement = () => {
    const {register, formState: {errors}, handleSubmit, watch} = useForm<FormRegisterType>();
    const password = useRef<HTMLInputElement | string>();
    password.current = watch("password", "");

    const [loading, setLoading] = useState(false);
    const [pwdChanged, setPwdChanged] = useState(false);

    const onSubmit: SubmitHandler<FormRegisterType> = async (data) => {
        const {RePassword, ...respondeData} = data;
        setLoading(true);

        try {

            const resAuthData = await axios.get(`${apiUrl}/user/authenticate`, {
                withCredentials: true,
            });

            const res = await fetch(`${apiUrl}/user/YourAccount`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...respondeData,
                    resAuthData,
                }),
            });

            const dataForm = await res.json();
            setPwdChanged(dataForm);

        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <h2>Trwa proces zmiany hasła...</h2>;
    }
    if (pwdChanged) {
        return <h2>Twoje hasło zostało pomyślnie zmienione.</h2>
    }

    return (
        <Container className={'w-50'}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2 className={"mt-4"}>Twoje Dane: </h2>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Stare Hasło:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Poprzednie Hasło"
                                      {...register('oldPassword', {
                                          required: "You must specify a password",
                                          minLength: {
                                              value: 8,
                                              message: "Password must have at least 8 characters"
                                          }
                                      })}/>
                        {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Nowe Hasło:
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
                        <Button type="submit">Zmień Hasło</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}


export {
    UserPersonalDataAnnouncement,
}
