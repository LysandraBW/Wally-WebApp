"use client";
import LookupForm from "@/views/Customer/Lookup/LookupForm";
import Nav from "@/components/Nav/Default/Nav";
import Image from "@/views/Customer/Lookup/Image/Image";
import Header from "@/views/Customer/Lookup/Header/Header";
import useLookup from "@/process/Customer/Lookup/Process";
import clsx from "clsx";

export default function Lookup() {
    const lookup = useLookup();

    return (
        <div className='h-full relative flex flex-col grow'>
            <Nav
                navColor='#000'
                linkColor='#757890'
            />
            {!!lookup.data && !!lookup.state &&
                <div className='grid grid-cols-2 grow'>
                    <div className={clsx(
                        'flex flex-col align-center',
                        'px-32 py-20 gap-y-[40px]'
                    )}>
                        <Header/>
                        <div className='flex flex-col gap-y-8 h-min'>
                            <LookupForm
                                data={lookup.data}
                                state={lookup.state}
                                onChange={(name, value) => lookup.updateData(name, value)}
                                onSubmit={lookup.submitData}
                            />
                        </div>
                    </div>    
                    <Image/>
                </div>
            }
        </div>   
    )
}