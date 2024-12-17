import { useState } from "react";

interface SearchAppointmentProps {
    onSearch: (appointmentID: string) => void;
}

export default function SearchAppointment(props: SearchAppointmentProps) {
    const [search, setSearch] = useState('');
    
    return (
        <div>
            <h1>Start by Finding an Appointment</h1>
            <div>
                <input 
                    name='aptID' 
                    onChange={(event) => setSearch(event.target.value)}
                />
                <button onClick={() => props.onSearch(search)}>
                    Go
                </button>
            </div>
        </div>
    )
}