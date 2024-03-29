import {HortEvent, HortEventDto} from "../types/HortEvent.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function useHortEvents() {
    const [hortEvents, setHortEvents] = useState<HortEvent[]>([]);

    const BASE_URI: string = "/api/events";

    function fetchAll(): void {
        axios.get(BASE_URI)
            .then(r => setHortEvents(r.data))
            .catch((e) => toast.error("Failed to fetch events from server: " + e.message));
    }

    async function createEvent(event: HortEventDto): Promise<HortEvent> {
        return axios.post(BASE_URI, event)
            .then((r) => {
                fetchAll();
                return r.data;
            })
            .catch((e) => {
                throw new Error("Failed to create event: " + e);
            });
    }

    async function deleteEvent(id: string): Promise<void> {
        return axios.delete(`${BASE_URI}/${id}`)
            .then(() => {
                fetchAll();
            })
            .catch((e) => {
                throw new Error("Failed to delete event: " + e);
            });
    }

    useEffect((): void => {
        fetchAll();
    }, []);

    return {
        hortEvents,
        createEvent,
        deleteEvent
    };
}