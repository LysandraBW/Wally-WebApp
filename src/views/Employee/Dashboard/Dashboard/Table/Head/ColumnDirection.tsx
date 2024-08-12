interface ColumnDirectionProps {
    sortDirection: 1 | 0 | null;
}

export default function ColumnDirection(props: ColumnDirectionProps) {
    return (
        <div>
            {props.sortDirection === 1 &&
                <span>Up</span>
            }
            {props.sortDirection === 0 &&
                <span>Down</span>
            }
            {props.sortDirection === null &&
                <span>---</span>
            }
        </div>
    )
}