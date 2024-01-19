import { Metadata } from 'next';
import React from 'react';
import SavedVideos from '@/app/modules/saved-videos/SavedVideos';

export const metadata: Metadata = {
    title: 'Saved Videos',
    description: 'Your All Saved Videos',
};

function SavedVideosPage() {
    return <SavedVideos />;
}

export default SavedVideosPage;
