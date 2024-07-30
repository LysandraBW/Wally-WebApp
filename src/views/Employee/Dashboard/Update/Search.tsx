import { useState } from "react";

interface SearchProps {
    onSearch: (appointmentID: string) => void;
}

export default function Search(props: SearchProps) {
    const [search, setSearch] = useState('');
    
    return (
        <div>
            <h1>Start by Finding an Appointment</h1>
            <div>
                <input name='appID' onChange={(event) => setSearch(event.target.value)}/>
                <button onClick={() => props.onSearch(search)}>
                    Go
                </button>
            </div>
        </div>
    )
}