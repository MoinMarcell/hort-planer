import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";

type MobileMenuProps = {
    pages: { title: string, path: string }[],
    pathname: string,
    isOpen: boolean,
    handleOpen: () => void,
    isLoggedIn: boolean,
    logout: () => void,
}

export default function MobileMenu(props: Readonly<MobileMenuProps>) {
    const navigate = useNavigate();
    return (
        <div className="d-md-none d-sm-block">
            <div className="mb-2 mb-md-0 justify-content-end">
                {
                    props.isOpen ?
                        <FontAwesomeIcon icon={faXmark} onClick={props.handleOpen} size="xl"
                                         style={{cursor: 'pointer'}}/> :
                        <FontAwesomeIcon icon={faBars} onClick={props.handleOpen} size="xl"
                                         style={{cursor: 'pointer'}}/>
                }
            </div>
            <ul
                className={`dropdown-menu${props.isOpen ? " show" : ""}`}
                style={
                    props.isOpen ?
                        {
                            margin: "0 -150px",
                        } :
                        {}}
            >
                {
                    props.pages.map((page) => (
                        <li key={page.path}>
                            <Link to={page.path}
                                  className={`dropdown-item ${props.pathname === page.path ? "text-secondary" : "text-white"}`}
                                  onClick={props.handleOpen}
                            >
                                {page.title}
                            </Link>
                        </li>
                    ))
                }
                <div className="d-flex flex-column">
                    {props.isLoggedIn && <button onClick={() => {
                        navigate("/events/create");
                        props.handleOpen();
                    }} type="button"
                                                 className="btn btn-outline-light border-0">Neues Event
                    </button>}
                    {
                        props.isLoggedIn ?
                            <button onClick={() => {
                                navigate("/login");
                                props.logout();
                            }}
                                    type="button"
                                    className="btn btn-outline-light border-0"
                            >
                                Abmelden
                            </button> :
                            <button onClick={() => {
                                navigate("/login");
                                props.handleOpen();
                            }} type="button"
                                    className="btn btn-outline-light border-0">Anmelden
                            </button>
                    }
                </div>
            </ul>
        </div>
    );
}