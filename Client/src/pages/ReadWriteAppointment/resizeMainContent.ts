export default function resizeMainContent() {
    const vNavBar = document.querySelector("#VNavBar");
    if (!vNavBar)
        return;
    const vNavBarRect = vNavBar.getBoundingClientRect();

    const tabs = document.querySelector("#Tabs");
    if (!tabs)
        return;
    const tabsRect = tabs.getBoundingClientRect();
    
    const mainContentElements = document.querySelectorAll("#MainContent");
    const mainContentHeight = vNavBarRect.bottom - tabsRect.bottom;
    for (const element of mainContentElements) {
        (element as any).style.maxHeight = `${mainContentHeight}px`;
    }
}