import { DM_Sans, Instrumental, Inter, Jakarta, Satoshi, IBM, Rubik } from "@/public/Font";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="bg-background-1">
			<body className={Inter.className}>
				{children}
			</body>
		</html>
	);
}