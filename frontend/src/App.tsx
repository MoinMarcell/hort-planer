import Layout from "./components/Layout.tsx";
import useHortEvents from "./hooks/useHortEvents.ts";
import HortEventGallery from "./components/hort-events/HortEventGallery.tsx";
import {Route, Routes} from "react-router-dom";
import HortEventDetailsPage from "./components/hort-events/HortEventDetailsPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import HortEventForm from "./components/hort-events/HortEventForm.tsx";
import {Bounce, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    const {hortEvents, createEvent, deleteEvent} = useHortEvents();

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage events={hortEvents}/>}/>
                <Route path="/events" element={<HortEventGallery events={hortEvents}/>}/>
                <Route path="/events/:hortEventId" element={<HortEventDetailsPage deleteHortEvent={deleteEvent}/>}/>
                <Route path="/events/create" element={<HortEventForm createHortEvent={createEvent}/>}/>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </Layout>
    )
}
