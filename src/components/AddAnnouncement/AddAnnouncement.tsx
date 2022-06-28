import React, {SyntheticEvent, useState} from "react";

import classes from './AddAnnouncement.module.css';
import {CustomButton} from "../UI/CustomButton";
import {geocoding} from "../../utils/geocoding";
import {apiUrl} from "../../config/api";

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


const AddAnnouncement = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
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
            const resAuthData = await axios.get(`${apiUrl}/user/authenticate`, {
                withCredentials: true,
            });
            const username = await resAuthData.data.id;
            const res = await fetch(`${apiUrl}/ad`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    lat,
                    lon,
                    username
                }),
            });

            const data = await res.json();

            setId(data.id);
        } finally {
            setLoading(false);
        }

    }


    const formChangeHandler = (key: string, value: any): void => {
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

        <div className="col-md-4 d-block mx-auto">


            <form action={''} className="row g-3 " onSubmit={AddAdToMap}>
            <h2>Dodaj swoje ogłsozenie:</h2>
                <div className="col-md-6 ">

                <label htmlFor='name'>Nazwa:</label> <input type="text" id='name' className="form-control" size={40} name={'name'} required maxLength={99} minLength={1} value={form.name}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </div>

                <div className="col-md-6 ">
                <label htmlFor="number">
                    Cena: </label>
                    <input type="number" id='number' name={'price'} className="form-control text" required max={999999} value={form.price}
                           onChange={e => (formChangeHandler(e.target.name, Number(e.target.value)))}/>

                </div>
               <div className="col-12 ">
                <label htmlFor="description">
                    Opis: </label>
                    <textarea name={'description'} className="form-control" id='description' rows={6} cols={100} maxLength={999} value={form.description}
                              onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </div>


                <div className="col-12">
                <label htmlFor="url">
                    Link do ogłoszenia:</label>
                    <input type="url" name={'url'} id='url' className="form-control" size={100} maxLength={99} value={form.url}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </div>


                <div className="col-sm-4">
                <label htmlFor="streetAddress">
                    Nazwa ulicy: </label>
                    <input type="text" name={'streetAddress'} id="streetAddress" size={50}  className="form-control" minLength={3} maxLength={56} value={form.streetAddress}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>

                </div>


                <div className="col-md-5">
                <label htmlFor='numberStreet' >
                    Numer domu/mieszkania: </label>
                    <input type="text" name={'numberStreet'} id='numberStreet' className="form-control" minLength={1} maxLength={7} value={form.numberStreet}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </div>


                <div className="col-md-3">
                    <label htmlFor="postalCode">
                        Kod pocztowy:</label>
                    <input type="text" name={'postalCode'} id='postalCode' className="form-control" required
                           minLength={5} maxLength={6} value={form.postalCode}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </div>


                <div className="col-md-6 d-block mx-auto">
                <label htmlFor="city">
                    Miasto:  </label>
                    <input type="text" name={'city'} id='city' required minLength={2} className="form-control" maxLength={30} value={form.city}
                           onChange={e => (formChangeHandler(e.target.name, e.target.value))}/>
                </div>


                <div className="form-group d-block mx-auto">

                    <CustomButton type={'submit'} className={classes.button}> Dodaj </CustomButton>
                </div>
            </form>
        </div>
    );
}

export {
    AddAnnouncement,
}
