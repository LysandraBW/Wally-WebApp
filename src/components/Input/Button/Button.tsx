interface ButtonProps {
    label: string;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button 
            onClick={() => props.onClick()}
            className='rounded px-[16px] py-[8px] bg-black text-white w-full bg-gradient-to-b from-[#2f323b] to-black'    
        >
            <label
                className='text-white font-medium'
            >
                {props.label}
            </label>
        </button>
    )
}