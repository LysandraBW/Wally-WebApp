"use client";

import useInterval from "@/features/Alert/useInterval";
import { IBM } from "@/public/Font";
import ConfettiGenerator from "confetti-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react"
import ServiceCard from "@/component/ServiceCard";
import Loop from "@/component/Loop";
import Loop2 from "@/component/Loop2";
import Header from "@/component/Header";

export default function Default() {
	const [index, setIndex] = useState(0);

	const [images, setImages] = useState(["/BMW.png", "/Benz.svg.png", "./Ford.webp", "./Hona.png", "/BMW.png", "/Benz.svg.png", "./Ford.webp", "./Hona.png", "./Nissan.webp", "./Toyota.png", "./kia.png", "./Hyundai.png", "./vk.png"]);

	const [services, setServices] = useState(
		[
			{ "type": "Electrical", "name": "Battery Replacement", "low": "100", "high": "300" },
			{ "type": "Electrical", "name": "Alternator Repair", "low": "200", "high": "800" },
			{ "type": "Electrical", "name": "Starter Motor Replacement", "low": "250", "high": "900" },
			{ "type": "Electrical", "name": "Headlight Wiring Repair", "low": "75", "high": "300" },
			{ "type": "Electrical", "name": "Power Window Motor Repair", "low": "150", "high": "500" },
			{ "type": "Electrical", "name": "Ignition Coil Replacement", "low": "100", "high": "400" },
			{ "type": "Electrical", "name": "Fuse Box Repair", "low": "80", "high": "350" },
			{ "type": "Electrical", "name": "Sensor Replacement", "low": "120", "high": "600" },
			{ "type": "Electrical", "name": "ECU Diagnostic & Repair", "low": "150", "high": "1000" },
			{ "type": "Electrical", "name": "Interior Light Repair", "low": "50", "high": "200" },
			{ "type": "Mechanical", "name": "Engine Repair", "low": "500", "high": "5000" },
			{ "type": "Mechanical", "name": "Transmission Repair", "low": "800", "high": "6000" },
			{ "type": "Mechanical", "name": "Brake Pad Replacement", "low": "150", "high": "500" },
			{ "type": "Mechanical", "name": "Suspension Repair", "low": "300", "high": "2000" },
			{ "type": "Mechanical", "name": "Steering System Repair", "low": "400", "high": "2500" },
			{ "type": "Mechanical", "name": "Radiator Replacement", "low": "250", "high": "1500" },
			{ "type": "Mechanical", "name": "Fuel System Cleaning", "low": "100", "high": "400" },
			{ "type": "Mechanical", "name": "Timing Belt Replacement", "low": "300", "high": "1200" },
			{ "type": "Mechanical", "name": "Exhaust System Repair", "low": "200", "high": "1500" },
			{ "type": "Mechanical", "name": "Wheel Bearing Replacement", "low": "250", "high": "800" },
			{ "type": "Exterior Cleaning", "name": "Hand Wash & Wax", "low": "30", "high": "150" },
			{ "type": "Exterior Cleaning", "name": "Clay Bar Treatment", "low": "50", "high": "200" },
			{ "type": "Exterior Cleaning", "name": "Ceramic Coating", "low": "300", "high": "1500" },
			{ "type": "Exterior Cleaning", "name": "Paint Protection Film", "low": "500", "high": "2500" },
			{ "type": "Exterior Cleaning", "name": "Wheel & Tire Cleaning", "low": "40", "high": "120" },
			{ "type": "Exterior Cleaning", "name": "Headlight Restoration", "low": "50", "high": "180" },
			{ "type": "Exterior Cleaning", "name": "Undercarriage Wash", "low": "50", "high": "200" },
			{ "type": "Exterior Cleaning", "name": "Glass Polishing & Treatment", "low": "50", "high": "200" },
			{ "type": "Exterior Cleaning", "name": "Bug & Tar Removal", "low": "30", "high": "100" },
			{ "type": "Exterior Cleaning", "name": "Engine Bay Cleaning", "low": "75", "high": "250" },
			{ "type": "Interior Cleaning", "name": "Vacuuming & Dusting", "low": "30", "high": "100" },
			{ "type": "Interior Cleaning", "name": "Steam Cleaning Seats & Carpets", "low": "80", "high": "250" },
			{ "type": "Interior Cleaning", "name": "Leather Seat Conditioning", "low": "50", "high": "200" },
			{ "type": "Interior Cleaning", "name": "Odor Removal Treatment", "low": "40", "high": "180" },
			{ "type": "Interior Cleaning", "name": "Dashboard & Console Detailing", "low": "50", "high": "150" },
			{ "type": "Interior Cleaning", "name": "Headliner Cleaning", "low": "50", "high": "180" },
			{ "type": "Interior Cleaning", "name": "Pet Hair Removal", "low": "40", "high": "150" },
			{ "type": "Interior Cleaning", "name": "Fabric Stain Removal", "low": "50", "high": "200" },
			{ "type": "Interior Cleaning", "name": "Door Panel & Trim Cleaning", "low": "40", "high": "150" },
			{ "type": "Interior Cleaning", "name": "Seatbelt Cleaning & Disinfection", "low": "30", "high": "120" },
			{ "type": "Maintenance", "name": "Oil Change", "low": "40", "high": "150" },
			{ "type": "Maintenance", "name": "Tire Rotation", "low": "30", "high": "100" },
			{ "type": "Maintenance", "name": "Wheel Alignment", "low": "80", "high": "250" },
			{ "type": "Maintenance", "name": "Brake Fluid Replacement", "low": "50", "high": "200" },
			{ "type": "Maintenance", "name": "Coolant Flush", "low": "80", "high": "300" },
			{ "type": "Maintenance", "name": "Transmission Fluid Change", "low": "100", "high": "500" },
			{ "type": "Maintenance", "name": "Spark Plug Replacement", "low": "75", "high": "250" },
			{ "type": "Maintenance", "name": "Air Filter Replacement", "low": "30", "high": "100" },
			{ "type": "Maintenance", "name": "Drive Belt Replacement", "low": "100", "high": "400" },
			{ "type": "Maintenance", "name": "Battery Terminal Cleaning", "low": "30", "high": "120" }
		]		
	);

	const [nextServices, setNextServices] = useState(
		[
			{ "type": "Electrical", "name": "Battery Replacement", "low": "100", "high": "300" },
			{ "type": "Electrical", "name": "Alternator Repair", "low": "200", "high": "800" },
			{ "type": "Electrical", "name": "Starter Motor Replacement", "low": "250", "high": "900" },
			{ "type": "Electrical", "name": "Headlight Wiring Repair", "low": "75", "high": "300" },
			{ "type": "Electrical", "name": "Power Window Motor Repair", "low": "150", "high": "500" },
			{ "type": "Electrical", "name": "Ignition Coil Replacement", "low": "100", "high": "400" },
			{ "type": "Electrical", "name": "Fuse Box Repair", "low": "80", "high": "350" },
			{ "type": "Electrical", "name": "Sensor Replacement", "low": "120", "high": "600" },
			{ "type": "Electrical", "name": "ECU Diagnostic & Repair", "low": "150", "high": "1000" },
			{ "type": "Electrical", "name": "Interior Light Repair", "low": "50", "high": "200" },
			{ "type": "Mechanical", "name": "Engine Repair", "low": "500", "high": "5000" },
			{ "type": "Mechanical", "name": "Transmission Repair", "low": "800", "high": "6000" },
			{ "type": "Mechanical", "name": "Brake Pad Replacement", "low": "150", "high": "500" },
			{ "type": "Mechanical", "name": "Suspension Repair", "low": "300", "high": "2000" },
			{ "type": "Mechanical", "name": "Steering System Repair", "low": "400", "high": "2500" },
			{ "type": "Mechanical", "name": "Radiator Replacement", "low": "250", "high": "1500" },
			{ "type": "Mechanical", "name": "Fuel System Cleaning", "low": "100", "high": "400" },
			{ "type": "Mechanical", "name": "Timing Belt Replacement", "low": "300", "high": "1200" },
			{ "type": "Mechanical", "name": "Exhaust System Repair", "low": "200", "high": "1500" },
			{ "type": "Mechanical", "name": "Wheel Bearing Replacement", "low": "250", "high": "800" },
			{ "type": "Exterior Cleaning", "name": "Hand Wash & Wax", "low": "30", "high": "150" },
			{ "type": "Exterior Cleaning", "name": "Clay Bar Treatment", "low": "50", "high": "200" },
			{ "type": "Exterior Cleaning", "name": "Ceramic Coating", "low": "300", "high": "1500" },
			{ "type": "Exterior Cleaning", "name": "Paint Protection Film", "low": "500", "high": "2500" },
			{ "type": "Exterior Cleaning", "name": "Wheel & Tire Cleaning", "low": "40", "high": "120" },
			{ "type": "Exterior Cleaning", "name": "Headlight Restoration", "low": "50", "high": "180" },
			{ "type": "Exterior Cleaning", "name": "Undercarriage Wash", "low": "50", "high": "200" },
			{ "type": "Exterior Cleaning", "name": "Glass Polishing & Treatment", "low": "50", "high": "200" },
			{ "type": "Exterior Cleaning", "name": "Bug & Tar Removal", "low": "30", "high": "100" },
			{ "type": "Exterior Cleaning", "name": "Engine Bay Cleaning", "low": "75", "high": "250" },
			{ "type": "Interior Cleaning", "name": "Vacuuming & Dusting", "low": "30", "high": "100" },
			{ "type": "Interior Cleaning", "name": "Steam Cleaning Seats & Carpets", "low": "80", "high": "250" },
			{ "type": "Interior Cleaning", "name": "Leather Seat Conditioning", "low": "50", "high": "200" },
			{ "type": "Interior Cleaning", "name": "Odor Removal Treatment", "low": "40", "high": "180" },
			{ "type": "Interior Cleaning", "name": "Dashboard & Console Detailing", "low": "50", "high": "150" },
			{ "type": "Interior Cleaning", "name": "Headliner Cleaning", "low": "50", "high": "180" },
			{ "type": "Interior Cleaning", "name": "Pet Hair Removal", "low": "40", "high": "150" },
			{ "type": "Interior Cleaning", "name": "Fabric Stain Removal", "low": "50", "high": "200" },
			{ "type": "Interior Cleaning", "name": "Door Panel & Trim Cleaning", "low": "40", "high": "150" },
			{ "type": "Interior Cleaning", "name": "Seatbelt Cleaning & Disinfection", "low": "30", "high": "120" },
			{ "type": "Maintenance", "name": "Oil Change", "low": "40", "high": "150" },
			{ "type": "Maintenance", "name": "Tire Rotation", "low": "30", "high": "100" },
			{ "type": "Maintenance", "name": "Wheel Alignment", "low": "80", "high": "250" },
			{ "type": "Maintenance", "name": "Brake Fluid Replacement", "low": "50", "high": "200" },
			{ "type": "Maintenance", "name": "Coolant Flush", "low": "80", "high": "300" },
			{ "type": "Maintenance", "name": "Transmission Fluid Change", "low": "100", "high": "500" },
			{ "type": "Maintenance", "name": "Spark Plug Replacement", "low": "75", "high": "250" },
			{ "type": "Maintenance", "name": "Air Filter Replacement", "low": "30", "high": "100" },
			{ "type": "Maintenance", "name": "Drive Belt Replacement", "low": "100", "high": "400" },
			{ "type": "Maintenance", "name": "Battery Terminal Cleaning", "low": "30", "high": "120" }
		]		
	);


	useInterval(() => {
		// Got this off a Stackoverflow forum,
		// not that I couldn't think of it myself,
		// just on a time crunch.
		function shuffle(array: Array<any>) {
			let currentIndex = array.length;
		  
			// While there remain elements to shuffle...
			while (currentIndex != 0) {
		  
			  // Pick a remaining element...
			  let randomIndex = Math.floor(Math.random() * currentIndex);
			  currentIndex--;
		  
			  // And swap it with the current element.
			  [array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
			}
		  }
		const a = [...services];
		shuffle(a);
		setServices(nextServices);
		setNextServices(a);
		setIndex(index + 1);
	}, 5000);

	useEffect(() => {
		const confettiSettings = { 
			target: 'my-canvas',
			props: ['circle', 'square'],
			rotate: true,
			size: 1.8
		};
		const confetti = new ConfettiGenerator(confettiSettings);
		confetti.render();
		// confetti.clear();
	}, []);

	const variants = {
		hidden: {opacity: 0},
		visible: {
			opacity: 1,
			transition: {
				duration: 4,
				staggerChildren: 0.5
			}
		}
	}

	return (
		<>
			<section className="min-h-screen h-screen max-h-screen p-4 snap-center shadow-none bg-gray-50 grid grid-rows-[min-content_auto]">
				<nav className="h-min flex justify-between items-center border border-gray-200 px-4 py-2 !pr-2 bg-white mb-4 rounded-2xl shadow-sm">
					<div>
						<a href="/" className="flex gap-1 items-center">
							<div className="bg-transparent text-black stroke-black">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
									<path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
								</svg>
							</div>
							<span className={`text-black text-base ${IBM.className} tracking-tight`}>WALTRONICS</span>
						</a>
					</div>
					<div className="flex gap-2">
						<a href="/lookup" className={`bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-black text-sm tracking-wide font-[400] text-black`}>Lookup</a>
						<a href="/schedule" className={`bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-black text-sm tracking-wide font-[400] text-black`}>Schedule</a>
					</div>
				</nav>
				<div className="flex flex-col justify-end h-full w-full bg-black bg-[url('./gorl.jpg')] bg-center bg-cover bg-no-repeat rounded-2xl">
					<header className="flex flex-col justify-end w-min relative p-8">
						<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 to-white/10 backdrop-blur border border-white/10 rounded-tr-[9999px] rounded-bl-[24rem]"></div>
						<h1 className="mb-8 relative left-[-4px] text-white text-[6rem] font-medium tracking-tight leading-[6rem]">The.<br/>Mechanic.</h1>
						<div className="flex flex-col gap-2 mb-4 relative z-10">
							<span className="flex gap-1 items-center">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="size-4 stroke-white text-white">
									<path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
								</svg>
								<span className="relative top-[0.5px] text-white text-sm font-medium text-gray-50">Kissimmee, FL</span>
							</span>
							<p className="text-white text-[1.125rem] max-w-[440px]">Our business model is simple. You have places to be and we help you get there.</p>
						</div>
						<button className="relative z-10 bg-white text-black px-6 py-2 rounded-lg border border-gray-200 font-medium text-base w-min whitespace-nowrap">Get Started</button>
					</header>
				</div>
			</section>
			<section className="min-h-screen snap-start bg-gray-50 grid grid-rows-[min-content_auto] relative">
				<header className="p-8">
					<h5 className="text-center font-normal text-[1.5rem]">The Process</h5>
					<h3 className="text-center font-medium text-[3.5rem] text-black drop-shadow-sm">What To Expect<span className="text-[4rem] font-medium text-blue-700"></span></h3>
				</header>
				<div className="grid grid-rows-2 grid-cols-3 border-t border-t-gray-200 relative">
					<div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-white/0 from-90% to-white"></div>
					<div className="p-8 flex flex-col gap-2 bg-white border-r border-r-gray-200 border-b border-b-gray-200 relative">
						<div>
							<h5 className="text-base font-medium text-black mb-4">01</h5>
							<h4 className="text-2xl font-medium text-black">Schedule Appointment</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className="absolute top-[calc(100%-15px)] left-[calc(100%-15px)] w-[30px] h-[30px] bg-white rounded-full border border-gray-200 shadow-sm z-10"></div>
					</div>
					<div className="p-8 flex flex-col gap-2 bg-white border-r border-r-gray-200 border-b border-b-gray-200 relative">
						<div>
							<h5 className="text-base font-medium text-black mb-4">02</h5>
							<h4 className="text-2xl font-medium text-black">Wait for Confirmation</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className="absolute top-[calc(100%-15px)] left-[calc(100%-15px)] w-[30px] h-[30px] bg-white rounded-full border border-gray-200 shadow-sm z-10"></div>
					</div>
					<div className="p-8 flex flex-col gap-2 bg-white">
						<div>
							<h5 className="text-base font-medium text-black mb-4">03</h5>
							<h4 className="text-2xl font-medium text-black">Bring in Vehicle</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-2 bg-white border-r border-r-gray-200">
						<div>
							<h5 className="text-base font-medium text-black mb-4">04</h5>
							<h4 className="text-2xl font-medium text-black">Get Service</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-2 bg-white">
						<div>
							<h5 className="text-base font-medium text-black mb-4">05</h5>
							<h4 className="text-2xl font-medium text-black">Pick Up Vehicle</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-2 bg-black relative inset-shadow-sm">
						<canvas className="absolute w-full h-full top-0 left-0" id="my-canvas"></canvas>
						<div>
							<h5 className="text-base font-medium text-white mb-4">06</h5>
							{/* <h5 className="text-base font-medium text-white mb-2 bg-blue-500 border border-blue-400 w-8 h-8 text-center rounded flex justify-center items-center shadow">6</h5> */}
							<h4 className="text-2xl font-medium text-white">Done!</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="min-h-screen snap-start bg-white grid grid-cols-[60%_40%] relative">
				<div className="grid grid-rows-4 grid-cols-3 gap-2 p-2 relative">
					{[...Array(12).keys()].map((i) => (
						<div key={i}>
							<ServiceCard
								type={services[i].type}
								name={services[i].name}
								low={services[i].low}
								high={services[i].high}
								nextType={nextServices[i].type}
								nextName={nextServices[i].name}
								nextLow={nextServices[i].low}
								nextHigh={nextServices[i].high}
								repeatDelay={i /3}
								index={index}
							/>
						</div>
					))}
					<div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-white via-white/0 to-white"></div>
				</div>
				<header className="text-center flex w-full justify-center items-center bg-white p-16">
					<h3 className="text-center font-medium text-[3.5rem] text-black">There's also the wide range of services we offer.</h3>
				</header>
			</section>
			<section className="flex flex-col justify-center items-center snap-center h-screen relative">
				{/* <header className="text-center w-min top-[-6rem] relative">
					<h5 className="text-center text-[3rem] font-medium whitespace-nowrap text-gray-800 relative z-[7]">Experienced with many vehicles,<br/>both American and European.</h5>
				</header> */}
				<Header/>
				<motion.div className="absolute flex items-self-center justify-self-center w-full h-full top-[5rem]"
				
				>
					{images.map((src, i)=> (
						<motion.div key={i} className="absolute w-10 h-10 top-[calc(50%-1.25rem)] left-[calc(50%-1.25rem)]">
							<Loop2
								length={images.length}
								src={src}
								delay={i}
							/>
						</motion.div>
					))}
				</motion.div>
			</section>
			<section className="min-h-screen snap-start bg-white pb-8 relative">
				<div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-white/0 to-white from-90%"></div>
				<header className="p-8 sticky top-0 bg-white mb-8 relative z-[100]">
					<h5 className="text-center text-[2rem]">The Benefits</h5>
					<h3 className="text-center font-medium text-[4rem]">Why Us?</h3>
				</header>
				<motion.div 
					className="flex flex-col items-center gap-4"
					variants={{
						hidden: {opacity: 0},
						show: {
							opacity: 1,
							transition: {
								// when: "beforeChildren",
								staggerChildren: 0
							}
						}
					}}
					initial="hidden"
					whileInView="show"
					// viewport={{ amount: 0.8 }}
				>
					<motion.div 
						className="bg-gray-50 p-8 shadow-sm border border-gray-200 rounded-lg relative"
						variants={{
							hidden: {
								opacity: 0,
								x: "-100%"
							},
							show: {
								opacity: 1,
								x: 0,
								transition: {
									duration: 0.5,
									delay: 0
								}
							}
						}}
					>
						<div className="text-center">
							<h4 className="text-4xl font-medium mb-4">You're in Control</h4>
							<p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</motion.div>
					<motion.div 
						className="bg-white p-8 shadow-sm border border-gray-200 rounded-lg"
						variants={{
							hidden: {
								opacity: 0,
								x: "-100%"
							},
							show: {
								opacity: 1,
								x: 0,
								transition: {
									duration: 0.5,
									delay: 0.25
								}
							}
						}}
					>
						<div className="text-center">
							<h4 className="text-4xl font-medium mb-4">Skilled Hands</h4>
							<p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</motion.div>
					<motion.div 
						className="bg-gray-50 p-8 shadow-sm border border-gray-200 rounded-lg"
						variants={{
							hidden: {
								opacity: 0,
								x: "-100%"
							},
							show: {
								opacity: 1,
								x: 0,
								transition: {
									duration: 0.5,
									delay: 0.5
								}
							}
						}}
					>
						<div className="text-center">
							<h4 className="text-4xl font-medium mb-4">Transparency</h4>
							<p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</motion.div>
					<motion.div 
						className="bg-white p-8 shadow-sm border border-gray-200 rounded-lg"
						variants={{
							hidden: {
								opacity: 0,
								x: "-100%"
							},
							show: {
								opacity: 1,
								x: 0,
								transition: {
									duration: 0.5,
									delay: 0.75
								}
							}
						}}
					>
						<div className="text-center">
							<h4 className="text-4xl font-medium mb-4">Local Business</h4>
							<p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</motion.div>
				</motion.div>
			</section>
			<section className="min-h-screen h-screen grid grid-cols-2 justify-between snap-start gap-8 overflow-x-clip">
				<header className="flex flex-col justify-center items-center px-8">
					<h3 className="text-center font-medium text-[4rem] whitespace-nowrap">So,<br/>Let Us Help.</h3>
					<p className="text-center text-[1.125rem] max-w-[440px] mb-8">Schedule an appointment with us today so that you can get to where you're going.</p>
					<a href="/schedule"><button className="hover:shadow-none px-6 py-2 bg-white border border-gray-200 text-black text-base font-medium rounded-lg hover:bg-gradient-to-b hover:from-black hover:to-black transition hover:text-white hover:border-black">Get Started</button></a>
				</header>
				<img className="h-full object-cover" src="./bawp-65-media-hd.jpg.asset.1722429777125.webp"/>
				{/* <div className="flex max-w-screen justify-center gap-4 h-[300px] overflow-x-clip">
					<img className=" min-w-[60vw] object-cover object-left" src="./bawp-65-media-hd.jpg.asset.1722429777125.webp"/>
					<img className=" min-w-[60vw] object-cover object-center" src="./bawp-65-media-hd.jpg.asset.1722429777125.webp"/>
					<img className=" min-w-[60vw] object-cover object-right" src="./bawp-65-media-hd.jpg.asset.1722429777125.webp"/>
				</div> */}
			</section>
		</>
	)
}