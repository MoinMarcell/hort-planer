import {Link} from "react-router-dom";

type DesktopMenuProps = {
    pages: { title: string, path: string }[],
    pathname: string,
    handleOpenModal: () => void,
}

export default function DesktopMenu(props: Readonly<DesktopMenuProps>) {
    return (
        <>
            <ul className="d-none d-md-flex nav mb-2 justify-content-centermb-md-0">
                {
                    props.pages.map((page) => (
                        <li key={page.path}>
                            <Link to={page.path}
                                  className={`nav-link px-2 ${props.pathname === page.path ? "text-secondary" : "text-white"}`}>
                                {page.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <div className="text-end d-none d-md-flex">
                <button onClick={props.handleOpenModal} type="button"
                        className="btn btn-outline-light me-2">Neues Event
                </button>
            </div>
        </>
    );
}