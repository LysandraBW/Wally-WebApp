import useInterval from "@/features/Alert/useInterval";
import { motion, useAnimate, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";

interface ServiceCardProps {
    type: string;
    name: string;
    low: string;
    high: string;
    index: number;
    color: "red"|"blue"|"yellow";
}

export default function ServiceCard(props: ServiceCardProps) {
    const [type, setType] = useState(props.type);
    const [name, setName] = useState(props.name);
    const [low, setLow] = useState(props.low);
    const [high, setHigh] = useState(props.high);
    const [color, setColor] = useState(props.color);

    const [prevType, setPrevType] = useState(props.type);
    const [prevName, setPrevName] = useState(props.name);
    const [prevLow, setPrevLow] = useState(props.low);
    const [prevHigh, setPrevHigh] = useState(props.high);
    const [prevColor, setPrevColor] = useState(props.color);

    const controlLeave = useAnimationControls();
    const controlEnter = useAnimationControls();

    const opacity: {[n: number]: string} = {
        0: "opacity-100",
        1: "opacity-100",
        2: "opacity-100",
        3: "opacity-100",
        4: "opacity-100",
        5: "opacity-100",
        6: "opacity-100",
        7: "opacity-100",
        8: "opacity-100",
        9: "opacity-100",
        10: "opacity-100",
        11: "opacity-100"
    }

    const colors: {[k: string]: {[n: number]: string}} = {
        "red": {
            0: "bg-red-500",
            1: "bg-red-600",
            2: "bg-red-800",
            3: "bg-red-900",
            4: "bg-red-700",
            5: "bg-red-600",
            6: "bg-red-600",
            7: "bg-red-600",
            8: "bg-red-600/90",
            9: "bg-red-700",
            10: "bg-red-500",
            11: "bg-red-800"
        },
        "blue": {
            0: "bg-blue-600",
            1: "bg-blue-500",
            2: "bg-blue-800",
            3: "bg-blue-800",
            4: "bg-blue-400",
            5: "bg-blue-600",
            6: "bg-blue-400",
            7: "bg-blue-900",
            8: "bg-blue-500",
            9: "bg-blue-600",
            10: "bg-blue-800",
            11: "bg-blue-900"
        },
        "yellow": {
            0: "bg-yellow-400",
            1: "bg-yellow-500",
            2: "bg-orange-300",
            3: "bg-yellow-300",
            4: "bg-yellow-400",
            5: "bg-yellow-300",
            6: "bg-yellow-400",
            7: "bg-yellow-500",
            8: "bg-yellow-300",
            9: "bg-yellow-500",
            10: "bg-orange-300",
            11: "bg-yellow-400"
        }
    }

    const wrapperVariants = {
        middle: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)"
        },
        top: { 
            y: -200,
            opacity: 0,
            filter: "blur(5px)",
        },
        bottom: { 
            y: 200,
            opacity: 0,
            filter: "blur(5px)",
        }
    };

    useEffect(() => {
        controlLeave.stop();
        controlLeave.set("middle");
        controlEnter.stop();
        controlEnter.set("bottom");
        setPrevType(type);
        setPrevName(name);
        setPrevLow(low);
        setPrevHigh(high);
        setPrevColor(color);
        setType(props.type);
        setName(props.name);
        setLow(props.low);
        setHigh(props.high);
        setColor(props.color);
        controlLeave.start("top");
        controlEnter.start("middle");
    }, [props.name]);

    return (
        <div className={`${colors[prevColor][props.index]} ${opacity[props.index]} rounded-none shadow-sm relative overflow-clip h-full`}>
            <motion.div 
                key={props.index}
                variants={wrapperVariants}
                initial="middle"
                animate={controlLeave}
                exit="top"
                transition={{ duration: 0.5 }}
                className={`${colors[prevColor][props.index]} ${opacity[props.index]} pt-4 pl-4 pr-2 pb-2 w-full h-full flex flex-col justify-between absolute top-0 left-0 pt-4 pl-4 pr-2 pb-2`}>
                <div>
                    <span className="text-white opacity-50">{prevType}</span>
                    <h6 className="text-white text-[1.125rem] font-medium transition-all">{prevName}</h6>
                </div>
                <div className="flex justify-end items-center gap-1">
                    <span className="text-white opacity-50">avg.</span>
                    <span className="text-white font-medium text-black text-[1rem]">${prevLow} - ${prevHigh}</span>
                </div>
            </motion.div>
            <motion.div 
                key={props.index + 1}
                variants={wrapperVariants}
                initial="bottom"
                exit="middle"
                animate={controlEnter}
                transition={{ duration: 0.5 }}
                style={{backgroundColor: ``}}
                className={`${colors[color][props.index]} ${opacity[props.index]} pt-4 pl-4 pr-2 pb-2  w-full h-full flex flex-col justify-between`}>		
                <div>
                    <span className="text-white opacity-50">{type}</span>
                    <h6 className="text-white text-[1.125rem] font-medium transition-all">{name}</h6>
                </div>
                <div className="flex justify-end items-center gap-1">
                    <span className="text-white opacity-50">avg.</span>
                    <span className="text-white font-medium text-black text-[1rem]">${low} - ${high}</span>
                </div>
            </motion.div>
        </div>
    )
}