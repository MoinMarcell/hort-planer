import Layout from "./components/Layout.tsx";
import useHortEvents from "./hooks/useHortEvents.ts";
import HortEventGallery from "./components/hort-events/HortEventGallery.tsx";
import {Route, Routes} from "react-router-dom";
import HortEventDetailsPage from "./components/hort-events/HortEventDetailsPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NewHortEventForm from "./components/hort-events/NewHortEventForm.tsx";

export default function App() {
    const {hortEvents, createEvent} = useHortEvents();

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage events={hortEvents}/>}/>
                <Route path="/events" element={<HortEventGallery events={hortEvents}/>}/>
                <Route path="/events/:hortEventId" element={<HortEventDetailsPage/>}/>
                <Route path="/events/create" element={<NewHortEventForm createHortEvent={createEvent}/>}/>
            </Routes>
        </Layout>
    )
}
