// import { FullAppointment } from "@/lib/Database/Appointment/Appointment";
// import { useState } from "react";
// import App from "./App";
// import { Remove } from "@/lib/Database/Export";

// interface DashboardProps {
//     SessionID: string;
//     appointments: Array<FullAppointment>;
//     // Not sure if this is the best approach.
//     // Should just instead remove the appointment
//     // from appointments.
//     forceReload: () => any;
// }

// export default function Dashboard(props: DashboardProps) {
//     const [page, setPage] = useState(1);
//     const [checkedAppointments, setCheckedAppointments] = useState<Array<number>>([]);
    
//     const checkAppointment = (AppointmentID: string) => {
//         let updatedValue = [...checkedAppointments];
//         const index = checkedAppointments.indexOf(appointmentID);

//         // Value Found => Remove
//         if (index > -1) 
//             updatedValue.splice(index, 1);
//         // Value Not Found => Add
//         else 
//             updatedValue.push(appointmentID);

//         setCheckedAppointments(updatedValue);
//     };

//     // return 
//         <>
//             <div>
//                 <span>All </span>
//                 <span>Pending </span>
//                 <span>Evaluation </span>
//                 <span>Scheduled </span>
//                 <span>In Progress </span>
//                 <span>Done </span>
//                 <span>Deleted </span>
//                 <span>Starred </span>
//                 <span>Flagged </span>
//                 <span>Seen </span>
//                 <span>New </span>
//             </div>
//             <div>---------------------------------------------------------------------------</div>
//             <div>---------------------------------------------------------------------------</div>
//             <div
//                 onClick={async () => {
//                     console.log('Bar');
//                     if (!checkedAppointments.length)
//                         return;

//                     console.log('Far');
//                     for (const appID of checkedAppointments) {
//                         await Remove({
//                             EmployeeID: props.employeeID,
//                             AppointmentID: appID
//                         });
//                     }

//                     console.log('Car');
//                     setCheckedAppointments([]);
//                     console.log('Dharman');
//                     await props.forceReload();
//                 }}
//             >
//                 DELETE SELECTED
//             </div>
//             <div>---------------------------------------------------------------------------</div>
//             <div>---------------------------------------------------------------------------</div>
//             <div
//                 onClick={async () => {
//                     if (checkedAppointments.length)
//                         return;
//                     setCheckedAppointments([]);
//                     await props.forceReload();
//                 }}
//             >
//                 RELOAD
//             </div>
//             <div>---------------------------------------------------------------------------</div>
//             <div>---------------------------------------------------------------------------</div>
//             <div
//                 onClick={() => {
//                     if (!checkedAppointments.length) {
//                         setCheckedAppointments(props.appointments.map(app => app.AppointmentID));
//                     }
//                     else {
//                         setCheckedAppointments([]);
//                     }
//                 }}
//             >
//                 {!checkedAppointments.length ? "SELECT ALL" : "DESELECT ALL"}
//             </div>
//             <div>---------------------------------------------------------------------------</div>
//             <div>---------------------------------------------------------------------------</div>
//             {props.appointments.map((app: FullAppointment, i) => (
//                 <div key={i}>
//                     <App
//                         employeeID={props.employeeID}
//                         appointment={[app]}
//                         forceReload={props.forceReload}
//                         checkAppointment={checkAppointment}
//                         checked={checkedAppointments.includes(app.AppointmentID)}
//                     />
//                 </div>
//             ))}
//             <div>---------------------------------------------------------------------------</div>
//             <div>
//                 <span
//                     onClick={() => {
//                         setPage(page + 1);
//                     }}
//                 >
//                     {"<"}
//                 </span>
//                 {page}
//                 <span
                
//                 >
//                     {">"}
//                     </span>
//             </div>
//         </>
//     )
// }