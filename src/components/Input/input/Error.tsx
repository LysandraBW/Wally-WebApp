export interface StateType {
    state: boolean;
    message: string;
}

export const DefaultState: StateType = {
    state: true,
    message: ''
}

export default function Error(props: {state: StateType}) {
    return (
        <div>
            {props.state && !props.state.state &&
                <label
                    className='text-red-300'
                >
                    {props.state.message}
                </label>
            }
        </div>
    )
}