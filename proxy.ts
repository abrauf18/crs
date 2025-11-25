import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the subdomain mapping
const subdomainMapping: { [key: string]: string } = {
    admin: '/admin',
    teacher: '/teacher',
};

export function proxy(request: NextRequest) {
    // Get the hostname from the request
    const { hostname } = request.nextUrl;

    // Extract the subdomain from the hostname
    const subdomain = hostname.split('.')[0];

    // Check if the subdomain is one of the defined ones
    if (subdomain in subdomainMapping) {
        // Rewrite the URL to the appropriate route
        const url = request.nextUrl.clone();
        url.pathname = subdomainMapping[subdomain];

        return NextResponse.rewrite(url);
    }

    // If no matching subdomain, return the default response
    return NextResponse.next();
}

// Match all routes
export const config = {
    matcher: '/:path*',
};