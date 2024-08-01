import { inValues, isDateTime, isEmailAddress, isLicensePlate, isName, isNumber, isPhoneNumber, isVIN } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import { ErrorStructure } from "@/lib/Inspector/Inspectors";
import { GeneralFormStructure } from "@/process/Employee/Update/Form/Form/General/General";
import { VehicleFormStructure } from "@/process/Employee/Update/Form/Form/Vehicle/Vehicle";

export const inspectGeneralInput = async (
    form: GeneralFormStructure, 
    values: {
        statusIDs: Array<number>
    }
): Promise<ErrorStructure> => {
    const [fNameState, fNameMessage] = await isName().inspect(form.FName);
    const [lNameState, lNameMessage] = await isName().inspect(form.LName);
    const [emailState, emailMessage] = await isEmailAddress().inspect(form.Email);
    const [phoneState, phoneMessage] = await isPhoneNumber().inspect(form.Phone);

    const [startDateState, startDateMessage] = await isDateTime({
        optional: true
    }).inspect(form.StartDate);

    const [endDateState, endDateMessage] = await isDateTime({
        optional: true
    }).inspect(form.EndDate);

    const [statusIDState, statusIDMessage] = await inValues({
        values: values.statusIDs
    }).inspect(form.StatusID);

    return {
        fName: {
            state: fNameState,
            message: fNameMessage
        },
        lName: {
            state: lNameState,
            message: lNameMessage
        },
        email: {
            state: emailState,
            message: emailMessage
        },
        phone: {
            state: phoneState,
            message: phoneMessage
        },
        startDate: {
            state: startDateState,
            message: startDateMessage
        },
        endDate: {
            state: endDateState,
            message: endDateMessage
        },
        statusID: {
            state: statusIDState,
            message: statusIDMessage
        }
    }
}

export const inspectVehicleInput = async (
    form: VehicleFormStructure,
    values: {
        makes: Array<string>,
        models: Array<string>,
        modelYears: Array<number>
    }
): Promise<ErrorStructure> => {
    const [vinState, vinMessage] = await isVIN().inspect(form.VIN);
    const [mileageState, mileageMessage] = await isNumber().inspect(form.Mileage);
    const [licensePlateState, licensePlateMessage] = await isLicensePlate().inspect(form.LicensePlate);

    const [makeState, makeMessage] = await inValues({
        values: values.makes
    }).inspect(form.Make);

    const [modelState, modelMessage] = await inValues({
        values: values.models
    }).inspect(form.Model);

    const [modelYearState, modelYearMessage] = await inValues({
        values: values.modelYears
    }).inspect(form.ModelYear);

    return {
        VIN: {
            state: vinState,
            message: vinMessage
        },
        Make: {
            state: makeState,
            message: makeMessage
        },
        Model: {
            state: modelState,
            message: modelMessage
        },
        ModelYear: {
            state: modelYearState,
            message: modelYearMessage
        },
        Mileage: {
            state: mileageState,
            message: mileageMessage
        },
        LicensePlate: {
            state: licensePlateState,
            message: licensePlateMessage
        }
    }
}