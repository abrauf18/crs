import StandardDetails from '@/app/modules/standard/details/StandardDetails';
import React from 'react';

function DetailsPage({ params }: any) {
    return <StandardDetails params={params} isShownFromTeacher />;
}

export default DetailsPage;
