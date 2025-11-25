import loginimage1 from '@/assets/images/leftside1.svg';
import loginimage2 from '@/assets/images/leftside2.svg';
import loginimage3 from '@/assets/images/leftside3.svg';
import loginimage4 from '@/assets/images/leftside4.svg';
import LeftSide from '../common/LeftSide';
import SignupForm from './SignupForm';

function Signup() {
    const images = [loginimage1, loginimage2, loginimage3, loginimage4];
    const metaText = {
        title: 'Join Us Today!',
        description: 'Create your account to get started.',
    };
    return (
        <section className="flex lg:flex-row flex-col justify-between h-screen">
            <div className="w-full hidden lg:block">
                <LeftSide images={images} metaText={metaText} />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <SignupForm />
            </div>
        </section>
    );
}

export default Signup;
