import {HortEvent} from "../../types/HortEvent.ts";
import {Link} from "react-router-dom";

type HortEventCardProps = {
    event: HortEvent,
}

export default function HortEventCard(props: Readonly<HortEventCardProps>) {
    const startDateTime = new Date(props.event.startDateTime);
    const startDay = startDateTime.toLocaleDateString("de-DE", {day: "2-digit"});
    const startMonth = startDateTime.toLocaleDateString("de-DE", {month: "short"});
    return (
        <div className="row g-4 py-3 row-cols-1 row-cols-lg-3">
            <div className="col d-flex align-items-start">
                <div className={"d-flex flex-column gap-2"}>
                    <div
                        className="icon-square text-body-emphasis bg-body-secondary d-inline-flex flex-column align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <p style={{padding: 0, margin: 0, fontSize: '15px', fontWeight: 'bold'}}>{startDay}.</p>
                        <p style={{padding: 0, margin: 0, fontSize: '15px'}}>{startMonth}.</p>
                    </div>
                    <div
                        className="icon-square text-body-emphasis bg-body-secondary d-inline-flex flex-column align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <p style={{padding: 0, margin: 0, fontSize: '15px', fontWeight: 'bold'}}>0/12</p>
                        <p style={{padding: 0, margin: 0, fontSize: '15px'}}>Plätze</p>
                    </div>
                </div>
                <div>
                    <h3 className="fs-2 text-body-emphasis">{props.event.title}</h3>
                    <Link to={`/events/${props.event.id}`} className="btn btn-primary">
                        Zur Anmeldung
                    </Link>
                </div>
            </div>
        </div>
    );
}