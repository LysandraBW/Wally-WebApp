import Close from "@/components/Icon/Close/Close";

interface CloseAppointmentProps {
    onClick: () => void;
}

export default function CloseAppointment(props: CloseAppointmentProps) {
    return (
        <div 
            onClick={props.onClick}
            className='absolute top-8 left-8 z-20 cursor-pointer'
        >
            <Close
                width='30'
                height='30'
                color='#FFF'    
            />
        </div>
    )
}