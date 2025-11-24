import { redirect } from 'next/navigation';
import ResetVerifyPassword from '../../../../components/modules/auth/forgetPassword/ResetVerifyPassword';
import LeftSide from '@/components/modules/common/LeftSide';
import loginimage2 from '@/assets/images/leftside2.svg';
import loginimage3 from '@/assets/images/leftside3.svg';
import loginimage4 from '@/assets/images/leftside4.svg';
import signupImage from '@/assets/images/signup1.svg';

interface PageProps {
    searchParams: Promise<{
        email?: string;
    }>;
}

export default async function ResetVerifyPasswordPage({ searchParams }: PageProps) {
    const email = (await searchParams).email;

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