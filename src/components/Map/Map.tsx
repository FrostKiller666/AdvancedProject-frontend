import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

import "../../utils/fix-map-marker"
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";
import classes from "./Map.module.css";

const Map = () => {
    return (
        <div className={classes.map}>
            <MapContainer center={[52.2330653, 20.9211125]} zoom={10}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> & contributors'
                />
                <Marker position={[52.2330653, 20.9211125]}>
                    <Popup>
                        <h2>Warszawa</h2>
                        <p>Stolica Polski</p>
                    </Popup>
                </Marker>
            </MapContainer>

        </div>
    );
}

export {
    Map,
}
