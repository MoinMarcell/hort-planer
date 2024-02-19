import {Link, useNavigate} from "react-router-dom";

type DesktopMenuProps = {
    pages: { title: string, path: string }[],
    pathname: string,
    isLoggedIn: boolean,
    logout: () => void,
}

export default function DesktopMenu(props: Readonly<DesktopMenuProps>) {
    const navigate = useNavigate();
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
                {props.isLoggedIn && <button onClick={() => navigate("/events/create")} type="button"
                                             className="btn btn-outline-light me-2">Neues Event
                </button>}
                {
                    props.isLoggedIn ?
                        <button onClick={props.logout} type="button"
                                className="btn btn-outline-light me-2">Abmelden
                        </button> :
                        <button onClick={() => navigate("/login")} type="button"
                                className="btn btn-outline-light me-2">Anmelden
                        </button>
                }
            </div>
        </>
    );
}