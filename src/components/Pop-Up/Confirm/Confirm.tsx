interface ConfirmProps {
    message: string;
    agreeLabel: string;
    onAgree: () => any;
    disagreeLabel: string;
    onDisagree: () => any;
    close: () => any;
}

export default function Confirm(props: ConfirmProps) {
    return (
        <>
            <div onClick={() => {
                props.close();
            }}>x</div>
            {props.message}
            <button onClick={() => {
                props.onAgree();
                props.close();
            }}>
                {props.agreeLabel}
            </button>
            <button onClick={() => {
                props.onDisagree();
                props.close();
            }}>
                {props.disagreeLabel}
            </button>
        </>
    )
}