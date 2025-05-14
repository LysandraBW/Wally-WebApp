"use client";

import { IBM, Instrumental } from "@/public/Font";
import Image from "next/image";
import { useEffect, useState } from "react";
import ConfettiGenerator from "confetti-js";
import ServiceCard from "@/pages/landing/ServiceCard";
import NavBar from "@/component/NavBar";
import StepCard from "@/pages/landing/StepCard";

export default function Page() {
	const [serviceType, setServiceType] = useState<"Mechanical"|"Electrical"|"Maintenance">("Mechanical");
	const [serviceColors] = useState<{[k: string]: "red"|"blue"|"yellow"}>({
		"Mechanical": "blue",
		"Electrical": "red",
		"Maintenance": "yellow"
	});
	const [services] = useState({
		"Mechanical": [
			{ "type": "Mechanical", "name": "Engine Repair", "low": "500", "high": "5000" },
            { "type": "Mechanical", "name": "Transmission Repair", "low": "800", "high": "6000" },
            { "type": "Mechanical", "name": "Brake Pad Replacement", "low": "150", "high": "500" },
            { "type": "Mechanical", "name": "Suspension Repair", "low": "300", "high": "2000" },
            { "type": "Mechanical", "name": "Steering System Repair", "low": "400", "high": "2500" },
            { "type": "Mechanical", "name": "Radiator Replacement", "low": "250", "high": "1500" },
            { "type": "Mechanical", "name": "Fuel System Cleaning", "low": "100", "high": "400" },
            { "type": "Mechanical", "name": "Timing Belt Replacement", "low": "300", "high": "1200" },
            { "type": "Mechanical", "name": "Exhaust System Repair", "low": "200", "high": "1500" }
		],
		"Electrical": [
			{ "type": "Electrical", "name": "Battery Replacement", "low": "100", "high": "300" },
            { "type": "Electrical", "name": "Alternator Repair", "low": "200", "high": "800" },
            { "type": "Electrical", "name": "Starter Motor Replacement", "low": "250", "high": "900" },
            { "type": "Electrical", "name": "Headlight Wiring Repair", "low": "75", "high": "300" },
            { "type": "Electrical", "name": "Power Window Motor Repair", "low": "150", "high": "500" },
            { "type": "Electrical", "name": "Ignition Coil Replacement", "low": "100", "high": "400" },
            { "type": "Electrical", "name": "Fuse Box Repair", "low": "80", "high": "350" },
            { "type": "Electrical", "name": "Sensor Replacement", "low": "120", "high": "600" },
            { "type": "Electrical", "name": "ECU Diagnostic & Repair", "low": "150", "high": "1000" }
		],
		"Maintenance": [
			{ "type": "Maintenance", "name": "Oil Change", "low": "40", "high": "150" },
            { "type": "Maintenance", "name": "Tire Rotation", "low": "30", "high": "100" },
            { "type": "Maintenance", "name": "Wheel Alignment", "low": "80", "high": "250" },
            { "type": "Maintenance", "name": "Brake Fluid Replacement", "low": "50", "high": "200" },
            { "type": "Maintenance", "name": "Coolant Flush", "low": "80", "high": "300" },
            { "type": "Maintenance", "name": "Transmission Fluid Change", "low": "100", "high": "500" },
            { "type": "Maintenance", "name": "Spark Plug Replacement", "low": "75", "high": "250" },
            { "type": "Maintenance", "name": "Air Filter Replacement", "low": "30", "high": "100" },
            { "type": "Maintenance", "name": "Drive Belt Replacement", "low": "100", "high": "400" }
		]
	});

	useEffect(() => {
		const confettiSettings = { 
			target: 'my-canvas',
			props: ['circle', 'square'],
			rotate: true,
			size: 1.8
		};
		const confetti = new ConfettiGenerator(confettiSettings);
		confetti.render();
	}, []);

	return (
		<>
			<NavBar
				sticky={false}
			/>
			<section className="snap-center snap-proximity grid grid-cols-[40%_60%] h-[calc(100vh-54px)]">
				<header className="p-12 border-t border-b-gray-200 flex flex-col gap-8 justify-center">
					<h1 className="leading-[4.5rem] whitespace-nowrap font-medium">The Local<br/>Mechanic</h1>
					<div>
						<div className={`block w-min p-1 px-2 pr-2.5 rounded-md border border-gray-300 border-solid ring-1.5 ring-gray-200 shadow-sm flex items-center gap-0.5`}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3.5 text-black stroke-black top-[-2px]">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
								<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
							</svg>
							<span className="whitespace-nowrap text-black font-medium text-xs tracking-wider">Orlando, FL</span>
						</div>
						<p className="mt-2 text-gray-600 max-w-[440px] tracking-wider">Whatever it may be, we will do our best to get your vehicle fixed. Start learning more about our business by clicking the button below.</p>
					</div>
					<button className="bg-black text-white px-4 py-2 rounded-md font-medium w-min whitespace-nowrap">Learn More</button>
				</header>
				<div className="bg-black grid grid-cols-2 bg-[url('../public/Sparks.jpg')] bg-cover bg-center"></div>
			</section>
			<section className="snap-center snap-proximity relative px-4 py-12 flex flex-col items-center gap-8 bg-white border-t border-t-gray-200">
				<p className="text-center text-black text-[1.25rem] font-medium">Experienced with both American and European vehicles.</p>
				<div className="">
					<div className="gap-6 flex items-center">
						{
							[
								{src: "/Audi.png", length: 136},
								{src: "/Benz.svg.png", length: 136},
								{src: "/BMW.png", length: 136},
								// {src: "/Ford4.png", length: 148},
								// {src: "/Honda.png", length: 136},
								// {src: "/Hyundai2.png", length: 136},
								{src: "/Kia3.png", length: 136},
								{src: "/Nissan.webp", length: 136},
								// {src: "/VK.png", length: 136},
								// {src: "/Toyota.png", length: 136}
							].map((img, i) => (
								<div key={i} className="bg-gray-100 w-[250px] h-[250px] rounded-full flex justify-center items-center hover:bg-white hover:scale-110 hover:border hover:border-gray-200 transition-all">
									<Image
										src={img.src}
										width={img.length}
										height={img.length}
										alt=""
									/>
								</div>
							))
						}
					</div>
				</div>
			</section>
			<section className="snap-center snap-proximity min-h-screen overflow-clip grid grid grid-rows-[auto_auto] grid-cols-3 relative border-b border-b-gray-200 border-t border-t-gray-200">
				{/* Top Left */}
				<div className="col-start-1 col-span-1">
					<StepCard
						addCubes={[true, true, false, true]}
						addBorders={[false, false, false, false]}
					/>
				</div>
				{/* Top Middle */}
				<div>
					<StepCard
						addCubes={[false, false, false, false]}
						addBorders={[false, true, false, true]}
					>
						<header className="pt-16">
							<h5 className="text-center font-normal text-sm tracking-wide font-medium text-gray-400">The Process</h5>
                    		<h3 className="text-center font-medium text-[3.5rem] leading-10 mt-1 text-black drop-shadow-sm">What To Expect<span className="text-[4rem] font-medium text-blue-700"></span></h3>
						</header>
					</StepCard>
				</div>
				{/* Top Right */}
				<div className="col-start-3 col-span-1">
					<StepCard
						addCubes={[true, true, true, false]}
						addBorders={[false, false, false, false]}
					/>
				</div>
                <div className="col-span-3 grid grid-rows-2 grid-cols-3 border-t border-t-gray-200 relative">
					<StepCard
						step={1}
						title="Schedule Appointment"
						paragraph="We will ask for your contact information, vehicle information, and the services you require. This process is short and can be completed online."
						addCubes={[false, false, false, false]}
						addBorders={[false, false, false, false]}
					/>
					<StepCard
						step={2}
						title="Receive Confirmation"
						paragraph="At the most, after one to two business days, we will call to confirm your appointment and discuss when you can bring in your vehicle."
						addCubes={[true, true, true, true]}
						addBorders={[false, true, false, true]}
					/>
					<StepCard
						step={3}
						title="Bring In Vehicle"
						paragraph="On the agreed date, you will bring in your vehicle, whether it be for the diagnostic or service. If you would like, you could stay in the waiting room."
						addCubes={[false, false, false, false]}
						addBorders={[false, false, false, false]}
					/>
					<StepCard
						step={4}
						title="Receive Service"
						paragraph="By this point, we will be working on your vehicle. The duration of this step depends on the service you are receiving. However, we work steadily fast!"
						addCubes={[true, false, false, true]}
						addBorders={[true, false, false, false]}
					/>
					<StepCard
						step={5}
						title="Pick Up Vehicle"
						paragraph="Woot woot! Your vehicle has been serviced and will be ready for pick-up. Not only do we accept both cash and credit for payment, but we also offer installments."
						addCubes={[false, false, true, true]}
						addBorders={[true, true, false, true]}
					/>
					<StepCard
						step={6}
						title="Done"
						paragraph="You can now drive off into the distance satisfied with your serviced vehicle. Thanks for choosing us at Waltronics!"
						addCubes={[false, true, true, false]}
						addBorders={[true, false, false, false]}
						isFinal={true}
					/>
                </div>
            </section>
			<section className="snap-center snap-proximity min-h-screen max-h-screen h-screen overflow-clip grid grid-cols-[60%_40%] relative">
				<div className="grid grid-rows-3 grid-cols-3 gap-8 p-8 relative">
					{services[serviceType].map((service, i) => (
						<div key={i}>
							<ServiceCard
								low={service.low}
								type={service.type}
								name={service.name}
								high={service.high}
								index={i}
								color={serviceColors[serviceType]}
							/>
						</div>
					))}
				</div>
				<header className="flex flex-col w-full justify-center items-center p-8">
					<h3 className="font-medium">We Have Many Services</h3>
					<p className="tracking-wide max-w-[440px] text-center">See some of the services we offer in the categories above by clicking the buttons below. If you're not sure whether we'll be able to do a job, call us!</p>
					<div className="flex flex-wrap gap-4 mt-4">
						<button onClick={() => setServiceType("Electrical")} className="transition-all hover:bg-red-500 hover:border-transparent hover:text-white group flex items-center gap-1 w-min p-1 px-2 rounded-md border border-gray-200 shadow-sm text-xs"><div className="w-1 h-1 bg-red-500 rounded-full transition-all group-hover:bg-white"></div>Electrical</button>
						<button onClick={() => setServiceType("Mechanical")} className="transition-all hover:bg-blue-500 hover:border-transparent hover:text-white group flex items-center gap-1 w-min p-1 px-2 rounded-md border border-gray-200 shadow-sm text-xs"><div className="w-1 h-1 bg-blue-500 rounded-full transition-all group-hover:bg-white"></div>Mechanical</button>
						<button onClick={() => setServiceType("Maintenance")} className="transition-all hover:bg-yellow-500 hover:border-transparent hover:text-white group flex items-center gap-1 w-min p-1 px-2 rounded-md border border-gray-200 shadow-sm text-xs"><div className="w-1 h-1 bg-yellow-500 rounded-full transition-all group-hover:bg-white"></div>Maintenance</button>
					</div>
				</header>
			</section>
			<section className="snap-center min-h-screen max-h-screen h-screen grid grid-rows-4 grid-cols-5 gap-4 p-8 relative">
				<header className="row-start-1 col-start-1 col-span-3 flex flex-col self-center justify-self-center">
                    <h3 className="text-center font-medium text-[3.5rem] text-black">But, Why <span className="text-[3.5rem] font-medium text-black">Waltronics</span>?</h3>
				</header>
				<div className="row-start-2 row-span-2 col-start-1 col-span=1 bg-white ring-0 ring-gray-50 p-4 rounded-none border border-gray-200 border-solid shadow-sm relative hover:-translate-y-1 transition-all">
					<h6 className="font-medium mb-1">Transparency</h6>
					<p className="tracking-wide">At Waltronics, we tell you the honest truth upfront. We want you to be able to make the decision that's right for you.</p>
				</div>
				<div className="row-start-2 row-span-2 col-start-2 col-span=1 bg-white ring-0 ring-gray-50 p-4 rounded-none border border-gray-200 border-solid shadow-sm relative hover:-translate-y-1 transition-all">
					<h6 className="font-medium mb-1">Local Business</h6>
					<p className="tracking-wide">We can provide you much more attention and care than a dealership who prioritizes profit over the wellbeing of their customers.</p>
				</div>
				<div className="row-start-2 row-span-2 col-start-3 col-span=1 bg-white ring-0 ring-gray-50 p-4 rounded-none border border-gray-200 border-solid shadow-sm relative hover:-translate-y-1 transition-all">
					<h6 className="font-medium mb-1">Skilled Hands</h6>
					<p className="tracking-wide">Our mechanics have worked on a variety of vehicles for decades. We are certified and prepared to conquer any issue.</p>
				</div>
				<div className="row-start-4 row-span-1 col-start-1 col-span-3 bg-white ring-0 ring-gray-50 p-4 rounded-none border border-gray-200 border-solid shadow-sm relative hover:-translate-y-1 transition-all">
					<h6 className="font-medium mb-1">Quality Control</h6>
					<p className="tracking-wide">It is one of our upmost priorities to ensure that your vehicle is serviced well. As a result, we extensively test and examine our repairs and services to keep you safe and happy.</p>
				</div>
				<div className="row-start-1 row-span-2 col-start-4 col-span=1">
					<Image
						width={500}
						height={500}
						src="/hands_sparks.jpg"
						alt=""
						className="w-full h-full object-cover rounded-none"
					/>
				</div>
				<div className="row-start-3 row-span-2 col-start-4 col-span=1">
					<Image
						width={500}
						height={500}
						src="/hands_oil.jpg"
						alt=""
						className="w-full h-full object-cover rounded-none"
					/>
				</div>
				<div className="row-start-1 row-span-4 col-start-5 col-span=1">
					<Image
						width={500}
						height={500}
						src="/local.jpg"
						alt=""
						className="w-full h-full object-cover rounded-none"
					/>
				</div>
			</section>
			<section className="snap-center grid grid-cols-2 p-8 py-16 bg-black">
				<div className="border-r border-r-white/10">
					<h2 className="font-medium text-white text-left">So, Let Us Help.</h2>
					<div className="flex gap-4 mt-2">
						<div className="flex items-center gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3 text-white stroke-gray-500">
								<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
							</svg>
							<span className="block text-white font-medium relative text-xs top-[0px] tracking-wide">000-000-0000</span>
						</div>
						<div className="flex items-center gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3 stroke-gray-500">
								<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
							</svg>
							<span className="block text-white font-medium relative text-xs top-[0px] tracking-wide">123 Happy Street</span>
						</div>
					</div>
				</div>
				<div className="mx-4">
					<p className="max-w-[440px] text-gray-500 tracking-wider text-sm text-white text-left">You can start by scheduling your appointment today. If you have any questions, please call us at 000-000-0000.</p>
					<button className="mt-4 py-2 px-4 rounded-lg text-black font-medium shadow bg-white">Schedule Appointment</button>
				</div>
			</section>
			<footer className="bg-black">
				<div className="py-4 px-1 border-t border-t-white/10 mx-8">
					<span className="block text-center text-xs text-white font-medium">© Waltronics 2025. All rights reserved.</span>
				</div>
			</footer>
		</>
	)
}