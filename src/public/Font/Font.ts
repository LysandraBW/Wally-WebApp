import { DM_Sans, Inter as _Inter } from "next/font/google";

export const DMSans = DM_Sans({
    subsets: ["latin"],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
});

export const Inter = _Inter({
    subsets: ["latin"]
});