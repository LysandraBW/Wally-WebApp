export default function Header() {
    return (
        <header className='flex flex-col gap-y-4 self-center w-min'>
            <h1 className='text-center whitespace-nowrap'>Lookup Appointment</h1>
            <p className='text-center text-sm text-gray-400'>To see your appointment details, please enter your appointment ID and email address.</p>
        </header>
    )
}