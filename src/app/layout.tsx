import { DMSans, Rubik, Inter, Lato, Mukta, Nunito_Sans } from "@/public/Font/Font";
import "./globals.css";
import clsx from "clsx";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(
        'bg-white min-h-screen h-full',
        'flex flex-col',
        Inter.className,
      )}>{children}</body>
    </html>
  );
}
