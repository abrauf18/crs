'use client';

import { ResourceType } from '@/lib/utils';

export default function FileViewing({
    resourceURL,
    type,
}: {
    resourceURL: string;
    type: ResourceType;
}) {
    let resourceRenderingLink = '';
    if (type === ResourceType.SLIDESHOW) {
        resourceRenderingLink = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            resourceURL
        )}`;
    } else {
        resourceRenderingLink = resourceURL;
    }
    return (
        <div className="text-lg flex justify-center">
            <iframe
                src={resourceRenderingLink}
                title="File Viewer"
                frameBorder="0"
                style={{ width: '100%', minHeight: '100vh' }}
                className=""
            />
        </div>
    );
}