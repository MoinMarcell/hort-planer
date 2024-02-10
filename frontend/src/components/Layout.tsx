import Header from "./Header.tsx";
import {ReactNode} from "react";
import Footer from "./Footer.tsx";

type LayoutProps = {
    children: ReactNode;
}

export default function Layout(props: Readonly<LayoutProps>) {
    return (
        <>
            <Header/>
            <main className="container">
                {props.children}
            </main>
            <Footer/>
        </>
    );
}