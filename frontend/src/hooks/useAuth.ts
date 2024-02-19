import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    function fetchMe() {
        axios.get('/api/auth/me')
            .then(() => setIsLoggedIn(true))
            .catch(() => setIsLoggedIn(false));
    }

    async function login(username: string, password: string): Promise<void> {
        return axios.post('/api/auth/login', {}, {
            auth: {
                username: username,
                password: password
            }
        })
            .then((r) => {
                setIsLoggedIn(true);
                toast.success("Willkommen zurück, " + r.data + "!");
            })
            .catch((err) => {
                setIsLoggedIn(false);
                throw new Error(err);
            });
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + '/logout', '_self')
    }

    useEffect(() => {
        fetchMe();
    }, []);

    return {
        isLoggedIn,
        login,
        logout
    }
}