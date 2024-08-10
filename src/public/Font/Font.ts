import { 
    DM_Sans, 
    Inter   as _Inter, 
    Rubik   as _Rubik,
    Lato    as _Lato,
    Mukta   as _Mukta,
    Nunito_Sans as _Nunito_Sans,
    Nunito,
    Exo_2
} from "next/font/google";

export const DMSans = DM_Sans({
    subsets: ["latin"],
    weight: [
        '100', 
        '200', 
        '300', 
        '400', 
        '500', 
        '600', 
        '700', 
        '800', 
        '900', 
        '1000'
    ]
});

export const Inter = _Inter({
    subsets: ["latin"]
});

export const Rubik = _Rubik({
    subsets: ["latin"]
});

export const Lato = _Lato({
    subsets: ["latin"],
    weight: ['100', '300', '400', '700', '900']
});

export const Mukta = _Mukta({
    subsets: ["latin"],
    weight: ['200']
})

export const Nunito_Sans = Exo_2({
    subsets: ["latin"],
    weight: ['200', '300', '400']
})