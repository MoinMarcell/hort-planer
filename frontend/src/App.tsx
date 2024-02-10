import Layout from "./components/Layout.tsx";
import NewHortEventForm from "./components/hort-events/NewHortEventForm.tsx";
import useHortEvents from "./hooks/useHortEvents.ts";
import HortEventGallery from "./components/hort-events/HortEventGallery.tsx";
import {useState} from "react";
import CustomDialog from "./components/CustomDialog.tsx";

export default function App() {
    const {hortEvents, createEvent, deleteEvent} = useHortEvents();
    const [openNewEventDialog, setOpenNewEventDialog] = useState<boolean>(false);
    return (
        <Layout>
            <button id="button-add-event" onClick={() => setOpenNewEventDialog(true)}>Ein neues Event erstellen</button>
            <CustomDialog
                open={openNewEventDialog}
                close={() => setOpenNewEventDialog(false)}
                title={"Neues Event erstellen"}
                description={<NewHortEventForm createHortEvent={createEvent}/>}
            />
            <HortEventGallery deleteEvent={deleteEvent} events={hortEvents}/>
        </Layout>
    )
}
