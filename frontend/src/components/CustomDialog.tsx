import {ReactNode} from "react";

type CustomDialogProps = {
    open: boolean,
    close: () => void,
    title: string,
    description: string | ReactNode,
    onConfirm?: () => Promise<void>
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
                {
                    props.onConfirm ?
                        <p>
                            {props.description}
                        </p> :
                        <>
                            {props.description}
                        </>
                }
                <footer>
                    <button className="secondary"
                            onClick={props.close}>Abbrechen
                    </button>
                    {props.onConfirm && <button onClick={props.onConfirm}>Bestätigen</button>}
                </footer>
            </article>
        </dialog>
    );
}