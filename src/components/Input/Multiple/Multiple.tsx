interface MultipleProps {
    onBlur?: () => any;
    children: React.ReactNode;
}

export default function Multiple(props: MultipleProps) {
    return (
        <div
            tabIndex={0}
            onBlur={(event) => {
                if (event.currentTarget.contains(event.relatedTarget))
                    return;
                props.onBlur && props.onBlur();
            }}
        >
            {props.children}
        </div>
    )
}