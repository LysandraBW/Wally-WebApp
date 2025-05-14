import { ReactNode } from "react";

interface StepCardProps {
    step?: number;
    title?: string;
    paragraph?: string;
    addCubes: [boolean, boolean, boolean, boolean];
    addBorders: [boolean, boolean, boolean, boolean];
    children?: ReactNode;
    isFinal?: boolean;
}

export default function StepCard(props: StepCardProps) {
    return (
        <div className={`flex flex-col gap-0 bg-white h-full ${props.addBorders[0] && "border-t border-t-gray-200"} ${props.addBorders[1] && "border-r border-r-gray-200"} ${props.addBorders[2] && "border-b border-b-gray-200"} ${props.addBorders[3] && "border-l border-l-gray-200"} relative group`}>
            {props.step &&
                <div className="relative p-4 border-b border-b-gray-200 bg-gray-50/10 group-hover:bg-gray-50 overflow-clip">
                    {props.isFinal && <canvas className="group-hover:block hidden absolute w-full h-auto top-0 left-0" id="my-canvas"></canvas>}
                    <h5 className="text-xs font-medium text-gray-500 flex items-center justify-center h-6 bg-white rounded shadow-sm border border-gray-200 whitespace-nowrap ">STEP {props.step}</h5>
                </div>
            }
            {(props.title && props.paragraph) &&
                <div className="h-full p-4 m-4 bg-white ">
                    <h4 className="text-[1.25rem] font-medium text-center text-gray-700 mb-1">{props.title}</h4>
                    <p className="text-sm text-gray-400 text-center tracking-wide">{props.paragraph}</p>
                </div>
            }
            {props.addCubes[0] &&
                <div className="absolute top-[calc(-15px)] left-[calc(-15px)] w-[30px] h-[30px] bg-white rounded-md border border-gray-200 shadow-sm z-10"></div>
            }
            {props.addCubes[1] &&
                <div className="absolute top-[calc(-15px)] left-[calc(100%-15px)] w-[30px] h-[30px] bg-white rounded-md border border-gray-200 shadow-sm z-10"></div>
            }
            {props.addCubes[2] &&
                <div className="absolute top-[calc(100%-15px)] left-[calc(100%-15px)] w-[30px] h-[30px] bg-white rounded-md border border-gray-200 shadow-sm z-10"></div>
            }
            {props.addCubes[3] &&
                <div className="absolute top-[calc(100%-15px)] left-[calc(-15px)] w-[30px] h-[30px] bg-white rounded-md border border-gray-200 shadow-sm z-10"></div>
            }
            {props.children}
        </div>
    )
}