import Header from "./Header.tsx";
import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode,
    isLoggedIn: boolean,
    logout: () => void,
}

export default function Layout(props: Readonly<LayoutProps>) {
    return (
        <div className="container">
            <Header logout={props.logout} isLoggedIn={props.isLoggedIn}/>
            <main>
                {props.children}
            </main>
        </div>
    );
}