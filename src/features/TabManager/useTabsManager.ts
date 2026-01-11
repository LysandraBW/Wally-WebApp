import { sameSemanticMap } from "@/features/TabManager/sameSemanticMap";
import { useEffect, useState } from "react";

export type TabID = {[k: string]: string|number};

export interface Tab {
    id: TabID;
    header: string;
    form?: {
        key: string;
        itemID: string;
        header: string;
        mutation: "Create"|"Update";
        canDelete: boolean;
    };
    [k: string]: any;
}

export interface TabForm {
    id: TabID;
    header: string;
    form: {
        key: string;
        itemID: string;
        header: string;
        mutation: "Create"|"Update";
        canDelete: boolean;
    };
}


export default function useTabsManager<T extends Tab>() {
    const [tabs, setTabs] = useState<Array<T>>([]);
    const [currentTab, setCurrentTab] = useState<T|null>(null);


    useEffect(() => {
        if (tabs.length === 0)
            setCurrentTab(null);
    }, [tabs]);


    const openTab = (newTab: T) => {
        // Check if Tab Exists
        const tabIndex = tabs.findIndex(tab => sameSemanticMap(tab.id, newTab.id));
        if (tabIndex !== -1) {
            setCurrentTab(tabs[tabIndex]);
            return;
        }

        setTabs([...tabs, newTab]);
        setCurrentTab(newTab);
    }


    const closeTab = (tabID: TabID, filterTab?: (tab: T) => boolean) => {
        // Check if Tab Doesn't Exist
        let tabIndex = tabs.findIndex(tab => sameSemanticMap(tab.id, tabID));
        if (tabIndex === -1)
            return;

        let updatedTabs = [...tabs];
        if (filterTab)
            updatedTabs = updatedTabs.filter((tab, i) => i !== tabIndex && filterTab(tab));
        
        tabIndex = tabs.findIndex(tab => sameSemanticMap(tab.id, tabID));
        updatedTabs.splice(tabIndex, 1);

        setTabs(tabs => {
            let tabIndex = tabs.findIndex(tab => sameSemanticMap(tab.id, tabID));
            if (tabIndex === -1)
                return tabs;
            
            let updatedTabs = [...tabs];
            if (filterTab)
                updatedTabs = updatedTabs.filter((tab, i) => i !== tabIndex && filterTab(tab));

            tabIndex = tabs.findIndex(tab => sameSemanticMap(tab.id, tabID));
            updatedTabs.splice(tabIndex, 1);

            if (updatedTabs.length === 0) {
                setCurrentTab(null);
            }
            else if (updatedTabs.length === 1 || tabIndex - 1 < 0) {
                setCurrentTab(updatedTabs[0]);
            }
            else if (updatedTabs.length > 1) {
                setCurrentTab({...updatedTabs[tabIndex-1]});
            }

            return updatedTabs;
        });
    }


    const replaceTab = (tabID: TabID, tab: T) => {
        const updatedTabs = [...tabs];
        let tabIndex = tabs.findIndex(tab => sameSemanticMap(tab.id, tabID));
        if (tabIndex === -1)
            return;
        updatedTabs[tabIndex] = tab;
        setTabs(updatedTabs);
    }


    const goToTab = (tabID: TabID) => {
        let tabIndex = tabs.findIndex(tab => sameSemanticMap(tab.id, tabID));
        if (tabIndex === -1)
            return;
        setCurrentTab(tabs[tabIndex]);
    }


    const filterTabs = (filterTab: (tab: T) => boolean) => {
        const updatedTabs = [...tabs].filter(tab => filterTab(tab));
        setTabs(updatedTabs);
    }


    const closeAllTabs = () => {
        setTabs([]);
        setCurrentTab(null);
    }


    return {
        tabs,
        currentTab,
        setCurrentTab,
        openTab,
        closeTab,
        replaceTab,
        goToTab,
        filterTabs,
        closeAllTabs
    }
}