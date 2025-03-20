// import { stagger } from "motion";
import clsx from "clsx";
import { motion, stagger } from "motion/react";

export default function Header() {
    const text = "Experienced with both American and European vehicles.";

    return (
        <div className="bg-white/50 backdrop-blur flex flex-col justify-center h-full relative z-[7] px-8 border-l border-r border-l-gray-200 border-r-gray-200">
            <motion.div 
                className="flex gap-x-2 gap-y-1 h-min w-[640px] flex-wrap relative z-10 top-[-5rem]"
            >
                {text.split(" ").map((t, i) => (
                    <motion.span 
                        key={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.8 }}
                        variants={{
                            visible: {opacity: [0, 1], y: [10, 0] },
                            hidden: { opacity: 0, scale: 1 }
                        }}
                        transition={{
                            type: "spring",
                            duration: 2,
                            bounce: 0,
                            delay: 0.125 * (i + 1),
                        }}
                        style={{
                            lineHeight: "3rem"
                        }}
                        className={clsx("block text-[3rem] font-medium text-black","relative z-[100]")}
                    >
                        {t}
                    </motion.span>
                ))}        
            </motion.div>
        </div>
    )
}