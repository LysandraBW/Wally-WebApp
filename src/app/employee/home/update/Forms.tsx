import { useEffect, useRef, useState } from 'react';
import OpenedTabs from '../../../../component/Tabs/PopUpTabs';
import { DIAGNOSIS, NOTE, PART, PAYMENT, REPAIR, SERVICE } from './_DEF';
import NoteManager from './note/NoteManager';
import PaymentManager from './payment/PaymentManager';
import ServiceManager from './service/ServiceManager';
import DiagnosisManager from './diagnosis/DiagnosisManager';
import PartManager from './part/PartManager';
import RepairManager from './repair/RepairManager';
import { Rnd as RND } from 'react-rnd';
import clsx from 'clsx';
import useTabsManager, { Tab } from '@/features/TabManager/useTabsManager';
import useItemsManager from '@/features/ItemManager/useItemsManager';
import usePaymentsManager from './payment/usePaymentsManager';
import useServicesManager from './service/useServicesManager';
import { Repair as DB_AppointmentRepair } from "waltronics-types";
import { Repair, Repairs } from './repair/_DEF';
import { Appointment as DB_Appointment } from "waltronics-types";
import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import { Part as DB_AppointmentPart } from "waltronics-types";
import { Note as DB_AppointmentNote} from "waltronics-types";
import { Part, Parts } from './part/_DEF';
import { Diagnoses, Diagnosis } from './diagnosis/_DEF';
import { Note, Notes } from './note/_DEF';


interface FormsProps {
    tabsManager: ReturnType<typeof useTabsManager>;
    repairsManager: ReturnType<typeof useItemsManager<DB_AppointmentRepair, Repair, Repairs>>;
    partsManager: ReturnType<typeof useItemsManager<DB_AppointmentPart, Part, Parts>>;
    diagnosesManager: ReturnType<typeof useItemsManager<DB_AppointmentDiagnosis, Diagnosis, Diagnoses>>;
    servicesManager: ReturnType<typeof useServicesManager>;
    paymentsManager: ReturnType<typeof usePaymentsManager>;
    notesManager: ReturnType<typeof useItemsManager<DB_AppointmentNote, Note, Notes>>;
}


export default function Forms(props: FormsProps) {
    const contentRef = useRef(null);
    const [hasOverflow, setHasOverflow] = useState(false);

    const checkOverflow = () => {
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
                x: (window.innerWidth - (173 + 16) - 32) / 2 - 200,
                y: 10,
                width: 400,
                height: 300,
            }}
            style={{ cursor: 'default' }}
            minWidth={250}
            minHeight={150}
            // bounds="parent"
            className="absolute z-[200]"
            onResize={(e, direction, ref, delta, position) => {
                checkOverflow();
            }}
            cancel='.close'
        >
            <div
                ref={contentRef} 
                className={clsx(
                "min-w-0 w-full h-full !bg-red-500 overflow-x-clip overflow-y-auto",
                "grid grid-cols-1 grid-rows-[auto_1fr]",
                "bg-base-0 dark:bg-base-50 shadow-md dark:shadow-xl",
                hasOverflow && "border-b border-base-300 dark:border-base-200"
            )}>
                <OpenedTabs
                    tabsManager={props.tabsManager}
                    filterTabs={(tab: Tab) => !!tab.form}
                />
                {(props.tabsManager.currentTab && props.tabsManager.currentTab.form?.key === REPAIR) &&
                    <RepairManager
                        itemID={props.tabsManager.currentTab.form.itemID}
                        itemsManager={props.repairsManager as any}
                        header={props.tabsManager.currentTab.form.header}
                        canDelete={props.tabsManager.currentTab.form.canDelete}
                    />
                }
                {(props.tabsManager.currentTab && props.tabsManager.currentTab.form?.key === PART) &&
                    <PartManager
                        itemID={props.tabsManager.currentTab.form.itemID}
                        itemsManager={props.partsManager as any}
                        header={props.tabsManager.currentTab.form.header}
                        canDelete={props.tabsManager.currentTab.form.canDelete}
                    />
                }
                {(props.tabsManager.currentTab && props.tabsManager.currentTab.form?.key === DIAGNOSIS) &&
                    <DiagnosisManager
                        itemID={props.tabsManager.currentTab.form.itemID}
                        itemsManager={props.diagnosesManager as any}
                        header={props.tabsManager.currentTab.form.header}
                        canDelete={props.tabsManager.currentTab.form.canDelete}
                    />
                }
                {(props.tabsManager.currentTab && props.tabsManager.currentTab.form?.key === SERVICE) &&
                    <ServiceManager
                        itemID={props.tabsManager.currentTab.form.itemID}
                        itemsManager={props.servicesManager as any}
                        header={props.tabsManager.currentTab.form.header}
                        canDelete={props.tabsManager.currentTab.form.canDelete}
                    />
                }
                {(props.tabsManager.currentTab && props.tabsManager.currentTab.form?.key === PAYMENT) &&
                    <PaymentManager
                        itemID={props.tabsManager.currentTab.form.itemID}
                        itemsManager={props.paymentsManager as any}
                        header={props.tabsManager.currentTab.form.header}
                        canDelete={props.tabsManager.currentTab.form.canDelete}
                    />
                }
                {(props.tabsManager.currentTab && props.tabsManager.currentTab.form?.key === NOTE) &&
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