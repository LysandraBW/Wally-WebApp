export default function bytesForHuman(bytes: number) {
    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
    let i = 0    
    for (i; bytes > 1024; i++) {
        bytes /= 1024;
    }
    return bytes.toFixed(1) + ' ' + units[i]
}

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
// Zayar Tun