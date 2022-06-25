import React, {useContext, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {apiUrl} from "../../config/api";
import {SearchContext} from "../../contexts/search.context";

interface FormRegisterType {
    email: string;
    password: string;
}

interface ResDataUser {
    logged: boolean;
    userId: string;
}

const LoginAnnouncement = () => {
    const {register, formState: {errors}, handleSubmit} = useForm<FormRegisterType>();
    const [loading, setLoading] = useState(false);
    const {setLogged} = useContext(SearchContext);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormRegisterType> = async (data) => {
        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/user/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data,
                }),
            });

            const dataLogin: ResDataUser = await res.json();

            if (dataLogin.logged) {
                setLogged(true);
                navigate(`/user/${dataLogin.userId}`)
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <Container className={'w-50'}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2 className={"mt-4"}>Zaloguj się: </h2>
                <Form.Group as={Row} className="mb-3 mt-3" controlId="formHorizontalEmail">
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
                        <Form.Control type="password" placeholder="Hasło" {...register('password')}/>
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
    LoginAnnouncement,
}
