import React from 'react';
import loginimage1 from '@/app/assets/images/leftside1.svg';
import loginimage2 from '@/app/assets/images/leftside2.svg';
import loginimage3 from '@/app/assets/images/leftside3.svg';
import loginimage4 from '@/app/assets/images/leftside4.svg';
import LeftSide from '../common/LeftSide';
import Signup1 from './Signup1';

function Signup() {
    const images = [loginimage1, loginimage2, loginimage3, loginimage4];
    const metaText = {
        title: 'Welcome Back!',
        description: 'Enter your Credentials to Access Your Account.',
    };
    return (
        <section className="flex lg:flex-row flex-col justify-between  h-screen">
            {/* <LeftSide images={images} metaText={metaText} /> */}
            <div className="w-full">
                <LeftSide images={images} metaText={metaText} />
            </div>
            <Signup1 />
        </section>
    );
}

export default Signup;
