import {FormEvent, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import LoadSpinner from "../components/LoadSpinner.tsx";

type LoginPageProps = {
    login: (username: string, password: string) => Promise<void>,
    isLoggedIn: boolean,
}

export default function LoginPage(props: Readonly<LoginPageProps>) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    if (props.isLoggedIn) {
        toast.error("Sie sind bereits eingeloggt");
        return <Navigate to={"/"}/>;
    }

    function resetForm() {
        setUsername('');
        setPassword('');
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        props.login(username, password)
            .then(() => {
                resetForm();
                navigate('/');
            })
            .catch((err) => {
                toast.error("Fehler beim Einloggen " + err.message);
                setPassword('');
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <form onSubmit={login}>
            <h2 className="pb-2 border-bottom">Anmeldung</h2>

            <div className="d-flex flex-column gap-2">
                <div className="form-floating">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username"
                           type="text" className="form-control" id="floatingInput" placeholder="Benutzername"/>
                    <label htmlFor="floatingInput">Benutzername</label>
                </div>
                <div className="form-floating">
                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                           autoComplete="current-password" type="password" className="form-control"
                           id="floatingPassword" placeholder="Passwort"/>
                    <label htmlFor="floatingPassword">Passwort</label>
                </div>
                {
                    isLoading ?
                        <button className="btn btn-primary w-100 py-2" disabled><LoadSpinner/></button> :
                        <button className="btn btn-primary w-100 py-2" type="submit">Einloggen</button>
                }
            </div>
        </form>
    );
}