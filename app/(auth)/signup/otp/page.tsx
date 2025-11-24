import { redirect } from 'next/navigation';
import OTPVerification from '@/components/modules/auth/OTPVerification';
import LeftSide from '@/components/modules/common/LeftSide';
import loginimage1 from '@/assets/images/leftside1.svg';
import loginimage2 from '@/assets/images/leftside2.svg';
import loginimage3 from '@/assets/images/leftside3.svg';
import loginimage4 from '@/assets/images/leftside4.svg';

interface PageProps {
    searchParams: Promise<{
        email?: string;
    }>;
}
 

export default async function OTPVerificationPage({ searchParams }: PageProps) {
    const email = (await searchParams).email;

    if (!email) {
        redirect('/signup');
    }

    const images = [loginimage1, loginimage2, loginimage3, loginimage4];
    const metaText = {
        title: 'Almost There!',
        description: 'Verify your email to complete your account setup.',
    };

    return (
        <section className="flex lg:flex-row flex-col justify-between h-screen">
            <div className="w-full hidden lg:block">
                <LeftSide images={images} metaText={metaText} />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <OTPVerification email={email} />
            </div>
        </section>
    );
}