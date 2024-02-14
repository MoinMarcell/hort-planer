import {HortEvent} from "../../types/HortEvent.ts";
import HortEventCard from "./HortEventCard.tsx";

type HortEventGalleryProps = {
    events: HortEvent[],
}

export default function HortEventGallery(props: Readonly<HortEventGalleryProps>) {
    const cards = props.events.map((event) => <HortEventCard key={event.id} event={event}/>);
    return (
        <div className="d-flex flex-column gap-2">
            {cards.length > 0 ? cards : <p>Keine Events geplant</p>}
        </div>
    );
}
