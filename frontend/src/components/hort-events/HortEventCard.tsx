import {HortEvent} from "../../types/HortEvent.ts";
import CustomDialog from "../CustomDialog.tsx";
import {useState} from "react";

type HortEventCardProps = {
    event: HortEvent,
    deleteEvent: (id: string) => Promise<void>,
}

export default function HortEventCard(props: Readonly<HortEventCardProps>) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const startDateTime = new Date(props.event.startDateTime);
    const endDateTime = new Date(props.event.endDateTime);

    const dayOfWeek = startDateTime.toLocaleDateString("de-DE", {weekday: "long"});
    const startTime = startDateTime.getHours() + ":" + startDateTime.getMinutes();
    const endTime = endDateTime.getHours() + ":" + endDateTime.getMinutes();

    return (
        <article className="custom-card-article">
            <header>
                <nav>
                    <ul>
                        <li>{dayOfWeek}</li>
                        <li>{startTime}</li>
                        <li>{endTime}</li>
                    </ul>
                </nav>
                <h2 className="custom-card-title">{props.event.title}</h2>
            </header>
            <p>
                {props.event.description}
            </p>
            <footer>
                <nav>
                    <ul>
                        <li>
                            <button>Details</button>
                        </li>
                        <li>
                            <button className="button-yellow">Bearbeiten</button>
                        </li>
                        <li>
                            <button
                                className="button-red"
                                onClick={() => setOpenDeleteDialog(true)}
                            >
                                Löschen
                            </button>
                        </li>
                    </ul>
                </nav>
            </footer>
            <CustomDialog
                open={openDeleteDialog}
                close={() => setOpenDeleteDialog(false)}
                title="Löschen"
                description={`Möchtest du das Event "${props.event.title}" wirklich löschen?`}
                onConfirm={() => props.deleteEvent(props.event.id)}
            />
        </article>
    );
}