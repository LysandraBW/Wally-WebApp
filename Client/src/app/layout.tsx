import { GeneralSans } from "@/public/fonts/Font";
import "./globals.css";
import clsx from "clsx";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full">
			<body 
				className={clsx(
					GeneralSans.className,
					"h-full"
				)}
			>
				{children}
			</body>
		</html>
	);
}