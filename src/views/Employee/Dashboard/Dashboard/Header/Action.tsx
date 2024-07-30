interface ActionProps {
    loadAppointments: () => void;
    deleteCheckedAppointments: () => void;
}

export default function Action(props: ActionProps) {
    return (
        <div>
            <span onClick={async () => await props.loadAppointments()}>Reload</span>
            <span onClick={async () => await props.deleteCheckedAppointments()}>Delete</span>
        </div>
    )
}