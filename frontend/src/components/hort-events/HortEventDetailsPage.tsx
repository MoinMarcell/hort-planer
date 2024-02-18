import {useNavigate, useParams} from "react-router-dom";
import {HortEvent} from "../../types/HortEvent.ts";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import LoadSpinner from "../LoadSpinner.tsx";

type HortEventDetailsPageProps = {
    deleteHortEvent: (id: string) => Promise<void>,
}

export default function HortEventDetailsPage(props: Readonly<HortEventDetailsPageProps>) {
    const [hortEvent, setHortEvent] = useState<HortEvent | null | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const params = useParams();
    const id: string | undefined = params.hortEventId;

    const navigate = useNavigate();

    const fetchHortEvent = useCallback(() => {
        setIsLoading(true);
        axios.get("/api/events/" + id)
            .then(r => setHortEvent(r.data))
            .catch(e => console.error(e))
            .finally(() => setIsLoading(false));
    }, [id]);

    useEffect(() => {
        fetchHortEvent();
    }, [fetchHortEvent, id]);

    function deleteEvent() {
        if (hortEvent) {
            setIsDeleting(true);
            props.deleteHortEvent(hortEvent.id)
                .then(() => {
                    console.log("Event deleted");
                    navigate("/events");
                })
                .catch((error) => {
                    console.error("Error deleting event", error)
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
                    <div className="d-flex gap-2">
                        {
                            isDeleting ?
                                <button className="btn btn-outline-danger" disabled><LoadSpinner/></button> :
                                <button onClick={deleteEvent} type="button" className="btn btn-outline-danger">
                                    Löschen
                                </button>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}