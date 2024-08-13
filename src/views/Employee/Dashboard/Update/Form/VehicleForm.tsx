import { Fragment } from 'react';
import { Text, Search, Button } from '@/components/Input/Export';
import { DB_Appointment } from '@/database/Types';
import useVehicleForm from '@/process/Employee/Update/Vehicle/Process';

interface VehicleProps {
    appointment: DB_Appointment;
}

export default function Vehicle(props: VehicleProps) {
    const vehicleForm = useVehicleForm(props.appointment);

    return (
        <Fragment>
            {!!vehicleForm.state && !!vehicleForm.loaded && !!vehicleForm.updated &&
                <Fragment>
                    <Text
                        type='text'
                        name='VIN'
                        label='VIN'
                        value={vehicleForm.updated.VIN}
                        state={vehicleForm.state.VIN}
                        onChange={(name, value) => vehicleForm.updateData('VIN', value)}
                    />
                    <Search
                        name='ModelYear'
                        label='Model Year'
                        defaultLabel='Select a Year'
                        value={[vehicleForm.updated.ModelYear]}
                        state={vehicleForm.state.ModelYear}
                        values={vehicleForm.loaded.ModelYears}
                        onChange={(name, value) => vehicleForm.updateData('ModelYear', value)}
                        size={10}
                    />
                    <Search
                        name='Make'
                        label='Make'
                        defaultLabel='Select a Make'
                        value={[vehicleForm.updated.Make]}
                        state={vehicleForm.state.Make}
                        values={vehicleForm.loaded.Makes}
                        onChange={(name, value) => vehicleForm.updateData('Make', value)}
                        size={10}
                    />
                    <Search
                        name='Model'
                        label='Model'
                        defaultLabel='Select a Model'
                        value={[vehicleForm.updated.Model]}
                        state={vehicleForm.state.Model}
                        values={vehicleForm.loaded.Models}
                        onChange={(name, value) => vehicleForm.updateData('Model', value)}
                        disabled={!vehicleForm.updated.ModelYear || !vehicleForm.updated.Make}
                        size={10}
                    />
                    <Text
                        type='number'
                        name='Mileage'
                        label='Mileage'
                        value={vehicleForm.updated.Mileage}
                        state={vehicleForm.state.Mileage}
                        onChange={(name, value) => vehicleForm.updateData('Mileage', value)}
                    />
                    <Text
                        type='text'
                        name='LicensePlate'
                        label='License Plate'
                        value={vehicleForm.updated.LicensePlate}
                        state={vehicleForm.state.LicensePlate}
                        onChange={(name, value) => vehicleForm.updateData('LicensePlate', value)}
                    />
                    <Button
                        label='Reset Changes'
                        onClick={vehicleForm.resetData}
                    />
                    <Button
                        label='Save Changes'
                        onClick={vehicleForm.submitData}
                    />
                </Fragment>
            }
        </Fragment>
    )
}