import crscLogo from '@/public/crsclogo.svg'
import Image from 'next/image'
import { Label } from "@/components/ui/label"
import { CheckBox } from './Checkbox'
import { Button } from '@/components/ui/button'
import googleIcon from '@/public/googleIcon.svg'


const SigninForm = () => {
    return (
        <div className='flex flex-col mobile:p-8 mobile:justify-center mobile:items-center mobile:h-screen'>
            <Image
                height={100}
                width={100}
                src={crscLogo}
                alt='CRSC Logo'
            />
            <h1 className='text-2xl font-semibol mt-6'>Sign In</h1>
            <p className='text-sm mb-6'>Enter Your Email & Password</p>
            <form>
                <Label htmlFor="email">Email Address</Label>
                <input
                    className='mb-5 mt-1 block w-full px-3 py-2 bg-[#E7EAE9] border rounded-md text-sm shadow-sm placeholder-slate-400
                             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                    type="email"
                    id="email"
                    placeholder="Email"
                />

                <Label htmlFor="password ">Password</Label>
                <input
                    className='mb-2 mt-1 block w-full px-3 py-2 bg-[#E7EAE9] border rounded-md text-sm shadow-sm placeholder-slate-400
                               focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                    type="password"
                    id="password"
                    placeholder="Password"
                />
                <div className='flex mb-12'>
                    <CheckBox label="Remember Me" />
                    <a href="#" className='text-xs text-[#131123] ml-auto hover:text-sky-400'>Forgot Password?</a>
                </div>
                <div className='text-center'>
                    <Button type="submit" className="w-full bg-[#F59A3B] hover:bg-[#ffb566] mb-3">Sign In</Button>
                    <span className='text-[#131123] text-[12px]'>Or</span>
                    <Button className="w-full bg-[#E7EAE9] text-black mt-3 hover:bg-[#E7EAE9]">
                        <Image
                            src={googleIcon}
                            alt='google icon'
                            width={20}
                            height={20}
                            className='mr-2'
                        />
                        Sign In With Google</Button>
                </div>
            </form>
        </div>
    )
}

export default SigninForm