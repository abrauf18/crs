import React from 'react';
import loginimage2 from '@/app/assets/images/leftside2.svg';
import loginimage3 from '@/app/assets/images/leftside3.svg';
import loginimage4 from '@/app/assets/images/leftside4.svg';
import signupImage from '@/app/assets/images/signup1.svg';
import CreatePassword from '@/app/modules/auth/createPassword/CreatePassword';

function CreatePasswordPage() {
    const images = [signupImage, loginimage2, loginimage3, loginimage4];
    const metaText = {
        title: 'Welcome to School!',
        description: 'School Invited you to Join school as a teacher!',
    };
    return <CreatePassword images={images} metaText={metaText} />;
}

export default CreatePasswordPage;
