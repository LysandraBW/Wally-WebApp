import express from "express";
import cors from "cors";
import { INVALID_BODY } from "./constant.js";
import { selectStatuses } from "./procedure/Info/Statuses/Select.js";
import { selectServices } from "./procedure/Info/Services/Select.js";
import { selectMakes } from "./procedure/Info/Makes/Select.js";
import { selectLabels } from "./procedure/Info/Labels/Select.js";
import { selectAllEmployees } from "./procedure/Employee/Employee/Select/AllEmployees.js";
import { selectEmployee } from "./procedure/Employee/Employee/Select/Employee.js";
import { selectEvents } from "./procedure/Employee/Event/Select.js";
import { updateEvent } from "./procedure/Employee/Event/Update.js";
import { insertEvent } from "./procedure/Employee/Event/Insert.js";
import { deleteEvent } from "./procedure/Employee/Event/Delete.js";
import { selectEventSharees } from "./procedure/Employee/SharedEvent/Select.js";
import { insertEventSharee } from "./procedure/Employee/SharedEvent/Insert.js";
import { deleteEventSharee } from "./procedure/Employee/SharedEvent/Delete.js";
import { employeeLogin } from "./procedure/Employee/Authenticate/Login.js";
import { employeeLogout } from "./procedure/Employee/Authenticate/Logout.js";
import { authenticateEmployee } from "./procedure/Employee/Authenticate/Session.js";
import { updateCustomer } from "./procedure/Customer/Update.js";
import { insertAppointment } from "./procedure/Appointment/Appointment/Insert.js";
import { authorizeLookup } from "./procedure/Appointment/Authenticate/Lookup.js";
import { selectAppointment } from "./procedure/Appointment/Appointment/Select/Appointment.js";
import { selectAppointmentSummary } from "./procedure/Appointment/Appointment/Select/AppointmentSummary.js";
import { selectAllAppointments } from "./procedure/Appointment/Appointment/Select/AllAppointments.js";
import { updateAppointmentDate } from "./procedure/Appointment/Date/Update.js";
import { selectDiagnoses } from "./procedure/Appointment/Diagnosis/Select.js";
import { insertDiagnosis } from "./procedure/Appointment/Diagnosis/Insert.js";
import { updateDiagnosis } from "./procedure/Appointment/Diagnosis/Update.js";
import { deleteDiagnosis } from "./procedure/Appointment/Diagnosis/Delete.js";
import { selectAppointmentLabels } from "./procedure/Appointment/Label/Select.js";
import { updateLabel } from "./procedure/Appointment/Label/Update.js";
import { selectEmployeeNotes } from "./procedure/Appointment/Note/Select/Employee.js";
import { updateNote } from "./procedure/Appointment/Note/Update.js";
import { insertNote } from "./procedure/Appointment/Note/Insert/Note.js";
import { deleteNote } from "./procedure/Appointment/Note/Delete/Note.js";
import { deleteNoteAttachment } from "./procedure/Appointment/Note/Delete/NoteAttachment.js";
import { insertNoteAttachment } from "./procedure/Appointment/Note/Insert/NoteAttachment.js";
import { selectParts } from "./procedure/Appointment/Part/Select.js";
import { insertPart } from "./procedure/Appointment/Part/Insert.js";
import { updatePart } from "./procedure/Appointment/Part/Update.js";
import { deletePart } from "./procedure/Appointment/Part/Delete.js";
import { selectPayments } from "./procedure/Appointment/Payment/Select.js";
import { insertPayment } from "./procedure/Appointment/Payment/Insert/Payment.js";
import { insertCreditCard } from "./procedure/Appointment/Payment/Insert/CreditCard.js";
import { updateCost } from "./procedure/Appointment/Payment/Update.js";
import { deletePayment } from "./procedure/Appointment/Payment/Delete.js";
import { selectRepairs } from "./procedure/Appointment/Repair/Select.js";
import { insertRepair } from "./procedure/Appointment/Repair/Insert.js";
import { updateRepair } from "./procedure/Appointment/Repair/Update.js";
import { deleteRepair } from "./procedure/Appointment/Repair/Delete.js";
import { selectAppointmentServices } from "./procedure/Appointment/Service/Select.js";
import { insertService } from "./procedure/Appointment/Service/Insert/Service.js";
import { insertDefinedService } from "./procedure/Appointment/Service/Insert/DefinedService.js";
import { updateService } from "./procedure/Appointment/Service/Update.js";
import { deleteService } from "./procedure/Appointment/Service/Delete.js";
import { selectNoteSharees } from "./procedure/Appointment/SharedNote/Select.js";
import { insertNoteSharee } from "./procedure/Appointment/SharedNote/Insert.js";
import { deleteNoteSharee } from "./procedure/Appointment/SharedNote/Delete.js";
import { updateStatus } from "./procedure/Appointment/Status/Update.js";
import { updateVehicle } from "./procedure/Appointment/Vehicle/Update.js";
import { tDeleteAppointment } from "./procedure/Appointment/Deleted/TDelete.js";
import { tDeleteAppointments } from "./procedure/Appointment/Deleted/TDeleteMultiple.js";
import { pDeleteAppointment } from "./procedure/Appointment/Deleted/PDelete.js";
import { pDeleteAppointments } from "./procedure/Appointment/Deleted/PDeleteMultiple.js";
import { recoverAppointments } from "./procedure/Appointment/Deleted/RecoverMultiple.js";
import { selectNames } from "./procedure/Employee/Employee/Select/Names.js";
import { insertDigitalPayment } from "./procedure/Appointment/Payment/Insert/DigitalPayment.js";

