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
					<nav className="h-min flex justify-between items-center px-4 py-4 bg-white/40 m-4 rounded-xl shadow backdrop-blur border border-white/50">
						<div>
							<a href="/" className="flex gap-1 items-center">
								<div className="bg-transparent text-black stroke-black">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
  										<path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
									</svg>
								</div>
								<span className={`text-black text-base ${IBM.className} tracking-tight font-medium`}>WALTRONICS</span>
							</a>
						</div>
						<div className="flex gap-8">
							<a href="/lookup" className={`text-black text-sm tracking-wide font-[400] text-black`}>Lookup</a>
							<a href="/schedule" className={`text-black text-sm tracking-wide font-[400] text-black`}>Schedule</a>
						</div>
					</nav>
					<div className="flex items-end p-8">
						<header className="flex flex-col">
							<h1 className="mb-8 relative left-[-4px] text-white text-[6rem] font-medium tracking-tight leading-[6rem]">The.<br/>Mechanic.</h1>
							<div className="flex flex-col gap-2 mb-4">
								<span className="flex gap-1 items-center">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" className="size-4 stroke-white text-white">
										<path stroke-linecap="round" stroke-linejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
									</svg>
									<span className="relative top-[0.5px] text-white text-sm font-medium text-gray-50">Kissimmee, FL</span>
								</span>
								<p className="text-white text-[1.125rem] max-w-[440px]">Our business model is simple. You have places to be and we help you get there.</p>
							</div>
							<button className="bg-white text-black px-6 py-2 rounded-md border border-gray-200 font-medium text-base w-min whitespace-nowrap">Get Started</button>
						</header>
					</div>
				</div>
			</section>
			<section className="min-h-screen snap-start bg-white grid grid-rows-[min-content_auto]">
				<header className="p-8 shadow-inner">
					<h5 className="text-center text-[2rem]">"The Process"</h5>
					<h3 className="text-center font-medium text-[4rem]">How it <span className="text-[4rem] font-medium text-blue-600">Works</span></h3>
				</header>
				<div className="grid grid-rows-2 grid-cols-3">
					<div className="p-8 flex flex-col gap-4 bg-blue-100">
						<div>
							<h5 className="text-base font-medium text-black border border-white mb-2 bg-white w-8 h-8 text-center rounded flex justify-center items-center shadow">1</h5>
							<h4 className="text-3xl font-medium text-black">Schedule Appointment</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-4 bg-blue-200">
						<div>
							<h5 className="text-base font-medium text-black mb-2 bg-white w-8 h-8 text-center rounded flex justify-center items-center shadow">2</h5>
							<h4 className="text-3xl font-medium text-black">Wait for Confirmation</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-4 bg-blue-300">
						<div>
							<h5 className="text-base font-medium text-black mb-2 bg-white w-8 h-8 text-center rounded flex justify-center items-center shadow">3</h5>
							<h4 className="text-3xl font-medium text-black">Bring in Vehicle</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-4 bg-blue-400">
						<div>
							<h5 className="text-base font-medium text-white mb-2 bg-blue-300 border border-blue-200 w-8 h-8 text-center rounded flex justify-center items-center shadow">4</h5>
							<h4 className="text-3xl font-medium text-white">Receive Service</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-4 bg-blue-500">
						<div>
							<h5 className="text-base font-medium text-white mb-2 bg-blue-400 border border-blue-300 w-8 h-8 text-center rounded flex justify-center items-center shadow">5</h5>
							<h4 className="text-3xl font-medium text-white">Get Vehicle</h4>
						</div>
						<div>
							<p className="text-[1.125rem] text-gray-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="p-8 flex flex-col gap-4 bg-blue-600 relative">
						<canvas className="absolute w-full h-full top-0 left-0" id="my-canvas"></canvas>
						<div>
							<h5 className="text-base font-medium text-white mb-2 bg-blue-500 border border-blue-400 w-8 h-8 text-center rounded flex justify-center items-center shadow">6</h5>
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
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
					<div className="border border-gray-200 pt-4 pl-4 pr-2 pb-2 flex flex-col justify-between rounded shadow-sm">
						<div>
							<span>Type</span>
							<h6 className="text-[1.5rem] font-medium">Service</h6>
						</div>
						<div className="flex justify-end items-center gap-1">
							<span>avg.</span>
							<span className="font-medium text-blue-600 text-[1.25rem]">$100 - $200</span>
						</div>
					</div>
				</div>
				<header className="text-center flex w-full justify-center items-center bg-gradient-to-b from-gray-900 to-black p-16">
					<h3 className="text-center font-medium text-[4rem] text-white">By the way, we offer a wide range of services.</h3>
				</header>
			</section>
			<section className="min-h-[50vh] flex flex-col justify-self-center justify-center items-center snap-center border-t border-b border-gray-200">
				<header className="text-center w-min">
					<h5 className="text-center text-[1.25rem] font-medium mb-8 whitespace-nowrap">And there's no vehicle, American or European,<br/>that we will not try to fix.</h5>
				</header>
				<div className="flex flex-col gap-10">
					<div className="flex gap-x-24 gap-y-32 justify-center flex-wrap">
						<img className="grayscale h-10" src="./Chevrolet.png"/>
						<img className="grayscale h-10" src="/BMW.png"/>
						<img className="grayscale h-10" src="/Benz.svg.png"/>
						<img className="grayscale h-10" src="./Ford.webp"/>
						<img className="grayscale h-10" src="./Hona.png"/>
						<img className="grayscale h-10" src="./Nissan.webp"/>
						<img className="grayscale h-10" src="./Toyota.png"/>
						<img className="grayscale h-10" src="./kia.png"/>
						<img className="grayscale h-10" src="./Hyundai.png"/>
						<img className="grayscale h-10" src="./vk.png"/>
					</div>
				</div>
			</section>
			<section className="min-h-screen snap-start bg-gray-100">
				<header className="p-8 sticky top-0 bg-gray-100">
					<h5 className="text-center text-[2rem]">The Benefits</h5>
					<h3 className="text-center font-medium text-[4rem]">Why Us?</h3>
				</header>
				<div className="flex flex-col items-center gap-4">
					<div className="bg-white p-8 shadow-sm border border-gray-200 rounded">
						<div className="text-center">
							<h4 className="text-4xl font-medium mb-4">You're in Control</h4>
							<p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="bg-white p-8 shadow-sm border border-gray-200 rounded">
						<div className="text-center">
							<h4 className="text-4xl font-medium mb-4">Skilled Hands</h4>
							<p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="bg-white p-8 shadow-sm border border-gray-200 rounded">
						<div className="text-center">
							<h4 className="text-4xl font-medium mb-4">Transparency</h4>
							<p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="bg-white p-8 shadow-sm border border-gray-200 rounded">
						<div className="text-center">
							<h4 className="text-4xl font-medium mb-4">Local Business</h4>
							<p className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="min-h-screen snap-start flex flex-col items-center gap-8 overflow-x-clip">
				<header className="pt-8">
					<h3 className="text-center font-medium text-[4rem]">Let Us Help.</h3>
					<p className="text-center text-[1.125rem]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</header>
				<div className="flex justify-center gap-4 h-[300px]">
					<img width="75%" className="rounded-full min-w-[60vw] object-cover object-left" src="./bawp-65-media-hd.jpg.asset.1722429777125.webp"/>
					<img width="75%" className="rounded-full min-w-[60vw] object-cover object-center" src="./bawp-65-media-hd.jpg.asset.1722429777125.webp"/>
					<img width="75%" className="rounded-full min-w-[60vw] object-cover object-right" src="./bawp-65-media-hd.jpg.asset.1722429777125.webp"/>
				</div>
				<button className="px-6 py-2 bg-white border border-gray-200 text-black text-xl font-medium rounded-lg shadow hover:bg-black hover:text-white hover:border-black hover:shadow-lg">Get Started</button>
			</section>
		</>
	)
}