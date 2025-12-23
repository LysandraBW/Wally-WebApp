import { DM_Sans, Instrumental, Inter, Jakarta, Satoshi, IBM, Rubik, PublicSans } from "@/public/Font";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="bg-background-1">
			<body className={PublicSans.className}>
				{children}
			</body>
		</html>
	);
}