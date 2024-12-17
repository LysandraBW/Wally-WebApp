'use client';
import Nav from '@/layout/Nav';
import MultiPageFormProps from '@/components/form/tracker/MultiPageForm';
import ContactForm from '@/views/Customer/Schedule/ContactForm';
import VehicleForm from '@/views/Customer/Schedule/VehicleForm';
import ServiceForm from '@/views/Customer/Schedule/ServiceForm';
import Header from '@/pages/Customer/Schedule/Header';
import Image from '@/pages/Customer/Schedule/Image';
import useSchedule from '@/process/Customer/Schedule/Process';

export default function Schedule() {
    const schedule =  useSchedule();

    return (
        <div className='h-full relative'>
            <Nav
                navColor='#000'
                linkColor='#FFF'
            />
            <div className='grid grid-cols-[55%_45%]'>
                <div className='px-32 py-20 flex flex-col gap-y-[40px]'>
                    <Header/>
                    {!!schedule.data && !!schedule.state && !!schedule.loaded &&
                        <MultiPageFormProps
                            forms={[
                                {
                                    form: (
                                        <ContactForm
                                            data={schedule.data}
                                            state={schedule.state}
                                            onChange={schedule.updateData}
                                        />
                                    ),
                                    formHeader: 'Contact',
                                    onContinue: async () => await schedule.inspectContactData()
                                },
                                {
                                    form: (
                                        <VehicleForm
                                            data={schedule.data}
                                            state={schedule.state}
                                            loaded={schedule.loaded}
                                            onChange={schedule.updateData}
                                        />
                                    ),
                                    formHeader: 'Vehicle',
                                    onContinue: async () => await schedule.inspectVehicleData()
                                },
                                {
                                    form: (
                                        <ServiceForm
                                            data={schedule.data}
                                            state={schedule.state}
                                            loaded={schedule.loaded}
                                            onChange={schedule.updateData}
                                        />
                                    ),
                                    formHeader: 'Service',
                                    onContinue: async () => await schedule.inspectAllData()
                                },
                            ]}
                            onSubmit={async () => {
                                const aptID = await schedule.submitData();
                                return !!aptID;
                            }}
                        />
                    }
                </div>
                <Image/>
            </div>
        </div>
    )   
}