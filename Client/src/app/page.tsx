"use client";
import Image from "next/image";
import NavBar from "@/component/NavBar/NavBar";
import { Inter } from "@/public/Font";

export default function Page() {
	const scale = 0.5;

	return (
		<>
			<NavBar sticky={false}/>
			<section className="h-[calc(100vh-54px)] bg-gray-100 relative flex flex-col justify-between">
				<div className="h-full flex justify-center items-center">
					<header className="flex flex-col justify-center items-center gap-4">
						<h1 className="text-center text-[4rem] text-black font-medium">Your Friendly Neighborhood<br/><span className="text-[4rem] text-blue-600 font-semibold relative after:absolute after:w-full after:bottom-0 after:left-0 after:h-1.5 after:bg-blue-800">Mechanic</span>.</h1>
						<p className="text-center text-[1.125rem] tracking-wide text-gray-500 max-w-[640px]">Fear not, for your friendly neighborhood mechanic is here. Whether it's your brakes, engine, or air conditioning (or anything really) giving you trouble, we are ready to service.</p>
						<button className="mt-4 text-center h-[2.625rem] px-[1.25rem] rounded-[0.5rem] bg-gradient-to-b from-blue-700 to-blue-700 text-gray-200 text-[1rem] text-shadow font-medium tracking-wide border-[1.25px] border-blue-800 shadow-[inset_0px_2px_0_0_#ffffff2b] hover:text-white transition-all">Request Appointment</button>
					</header>
				</div>
				<div className="flex flex-col items-center">
					<div className="w-full logos group relative overflow-hidden whitespace-nowrap relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-r after:from-gray-100 after:via-gray-100/0 after:to-gray-100">
						<div className="w-full slide-left group-hover:animation-pause inline-flex justify-around">
							<img className="inline h-10 w-10" src="Acura.svg"/>
							<img className="inline h-10 w-10" src="Audi.svg"/>
							<img className="inline h-10 w-10" src="BMW.svg"/>
							<img className="inline h-10 w-10" src="Chevrolet.svg"/>
							<img className="inline h-10 w-10" src="Ford.svg"/>
							<img className="inline h-10 w-10" src="GMC.svg"/>
							<img className="inline h-10 w-10" src="Honda.svg"/>
							<img className="inline h-10 w-10" src="Hyundai.svg"/>
							<img className="inline h-10 w-10" src="Infiniti.svg"/>
							<img className="inline h-10 w-10" src="Kia.svg"/>
							<img className="inline h-10 w-10" src="Mercedes.svg"/>
							<img className="inline h-10 w-10" src="Nissan.svg"/>
							<img className="inline h-10 w-10" src="Subaru.svg"/>
							<img className="inline h-10 w-10" src="Toyota.svg"/>
							<img className="inline h-10 w-10" src="Volkswagen.svg"/>
						</div>
						<div className="w-full slide-left group-hover:animation-pause inline-flex justify-around">
							<img className="inline h-10 w-10" src="Acura.svg"/>
							<img className="inline h-10 w-10" src="Audi.svg"/>
							<img className="inline h-10 w-10" src="BMW.svg"/>
							<img className="inline h-10 w-10" src="Chevrolet.svg"/>
							<img className="inline h-10 w-10" src="Ford.svg"/>
							<img className="inline h-10 w-10" src="GMC.svg"/>
							<img className="inline h-10 w-10" src="Honda.svg"/>
							<img className="inline h-10 w-10" src="Hyundai.svg"/>
							<img className="inline h-10 w-10" src="Infiniti.svg"/>
							<img className="inline h-10 w-10" src="Kia.svg"/>
							<img className="inline h-10 w-10" src="Mercedes.svg"/>
							<img className="inline h-10 w-10" src="Nissan.svg"/>
							<img className="inline h-10 w-10" src="Subaru.svg"/>
							<img className="inline h-10 w-10" src="Toyota.svg"/>
							<img className="inline h-10 w-10" src="Volkswagen.svg"/>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}