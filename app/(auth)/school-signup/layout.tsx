// import LeftSide from '@/app/modules/auth/common/LeftSide';
// import React from 'react';
// import loginimage1 from '@/app/assets/images/leftside1.svg';
// import loginimage2 from '@/app/assets/images/leftside2.svg';
// import loginimage3 from '@/app/assets/images/leftside3.svg';
// import loginimage4 from '@/app/assets/images/leftside4.svg';

// function layout({ children }: { children: React.ReactNode }) {
//     const images = [loginimage1, loginimage2, loginimage3, loginimage4];
//     const metaText = {
//         title: 'Welcome To CRS!',
//         description:
//             'Your Teacher invited you to Class, Enter details to Create your Account!',
//     };
//     <section className="flex lg:flex-row flex-col justify-between  h-screen">
//         {/* <LeftSide images={images} metaText={metaText} /> */}
//         <div className="w-full">
//             <LeftSide images={images} metaText={metaText} />
//         </div>
//         <div className="w-full  flex flex-col justify-center items-center ">
//             {children}
//         </div>
//     </section>;
// }

// export default layout;

import LeftSide from '@/app/modules/auth/common/LeftSide';
import React from 'react';
import loginimage1 from '@/app/assets/images/leftside1.svg';
import loginimage2 from '@/app/assets/images/leftside2.svg';
import loginimage3 from '@/app/assets/images/leftside3.svg';
import loginimage4 from '@/app/assets/images/leftside4.svg';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const images = [loginimage1, loginimage2, loginimage3, loginimage4];
    const metaText = {
        title: 'Welcome To CRS!',
        description:
            'Your Teacher invited you to Class, Enter details to Create your Account!',
    };
    return (
        <section className="flex lg:flex-row flex-col justify-between  h-full ">
            {/* <LeftSide images={images} metaText={metaText} /> */}
            <div className="w-full">
                <LeftSide images={images} metaText={metaText} />
            </div>
            <div className="w-full  flex flex-col  items-center mt-5 ">
                {children}
            </div>
        </section>
    );
}
