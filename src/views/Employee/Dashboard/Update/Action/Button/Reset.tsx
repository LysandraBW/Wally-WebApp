interface ResetFormProps {
    onReset: () => void;
}

export default function ResetForm(props: ResetFormProps) {
    return (
        <button onClick={() => props.onReset()}>
            Reset
        </button>
    )
}