import {HortEvent, HortEventDto} from "../types/HortEvent.ts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function useHortEvents() {
    const [hortEvents, setHortEvents] = useState<HortEvent[]>([]);
    const [isLoadingHortEvents, setIsLoadingHortEvents] = useState<boolean>(false);

    const BASE_URI: string = "/api/events";

    function fetchAll(): void {
        setIsLoadingHortEvents(true);
        axios.get(BASE_URI)
            .then(r => setHortEvents(r.data))
            .catch(console.error)
            .finally(() => setIsLoadingHortEvents(false));
    }

    async function createEvent(event: HortEventDto): Promise<void> {
        setIsLoadingHortEvents(true);
        return axios.post(BASE_URI, event)
            .then(() => {
                fetchAll();
            })
            .catch((e) => {
                console.error("Failed to create event: " + e);
                throw new Error("Failed to create event: " + e);
            })
            .finally(() => setIsLoadingHortEvents(false));
    }

    async function deleteEvent(id: string): Promise<void> {
        setIsLoadingHortEvents(true);
        return axios.delete(`${BASE_URI}/${id}`)
            .then(() => {
                fetchAll();
            })
            .catch((e) => {
                console.error("Failed to delete event: " + e);
                throw new Error("Failed to delete event: " + e);
            })
            .finally(() => setIsLoadingHortEvents(false));
    }

    useEffect((): void => {
        fetchAll();
    }, []);

    return {
        hortEvents,
        isLoadingHortEvents,
        createEvent,
        deleteEvent
    };
}