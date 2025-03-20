"use client";

import { IBM } from "@/public/Font";
import ConfettiGenerator from "confetti-js";
import Image from "next/image";
import { useEffect } from "react";

export default function Default() {
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

	return (
		<>
			<section className="min-h-screen h-screen p-4 snap-center">
				<div className="grid grid-rows-[auto_auto] rounded-2xl h-full w-full bg-black bg-[url('./okk.jpg')] bg-center bg-cover bg-no-repeat">
					<nav className="flex justify-between items-center px-4 py-2 bg-white/100 m-4 rounded-xl shadow-sm backdrop-blur-sm">
						<div>
							<a href="/" className="flex gap-2 items-center">
								<div className="h-6 w-6 bg-transparent border border-black"></div>
								<span className={`text-black ${IBM.className} tracking-tight  text-lg`}>WALTRONICS</span>
							</a>
						</div>
						<div className="flex gap-8">
							<a href="/lookup" className="text-black text-sm tracking-wide">Lookup</a>
							<a href="/schedule" className="text-black text-sm tracking-wide">Schedule</a>
						</div>
					</nav>
					<div className="flex items-end p-16">
						<header>
							<h1 className="text-white text-[6rem] font-medium tracking-tighter">The<br/>Mechanic.</h1>
							<p className="text-white text-lg max-w-[440px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
						</header>
					</div>
				</div>
			</section>
			<section className="min-h-screen snap-start bg-white grid grid-rows-[min-content_auto]">
				<header className="p-8">
					<h5 className="text-center text-[2rem]">The Process</h5>
					<h3 className="text-center font-medium text-[4rem]">How it Works</h3>
				</header>
				<div className="grid grid-rows-2 grid-cols-3">
					<div className="p-8 flex flex-col gap-4 bg-gray-100">
						<div>
							<h5 className="text-base font-medium text-gray-500 mb-2 bg-gray-200 w-8 h-8 text-center rounded flex justify-center items-center">1</h5>
							<h4 className="text-3xl font-medium">Schedule Appointment</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-4 bg-white">
						<div>
							<h5 className="text-base font-medium text-gray-500 mb-2 border border-gray-200 w-8 h-8 text-center rounded flex justify-center items-center">2</h5>
							<h4 className="text-3xl font-medium">Schedule Appointment</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-4 bg-gray-100">
						<div>
							<h5 className="text-base font-medium text-gray-500 mb-2 bg-gray-200 w-8 h-8 text-center rounded flex justify-center items-center">3</h5>
							<h4 className="text-3xl font-medium">Schedule Appointment</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-4 bg-white">
						<div>
							<h5 className="text-base font-medium text-gray-500 mb-2 border border-gray-200 w-8 h-8 text-center rounded flex justify-center items-center">4</h5>
							<h4 className="text-3xl font-medium">Schedule Appointment</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-4 bg-gray-100">
						<div>
							<h5 className="text-base font-medium text-gray-500 mb-2 bg-gray-200 w-8 h-8 text-center rounded flex justify-center items-center">5</h5>
							<h4 className="text-3xl font-medium">Schedule Appointment</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-4 bg-blue-800 relative">
						<canvas className="absolute w-full h-full top-0 left-0" id="my-canvas"></canvas>
						<div>
							<h5 className="text-base font-medium text-white mb-2 bg-blue-600 border border-blue-600 w-8 h-8 text-center rounded flex justify-center items-center">6</h5>
							<h4 className="text-3xl font-medium text-white">Done!</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="min-h-screen snap-start bg-white grid grid-cols-2">
				<div className="border-r border-r-gray-200 grid grid-rows-4 grid-cols-3 gap-2 p-2 relative">
					<div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-white via-white/0 to-white"></div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-green-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
				</div>
				<header className="text-center flex justify-self-center items-center">
					<h3 className="text-center font-medium text-[4rem]">Heaps<br/>of<br/>Services</h3>
					{/* <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p> */}
				</header>
			</section>
			<section className="min-h-screen snap-center">
				<header>
					<p>And there's no vehicle, American or European, that we will not try to fix.</p>
				</header>
				<div>
					<div>
						<Image alt="" src="/BMW.png" width="500" height="500"/>
						<img/>
						<img src="./Chevrolet.png"/>
						<img src="./Ford.webp"/>
					</div>
					<div>
						<img src="./Hona.png"/>
						<img src="./Nissan.webp"/>
						<img src="./Toyota.png"/>
					</div>
				</div>
			</section>
			<section className="min-h-screen">
				<header>
					<h5>The Benefits</h5>
					<h3>Why Us?</h3>
				</header>
				<div>
					<div>
						<div>
							<h4>You're in Control</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="min-h-screen">
				<header>
					<h3>Let Us Help</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</header>
				<div>
					<img src="./bawp-82-media-hd.jpg.asset.1733482771628.webp"/>
					<img src="./bawp-82-media-hd.jpg.asset.1733482771628.webp"/>
					<img src="./bawp-82-media-hd.jpg.asset.1733482771628.webp"/>
				</div>
				<button>Get Started</button>
			</section>
		</>
	)
}