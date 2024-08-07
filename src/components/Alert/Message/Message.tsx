import CloseButton from "@/components/Button/Icon/Close";
import { useState } from "react";
import { DMSans } from "@/public/Font/Font";
import clsx from "clsx";
import Close from "@/components/Icon/Close/Close";

interface MessageProps {
    head: React.ReactNode;
    body: React.ReactNode;
    messageType: MessageType;
    onClose: () => any;
}

export enum MessageType {Default, Error, Success};

export default function Message(props: MessageProps) {
    const [visible, setVisible] = useState(true);
    
    return (
        <>
            {visible &&
                <div
                    className={clsx(
                        'flex items-start p-4 gap-x-4 max-w-[450px] m-10',
                        'rounded shadow-[0_4px_4px_0px_rgba(0,0,0,0.07)]',
                        props.messageType === MessageType.Success && 'bg-green-100 border border-green-300',
                        props.messageType === MessageType.Error && 'bg-red-100 border border-red-300'
                    )}
                >
                    <div
                        onClick={() => {
                            setVisible(false);
                            props.onClose();
                        }}
                        className={clsx('relative top-[4px]')}
                    >
                        {props.messageType === MessageType.Success &&                     
                            <Close  
                                width='16'
                                height='16'
                                color={'#33A140'}
                            />
                        }
                        {props.messageType === MessageType.Error &&                     
                            <Close  
                                width='16'
                                height='16'
                                color={'#D1393E'}
                            />
                        }
                    </div>
                    <div>
                        <h5 
                            className={clsx(
                                `${DMSans.className} text-[17px] font-[500]`,
                                props.messageType === MessageType.Success && 'text-green-300',
                                props.messageType === MessageType.Error && 'text-red-300'
                            )}
                        >
                            {props.head}
                        </h5>
                        <p
                            className={clsx(
                                'text-sm',
                                props.messageType === MessageType.Success && 'text-green-200',
                                props.messageType === MessageType.Error && 'text-red-200'
                            )}
                        >
                            {props.body}
                        </p>
                    </div>
                </div>
            }
        </>
    )
}