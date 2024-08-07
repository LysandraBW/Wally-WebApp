import { DMSans, Inter } from "@/public/Font/Font";
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
        ' min-h-screen h-full',
        'flex flex-col',
        Inter.className,
      )}>{children}</body>
    </html>
  );
}
