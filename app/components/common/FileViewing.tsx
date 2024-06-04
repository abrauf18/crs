/* eslint-disable jsx-a11y/iframe-has-title */

'use client';

import { ResourceType } from '@/lib/utils';

export default function FileViewing({
    resourceURL,
    type,
}: {
    resourceURL: string;
    type: ResourceType;
}) {
    // if (type === ResourceType.ASSIGNMENT || type === ResourceType.QUIZ) {
    //     return (
    //         <iframe
    //             src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    //                 resourceURL
    //             )}`}
    //             width="100%"
    //             height="600px"
    //         >
    //             This is an embedded{' '}
    //             <a target="_blank" href="http://office.com" rel="noreferrer">
    //                 Microsoft Office
    //             </a>{' '}
    //             document, powered by{' '}
    //             <a
    //                 target="_blank"
    //                 href="http://office.com/webapps"
    //                 rel="noreferrer"
    //             >
    //                 Office Online
    //             </a>
    //             .
    //         </iframe>
    //     );
    // }
    let resourceRenderingLink = '';
    if (type === ResourceType.ASSIGNMENT || type === ResourceType.QUIZ) {
        resourceRenderingLink = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            resourceURL
        )}`;
    } else if (type === ResourceType.SLIDESHOW) {
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
