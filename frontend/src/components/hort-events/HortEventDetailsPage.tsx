import {useParams} from "react-router-dom";
import {HortEvent} from "../../types/HortEvent.ts";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import LoadSpinner from "../LoadSpinner.tsx";

export default function HortEventDetailsPage() {
    const [hortEvent, setHortEvent] = useState<HortEvent | null | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params = useParams();
    const id: string | undefined = params.hortEventId;

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

    return (
        <div>
            {isLoading && <LoadSpinner/>}
            {hortEvent && (
                <div>
                    <h1>{hortEvent.title}</h1>
                    <p>{hortEvent.description}</p>
                </div>
            )}
        </div>
    );
}