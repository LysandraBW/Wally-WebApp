import { DMSans } from "@/public/Font/Font";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${DMSans.className} flex flex-col min-h-screen h-full`}>{children}</body>
    </html>
  );
}
