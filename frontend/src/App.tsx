import Layout from "./components/Layout.tsx";
import {useState} from "react";
import CustomDialog from "./components/CustomDialog.tsx";

export default function App() {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <Layout>
            <button id="button-add-event">Ein neues Event erstellen</button>
            <article className="custom-card-article">
                <header>
                    <nav>
                        <ul>
                            <li>Montag</li>
                            <li>10.01.2022</li>
                            <li>10:00 - 12:00</li>
                        </ul>
                    </nav>
                    <h2 className="custom-card-title">Test Event</h2>
                </header>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                    convallis libero in dui sollicitudin, id dictum nunc fermentum.
                    Nulla facilisi. Nullam nec nunc sit amet nunc tincidunt
                    fermentum. Nulla facilisi. Nullam nec nunc sit amet nunc
                    tincidunt fermentum.
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
                                    onClick={() => setOpenDialog(true)}
                                >
                                    Löschen
                                </button>
                            </li>
                        </ul>
                    </nav>
                </footer>
            </article>
            <CustomDialog
                open={openDialog}
                close={() => setOpenDialog(false)}
                title={"Bist du dir sicher?"}
                description={"Möchtest du das Event wirklich löschen?"}
            />
        </Layout>
    )
}
