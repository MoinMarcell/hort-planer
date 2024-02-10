import {HortEvent} from "../../types/HortEvent.ts";
import HortEventCard from "./HortEventCard.tsx";

type HortEventGalleryProps = {
    events: HortEvent[],
    deleteEvent: (id: string) => Promise<void>,
}

export default function HortEventGallery(props: Readonly<HortEventGalleryProps>) {
    const cards = props.events.map((event) => <HortEventCard key={event.id} deleteEvent={props.deleteEvent}
                                                             event={event}/>);
    return (
        <>
            {cards.length > 0 ? cards : <p>Keine Events geplant</p>}
        </>
    );
}
