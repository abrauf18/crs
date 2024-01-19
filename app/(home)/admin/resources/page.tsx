import { Metadata } from 'next';
import React from 'react';
import Resoures from '@/app/modules/resources/Resources';

export const metadata: Metadata = {
    title: 'Resources',
    description: 'Your All Resources Here',
};

function ResouresPage() {
    return <Resoures />;
}

export default ResouresPage;