const server = express();
server.use(express.json());
server.listen(5000, () => console.log("Server Listening on Port: 5000"));

const corsOptions = {
    origin: "*", 
    credentials: true,
    optionSuccessStatus: 200,
}
 
server.use(cors(corsOptions));

const defaultRouteHandler = async (req, res, action) => {
    const input = action.test(req.body);
    console.log(input);
    if (!input.success)
        return res.status(400).send(INVALID_BODY);
    const output = await action.exec(input.data);
    return res.send({output});
}

server.get("/info/status", async (request, response) => {
    const output = await selectStatuses();
    response.send({output});
});

server.get("/info/service", async (request, response) => {
    const output = await selectServices();
    response.send({output});
});

server.get("/info/label", async (request, response) => {
    const output = await selectLabels();
    response.send({output});
});

server.get("/info/make", async (request, response) => {
    const output = await selectMakes();
    response.send({output});
});

server.post("/employee/select", async (request, response) => {
    return defaultRouteHandler(request, response, selectEmployee);
});

server.post("/employee/selectAll", async (request, response) => {
    return defaultRouteHandler(request, response, selectAllEmployees);
});

server.post("/employee/selectNames", async (request, response) => {
    return defaultRouteHandler(request, response, selectNames);
});

server.post("/employee/selectEvents", async (request, response) => {
    return defaultRouteHandler(request, response, selectEvents);
});

server.post("/employee/updateEvent", async (request, response) => {
    return defaultRouteHandler(request, response, updateEvent);
});

server.post("/employee/deleteEvent", async (request, response) => {
    return defaultRouteHandler(request, response, deleteEvent);
});

server.post("/employee/insertEvent", async (request, response) => {
    return defaultRouteHandler(request, response, insertEvent);
});

server.post("/employee/selectEventSharees", async (request, response) => {
    return defaultRouteHandler(request, response, selectEventSharees);
});

server.post("/employee/insertEventSharee", async (request, response) => {
    return defaultRouteHandler(request, response, insertEventSharee);
});

server.post("/employee/deleteEventSharee", async (request, response) => {
    return defaultRouteHandler(request, response, deleteEventSharee);
});

server.post("/employee/authenticate", async (request, response) => {
    return defaultRouteHandler(request, response, authenticateEmployee);
});

server.post("/employee/login", async (request, response) => {
    return defaultRouteHandler(request, response, employeeLogin);
});

server.post("/employee/logout", async (request, response) => {
    return defaultRouteHandler(request, response, employeeLogout);
});

server.post("/customer/updateCustomer", async (request, response) => {
    return defaultRouteHandler(request, response, updateCustomer);
});

server.post("/appointment/schedule", async (request, response) => {
    return defaultRouteHandler(request, response, insertAppointment);
});

server.post("/appointment/lookup", async (request, response) => {
    return defaultRouteHandler(request, response, authorizeLookup);
});

server.post("/appointment/select", async (request, response) => {
    return defaultRouteHandler(request, response, selectAppointment);
});

server.post("/appointment/selectSummary", async (request, response) => {
    return defaultRouteHandler(request, response, selectAppointmentSummary);
});

server.post("/appointment/selectAll", async (request, response) => {
    return defaultRouteHandler(request, response, selectAllAppointments);
});

server.post("/appointment/updateDate", async (request, response) => {
    return defaultRouteHandler(request, response, updateAppointmentDate);
});

server.post("/appointment/tDelete", async (request, response) => {
    return defaultRouteHandler(request, response, tDeleteAppointment);
});

server.post("/appointment/tDeleteMultiple", async (request, response) => {
    return defaultRouteHandler(request, response, tDeleteAppointments);
});

server.post("/appointment/pDelete", async (request, response) => {
    return defaultRouteHandler(request, response, pDeleteAppointment);
});

server.post("/appointment/pDeleteMultiple", async (request, response) => {
    return defaultRouteHandler(request, response, pDeleteAppointments);
});

