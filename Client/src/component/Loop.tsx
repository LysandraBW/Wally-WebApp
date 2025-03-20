import { cubicBezier } from "motion";
import { useAnimate, useAnimation, motion } from "motion/react";
import { useEffect } from "react";

export default function Loop() {
    const [scope, animate] = useAnimate();

    const delay = (i: number) => {
        return 0;
        // if (i >= 1.00)
        //     i = 0.99
        // if (i <= -1.00)
        //     i = -0.99
        // return (0.5 * Math.pow(((1 - Math.pow(i, 2)) / 100), -0.5) * ((2 * i) / 100)) / 15;
    }

    const animation = async () => {
        for (let i = 0; i <= 1; i += 0.01) {
            const x = Math.pow(i, 0.5);
            const left = 25 * x;
            const top = -50 * (Math.sqrt((1 - Math.pow(x,2))/1)) - 50;
            console.log(top);
            await animate(scope.current, { left: `${left}vw`, top: `${top}px`, scale: 1 + x}, {duration: 0.01 + delay(i)});
        }
        for (let i = 1; i >= 0; i -= 0.01) {
            const x = Math.pow(i, 0.5);
            const left = 25 * x;
            const top = -50 * (1 - Math.sqrt((1 - Math.pow(x,2))/1));
            await animate(scope.current, { left: `${left}vw`, top: `${top}px`, scale: 2 + (1 - x)}, {duration: 0.01 + delay(i)});
        }
        for (let i = 0; i >= -1; i -= 0.01) {
            const x = -Math.pow(-i, 0.5);
            const left = 25 * x;
            const top = -50 * (1 - Math.sqrt((1 - Math.pow(x,2))/1));
            console.log(top);
            await animate(scope.current, { left: `${left}vw`, top: `${top}px`, scale: 3 + x}, {duration: 0.01 + delay(i)});
        }
        for (let i = -1; i <= 0; i += 0.01) {
            const x = -Math.pow(-i, 0.5);
            const left = 25 * x;
            const top =  -50 * (Math.sqrt((1 - Math.pow(x,2))/1)) - 50;
            console.log(top);
            await animate(scope.current, { left: `${left}vw`, top: `${top}px`, scale: 2 - (1 + x)}, {duration: 0.01 + delay(i)});
        }
        animation();
    }

    useEffect(() => {
        animation();
    }, []);

    return (
        <motion.div
            ref={scope}
            // animate={{ r: 10 }}
            className="relative w-10 h-10 bg-blue-600 rounded-full"  
            // initial={{ offsetDistance: "0%", scale: 2.5 }}
            // animate={{ offsetDistance: "100%", scale: 1 }}
            // transition={{duration: 4, yoyo: Infinity, ease: "easeInOut"}}  
            // onAnimationComplete={latest => console.log(latest.r)}
        >
            {/* <img className="grayscale h-10" src="./Chevrolet.png"/> */}
        </motion.div>
    )
}