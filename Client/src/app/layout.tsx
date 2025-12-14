import { DM_Sans, Instrumental, Inter, Jakarta, Satoshi, IBM, Rubik } from "@/public/Font";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="snap-y snap-mandatory scroll-hide h-full">
			<body className={`${Instrumental.className} snap-y snap-mandatory overflow-y-auto h-full flex flex-col`}>
				{children}
			</body>
		</html>
	);
}