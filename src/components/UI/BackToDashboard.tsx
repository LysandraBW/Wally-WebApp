import { goToDashboard } from "@/lib/Navigation/Redirect";

export default function BackToDashboard() {
    return (
        <div onClick={async () => goToDashboard()}>
            Back to Dashboard
        </div>
    )
}