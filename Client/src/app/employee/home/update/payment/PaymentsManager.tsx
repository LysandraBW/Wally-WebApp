import PaymentDisplay from "./PaymentDisplay";
import CreateItemButton from "@/features/ItemManager/components/CreateItemButton";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import usePaymentsManager from "./usePaymentsManager";
import TextFieldGrid from "@/component/Form/Text/TextFieldGrid";
import ArchiveBox from "@/component/Icon/Icons/ArchiveBox";

interface PaymentsManagerProps {
    paymentsManager: ReturnType<typeof usePaymentsManager>;
 }

export default function PaymentsManager(props: PaymentsManagerProps) {
    return (
        <div className="relative flex flex-col grow shadow-sm border border-gray-300 rounded-b-md">
            <div className="gap-4 bg-white relative h-full">
                <table className="w-full">
                    <tbody>
                            <TextFieldGrid
                                type="text"
                                name="Cost"
                                label="Cost USD"
                                value={props.paymentsManager.costForm.getInput("Cost").data}
                                state={props.paymentsManager.costForm.getInput("Cost").state}
                                onChange={props.paymentsManager.updateCostValue}
                                onBlur={undefined}
                            />
                        <tr>
                            <td className="w-0 p-0 text--center bg-white font-medium px-4 text-02 text-gray-700 tracking-wide whitespace-nowrap border-b border-r border-gray-300 pt-2 align-top">Payments</td>
                            <td className="p-0 border-b border-gray-300">
                                <div className="relative bg-gray-50 flex flex-col gap-0 py-6 px-4  border-b border-b-gray-200">
                                    <span className="absolute top-[calc(1rem-8px)] left-[calc(0.25rem*4)] text-00 font-medium tracking-wide text-gray-400">Add</span>
                                    <CreateItemButton
                                        onCreate={props.paymentsManager.startCreateEditor}
                                    />
                                </div>
                                <div className="px-4 py-4">
                                    <PaymentDisplay
                                        items={props.paymentsManager.newItems}
                                        onUpdate={props.paymentsManager.startUpdateEditor}
                                        onDelete={(ID: string) => props.paymentsManager.deleteItemByDisplay(ID)}
                                    />
                                    {Object.keys(props.paymentsManager.newItems).length <= 0 &&
                                        <div className="bg-gray-5-0 rounded-md h-[100px] flex flex-col justify-center gap-1 items-center justify-center">
                                            <ArchiveBox/>
                                        <span className="text-gray-400 tracking-wide font-medium text-04">
                                                No Payment Found
                                            </span>
                                        </div>
                                    }
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <SaveResetButtons
                onSave={props.paymentsManager.saveUpdates}
                onReset={props.paymentsManager.resetUpdates}
            />
        </div>
    )
}