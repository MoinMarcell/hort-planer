import {HortEvent} from "../types/HortEvent.ts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function useHortEvents() {
    const [hortEvents, setHortEvents] = useState<HortEvent[]>([]);

    const BASE_URI: string = "/api/events";

    function fetchAll(): void {
        axios.get(BASE_URI)
            .then(r => setHortEvents(r.data))
            .catch(console.error);
    }

    useEffect((): void => {
        fetchAll();
    }, []);

    return {
        hortEvents,
    };
}