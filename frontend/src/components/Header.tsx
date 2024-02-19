import {faDiceD20} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, Location, useLocation} from "react-router-dom";
import {useState} from "react";
import DesktopMenu from "./nav/DesktopMenu.tsx";
import MobileMenu from "./nav/MobileMenu.tsx";

const pages = [
    {title: "Startseite", path: "/"},
    {title: "Events", path: "/events"},
];

type HeaderProps = {
    isLoggedIn: boolean,
    logout: () => void,
}

export default function Header(props: Readonly<HeaderProps>) {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    const location: Location = useLocation();
    const pathname: string = location.pathname;

    function handleChangeOpenMobileMenu() {
        setOpenMobileMenu(!openMobileMenu);
    }

    return (
        <header className="py-3 text-bg-dark d-flex align-items-center justify-content-between">
            <Link to="/"
                  className="d-flex gap-2 align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <FontAwesomeIcon icon={faDiceD20} size="xl"/> <strong>Hort Planer</strong>
            </Link>

            <DesktopMenu logout={props.logout} isLoggedIn={props.isLoggedIn} pages={pages} pathname={pathname}/>
            <MobileMenu
                pages={pages}
                pathname={pathname}
                isOpen={openMobileMenu}
                handleOpen={handleChangeOpenMobileMenu}
                isLoggedIn={props.isLoggedIn}
                logout={props.logout}
            />
        </header>
    );
}