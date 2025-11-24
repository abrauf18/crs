import { redirect } from 'next/navigation';
import ResetVerifyPassword from './ResetVerifyPassword';
import LeftSide from '@/app/modules/auth/common/LeftSide';
import loginimage2 from '@/app/assets/images/leftside2.svg';
import loginimage3 from '@/app/assets/images/leftside3.svg';
import loginimage4 from '@/app/assets/images/leftside4.svg';
import signupImage from '@/app/assets/images/signup1.svg';

interface PageProps {
    searchParams: {
        email?: string;
    };
}

export default function ResetVerifyPasswordPage({ searchParams }: PageProps) {
    const { email } = searchParams;

    if (!email) {
        redirect('/forgot-password');
    }

    const images = [signupImage, loginimage2, loginimage3, loginimage4];
    const metaText = {
        title: 'Reset Password!',
        description: 'Forgot Your Password Dont worry lets Recover It',
    };

    return (
        <section className="flex lg:flex-row flex-col justify-between h-screen">
            <div className="w-full hidden lg:block">
                <LeftSide images={images} metaText={metaText} />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <ResetVerifyPassword email={email} />
            </div>
        </section>
    );
}