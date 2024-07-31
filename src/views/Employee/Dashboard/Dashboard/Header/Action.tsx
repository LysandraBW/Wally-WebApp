interface ActionProps {
    showingDeleted: boolean;
    checkedAppointments: Array<string>;
    loadAppointments: () => void;
    deleteAppointments: (aptIds: Array<string>) => void;
    restoreAppointments: (aptIds: Array<string>) => void;
}

export default function Action(props: ActionProps) {
    return (
        <div>
            <span 
                onClick={async () => {
                    await props.loadAppointments();
                }}
            >
                Reload
            </span>
            {!!props.checkedAppointments.length &&
                <span 
                    onClick={async () => {
                        await props.deleteAppointments(props.checkedAppointments);
                    }}
                >
                    Delete
                </span>
            }
            {!!props.checkedAppointments.length && props.showingDeleted &&
                <span 
                    onClick={async () => {
                        await props.restoreAppointments(props.checkedAppointments);
                    }}
                >
                    Restore
                </span>
            }
        </div>
    )
}