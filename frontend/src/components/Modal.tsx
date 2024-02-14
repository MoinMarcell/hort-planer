import {ReactNode} from "react";

type ModalProps = {
    element?: ReactNode,
    title: string,
    onClose: () => void,
    open: boolean,
}

export default function Modal(props: Readonly<ModalProps>) {
    return (
        <div
            className={`modal fade ${props.open ? "show" : ""}`}
            id="modal"
            tabIndex={-1}
            aria-labelledby="modalLabel"
            aria-hidden="true"
            style={{display: props.open ? "block" : "none"}}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{props.title}</h1>
                        <button onClick={props.onClose} type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.element}
                    </div>
                    <div className="modal-footer">
                        <button onClick={props.onClose} type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Close
                        </button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
