"use client";
import clsx from "clsx";
import { Instrumental } from "@/public/Font";
import { HREF_SCHEDULE } from "@/utils/constants";
import NavBarLanding from "@/component/NavBar/NavBarLanding";

export default function Page() {
	return (
		<div className="bg-black flex flex-col grow w-screen">		
			<NavBarLanding/>
			<section className="grow flex flex-col items-center justify-center w-full h-full">
				<div className="grid grid-cols-1 grid-rows-[auto_auto] w-full h-full grow p-4 pb-0 gap-4">
					<header className="flex flex-col items-center justify-center gap-4 max-md:px-8">
						<h1 
							className={clsx(
								"text-6xl text-gray-200 text-center",
								"font-normal tracking-tight leading-[4rem]"
							)}
						>
							Running Rough?<br/>
							We'll Get You <span className="tracking-tight text-blue-600 text-6xl">Rolling</span>.
						</h1>
						<p 
							className={clsx(
								"max-w-[600px]",
								"leading-[1.5rem] text-gray-400 text-[1rem] tracking-wide text-center", 
								Instrumental.className
							)}
						>
							We're all about honest repairs, fair prices, and fast turnarounds 
							— no upsells, no gimmicks. 
							Just real service you can trust, from people who actually care.
						</p>
						<a 
							href={HREF_SCHEDULE}
							className={clsx(
								"w-min px-4 py-2 mt-4",
								"bg-blue-600",
								"border border-blue-500 rounded-lg",
								"text-[1rem] text-white font-medium whitespace-nowrap",
								"shadow-[#193cb8_0px_2px_0px_0px]",
								"cursor-pointer hover:bg-blue-700 transition-all",
							)}
						>
							Schedule Appointment
						</a>
					</header>
					<div 
						style={{backgroundImage: "url('../pexels-thanks-394797.jpg')"}} 
						className={clsx(
							"w-[75%] h-full min-h-10 m-auto",
							"relative z-20",
							"flex",
							"bg-cover bg-top",
							"rounded-t-3xl "
						)}
					/>
				</div>
			</section>
		</div>
	)
}