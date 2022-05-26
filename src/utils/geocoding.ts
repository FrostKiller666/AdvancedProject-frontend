export const geocoding = async (address: string): Promise<{
    lat: number;
    lon: number;
}> => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
    const data = await res.json();

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    return {lat, lon};

}
