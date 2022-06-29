import React, {useEffect, useState} from "react";
import {ListUserAnnouncement} from "./ListUserAnnouncement";
import {AnnouncementsForUser} from 'types';
import axios from "axios";
import {apiUrl} from "../../config/api";

const UserAnnouncement = () => {
    const [loading, setLoading] = useState(false);
    const [listAnnouncement, setListAnnouncement] = useState<AnnouncementsForUser[] | null>([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const resAuthData = await axios.get(`${apiUrl}/user/authenticate`, {
                    withCredentials: true,
                });
                const username = await resAuthData.data.id;
                setUsername(username);

                const res = await fetch(`${apiUrl}/user/announcement`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                    }),
                });
                const listAnnouncementsOfUser = await res.json();

                setListAnnouncement(listAnnouncementsOfUser);

            } finally {
                setLoading(false);
            }

        })();
    }, []);


    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <ListUserAnnouncement listAnnouncementsOfUser={listAnnouncement} username={username}/>
    );
}

export {
    UserAnnouncement,
}
