import { Fragment } from 'react';
import { DB_Appointment } from '@/database/Types';
import { Button, Segment, Text } from '@/components/Input/Export';
import useGeneralForm from '@/process/Employee/Update/General/Process';

interface GeneralProps {
    appointment: DB_Appointment;
}

export default function General(props: GeneralProps) {
    const generalForm = useGeneralForm(props.appointment);

    return (
        <Fragment>
            {generalForm.state && generalForm.updated && generalForm.statuses &&
                <Fragment>
                    <Text
                        type='text'
                        name='FName'
                        label='First Name'
                        value={generalForm.updated.FName}
                        state={generalForm.state.FName}
                        onChange={(name, value) => generalForm.updateData('FName', value)}
                    />
                    <Text
                        type='text'
                        name='LName'
                        label='Last Name'
                        value={generalForm.updated.LName}
                        state={generalForm.state.LName}
                        onChange={(name, value) => generalForm.updateData('LName', value)}
                    />
                    <Text
                        type='text'
                        name='Email'
                        label='Email Address'
                        value={generalForm.updated.Email}
                        state={generalForm.state.Email}
                        onChange={(name, value) => generalForm.updateData('Email', value)}
                    />
                    <Text
                        type='text'
                        name='Phone'
                        label='Phone'
                        value={generalForm.updated.Phone}
                        state={generalForm.state.Phone}
                        onChange={(name, value) => generalForm.updateData('Phone', value)}
                    />
                    <Text
                        type='datetime-local'
                        name='StartDate'
                        label='Start Date'
                        value={generalForm.updated.StartDate}
                        state={generalForm.state.StartDate}
                        onChange={(name, value) => generalForm.updateData('StartDate', value)}
                    />
                    <Text
                        type='datetime-local'
                        name='EndDate'
                        label='End Date'
                        value={generalForm.updated.EndDate}
                        state={generalForm.state.EndDate}
                        onChange={(name, value) => generalForm.updateData('EndDate', value)}
                    />
                    <Segment
                        name='StatusID'
                        label='StatusID'
                        value={generalForm.updated.StatusID}
                        values={generalForm.statuses}
                        state={generalForm.state.StatusID}
                        onChange={(name, value) => generalForm.updateData('StatusID', value)}
                    />
                    <Button
                        label='Reset Changes'
                        onClick={generalForm.resetData}
                    />
                    <Button
                        label='Save Changes'
                        onClick={generalForm.submitData}
                    />
                </Fragment>
            }
        </Fragment>
    )
}