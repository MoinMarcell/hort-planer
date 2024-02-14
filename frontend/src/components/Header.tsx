import {faDiceD20} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, Location, useLocation} from "react-router-dom";
import {useState} from "react";
import Modal from "./Modal.tsx";
import DesktopMenu from "./nav/DesktopMenu.tsx";
import MobileMenu from "./nav/MobileMenu.tsx";

const pages = [
    {title: "Startseite", path: "/"},
    {title: "Events", path: "/events"},
];

export default function Header() {
    const [openModal, setOpenModal] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    const location: Location = useLocation();
    const pathname: string = location.pathname;

    function handleChangeOpenMobileMenu() {
        setOpenMobileMenu(!openMobileMenu);
    }

    function handleChangeOpenModal() {
        setOpenModal(!openModal);
    }

    return (
        <header className="py-3 text-bg-dark d-flex align-items-center justify-content-between">
            <Link to="/"
                  className="d-flex gap-2 align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <FontAwesomeIcon icon={faDiceD20} size="xl"/> <strong>Hort Planer</strong>
            </Link>

            <DesktopMenu pages={pages} pathname={pathname} handleOpenModal={handleChangeOpenModal}/>
            <MobileMenu
                pages={pages}
                pathname={pathname}
                isOpen={openMobileMenu}
                handleOpen={handleChangeOpenMobileMenu}
                handleOpenModal={handleChangeOpenModal}
            />

            <Modal title={"Test"} onClose={handleChangeOpenModal} open={openModal}/>
        </header>
    );
}