server.post("/appointment/undeleteMultiple", async (request, response) => {
    return defaultRouteHandler(request, response, recoverAppointments);
});

server.post("/appointment/selectDiagnoses", async (request, response) => {
    return defaultRouteHandler(request, response, selectDiagnoses);
});

server.post("/appointment/insertDiagnosis", async (request, response) => {
    return defaultRouteHandler(request, response, insertDiagnosis);
});

server.post("/appointment/updateDiagnosis", async (request, response) => {
    return defaultRouteHandler(request, response, updateDiagnosis);
});

server.post("/appointment/deleteDiagnosis", async (request, response) => {
    return defaultRouteHandler(request, response, deleteDiagnosis);
});

server.post("/appointment/selectLabels", async (request, response) => {
    return defaultRouteHandler(request, response, selectAppointmentLabels);
});

server.post("/appointment/updateLabel", async (request, response) => {
    return defaultRouteHandler(request, response, updateLabel);
});

server.post("/appointment/selectEmployeeNotes", async (request, response) => {
    return defaultRouteHandler(request, response, selectEmployeeNotes);
});

server.post("/appointment/insertNote", async (request, response) => {
    return defaultRouteHandler(request, response, insertNote);
});

server.post("/appointment/insertNoteAttachment", async (request, response) => {
    return defaultRouteHandler(request, response, insertNoteAttachment);
});

server.post("/appointment/updateNote", async (request, response) => {
    return defaultRouteHandler(request, response, updateNote);
});

server.post("/appointment/deleteNote", async (request, response) => {
    return defaultRouteHandler(request, response, deleteNote);
});

server.post("/appointment/deleteNoteAttachment", async (request, response) => {
    return defaultRouteHandler(request, response, deleteNoteAttachment);
});

server.post("/appointment/selectParts", async (request, response) => {
    return defaultRouteHandler(request, response, selectParts);
});

server.post("/appointment/insertPart", async (request, response) => {
    return defaultRouteHandler(request, response, insertPart);
});

server.post("/appointment/updatePart", async (request, response) => {
    return defaultRouteHandler(request, response, updatePart);
});

server.post("/appointment/deletePart", async (request, response) => {
    return defaultRouteHandler(request, response, deletePart);
});

server.post("/appointment/selectPayments", async (request, response) => {
    return defaultRouteHandler(request, response, selectPayments);
});

server.post("/appointment/insertPayment", async (request, response) => {
    return defaultRouteHandler(request, response, insertPayment);
});

server.post("/appointment/insertDigitalPayment", async (request, response) => {
    return defaultRouteHandler(request, response, insertDigitalPayment);
});

server.post("/appointment/deletePayment", async (request, response) => {
    return defaultRouteHandler(request, response, deletePayment);
});

server.post("/appointment/insertCreditCard", async (request, response) => {
    return defaultRouteHandler(request, response, insertCreditCard);
});

server.post("/appointment/updateCost", async (request, response) => {
    return defaultRouteHandler(request, response, updateCost);
});

server.post("/appointment/selectRepairs", async (request, response) => {
    return defaultRouteHandler(request, response, selectRepairs);
});

server.post("/appointment/insertRepair", async (request, response) => {
    return defaultRouteHandler(request, response, insertRepair);
});

server.post("/appointment/updateRepair", async (request, response) => {
    return defaultRouteHandler(request, response, updateRepair);
});

server.post("/appointment/deleteRepair", async (request, response) => {
    return defaultRouteHandler(request, response, deleteRepair);
});

server.post("/appointment/selectAppointmentServices", async (request, response) => {
    return defaultRouteHandler(request, response, selectAppointmentServices);
});

server.post("/appointment/insertService", async (request, response) => {
    return defaultRouteHandler(request, response, insertService);
});

server.post("/appointment/insertDefinedService", async (request, response) => {
    return defaultRouteHandler(request, response, insertDefinedService);
});

server.post("/appointment/updateService", async (request, response) => {
    return defaultRouteHandler(request, response, updateService);
});

server.post("/appointment/deleteService", async (request, response) => {
    return defaultRouteHandler(request, response, deleteService);
});

server.post("/appointment/selectNoteSharees", async (request, response) => {
    return defaultRouteHandler(request, response, selectNoteSharees);
});

server.post("/appointment/insertNoteSharee", async (request, response) => {
    return defaultRouteHandler(request, response, insertNoteSharee);
});

server.post("/appointment/deleteNoteSharee", async (request, response) => {
    return defaultRouteHandler(request, response, deleteNoteSharee);
});

server.post("/appointment/updateStatus", async (request, response) => {
    return defaultRouteHandler(request, response, updateStatus);
});

server.post("/appointment/updateVehicle", async (request, response) => {
    return defaultRouteHandler(request, response, updateVehicle);
});