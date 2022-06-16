import React, {SyntheticEvent, useRef, useState} from "react";
import {Message, SubmitHandler, useForm, ValidationRule} from "react-hook-form";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import {apiUrl} from "../../config/api";

interface FormRegisterType {
    username: string;
    email: string;
    password: string;
    RePassword: string;
}

type RegisterOptions = Partial<{
    required: Message | ValidationRule<boolean>;
    min: ValidationRule<number | string>;
    max: ValidationRule<number | string>;
    maxLength: ValidationRule<number | string>;
    minLength: ValidationRule<number | string>;
    pattern: ValidationRule<RegExp>;
    //validate?: Validate | Record<string, Validate>;
}>;

const RegisterAnnouncement = () => {
    const {register, formState: {errors}, handleSubmit, watch} = useForm<FormRegisterType>();
    const onSubmit: SubmitHandler<FormRegisterType> = data => console.log(data);
    const password = useRef<HTMLInputElement | string>();
    password.current = watch("password", "");

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
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                        <Form.Control type="password" placeholder="Hasło" name={'password'}
                                      ref={register<RegisterOptions>({
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
