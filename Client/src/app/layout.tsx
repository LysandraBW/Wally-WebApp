import { DM_Sans, Inter, Jakarta, Satoshi } from "@/public/Font";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={Inter.className}>
				{children}
			</body>
		</html>
	);
}