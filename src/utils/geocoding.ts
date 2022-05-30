export const geocoding = async (postalCode: string, city: string, streetAddress?: string, numberStreet?: string): Promise<{
    lat: number;
    lon: number;
}> => {
    const res = await fetch(encodeURI(`https://nominatim.openstreetmap.org/search?format=json&q=${postalCode} ${city} ?${streetAddress} ?${numberStreet}`));
    const data = await res.json();

    console.log(data[0].display_name);

    if (streetAddress === '') {
        const lat = parseFloat(data[data.length - 1].lat);
        const lon = parseFloat(data[data.length - 1].lon);

        return {lat, lon};
    } else {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        return {lat, lon};
    }


}
