import React from "react";
import {Table} from "react-bootstrap";
import {AnnouncementsForUser} from 'types';

interface Props {
    listAnnouncementsOfUser: AnnouncementsForUser[] | null;
    username: string;
}

const ListUserAnnouncement = (props: Props) => {

    if (props.listAnnouncementsOfUser === null) {
        return <h2><strong>{props.username}</strong>, Twoja lista jest pusta. Pora coś dodać!</h2>
    }
    const elementList = props.listAnnouncementsOfUser.map(data => {

        return (
            <tbody key={data.id}>
            <tr>
                <td>#</td>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td>{data.price}</td>
                <td>{data.url}</td>
                <td>{data.streetAddress}</td>
                <td>{data.numberStreet}</td>
                <td>{data.city}</td>
                <td>{data.postalCode}</td>
            </tr>
            </tbody>
        );
    })

    return (
        <>
            <h1>Lista ogłoszeń <strong>{props.username}</strong>:</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nazwa</th>
                    <th>Opis</th>
                    <th>Cena</th>
                    <th>URL</th>
                    <th>Ulica</th>
                    <th>Numer ulicy</th>
                    <th>Miasto</th>
                    <th>Kod pocztowy</th>
                </tr>
                </thead>

                {elementList}
            </Table>
        </>

    );
}

export {
    ListUserAnnouncement,
}
