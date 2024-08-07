import { InputState } from "@/hook/State/Interface";

export default function Error(props: {state: InputState}) {
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