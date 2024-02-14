import {HortEvent} from "../types/HortEvent.ts";
import HortEventCard from "../components/hort-events/HortEventCard.tsx";

type HomePageProps = {
    events: HortEvent[],
}

export default function HomePage(props: Readonly<HomePageProps>) {

    const nextEvent: HortEvent | undefined = props.events.find((event) => {
        const eventDate: Date = new Date(event.startDateTime);
        const now: Date = new Date();
        return eventDate > now;
    });

    return (
        <>
            <h2>Nächstes Event:</h2>
            {
                nextEvent ?
                    <HortEventCard event={nextEvent}/> :
                    <p>Keine Events geplant!</p>
            }
        </>
    );
}