import localFont from 'next/font/local';
import { Comic_Neue as _Comic_Neue, DM_Sans as _DM_Sans, Inter as _Inter, Rubik as _Rubik, Be_Vietnam_Pro, Hanken_Grotesk, Host_Grotesk, IBM_Plex_Sans, Instrument_Sans, Libre_Franklin, Manrope, Poppins, Schibsted_Grotesk, Space_Grotesk} from "next/font/google";
import { Kanit as _Kanit } from 'next/font/google';
import { Saira as _Saira } from 'next/font/google';
import { Public_Sans } from 'next/font/google';
import { Cabin as _Cabin } from "next/font/google";
import { IBM_Plex_Mono } from 'next/font/google';

export const IBM_Mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export const Cabin = _Cabin({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700']
});

export const PublicSans = Public_Sans({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const Comic_Neue = _Comic_Neue({
  subsets: ["latin"],
  weight: ['300', '400', '700']
});

export const Kanit = _Kanit({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const Saira = _Saira({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

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
        path: './Satoshi/Satoshi-Black.otf',
        weight: '900',
        style: 'normal',
      },
      {
        path: './Satoshi/Satoshi-Bold.otf',
        weight: '600',
        style: 'normal',
      },
      {
        path: './Satoshi/Satoshi-Light.otf',
        weight: '200',
        style: 'normal',
      },
      {
        path: './Satoshi/Satoshi-Medium.otf',
        weight: '500',
        style: 'normal',
      },
      {
        path: './Satoshi/Satoshi-Regular.otf',
        weight: '400',
        style: 'normal',
      }
    ],
  })


export const GeneralSans = localFont({
  src: [
    {
      path: './GeneralSans/GeneralSans-Bold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './GeneralSans/GeneralSans-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './GeneralSans/GeneralSans-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './GeneralSans/GeneralSans-Regular.otf',
      weight: '400',
      style: 'normal',
    }
  ],
})


export const Ranade = localFont({
  src: [
    {
      path: './Ranade/Ranade-Bold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './Ranade/Ranade-Medium.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './Ranade/Ranade-Regular.otf',
      weight: '500',
      style: 'normal',
    }
  ],
})


export const Switzer = localFont({
  src: [
    {
      path: './Switzer/Switzer-Bold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './Switzer/Switzer-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './Switzer/Switzer-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Switzer/Switzer-Regular.otf',
      weight: '400',
      style: 'normal',
    }
  ],
})