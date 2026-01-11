// "This 95-year old programmer still uses code from Stackoverflow the old-fashioned way." - Bob
// Source: https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript (SanBen)
export function setColorScheme(scheme: "dark" | "light") {
    const root = document.querySelector("html");

    switch(scheme) {
        case 'dark':
            root?.classList.add("dark");
            break;
        case 'light':
            root?.classList.remove("dark");
            break;
        default:
            break;
  }
}


export function getPreferredColorScheme(window: Window) {
    if (window.matchMedia) {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            return 'dark';
        } 
        else {
            return 'light';
        }
  }
  return 'light';
}


export function updateColorScheme(window: Window){
    setColorScheme(getPreferredColorScheme(window));
}