import Header from "./Header.tsx";
import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode;
}

export default function Layout(props: Readonly<LayoutProps>) {
    return (
        <div className="container">
            <Header/>
            <main>
                {props.children}
            </main>
        </div>
    );
}