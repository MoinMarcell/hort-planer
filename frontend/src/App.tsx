import Layout from "./components/Layout.tsx";
import useHortEvents from "./hooks/useHortEvents.ts";
import HortEventGallery from "./components/hort-events/HortEventGallery.tsx";
import {Route, Routes} from "react-router-dom";
import HortEventDetailsPage from "./components/hort-events/HortEventDetailsPage.tsx";
import HomePage from "./pages/HomePage.tsx";

export default function App() {
    const {hortEvents} = useHortEvents();

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage events={hortEvents}/>}/>
                <Route path="/events" element={<HortEventGallery events={hortEvents}/>}/>
                <Route path="/events/:hortEventId" element={<HortEventDetailsPage/>}/>
            </Routes>
        </Layout>
    )
}
