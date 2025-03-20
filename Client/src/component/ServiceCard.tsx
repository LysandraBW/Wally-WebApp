import useInterval from "@/features/Alert/useInterval";
import { motion, useAnimate } from "motion/react";
import { useState } from "react";

interface ServiceCardProps {
    type: string;
    name: string;
    low: string;
    high: string;
    nextType: string;
    nextName: string;
    nextLow: string;
    nextHigh: string;
    repeatDelay: number;
    index: number;
}

export default function ServiceCard(props: ServiceCardProps) {
    const [delay,  setDelay] = useState(Math.floor(Math.random() * 5));

    useInterval(() => {
        setDelay(Math.floor(Math.random() * 5));
    }, 5000);

    return (
        <div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 rounded-lg shadow-sm relative overflow-clip h-full">
            <motion.div 
                key={props.index}
                animate={{ 
                    y: -200,
                    opacity: 0,
                    filter: "blur(5px)",
                }} 
                initial={{
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)"
                }}
                transition={{ duration: 1, delay: props.repeatDelay }}
                className="w-full h-full flex flex-col justify-between absolute top-0 left-0 pt-4 pl-4 pr-2 pb-2">		
                <div>
                    <span>{props.type}</span>
                    <h6 className="text-[1.125rem] font-medium transition-all">{props.name}</h6>
                </div>
                <div className="flex justify-end items-center gap-1">
                    <span>avg.</span>
                    <span className="font-medium text-black text-[1.25rem]">${props.low} - ${props.high}</span>
                </div>
            </motion.div>
            <motion.div 
                key={props.index + 1}
                initial={{
                    y: 200,
                    opacity: 0,
                    filter: "blur(5px)"
                }}
                animate={{ 
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                }} 
                transition={{ duration: 1, delay: props.repeatDelay}}
                className="w-full h-full flex flex-col justify-between">		
                <div>
                    <span>{props.nextType}</span>
                    <h6 className="text-[1.125rem] font-medium transition-all">{props.nextName}</h6>
                </div>
                <div className="flex justify-end items-center gap-1">
                    <span>avg.</span>
                    <span className="font-medium text-black text-[1.25rem]">${props.nextLow} - ${props.nextHigh}</span>
                </div>
            </motion.div>
        </div>
    )
}