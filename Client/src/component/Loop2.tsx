import useInterval from "@/features/Alert/useInterval";
import { cubicBezier, stagger } from "motion";
import { useAnimate, useAnimation, motion, easeInOut } from "motion/react";
import { useEffect, useState } from "react";

interface LoopProps {
    delay: number;
    src: string;
    length: number;
}

const animationRan: any = {};

export default function Loop2(props: LoopProps) {
    
    const variants = {
		hidden: {opacity: 0},
		visible: {
			opacity: 1,
			transition: {
				duration: 4,
				staggerChildren: 0.5,
                when: "beforeChildren"
			}
		}
	}
    const [images, setImages] = useState(["/BMW.png", "/Benz.svg.png", "./Ford.webp", "./Hona.png", "./Nissan.webp", "./Toyota.png", "./kia.png", "./Hyundai.png", "./vk.png"]);

    const [a] = useState(400);
    const [b] = useState(50);
    const [scaleMultiplier] = useState(3);
    const [stepLength] = useState(0.001);
    const [numberStepsInQuadrant] = useState(0.25 / stepLength);
    const [scope, animate] = useAnimate();
    const [ran, setRan] = useState(false);

    const scale = (i: number) => {
        return 1 + ((i + numberStepsInQuadrant)/(numberStepsInQuadrant * 2)) * scaleMultiplier;
    }

    const appear = async () => {
       // Appear
        
    }

    const animation = async () => {    
        let startT = 0;
        if (!animationRan[props.delay]) {
            startT = props.delay/props.length;
            animationRan[props.delay] = true;
            // await animate(scope.current,
            //     {
            //         opacity: 1,
            //         delay: props.delay
            //     }
            // );
        }
        // Moving
        let counter = 0;
        for (let t = 0; t <= 1; t += 0.001) {
            let x = a * Math.cos(2 * Math.PI * t);
            let y = b * Math.sin(2 * Math.PI * t);
            // console.log(x, y);
            if (t <= 0.25 || t >= 0.75) 
                counter++;
            else 
                counter--;

            if (t < startT)
                continue;

            const objectScale = scale(counter);
            // console.log(objectScale / 6.0);
            // console.log(t);
            await animate(scope.current, 
                { 
                    top: `${y}px`,
                    left: `${x}px`, 
                    scale: objectScale,
                    zIndex: Math.floor(objectScale * 3 + (t >= 0.5 ? -7 : 0)),
                    // opacity: t >= 0.5 ? (objectScale - 1) / 4.0 + 0.5 : 1
                }, 
                {
                    delay: 0,
                    duration: 0.01
                });
        }
        setRan(true);
        animation();
    }

    useEffect(() => {
        animation();
    }, []);

    // useInterval(() => {
    //     animation();
    // }, (1 / 0.001) * 0.01 * 1000)

    return (
        <motion.div
            ref={scope}
            style={{
                // zIndex: 20 - props.delay,
                left: `${a}px`,
                // backgroundImage: `url(${props.src})`
                // backgroundColor: `rgb(${1 - props.delay * 10},${1 - props.delay * 10},${props.delay * 10})`
            }}
            className={`scale-[3.5]  absolute w-10 h-10 flex justify-center items-center`}
        >   
            <img className="w-[100%] h-[100%] object-contain" src={props.src}/>
        </motion.div>
        //       <motion.div 
        //       className="relative w-full flex gap-x-12 gap-y-12 justify-between"
        //       variants={variants}
        //       initial="hidden"
        //       animate="visible"
        //       onClick={animation}
        //   >
        //       {images.map((src, i)=> (
        //           <motion.div key={i} className="absolute w-10 h-10 top-[calc(50%-1.25rem)] left-[calc(50%-1.25rem)] bg-red-500">
        //               <motion.div
        //                   ref={scope}
        //                   className=" scale-[3.5] left-[400px] absolute w-10 h-10 bg-blue-500 rounded-full"  
        //               >
        //                   {/* <img className="grayscale h-10" src={props.src}/> */}
        //               </motion.div>
        //           </motion.div>
        //       ))}
        //   </motion.div>
    )
}