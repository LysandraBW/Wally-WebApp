'use client';
import { Fragment } from "react";
import Head from "@/views/Employee/Dashboard/Home/Table/Head/Head";
import { PageContext } from "@/process/Employee/Home/Context";
import Action from "@/views/Employee/Dashboard/Home/Header/Action";
import Search from "@/views/Employee/Dashboard/Home/Header/Search";
import Tabs from "@/views/Employee/Dashboard/Home/Header/Tabs";
import Navigation from "@/views/Employee/Dashboard/Home/Table/Navigation";
import useDashboard from "@/process/Employee/Home/Process";
import Appointment from "@/views/Employee/Dashboard/Home/Appointment/Appointment";
import Body from "@/views/Employee/Dashboard/Home/Table/Body/Body";

export default function Dashboard() {
    const dashboard = useDashboard();

    return (
        <PageContext.Provider value={dashboard.context}>
            <div>
                {dashboard.alert.confirmation && dashboard.alert.confirmation}
                {dashboard.alert.messages.map(([message], i) => <div key={i}>{message}</div>)}
                {dashboard.context.Loaded && 
                    <Fragment>
                        <Action
                            showingDeleted={!!dashboard.filter.Deleted}
                            checkedAppointments={dashboard.current.Checked}
                            loadAppointments={async () => await dashboard.loadAppointments(dashboard.filter)}
                            deleteAppointments={dashboard.deleteAppointmentsHandler}
                            restoreAppointments={dashboard.restoreAppointmentsHandler}
                        />
                        <Search
                            onChange={value => dashboard.updateFilter({Search: value})}
                            onSearch={async () => await dashboard.loadAppointments(dashboard.filter)}
                        />
                        <Tabs
                            updateFilter={async (filter) => await dashboard.updateFilter(filter)}
                        />
                    </Fragment>
                }
                {dashboard.all.Loaded &&
                    <div>
                        <table>
                            <Head
                                filter={dashboard.filter}
                                checked={dashboard.current.Checked}
                                appointments={dashboard.current.Appointments}
                                updateFilter={dashboard.updateFilter}
                                updateChecked={dashboard.updateChecked}
                            />
                            <Body
                                labels={dashboard.all.Labels}
                                search={dashboard.filter.Search}
                                checked={dashboard.current.Checked}
                                current={dashboard.current.Appointments}
                                updateLabels={dashboard.updateLabels}
                                updateChecked={dashboard.updateChecked}
                                openAppointment={dashboard.openAppointment}
                                deleteAppointment={dashboard.deleteAppointmentsHandler}
                            />
                        </table>
                    </div>
                }
                {dashboard.all.Loaded &&
                    <Navigation
                        count={dashboard.all.Count}
                        pageSize={dashboard.filter.PageSize}
                        pageIndex={dashboard.current.Page}
                        pageLength={dashboard.current.Appointments.length}
                        goForward={dashboard.goForward}
                        goBackward={dashboard.goBackward}
                    />
                }
                {!!dashboard.current.AppointmentID &&
                    <Appointment
                        appointmentID={dashboard.current.AppointmentID}
                        onClose={dashboard.closeAppointment}
                    />
                }
            </div>
        </PageContext.Provider>
    )
}