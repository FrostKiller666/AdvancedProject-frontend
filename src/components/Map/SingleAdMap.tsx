import React, {useEffect, useState} from "react";
import {AdEntity} from "types";
import { apiUrl } from "../../config/api";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
    id: string;
}

const SingleAdMap = (props: Props) => {
    const [ad, setAd] = useState<AdEntity | null>(null);


    useEffect(() => {

        (async () => {
            const res = await fetch(`${apiUrl}/ad/${props.id}`);
            const data = await res.json();

            setAd(data);
        })();

    }, []);

    if (ad === null) {
        return <p>Wczytywanie...</p>;
    }

    return (
        <>
            <h2>{ad.name}</h2>
            <p>{ad.description}</p>
            {!!ad.price && <p>{ad.price} zł</p>}
            <hr/>
            <a className="btn btn-primary" href={ad.url} target={'_blank'} rel={'noreferrer'}>Otwórz ogłoszenie</a>
        </>

    );
}

export {
    SingleAdMap,
}
