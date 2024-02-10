import {ReactNode} from "react";

type CustomDialogProps = {
    open: boolean,
    close: () => void,
    title: string,
    description: string | ReactNode
}
export default function CustomDialog(props: Readonly<CustomDialogProps>) {
    return (
        <dialog open={props.open}>
            <article>
                <a href="#close"
                   aria-label="Close"
                   className="close"
                   data-target="modal-example"
                   onClick={props.close}>
                </a>
                <h3>{props.title}</h3>
                <p>
                    {props.description}
                </p>
                <footer>
                    <button className="secondary"
                            onClick={props.close}>Abbrechen
                    </button>
                    <button>Bestätigen</button>
                </footer>
            </article>
        </dialog>
    );
}