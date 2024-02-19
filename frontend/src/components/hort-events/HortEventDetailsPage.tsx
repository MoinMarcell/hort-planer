import {useNavigate, useParams} from "react-router-dom";
import {HortEvent} from "../../types/HortEvent.ts";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import LoadSpinner from "../LoadSpinner.tsx";
import {toast} from "react-toastify";

type HortEventDetailsPageProps = {
    deleteHortEvent: (id: string) => Promise<void>,
    isLoggedIn: boolean,
}

export default function HortEventDetailsPage(props: Readonly<HortEventDetailsPageProps>) {
    const [hortEvent, setHortEvent] = useState<HortEvent | null | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const params = useParams();
    const id: string | undefined = params.hortEventId;

    const navigate = useNavigate();

    if (!id) {
        toast.error("Event ID fehlt");
        navigate("/events");
    }

    const fetchHortEvent = useCallback(() => {
        setIsLoading(true);
        axios.get("/api/events/" + id)
            .then(r => setHortEvent(r.data))
            .catch(e => {
                toast.error("Fehler beim Laden des Events " + e.message);
                navigate("/events");
            })
            .finally(() => setIsLoading(false));
    }, [id, navigate]);

    useEffect(() => {
        fetchHortEvent();
    }, [fetchHortEvent, id]);

    function deleteEvent() {
        if (hortEvent) {
            setIsDeleting(true);
            props.deleteHortEvent(hortEvent.id)
                .then(() => {
                    toast.success("Event gelöscht");
                    navigate("/events");
                })
                .catch((error) => {
                    toast.error("Fehler beim Löschen des Events " + error.message);
                })
                .finally(() => {
                    setIsDeleting(false);
                });
        }
    }

    return (
        <div>
            {isLoading && <LoadSpinner/>}
            {hortEvent && (
                <div>
                    <h1>{hortEvent.title}</h1>
                    <p>{hortEvent.description}</p>
                    {
                        props.isLoggedIn &&
                        <div className="d-flex gap-2">
                            {
                                isDeleting ?
                                    <button className="btn btn-outline-danger" disabled><LoadSpinner/></button> :
                                    <button onClick={deleteEvent} type="button" className="btn btn-outline-danger">
                                        Löschen
                                    </button>
                            }
                        </div>
                    }
                </div>
            )}
        </div>
    );
}