import React, {SyntheticEvent, useState} from "react";

import classes from './AddAnnouncement.module.css';
import {CustomButton} from "../UI/CustomButton";
import {geocoding} from "../../utils/geocoding";
import {apiUrl} from "../../config/api";

const AddAnnouncement = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
        address: '',
        streetAddress: '',
        numberStreet: '',
        postalCode: '',
        city: '',
    });

    const AddAdToMap = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const {lat, lon} = await geocoding(form.postalCode, form.city, form.streetAddress, form.numberStreet);

            const res = await fetch(`${apiUrl}/ad`, {
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
                    Link do ogłoszenia: <br/>
                    <input type="url" name={'url'} maxLength={99} value={form.url}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </label>
            </p>
            <p>
                <label>
                    Nazwa ulicy: <br/>
                    <input type="text" name={'streetAddress'} minLength={3} maxLength={56} value={form.streetAddress}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </label>
            </p>

            <p className={classes.addressFormat}>
                <label className={classes.addressFormatNumberHouse}>
                    Numer domu/mieszkania: <br/>
                    <input type="text" name={'numberStreet'} minLength={1} maxLength={7} value={form.numberStreet}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </label>
                <label className={classes.addressFormaZipCode}>
                    <br/>Kod pocztowy: <br/>
                    <input type="text" name={'postalCode'} required minLength={5} maxLength={6} value={form.postalCode}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </label>
                <label className={classes.addressFormatCity}>
                    <br/>Miasto: <br/>
                    <input type="text" name={'city'} required minLength={2} maxLength={30} value={form.city}
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
