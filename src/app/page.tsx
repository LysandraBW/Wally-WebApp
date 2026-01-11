"use client";
import Logo from "@/component/NavBar/Logo";

export default function Page() {
	return (
		<div className="bg-black flex flex-col justify-center items-center h-screen grow w-screen bg-[url('/pexels-karoldach-409701.jpg')] bg-cover bg-center">
			<div className="w-full h-full flex justify-center items-center bg-black/90 backdrop-blur-md">
				<div className="flex flex-col justify-center gap-2 items-center">
					<Logo
						white={true}
						svgClassName="!stroke-yellow-400 !fill-yellow-400"
					/>
					<h1 className="text-3xl text-white font-medium tracking-tight">
						Page Under Construction
					</h1>
				</div>
			</div>
		</div>
	)
}