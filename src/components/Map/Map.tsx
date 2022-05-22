import React, {useContext, useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import {SimpleAdEntity} from 'types';
import "../../utils/fix-map-marker"
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";
import classes from "./Map.module.css";
import {SearchContext} from "../../contexts/search.context";
import {SingleAdMap} from "./SingleAdMap";

const Map = () => {
    const {search} = useContext(SearchContext);
    const [ads, setAds] = useState<SimpleAdEntity[]>([]);
    // useEffect(() => {
    //
    // }, [search]);

    useEffect(() => {
        (async () => {

            const res = await fetch(`http://localhost:3001/ad/search/${search}`);
            const data = await res.json();

            setAds(data);
        })();
    }, [search]);

    return (
        <div className={classes.map}>
            {/*<h1>Search for: {search}</h1>*/}
            <MapContainer center={[52.2330653, 20.9211125]} zoom={10}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> & contributors'
                />

                {
                    ads.map(ad => (
                        <Marker key={ad.id} position={[ad.lat, ad.lon]}>
                            <Popup>
                                <SingleAdMap id={ad.id}/>
                            </Popup>
                        </Marker>
                    ))
                }

            </MapContainer>

        </div>
    );
}

export {
    Map,
}