import {FormEvent, useState} from "react";
import {HortEvent, HortEventDto} from "../../types/HortEvent.ts";
import LoadSpinner from "../LoadSpinner.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

type NewHortEventFormProps = {
    createHortEvent: (event: HortEventDto) => Promise<HortEvent>,
}

export default function HortEventForm(props: Readonly<NewHortEventFormProps>) {
    const initialDate = new Date();
    const initialDateString = initialDate.toISOString().split("T")[0];
    const initialTimeString = initialDate.toISOString().split("T")[1].split(".")[0].slice(0, 5);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<string>(initialDateString);
    const [startTime, setStartTime] = useState<string>(initialTimeString);
    const [endDate, setEndDate] = useState<string>(initialDateString);
    const [endTime, setEndTime] = useState<string>(initialTimeString);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    function createHortEvent(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const hortEvent: HortEventDto = {
            title: title,
            description: description,
            startDateTime: startDate + "T" + startTime,
            endDateTime: endDate + "T" + endTime,
        }
        props.createHortEvent(hortEvent)
            .then((event) => {
                toast.success("Event erstellt");
                navigate(`/events/${event.id}`)
                resetForm();
            })
            .catch((error) => {
                toast.error("Fehler beim Erstellen des Events " + error.message);
            })
            .finally(() => setIsLoading(false));
    }

    function resetForm() {
        setTitle("");
        setDescription("");
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");
    }

    return (
        <form onSubmit={createHortEvent}>
            <div className="form-floating mb-3">
                <input value={title} onChange={(e) => setTitle(e.target.value)} id="title" type="text"
                       className="form-control rounded-3" placeholder="Titel"/>
                <label htmlFor="title">Titel</label>
            </div>
            <div className="form-floating mb-3">
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                          className="form-control rounded-3" id="description" placeholder="Beschreibung"/>
                <label htmlFor="description">Beschreibung</label>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-floating mb-3">
                        <input value={startDate} onChange={(e) => setStartDate(e.target.value)} id="start-date"
                               type="date"
                               className="form-control rounded-3" placeholder="Titel"/>
                        <label htmlFor="start-date">Startdatum</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                        <input value={startTime} onChange={(e) => setStartTime(e.target.value)} id="start-time"
                               type="time"
                               className="form-control rounded-3" placeholder="Titel"/>
                        <label htmlFor="start-time">Startzeit</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-floating mb-3">
                        <input value={endDate} onChange={(e) => setEndDate(e.target.value)} id="end-date"
                               type="date"
                               className="form-control rounded-3" placeholder="Titel"/>
                        <label htmlFor="end-date">Enddatum</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                        <input value={endTime} onChange={(e) => setEndTime(e.target.value)} id="end-time"
                               type="time"
                               className="form-control rounded-3" placeholder="Titel"/>
                        <label htmlFor="end-time">Endzeit</label>
                    </div>
                </div>
            </div>
            {
                isLoading ?
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" disabled>
                        <LoadSpinner/></button> :
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Event
                        erstellen</button>
            }
        </form>
    );
}