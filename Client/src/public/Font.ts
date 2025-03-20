import { DM_Sans as _DM_Sans, Inter as _Inter, Rubik as _Rubik, Be_Vietnam_Pro, Hanken_Grotesk, Host_Grotesk, IBM_Plex_Sans, Instrument_Sans, Libre_Franklin, Manrope, Poppins, Schibsted_Grotesk, Space_Grotesk} from "next/font/google";
import localFont from 'next/font/local';
import { Plus_Jakarta_Sans } from "next/font/google";

export const DM_Sans = _DM_Sans({
    subsets: ["latin"],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']
});

export const Inter = _Inter({
    subsets: ["latin"],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const Instrumental = Instrument_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});

export const IBM = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export const Rubik = _Rubik({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const Jakarta = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700',]
});

export const Satoshi = localFont({
    src: [
      {
        path: './Font/Satoshi-Black.otf',
        weight: '900',
        style: 'normal',
      },
      {
        path: './Font/Satoshi-Bold.otf',
        weight: '600',
        style: 'normal',
      },
      {
        path: './Font/Satoshi-Light.otf',
        weight: '200',
        style: 'normal',
      },
      {
        path: './Font/Satoshi-Medium.otf',
        weight: '500',
        style: 'normal',
      },
      {
        path: './Font/Satoshi-Regular.otf',
        weight: '400',
        style: 'normal',
      }
    ],
  })