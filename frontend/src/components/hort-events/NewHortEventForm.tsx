import {FormEvent, useState} from "react";
import {HortEventDto} from "../../types/HortEvent.ts";

type NewHortEventFormProps = {
    createHortEvent: (event: HortEventDto) => Promise<void>,
}

export default function NewHortEventForm(props: Readonly<NewHortEventFormProps>) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    function createHortEvent(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const hortEvent: HortEventDto = {
            title: title,
            description: description,
            startDateTime: startDate + "T" + startTime,
            endDateTime: endDate + "T" + endTime,
        }
        props.createHortEvent(hortEvent)
            .then(() => {
                console.log("Event created")
                resetForm();
            })
            .catch((error) => {
                console.error("Error creating event", error)
            });
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
            <label htmlFor="title">
                Titel<input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" name="title"
                            placeholder="Titel" required/>
            </label>

            <div className="grid">
                <label htmlFor="start-date">Startdatum<input value={startDate}
                                                             onChange={(e) => setStartDate(e.target.value)} type="date"
                                                             id="start-date" name="start-date" required/></label>
                <label htmlFor="start-time">Startuhrzeit<input value={startTime}
                                                               onChange={(e) => setStartTime(e.target.value)}
                                                               type="time" id="start-time" name="start-time" required/></label>
            </div>

            <div className="grid">
                <label htmlFor="end-date">Enddatum<input value={endDate} onChange={(e) => setEndDate(e.target.value)}
                                                         type="date" id="end-date" name="end-date" required/></label>
                <label htmlFor="end-time">Enduhrzeit<input value={endTime} onChange={(e) => setEndTime(e.target.value)}
                                                           type="time" id="end-time" name="end-time" required/></label>
            </div>

            <label htmlFor="description">Beschreibung</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description"
                      className="textarea-vertical" name="description" placeholder="Beschreibung"/>

            <button type="submit">Event erstellen</button>
        </form>
    );
}