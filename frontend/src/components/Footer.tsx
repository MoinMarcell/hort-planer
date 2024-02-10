export default function Footer() {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <footer id="layout-footer" className="container-fluid">
            <nav>
                <ul>
                    <li><strong>&copy; {year} Hort Planer</strong></li>
                </ul>
                <ul>
                    <li><a href="https://trainofhope-do.de/anfragen">Impressum</a></li>
                    <li><a href="https://trainofhope-do.de/anfragen/datenchutzerklaerung">Datenschutz</a></li>
                </ul>
            </nav>
        </footer>
    );
}