export function capitalize(s: string): string {
    let words = s.split(/\s/);
    words = words.map(w => w[0].toUpperCase() + w.slice(1));
    return words.join(" ");
}