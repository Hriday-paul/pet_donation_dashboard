
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
import { jwtDecode } from "jwt-decode";


export default async function middleware(request: NextRequest) {

    const current_req = request.nextUrl.pathname;
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL(`/login?next=${current_req}`, request.url));
    }

    if (current_req == '/') {
        try {
            // Decode and validate the access token
            const { role } = jwtDecode<{ role: 'admin' | 'shelter' }>(accessToken);

            if (role !== 'shelter') {
                return NextResponse.redirect(new URL(`/admin/dashboard`, request.url));
            }else{
                 return NextResponse.redirect(new URL(`/shelter/dashboard`, request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL(`/login?next=${current_req}`, request.url));
        }
    }

    //check shelter
    if (current_req.startsWith('/shelter')) {
        try {
            // Decode and validate the access token
            const { role } = jwtDecode<{ role: 'admin' | 'shelter' }>(accessToken);

            if (role !== 'shelter') {
                return NextResponse.redirect(new URL(`/login?next=${current_req}`, request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL(`/login?next=${current_req}`, request.url));
        }
    }

    //check admin
    if (current_req.startsWith('/admin')) {
        try {
            // Decode and validate the access token
            const { role } = jwtDecode<{ role: 'admin' | 'shelter' }>(accessToken);

            if (role !== 'admin') {
                return NextResponse.redirect(new URL(`/login?next=${current_req}`, request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL(`/login?next=${current_req}`, request.url));
        }
    }

}

export const config = {
    matcher: [
        "/",
        '/shelter/:path*',
        '/admin/:path*',
    ],
};