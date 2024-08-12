import { Button, Text } from "@/components/Input/Export";
import { StateType } from "@/process/Employee/Login/State";
import { DataKeys, DataType } from "@/submission/Employee/Login/Data"
import { Fragment } from "react";

interface LoginFormProps {
    data: DataType;
    state: StateType;
    onChange: (name: DataKeys, value: any) => void;
    onSubmit: () => void;
}

export default function LoginForm(props: LoginFormProps) {
    return (
        <Fragment>
            <Text
                type='text'
                name='username'
                label='Username'
                value={props.data.Username}
                state={props.state.Username}
                onChange={(name, value) => props.onChange('Username', value)}
            />
            <Text
                type='text'
                name='password'
                label='Password'
                value={props.data.Password}
                state={props.state.Password}
                onChange={(name, value) => props.onChange('Password', value)}
            />
            <Button
                label='Login'
                onClick={props.onSubmit}
            />
        </Fragment>
    )
}