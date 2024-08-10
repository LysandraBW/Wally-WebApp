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
                        'absolute mt-10 bg-[#FFFFFF] rounded-[0.375rem] left-1/2 translate-x-[-50%]',
                        'flex items-start px-3 py-3 gap-x-4 min-w-[450px] m-10',
                        'backdrop-blur-3xl shadow border border-gray-300',
                        props.messageType === MessageType.Success && 'border-[2px] border-green-300',
                        props.messageType === MessageType.Error && 'border-[2px] border-red-300'
                    )}
                >
                    <div
                        onClick={() => {
                            setVisible(false);
                            props.onClose();
                        }}
                        className={clsx('relative top-[4px]')}
                    >                  
                        <Close  
                            width='16'
                            height='16'
                            color={props.messageType === MessageType.Success ? '#33A140' : props.messageType === MessageType.Error ? '#D1393E' : '#000'}
                        />
                    </div>
                    <div>
                        <h5 
                            className={clsx(
                                `${DMSans.className} text-[18px] font-[500]`,
                                props.messageType === MessageType.Success && 'text-green-300',
                                props.messageType === MessageType.Error && 'text-red-300'
                            )}
                        >{props.head}</h5>
                        <p
                            className={clsx(
                                props.messageType === MessageType.Success && 'text-green-200 text-sm',
                                props.messageType === MessageType.Error && 'text-red-200 text-sm'
                            )}
                        >{props.body}</p>
                    </div>
                </div>
            }
        </>
    )
}