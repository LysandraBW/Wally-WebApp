import "./globals.css";
import clsx from "clsx";
import { IBM_Plex_Sans, Instrument_Sans } from "next/font/google";

const InstrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--instrument-sans'
});

const IBM = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: "--ibm"
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={clsx("h-full", InstrumentSans.variable, IBM.variable)}>
			<body 
				className={clsx(
					"font-instrument-sans",
					"h-full"
				)}
			>
				{children}
			</body>
		</html>
	);
}