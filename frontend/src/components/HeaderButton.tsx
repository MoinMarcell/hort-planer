type HeaderButtonProps = {
    text: string;
}
export default function HeaderButton(props: Readonly<HeaderButtonProps>) {
    return (
        <div className="text-end">
            <button type="button" className="btn btn-outline-light">{props.text}</button>
        </div>
    );
}