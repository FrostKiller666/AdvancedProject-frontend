import React from "react";

const AddAnnouncement = () => {
    return (
        <form>
            <h2>Dodaj swoje ogłsozenie:</h2>
            <p>
                <label>
                    Nazwa: <br/>
                    <input type="text"/>
                </label>
            </p>
            <p>
                <label>
                    Opis: <br/>
                    <input type="text"/>
                </label>
            </p>
            <p>
                <label>
                    Cena: <br/>
                    <input type="text"/>
                </label>
            </p>
            <p>
                <label>
                    Link: <br/>
                    <input type="text"/>
                </label>
            </p>
            <p>
                <label>
                    Adres: <br/>
                    <input type="text"/>
                </label>
            </p>
        </form>
    );
}

export {
    AddAnnouncement,
}
