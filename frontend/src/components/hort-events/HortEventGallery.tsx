import {HortEvent} from "../../types/HortEvent.ts";
import HortEventCard from "./HortEventCard.tsx";

type HortEventGalleryProps = {
    events: HortEvent[],
}

export default function HortEventGallery(props: Readonly<HortEventGalleryProps>) {

    const events = props.events.map((event) => (
        <HortEventCard key={event.id} event={event}/>
    ));

    return (
        <>
            {events}
        </>
    );
}
