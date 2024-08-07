import CloseButton from "@/components/Button/Icon/Close";
import Close from "@/components/Icon/Close/Close";
import clsx from "clsx";
import { DMSans } from "@/public/Font/Font";

interface ConfirmProps {
    head: React.ReactNode;
    body: React.ReactNode;
    yLabel: string;
    nLabel: string;
    onY: () => any;
    onN: () => any;
    onClose: () => any;
}

export default function Confirm(props: ConfirmProps) {
    return (
        <div
            className={clsx(
                'max-w-[450px] flex flex-col gap-y-4',
                'p-4 w-fit bg-white', 
                'rounded border border-red-300', 
                'shadow-[0_4px_4px_0px_rgba(0,0,0,0.09)]'
            )}
        >
            <div>
                <Close
                    width='16'
                    height='16'
                    color='#D1393E'
                />
            </div>
            <div
                className='ml-4 flex flex-col gap-y-4'
            >
                <h3
                    className={clsx(
                        `${DMSans.className}`
                    )}
                >
                    {props.head}
                </h3>
                <p
                    className={clsx(
                        'text-sm max-w-[372px] font-[400]'
                    )}
                >
                    {props.body}
                </p>
                <div
                    className='flex gap-x-4 mb-4'
                >
                    <button 
                        onClick={() => {
                            props.onN();
                            props.onClose();
                        }}
                        className={clsx(
                            'text-sm font-[500] text-[#9EA0B0]'
                        )}
                    >
                        {props.nLabel}
                    </button>
                    <button 
                        onClick={() => {
                            props.onY();
                            props.onClose();
                        }}
                        className={clsx(
                            'bg-red-300 text-sm text-white'
                        )}
                    >
                        {props.yLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}