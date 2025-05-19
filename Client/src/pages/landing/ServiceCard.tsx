import clsx from "clsx";
import { motion, useAnimationControls } from "motion/react";
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

    const colors: {[k: string]: {[n: number]: string}} = {
        "red": {
            0: "border-red-500",
            1: "border-red-600",
            2: "border-red-800",
            3: "border-red-900",
            4: "border-red-700",
            5: "border-red-600",
            6: "border-red-600",
            7: "border-red-600",
            8: "border-red-600/90",
            9: "border-red-700",
            10: "border-red-500",
            11: "border-red-800"
        },
        "blue": {
            0: "border-blue-600",
            1: "border-blue-500",
            2: "border-blue-800",
            3: "border-blue-800",
            4: "border-blue-400",
            5: "border-blue-600",
            6: "border-blue-400",
            7: "border-blue-900",
            8: "border-blue-500",
            9: "border-blue-600",
            10: "border-blue-800",
            11: "border-blue-900"
        },
        "yellow": {
            0: "border-yellow-400",
            1: "border-yellow-500",
            2: "border-orange-300",
            3: "border-yellow-300",
            4: "border-yellow-400",
            5: "border-yellow-300",
            6: "border-yellow-400",
            7: "border-yellow-500",
            8: "border-yellow-300",
            9: "border-yellow-500",
            10: "border-orange-300",
            11: "border-yellow-400"
        }
    }

    const colorText: {[k: string]: {[n: number]: string}} = {
        "red": {
            0: "text-red-500",
            1: "text-red-600",
            2: "text-red-800",
            3: "text-red-900",
            4: "text-red-700",
            5: "text-red-600",
            6: "text-red-600",
            7: "text-red-600",
            8: "text-red-600/90",
            9: "text-red-700",
            10: "text-red-500",
            11: "text-red-800"
        },
        "blue": {
            0: "text-blue-600",
            1: "text-blue-500",
            2: "text-blue-800",
            3: "text-blue-800",
            4: "text-blue-400",
            5: "text-blue-600",
            6: "text-blue-400",
            7: "text-blue-900",
            8: "text-blue-500",
            9: "text-blue-600",
            10: "text-blue-800",
            11: "text-blue-900"
        },
        "yellow": {
            0: "text-yellow-400",
            1: "text-yellow-500",
            2: "text-orange-300",
            3: "text-yellow-300",
            4: "text-yellow-400",
            5: "text-yellow-300",
            6: "text-yellow-400",
            7: "text-yellow-500",
            8: "text-yellow-300",
            9: "text-yellow-500",
            10: "text-orange-300",
            11: "text-yellow-400"
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
        <div className={`${colors[color][props.index]}-- bg-white shadow-sm border border-gray-200 relative overflow-clip h-full`} style={{outlineWidth: "1px"}}>
            <motion.div 
                key={props.index}
                variants={wrapperVariants}
                initial="middle"
                animate={controlLeave}
                exit="top"
                transition={{ duration: 0.5, delay: props.index * 0.05 }}
                className={`bg-white p-2 w-full h-full flex flex-col items-center justify-center gap-1 absolute top-0 left-0`}
            >
                <h6 className="text-black text-[1rem] tracking-wide font-medium">{prevName}</h6>
                <span className="text-gray-400 uppercase text-01 font-medium">TEXT</span>
            </motion.div>
            <motion.div 
                key={props.index + 1}
                variants={wrapperVariants}
                initial="bottom"
                exit="middle"
                animate={controlEnter}
                transition={{ duration: 0.5, delay: props.index * 0.05 }}
                style={{backgroundColor: ``}}
                className={`bg-white p-2 w-full h-full flex flex-col items-center justify-center gap-1 absolute top-0`}
            >
                <h6 className={clsx(`text-black text-[1rem] tracking-wide font-medium`)}>{name}</h6>
                <span className="text-gray-400 uppercase text-01 font-medium">TEXT</span>
            </motion.div>
        </div>
    )
}