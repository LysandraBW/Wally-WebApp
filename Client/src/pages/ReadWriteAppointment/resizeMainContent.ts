export default function resizeMainContent() {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return;
    }
    
    const vNavBar = document.querySelector("#VNavBar");
    if (!vNavBar)
        return;
    const vNavBarRect = vNavBar.getBoundingClientRect();
    console.log(vNavBar, vNavBarRect);

    const tabs = document.querySelector("#Tabs");
    if (!tabs)
        return;
    const tabsRect = tabs.getBoundingClientRect();
    console.log(tabs, tabsRect);
    
    const mainContentElements = document.querySelectorAll("#MainContent");
    const mainContentHeight = vNavBarRect.bottom - tabsRect.bottom;
    console.log(mainContentHeight);
    
    for (const element of mainContentElements) {
        (element as any).style.height = `${mainContentHeight}px`;
        (element as any).style.maxHeight = `${mainContentHeight}px`;
    }
}