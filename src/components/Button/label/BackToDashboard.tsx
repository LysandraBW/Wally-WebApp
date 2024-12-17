import { goToDashboard } from "@/lib/navigation/navigation";

export default function BackToDashboard() {
    return (
        <div onClick={async () => goToDashboard()}>
            Back to Dashboard
        </div>
    )
}