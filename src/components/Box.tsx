/* 
    Box:
    Nests the children, intended for related inputs.
*/

interface BoxProps {
    onBlur: () => void;
    children: React.ReactNode;
}

export default function Box(props: BoxProps) {
    // The event is of type FocusEvent, but I have
    // trouble when defining it as such, so I'm defining it as any.
    const onBlur = (event: any) => {
        if (!event || event.currentTarget.contains(event.relatedTarget))
            return;
        props.onBlur && props.onBlur();
    }

    return (
        <div
            tabIndex={0}
            onBlur={onBlur}
        >
            {props.children}
        </div>
    )
}