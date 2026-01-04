import { useEffect, useRef, useState } from 'react';
import OpenedTabs from './OpenedTabs';
import { DIAGNOSIS, NOTE, PART, PAYMENT, REPAIR, SERVICE } from './_DEF';
import NoteManager from './note/NoteManager';
import PaymentManager from './payment/PaymentManager';
import ServiceManager from './service/ServiceManager';
import DiagnosisManager from './diagnosis/DiagnosisManager';
import PartManager from './part/PartManager';
import RepairManager from './repair/RepairManager';
import { Rnd as RND } from 'react-rnd';
import clsx from 'clsx';


export default function Forms(props: any) {
    const contentRef = useRef(null);
    const [hasOverflow, setHasOverflow] = useState(false);

    const checkOverflow = () => {
        console.log("scrollHeight", (contentRef.current as any).scrollHeight);
        console.log("clientHeight", (contentRef.current as any).clientHeight);

        if (contentRef.current) {
            setHasOverflow(
                (contentRef.current as any).scrollHeight > (contentRef.current as any).clientHeight
            );
        }
    }

    useEffect(() => {
        checkOverflow();
    }, []);

    return (
        <RND
            default={{
                x: 100,
                y: 100,
                width: 400,
                height: 300,
            }}
            minWidth={200}
            minHeight={150}
            bounds="parent"
            className="absolute z-100"
            onResize={(e, direction, ref, delta, position) => {
                checkOverflow();
            }}
        >
            <div
                ref={contentRef} 
                className={clsx(
                "w-full h-full overflow-x-clip overflow-y-auto",
                "grid grid-rows-[auto_1fr]",
                "bg-white shadow-md",
                hasOverflow && "border-b border-base-300"
            )}>
                <OpenedTabs
                    tabsManager={props.tabsManager}
                />
                {(props.tabsManager.currentTab.form?.key === REPAIR) &&
                    <RepairManager
                        itemID={props.tabsManager.currentTab.form.itemID}
                        itemsManager={props.repairsManager as any}
                        header={props.tabsManager.currentTab.form.header}
                        canDelete={props.tabsManager.currentTab.form.canDelete}
                    />
                }
                {(props.tabsManager.currentTab.form?.key === PART) &&
                    <PartManager
                        itemID={props.tabsManager.currentTab.form.itemID}
                        itemsManager={props.partsManager as any}
                        header={props.tabsManager.currentTab.form.header}
                        canDelete={props.props.tabsManager.currentTab.form.canDelete}
                    />
                }
                {(props.tabsManager.currentTab.form?.key === DIAGNOSIS) &&
                    <DiagnosisManager
                        itemID={props.tabsManager.currentTab.form.itemID}
                        itemsManager={props.diagnosesManager as any}
                        header={props.tabsManager.currentTab.form.header}
                        canDelete={props.tabsManager.currentTab.form.canDelete}
                    />
                }
                {(props.tabsManager.currentTab.form?.key === SERVICE) &&
                    <ServiceManager
                        itemID={props.tabsManager.currentTab.form.itemID}
                        itemsManager={props.servicesManager as any}
                        header={props.tabsManager.currentTab.form.header}
                        canDelete={props.tabsManager.currentTab.form.canDelete}
                    />
                }
                {(props.tabsManager.currentTab.form?.key === PAYMENT) &&
                    <PaymentManager
                        itemID={props.tabsManager.currentTab.form.itemID}
                        itemsManager={props.paymentsManager as any}
                        header={props.tabsManager.currentTab.form.header}
                        canDelete={props.tabsManager.currentTab.form.canDelete}
                    />
                }
                {(props.tabsManager.currentTab.form?.key === NOTE) &&
                    <NoteManager
                        itemID={props.tabsManager.currentTab.form.itemID}
                        itemsManager={props.notesManager as any}
                        header={props.tabsManager.currentTab.form.header}
                        canDelete={props.tabsManager.currentTab.form.canDelete}
                    />
                }
            </div>
        </RND>
    )
}