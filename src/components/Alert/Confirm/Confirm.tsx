interface ConfirmProps {
    message: React.ReactNode;
    agreeLabel: string;
    disagreeLabel: string;
    onAgree: () => any;
    onDisagree: () => any;
    onClose: () => any;
}

export default function Confirm(props: ConfirmProps) {
    return (
        <>
            <div 
                onClick={() => {
                    props.onClose();
                }}
            >
                x
            </div>
            {props.message}
            <button 
                onClick={() => {
                    props.onAgree();
                    props.onClose();
                }}
            >
                {props.agreeLabel}
            </button>
            <button 
                onClick={() => {
                    props.onDisagree();
                    props.onClose();
                }}
            >
                {props.disagreeLabel}
            </button>
        </>
    )
}