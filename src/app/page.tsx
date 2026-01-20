"use client";
import CallToActionButton from "@/component/Button/CallToActionButton";
import PrimaryButton from "@/component/Button/PrimaryButton";
import SecondaryButton from "@/component/Button/SecondaryButton";
import Logo from "@/component/NavBar/Logo";
import { PAGE_LOOKUP_APPOINTMENT, PAGE_SCHEDULE_APPOINTMENT } from "@/utils/constants";
import { navigateToPage } from "@/utils/navigate";

export default function Page() {
	return (
		<div className="bg-base-0 flex flex-col justify-center items-center h-screen grow w-screen bg--[url('/pexels-karoldach-409701.jpg')] bg-cover bg-center w-screenmax-h-full max-w-full">
			<div className="flex flex-col w-full grow bg--black/90 backdrop--blur-md">
				<nav className="flex justify-between py-4 px-4 bg-base-0 backdrop-blur-md relative z-[100] bordr-b border--base-300 shadow">
					<Logo
						svgClassName="!stroke-yellow-400 !fill-yellow-400"
					/>
					<div className="flex gap-4">
						<SecondaryButton
							onClick={() => navigateToPage(PAGE_LOOKUP_APPOINTMENT)}
							className="text-xs"
						>
							Lookup
						</SecondaryButton>
						<PrimaryButton
							onClick={() => navigateToPage(PAGE_SCHEDULE_APPOINTMENT)}
							className="text-xs"
						>
							Schedule
						</PrimaryButton>
					</div>
				</nav>
				<div className="flex flex-col justify-center items-center flex-grow min-h-0 min-w-0 relative z-[100]">
					<div className="flex flex-col justify-center items-center flex-grow min-h-0 min-w-0 relative z-[100] p-4 w-[min(100%,750px)]">
						<h1 className="block mb-1 text-5xl text-base-900 bg-[url('/anton-danilov-oRMdbXZQu6Ansplash.jpg')] text-center font-semibold tracking-tight relative z-[100]">
							Your Local Mechanic
						</h1>
						<p className="block mb-6 text-base-700 text-center max-w-[400px]">
							Well. We don't have much else to say.<br/>But, if your vehicle is in need of repair, maybe give us a call.
						</p>
						<PrimaryButton
							className="relative z-[100] px-4"
							onClick={() => navigateToPage(PAGE_SCHEDULE_APPOINTMENT)}
						>
							Schedule Today
						</PrimaryButton>
					</div>
							
					{/* <img
						src="anton-danilov-oRMdbXZQu6A-unsplash.jpg"
						className="absolute top-0 left-0 h-screen w-screen bg-cover z-20"
					/> */}
				</div>
			</div>
		</div>
	)
}