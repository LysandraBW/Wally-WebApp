interface GoBackProps {
    onClick: () => void;
}

export default function GoBack(props: GoBackProps) {
    return (
        <span 
            onClick={props.onClick}
            className='!text-gray-500 text-xs font-medium cursor-pointer mt-2'
        >Go Back</span>
    )
}