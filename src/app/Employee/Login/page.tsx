'use client';
import Error from '@/pages/Employee/Login/Error';
import MinimalNav from '@/components/nav/Minimal/Minimal';
import Header from '@/pages/Employee/Login/Header';
import useLogin from '@/process/Employee/Login/useLogin';
import LoginForm from '@/pages/Employee/Login/LoginForm';
import Image from '@/pages/Employee/Login/Image';

export default function Login() {
    const login = useLogin();

    return (
        <div className='h-full flex flex-col grow'>
            {!login.failed &&
                <Error
                    close={() => login.resetFailed()}
                />
            }
            <MinimalNav/>
            {!!login.data && !!login.state &&
                <div className='flex grow'>
                    <Image/>
                    <div className='flex justify-center items-center w-[50%]'>
                        <div className='w-[50%] flex flex-col gap-y-[16px]'>
                            <Header/>
                            <div className='w-full flex flex-col gap-y-[16px]'>
                                <LoginForm
                                    data={login.data}
                                    state={login.state}
                                    onChange={login.updateData}
                                    onSubmit={login.submitData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}