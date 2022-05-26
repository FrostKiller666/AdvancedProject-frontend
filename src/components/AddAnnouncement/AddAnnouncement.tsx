import React, {SyntheticEvent, useState} from "react";

import classes from './AddAnnouncement.module.css';
import {CustomButton} from "../UI/CustomButton";
import {geocoding} from "../../utils/geocoding";

const AddAnnouncement = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
        address: '',
    });

    const AddAdToMap = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const {lat, lon} = await geocoding(form.address);

            const res = await fetch('http://localhost:3001/ad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    lat,
                    lon
                }),
            });
            const data = await res.json();
            setId(data.id);
        } finally {
            setLoading(false);
        }

    }

    const formChangeHandler = (key: string, value: any) => {
        setForm((form) => ({
            ...form,
            [key]: value,
        }));
    }

    if (loading) {
        return <h2>Trwa dodawanie ogłoszenia...</h2>;
    }
    if (id) {
        return <h2>Twoje ogłoszenie o numerze <br/> ID: {id} <br/> zostało dodane.</h2>
    }

    return (
        <form action={''} className={classes.addForm} onSubmit={AddAdToMap}>
            <h2>Dodaj swoje ogłsozenie:</h2>
            <p>
                <label>
                    Nazwa: <br/>
                    <input type="text" name={'name'} required maxLength={99} minLength={1} value={form.name}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </label>
            </p>
            <p>
                <label>
                    Opis: <br/>
                    <textarea name={'description'} maxLength={999} value={form.description}
                              onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </label>
            </p>
            <p>
                <label>
                    Cena: <br/>
                    <input type="number" name={'price'} required max={999999} value={form.price}
                           onChange={e => (formChangeHandler(e.target.name, Number(e.target.value)))}/>
                </label>
            </p>
            <p>
                <label>
                    Link: <br/>
                    <input type="url" name={'url'} maxLength={99} value={form.url}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </label>
            </p>
            <p>
                <label>
                    Address: <br/>
                    <input type="text" name={'address'} value={form.address}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </label>
            </p>
            <CustomButton type={'submit'} className={classes.button}> Dodaj </CustomButton>
        </form>
    );
}

export {
    AddAnnouncement,
}
