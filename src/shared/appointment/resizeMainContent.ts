export default function resizeMainContent() {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return;
    }
    
    const tabs = document.querySelector("#Tabs");
    if (!tabs)
        return;
    const tabsRect = tabs.getBoundingClientRect();
    
    const mainContentElements = document.querySelectorAll("#MainContent");
    const mainContentHeight = window.innerHeight - 16 - tabsRect.bottom;
    
    for (const element of mainContentElements) {
        (element as any).style.height = `${mainContentHeight}px`;
        (element as any).style.maxHeight = `${mainContentHeight}px`;
    }
}