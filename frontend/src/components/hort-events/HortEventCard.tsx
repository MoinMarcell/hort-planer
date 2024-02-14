import {HortEvent} from "../../types/HortEvent.ts";
import {Link} from "react-router-dom";

type HortEventCardProps = {
    event: HortEvent,
}

export default function HortEventCard(props: Readonly<HortEventCardProps>) {
    const MAX_DESCRIPTION_LENGTH: number = 100;

    const startDateTime: Date = new Date(props.event.startDateTime);
    const endDateTime: Date = new Date(props.event.endDateTime);

    function getDateString(date: Date): string {
        return date.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    function shortenDescription(description: string): string {
        return description.slice(0, MAX_DESCRIPTION_LENGTH) + (description.length > MAX_DESCRIPTION_LENGTH ? "..." : "");
    }

    return (
        <div className="card">
            <div className="card-header">
                <ul className="p-0 m-0">
                    <li className="list-group-item">Start: {getDateString(startDateTime)} Uhr</li>
                    <li className="list-group-item">Ende: {getDateString(endDateTime)} Uhr</li>
                </ul>
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.event.title}</h5>
                <p className="card-text">{shortenDescription(props.event.description)}</p>
                <Link to={`/events/${props.event.id}`} className="btn btn-primary">Details</Link>
            </div>
        </div>
    );
}