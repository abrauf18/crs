import React from 'react';
import StandardDetails from '@/app/modules/standard/details/StandardDetails';

function DetailsPage({ params }: any) {
    return <StandardDetails params={params} isShownFromTeacher />;
}

export default DetailsPage;
