import { goToDashboard } from "@/lib/Navigation/Navigation";

export default function BackToDashboard() {
    return (
        <div onClick={async () => goToDashboard()}>
            Back to Dashboard
        </div>
    )
}