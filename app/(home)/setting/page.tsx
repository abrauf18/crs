import Searchbar from '@/app/components/common/Searchbar';
import React from 'react';
import { Settings } from 'lucide-react';
import Profile from '@/app/modules/setting/Profile';

function SettingPage() {
    return (
        <>
            <Searchbar
                headerText="Settings"
                Icon={Settings}
                tagline="Manage your profile"
            />
            <Profile />
        </>
    );
}

export default SettingPage;
