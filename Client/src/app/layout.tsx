import { DM_Sans, Instrumental, Inter, Jakarta, Satoshi } from "@/public/Font";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="snap-y snap-mandatory scroll-hide">
			<body className={`${Instrumental.className} snap-y snap-mandatory overflow-y-auto h-100vh`}>
				{children}
			</body>
		</html>
	);
}