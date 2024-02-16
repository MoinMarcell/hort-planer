import {HortEvent} from "../types/HortEvent.ts";
import HortEventGallery from "../components/hort-events/HortEventGallery.tsx";

type HomePageProps = {
    events: HortEvent[],
}

export default function HomePage(props: Readonly<HomePageProps>) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const futureEvents = props.events.filter(event => {
        const eventDate = new Date(event.startDateTime);
        return eventDate >= today;
    });

    function sortEvents(events: HortEvent[]): HortEvent[] {
        return [...events].sort((a, b) => {
            const dateA = new Date(a.startDateTime).getTime();
            const dateB = new Date(b.startDateTime).getTime();
            return dateA - dateB;
        });
    }

    const firstFiveFutureEvents = sortEvents(futureEvents).slice(0, 5);

    return (
        <div className="container">
            <h2 className="pb-2 border-bottom">Anstehende Events</h2>
            <HortEventGallery events={firstFiveFutureEvents}/>
        </div>
    );
}
